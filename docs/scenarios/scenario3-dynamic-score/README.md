# Scenario 3: Dynamic Score-Based Selection

> **Difficulty:** ⭐⭐⭐ Advanced | **Time:** ~20 minutes

---

## Why This Scenario?

Scenario 2 routes GPU jobs to GPU clusters using static labels. But what if you have **multiple GPU clusters**?

| Cluster | GPUs | Current Load | Available GPUs |
|---------|------|--------------|----------------|
| gpu-cluster-1 | 8 | 75% | 2 |
| gpu-cluster-2 | 8 | 25% | 6 |
| gpu-cluster-3 | 4 | 50% | 2 |

Sending jobs to a random GPU cluster might result in:
- Jobs queued on a busy cluster while other clusters sit idle
- Uneven resource utilization across the fleet
- Longer wait times for users

### The Problem

> "I have multiple GPU clusters. I want my job to go to the one with the **most available GPUs right now**."

**Dynamic score-based Placement solves this** using RHACM's `AddOnPlacementScore` to rank clusters by real-time metrics.

---

## What You'll Learn

In this scenario, you'll:

1. **Create AddOnPlacementScores** that represent GPU availability per cluster
2. **Create a Placement** that prioritizes clusters by score
3. **Observe dynamic routing** as scores change
4. **Simulate real-world behavior** with score updates

```
┌─────────────────────────────────────────────────────────────┐
│  HUB CLUSTER                                                │
│  ┌──────────────┐    ┌───────────────┐    ┌──────────────┐ │
│  │ user-queue   │───▶│ cluster-queue │───▶│ Placement    │ │
│  │              │    │               │    │ (by score)   │ │
│  └──────────────┘    └───────────────┘    └──────┬───────┘ │
└──────────────────────────────────────────────────┼─────────┘
                                                   │
               ┌───────── Score Ranking ───────────┤
               │     gpuAvailable: highest wins    │
               ▼                                   ▼
       ┌──────────────┐                   ┌──────────────┐
       │ gpu-cluster-1│                   │ gpu-cluster-2│
       │ Score: 20    │                   │ Score: 80 ✅ │
       │ (busy)       │                   │ (has queue)  │
       └──────────────┘                   └──────────────┘
```

> **Note:** Queue names (`cluster-queue`, `user-queue`) must match what's mirrored to spoke clusters by the kueue-addon.

---

## How It Works

### AddOnPlacementScore

`AddOnPlacementScore` is an RHACM resource that provides scores for cluster selection:

```yaml
apiVersion: cluster.open-cluster-management.io/v1alpha1
kind: AddOnPlacementScore
metadata:
  name: gpu-score
  namespace: spoke-cluster1   # One per cluster namespace
status:
  scores:
  - name: gpuAvailable
    value: 80   # 0-100, higher = more available
```

**Key points:**
- Scores live in each cluster's namespace on the hub
- External controllers (like a GPU monitor) update these scores
- Placement uses scores to rank clusters

### Placement with Score Prioritizer

```yaml
apiVersion: cluster.open-cluster-management.io/v1beta1
kind: Placement
metadata:
  name: dynamic-gpu-placement
spec:
  numberOfClusters: 1   # Select only the top-scoring cluster
  prioritizerPolicy:
    mode: Exact
    configurations:
    - scoreCoordinate:
        type: AddOn
        addOn:
          resourceName: gpu-score
          scoreName: gpuAvailable
      weight: 1
```

---

## Prerequisites

- Completed [Scenario 2](../scenario2-label-based/) or equivalent setup
- Multiple managed clusters (or simulate with score changes)

