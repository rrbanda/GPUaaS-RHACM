# Scenario 2: Label-Based GPU Selection

> **Difficulty:** ⭐⭐ Intermediate | **Time:** ~15 minutes

---

## Why This Scenario?

Scenario 1 dispatches jobs to **any** available cluster. But in real environments, **not all clusters are the same**:

| Cluster | Hardware | Best For |
|---------|----------|----------|
| spoke-cluster1 | NVIDIA L4 GPUs (x4) | ML training, inference |
| spoke-cluster2 | CPU only | Data preprocessing, ETL |

A GPU training job sent to a CPU-only cluster will **fail**. We need smarter routing.

### The Problem

> "I need my GPU training job to run on a cluster with GPUs, not just any cluster!"

**Label-based Placement solves this** by using RHACM's Placement API to select clusters based on labels.

---

## What You'll Learn

In this scenario, you'll:

1. **Label clusters** with their hardware capabilities (`accelerator=nvidia-l4`)
2. **Create a Placement** that selects only GPU clusters
3. **Link the Placement to Kueue** via an AdmissionCheck
4. **Submit GPU jobs** that automatically route to GPU clusters

```
┌─────────────────────────────────────────────────────────────┐
│  HUB CLUSTER                                                │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────────┐ │
│  │ GPU-Queue    │───▶│ GPU-ClusterQ  │───▶│ Placement    │ │
│  │              │    │               │    │ gpu-placement│ │
│  └──────────────┘    └───────────────┘    └──────┬───────┘ │
└──────────────────────────────────────────────────┼─────────┘
                                                   │
                   ┌─────── Label Selector ────────┤
                   │    accelerator=nvidia-l4      │
                   ▼                               ✗
           ┌──────────────┐               ┌──────────────┐
           │ spoke-cluster1│              │ spoke-cluster2│
           │ ✅ nvidia-l4  │              │ ❌ CPU only   │
           └──────────────┘               └──────────────┘
```

---

## Prerequisites

- Completed [Scenario 1](../scenario1-basic/) or equivalent setup
- At least one GPU cluster and one CPU-only cluster
- Clusters labeled appropriately

---

## Quick Start

```bash
# From the repo root
cd docs/scenarios/scenario2-label-based

# 1. Label your GPU cluster
oc label managedcluster spoke-cluster1 accelerator=nvidia-l4 --overwrite

# 2. Apply Placement and Kueue resources
oc apply -f manifests/

# 3. Submit GPU job
oc create -f manifests/sample-gpu-job.yaml

# 4. Watch - job should go to GPU cluster only
oc get workload -n default -w
```

---

## Step-by-Step Explanation

### Step 1: Label Your Clusters

First, label clusters based on their hardware:

```bash
# Label GPU cluster
oc label managedcluster spoke-cluster1 accelerator=nvidia-l4 --overwrite

# Label CPU-only cluster
oc label managedcluster spoke-cluster2 cluster-type=cpu-only --overwrite

# Verify labels
oc get managedclusters --show-labels
```

### Step 2: Create GPU Placement

The Placement selects only clusters with the GPU label:

```yaml
apiVersion: cluster.open-cluster-management.io/v1beta1
kind: Placement
metadata:
  name: gpu-placement
  namespace: openshift-kueue-operator
spec:
  predicates:
    - requiredClusterSelector:
        labelSelector:
          matchLabels:
            accelerator: nvidia-l4
```

**Key points:**
- Namespace must be `openshift-kueue-operator` (where addon runs)
- `requiredClusterSelector` means "only clusters with this label"
- The addon automatically creates `MultiKueueConfig` from this Placement

### Step 3: Create AdmissionCheck for Placement

Link the Placement to Kueue via an AdmissionCheck:

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: AdmissionCheck
metadata:
  name: gpu-placement-check
spec:
  controllerName: open-cluster-management.io/placement
  parameters:
    apiGroup: cluster.open-cluster-management.io
    kind: Placement
    name: gpu-placement
```

**Note:** The `controllerName` is `open-cluster-management.io/placement`, not the MultiKueue controller!

### Step 4: Create GPU ClusterQueue

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: ClusterQueue
metadata:
  name: gpu-cluster-queue
spec:
  namespaceSelector: {}
  resourceGroups:
  - coveredResources: ["cpu", "memory", "nvidia.com/gpu"]
    flavors:
    - name: gpu-flavor
      resources:
      - name: "cpu"
        nominalQuota: 100
      - name: "memory"
        nominalQuota: 256Gi
      - name: "nvidia.com/gpu"
        nominalQuota: 8
  admissionChecks:
  - gpu-placement-check   # Uses the Placement-based check
```

### Step 5: Create GPU LocalQueue

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  name: gpu-queue
  namespace: default
spec:
  clusterQueue: gpu-cluster-queue
```

### Step 6: Submit a GPU Job

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  generateName: gpu-training-
  namespace: default
  labels:
    kueue.x-k8s.io/queue-name: gpu-queue
spec:
  template:
    spec:
      containers:
      - name: training
        image: nvidia/cuda:12.0-base
        command: ["nvidia-smi"]
        resources:
          limits:
            nvidia.com/gpu: 1
      restartPolicy: Never
```

---

## Verification

```bash
# Check PlacementDecision - should list only spoke-cluster1
oc get placementdecision -n openshift-kueue-operator

# Check MultiKueueConfig was created
oc get multikueueconfig gpu-placement -o yaml

# Check workload was admitted
oc get workload -n default

# Verify job is on GPU cluster (not CPU cluster)
KUBECONFIG=$SPOKE_KUBECONFIG oc get jobs -n default
KUBECONFIG=$SPOKE2_KUBECONFIG oc get jobs -n default  # Should be empty!
```

---

## Expected Results

| Check | Expected |
|-------|----------|
| PlacementDecision | Lists only `spoke-cluster1` |
| Job on spoke-cluster1 | Running/Completed |
| Job on spoke-cluster2 | **None** (not selected by Placement) |

---

## Cleanup

```bash
# Delete jobs
oc delete jobs -l kueue.x-k8s.io/queue-name=gpu-queue -n default

# Delete Kueue resources
oc delete -f manifests/
```

---

## Next Steps

- [Scenario 3: Dynamic Score-Based Selection](../scenario3-dynamic-score/) - Route to the cluster with most available GPUs
