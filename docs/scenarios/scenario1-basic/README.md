# Scenario 1: Basic MultiKueue

> **Difficulty:** ⭐ Beginner | **Time:** ~10 minutes

---

## Why This Scenario?

In a multi-cluster environment, data scientists and ML engineers often face a common problem:

> "I have a job to run, but I don't know which cluster to use or how to submit it there."

**Basic MultiKueue solves this** by providing a single submission point on the hub cluster. Users submit jobs to a LocalQueue on the hub, and MultiKueue automatically dispatches them to available managed clusters.

### The Problem

| Without MultiKueue | With MultiKueue |
|-------------------|-----------------|
| Users must know which cluster to target | Users submit to a single hub queue |
| Users need kubeconfig for each cluster | Users only need hub access |
| Manual cluster selection and job tracking | Automatic dispatch and status sync |

---

## What You'll Learn

In this scenario, you'll set up:

1. **ClusterQueue** - A hub-side queue with resource quotas and admission checks
2. **LocalQueue** - Where users submit their jobs (namespace-scoped)
3. **AdmissionCheck** - Links the ClusterQueue to the MultiKueue controller

The result: Jobs submitted to the hub are automatically dispatched to available spoke clusters.

```
┌─────────────────────────────────────────────────────────────┐
│  HUB CLUSTER                                                │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────────┐ │
│  │ LocalQueue   │───▶│ ClusterQueue  │───▶│ MultiKueue   │ │
│  │ (user submit)│    │ (quota/checks)│    │ Controller   │ │
│  └──────────────┘    └───────────────┘    └──────┬───────┘ │
└──────────────────────────────────────────────────┼─────────┘
                                                   │
                    ┌──────────────────────────────┼──────────┐
                    ▼                              ▼          │
           ┌──────────────┐               ┌──────────────┐   │
           │ spoke-cluster1│              │ spoke-cluster2│  │
           │ (GPU)         │              │ (CPU-only)    │  │
           └──────────────┘               └──────────────┘   │
```

---

## Prerequisites

- RHACM hub with Kueue Addon installed ([Installation Guide](../../02-installation.md))
- At least one managed cluster in a ManagedClusterSet

!!! warning "Queue Naming"
    The ClusterQueue and LocalQueue names (`cluster-queue`, `user-queue`) must match what the kueue-addon syncs to spoke clusters. This is configured in your `kueue-addon-values.yaml`.

---

## Quick Start

```bash
# From the repo root
cd docs/scenarios/scenario1-basic

# 1. Apply Kueue resources
oc apply -f manifests/

# 2. Submit test job
oc create -f manifests/sample-job.yaml

# 3. Watch workload status
oc get workload -n default -w
```

---

## Step-by-Step Explanation

### Step 1: Create ClusterQueue

The ClusterQueue defines resource quotas and links to **two** admission checks:

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: ClusterQueue
metadata:
  name: "cluster-queue"  # Must match addon's clusterQueue.name!
spec:
  namespaceSelector: {}  # Accept jobs from all namespaces
  resourceGroups:
  - coveredResources: ["cpu", "memory"]
    flavors:
    - name: "default-flavor"
      resources:
      - name: "cpu"
        nominalQuota: 100
      - name: "memory"
        nominalQuota: 256Gi
  admissionChecks:
  - multikueue-demo         # MultiKueue controller
  - multikueue-config-demo  # OCM Placement controller
```

### Step 2: Create AdmissionChecks

You need **two** AdmissionChecks - one for MultiKueue and one for OCM Placement:

```yaml
# 1. MultiKueue controller - dispatches jobs to spoke clusters
apiVersion: kueue.x-k8s.io/v1beta1
kind: AdmissionCheck
metadata:
  name: multikueue-demo
spec:
  controllerName: kueue.x-k8s.io/multikueue
  parameters:
    apiGroup: kueue.x-k8s.io
    kind: MultiKueueConfig
    name: default  # Auto-created by the addon
---
# 2. OCM Placement controller - selects target clusters
apiVersion: kueue.x-k8s.io/v1beta1
kind: AdmissionCheck
metadata:
  name: multikueue-config-demo
spec:
  controllerName: open-cluster-management.io/placement
  parameters:
    apiGroup: cluster.open-cluster-management.io
    kind: Placement
    name: default  # Uses default Placement (all clusters)
```

### Step 3: Create LocalQueue

Users submit jobs to the LocalQueue:

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  name: user-queue  # Must match addon's localQueue.name!
  namespace: default
spec:
  clusterQueue: cluster-queue
```

### Step 4: Submit a Job

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  generateName: sample-job-
  namespace: default
  labels:
    kueue.x-k8s.io/queue-name: user-queue
spec:
  template:
    spec:
      containers:
      - name: worker
        image: busybox
        command: ["sleep", "30"]
      restartPolicy: Never
```

---

## Verification

```bash
# Check workload was admitted
oc get workload -n default

# Check which cluster the job was dispatched to
oc get workload -n default -o jsonpath='{.items[0].status.admissionChecks}' | jq

# Check job on spoke cluster
KUBECONFIG=$SPOKE_KUBECONFIG oc get jobs -n default
```

---

## Expected Results

| Resource | Status |
|----------|--------|
| Workload on hub | `Admitted=True` |
| Job on hub | `Suspended=True` (controlled by Kueue) |
| Job on spoke | `Running` or `Completed` |

---

## Cleanup

```bash
# Delete the sample job
oc delete jobs -l kueue.x-k8s.io/queue-name=user-queue -n default

# Delete Kueue resources
oc delete -f manifests/
```

---

## Next Steps

- [Scenario 2: Label-Based Selection](../scenario2-label-based/) - Route GPU jobs to GPU clusters
- [Scenario 3: Dynamic Score-Based Selection](../scenario3-dynamic-score/) - Route to the cluster with most available resources