!!! warning "Important: Queue Naming"
    The ClusterQueue and LocalQueue names on the hub **must match** what the kueue-addon syncs to spoke clusters.
    By default, the addon syncs `cluster-queue` and `user-queue`. See [Scenario 2 prerequisites](../scenario2-label-based/#prerequisites) for details.

---

## Quick Start

```bash
# From the repo root
cd docs/scenarios/scenario3-dynamic-score

# 1. Create sample AddonPlacementScores
oc apply -f manifests/sample-scores.yaml

# 2. Apply Placement and Kueue resources
oc apply -f manifests/

# 3. Submit job - will go to highest-scored cluster
oc create -f manifests/sample-gpu-job.yaml

# 4. Watch workload
oc get workload -n default -w
```

---

## Step-by-Step Explanation

### Step 1: Create AddOnPlacementScores

Create scores for each cluster. In production, a GPU monitoring addon would update these:

```yaml
# For spoke-cluster1 (busy, few GPUs available)
apiVersion: cluster.open-cluster-management.io/v1alpha1
kind: AddOnPlacementScore
metadata:
  name: gpu-score
  namespace: spoke-cluster1
status:
  scores:
  - name: gpuAvailable
    value: 20   # Low score = busy cluster
---
# For spoke-cluster2 (idle, many GPUs available)
apiVersion: cluster.open-cluster-management.io/v1alpha1
kind: AddOnPlacementScore
metadata:
  name: gpu-score
  namespace: spoke-cluster2
status:
  scores:
  - name: gpuAvailable
    value: 80   # High score = idle cluster
```

### Step 2: Create Dynamic Placement

```yaml
apiVersion: cluster.open-cluster-management.io/v1beta1
kind: Placement
metadata:
  name: dynamic-gpu-placement
  namespace: openshift-kueue-operator
spec:
  numberOfClusters: 1   # Pick only the best one
  prioritizerPolicy:
    mode: Exact
    configurations:
    - scoreCoordinate:
        type: AddOn
        addOn:
          resourceName: gpu-score
          scoreName: gpuAvailable
      weight: 1
```

### Step 3: Create AdmissionCheck

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: AdmissionCheck
metadata:
  name: dynamic-gpu-check
spec:
  controllerName: open-cluster-management.io/placement
  parameters:
    apiGroup: cluster.open-cluster-management.io
    kind: Placement
    name: dynamic-gpu-placement
```

### Step 4: Create ClusterQueue and LocalQueue

The queue names **must match** what the addon syncs to spokes:

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: ClusterQueue
metadata:
  name: cluster-queue  # Must match addon's clusterQueue.name!
spec:
  namespaceSelector: {}
  resourceGroups:
  - coveredResources: ["cpu", "memory", "nvidia.com/gpu"]
    flavors:
    - name: default-flavor
      resources:
      - name: "cpu"
        nominalQuota: 32
      - name: "memory"
        nominalQuota: 128Gi
      - name: "nvidia.com/gpu"
        nominalQuota: 8
  admissionChecks:
  - multikueue-dynamic   # MultiKueue controller
  - dynamic-gpu-check    # OCM Placement controller
---
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  name: user-queue  # Must match addon's localQueue.name!
  namespace: default
spec:
  clusterQueue: cluster-queue
```

!!! info "Why these names?"
    The kueue-addon mirrors `cluster-queue` and `user-queue` to spoke clusters.
    Using different names will cause: `LocalQueue xyz doesn't exist`

---

## Verification

```bash
# Check AddonPlacementScores
oc get addonplacementscore -A

# Check PlacementDecision - should show highest-scored cluster
oc get placementdecision -n openshift-kueue-operator -o yaml

# Check where job was dispatched
oc get workload -n default

# Verify job is on the high-score cluster
KUBECONFIG=$SPOKE2_KUBECONFIG oc get jobs -n default  # Should be here (score=80)
KUBECONFIG=$SPOKE_KUBECONFIG oc get jobs -n default   # Should be empty (score=20)
```

---

## Simulating Dynamic Behavior

Watch how jobs are routed as scores change:

```bash
# Terminal 1: Watch PlacementDecisions
watch oc get placementdecision -n openshift-kueue-operator

# Terminal 2: Update scores to simulate cluster load changes
# Make spoke-cluster1 the best choice now
oc patch addonplacementscore gpu-score -n spoke-cluster1 \
  --type=merge --subresource=status \
  -p '{"status":{"scores":[{"name":"gpuAvailable","value":95}]}}'

# Submit a new job - should go to spoke-cluster1 now
oc create -f manifests/sample-gpu-job.yaml
```

---

## Expected Results

| Initial State | After Score Update |
|---------------|-------------------|
| PlacementDecision: spoke-cluster2 | PlacementDecision: spoke-cluster1 |
| Jobs routed to spoke-cluster2 | New jobs routed to spoke-cluster1 |

---

## Production Considerations

In production, you would:

1. **Deploy a GPU monitoring addon** that reports actual GPU availability
2. **Update scores automatically** based on `nvidia-smi` or DCGM metrics
3. **Consider multiple score dimensions** (GPU memory, GPU utilization, queue depth)
4. **Set appropriate weights** for different prioritizers

### Example: Multi-Dimension Scoring

```yaml
prioritizerPolicy:
  configurations:
  - scoreCoordinate:
      type: AddOn
      addOn:
        resourceName: gpu-score
        scoreName: gpuAvailable
    weight: 2   # GPU availability is most important
  - scoreCoordinate:
      type: AddOn
      addOn:
        resourceName: gpu-score
        scoreName: gpuMemoryAvailable
    weight: 1   # Memory is secondary consideration
```

---

## Cleanup

```bash
# Delete jobs
oc delete jobs -l kueue.x-k8s.io/queue-name=user-queue -n default

# Delete Kueue resources
oc delete -f manifests/

# Delete AddonPlacementScores
oc delete addonplacementscore gpu-score -n spoke-cluster1
oc delete addonplacementscore gpu-score -n spoke-cluster2
```

---

## Summary

| Scenario | Selection Method | Use Case |
|----------|-----------------|----------|
| Scenario 1 | Any cluster | "Just run my job somewhere" |
| Scenario 2 | Label-based | "Run on a GPU cluster" |
| **Scenario 3** | **Score-based** | **"Run on the GPU cluster with most available GPUs"** |

This progression shows how RHACM + MultiKueue enables increasingly sophisticated workload placement strategies.
