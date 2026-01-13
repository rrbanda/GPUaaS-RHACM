---
layout: default
title: "Scenario 3: Dynamic Score"
parent: Demo Scenarios
nav_order: 3
description: "Real-time GPU availability"
---


> **Difficulty:** ⭐⭐⭐ Advanced | **Time:** ~20 minutes

## TL;DR - Quick Start

```bash
# From this directory
cd scenarios/scenario3-dynamic-score

# 1. Create sample AddonPlacementScores
oc apply -f manifests/sample-scores.yaml

# 2. Apply Placement and Kueue resources
oc apply -f manifests/

# 3. Apply workaround (IMPORTANT!)
../../scripts/fix-spoke-clusterqueues.sh

# 4. Submit job - will go to highest-scored cluster
oc create -f manifests/sample-gpu-job.yaml

# 5. Watch workload
oc get workload -n default -w
```

---

## Overview

In this scenario, we use OCM Placement with **AddonPlacementScore** to dynamically select clusters based on real-time GPU availability.

**Use Case:** Optimal GPU utilization - dispatch jobs to clusters with the most available GPU resources.

## Architecture

```
                    ┌─────────────────────────────┐
                    │         Hub Cluster         │
                    │                             │
                    │  ┌───────────────────────┐  │
                    │  │ GPU Job               │  │
                    │  │ (dynamic-gpu-queue)   │  │
                    │  └───────────┬───────────┘  │
                    │              │              │
                    │  ┌───────────▼───────────┐  │
                    │  │ Placement             │  │
                    │  │ (dynamic-gpu)         │  │
                    │  │                       │  │
                    │  │ prioritizerPolicy:    │  │
                    │  │   AddOn:              │  │
                    │  │     resourceName:     │  │
                    │  │       resource-usage  │  │
                    │  │     scoreName:        │  │
                    │  │       gpuAvailable    │  │
                    │  └───────────┬───────────┘  │
                    └──────────────┼──────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
  ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
  │ Spoke 1        │       │ Spoke 2        │       │ Spoke 3        │
  │ GPU: L4        │       │ GPU: L4        │       │ GPU: A100      │
  │                │       │                │       │                │
  │ Score: 80      │       │ Score: 20      │       │ Score: 95      │
  │ (3/4 free)     │       │ (1/4 free)     │       │ (7/8 free)     │
  │                │       │                │       │                │
  │ ✓ HIGHEST      │       │ ✗ LOW SCORE    │       │ ✓ SELECTED     │
  └────────────────┘       └────────────────┘       └────────────────┘
```

## Prerequisites

- [Scenario 2](../scenario2-label-based/) completed
- AddonPlacementScore resource deployed (requires custom addon or controller)

## Understanding AddonPlacementScore

`AddonPlacementScore` is an OCM resource that provides dynamic scores for cluster selection:

```yaml
apiVersion: cluster.open-cluster-management.io/v1alpha1
kind: AddonPlacementScore
metadata:
  name: resource-usage-score
  namespace: spoke-cluster1  # Per-cluster namespace
status:
  scores:
  - name: gpuClusterAvailable
    value: 75  # 0-100 scale, higher = more available
  - name: cpuClusterAvailable
    value: 60
```

## Step 1: Create AddonPlacementScore (Simulated)

> **Note:** In production, this would be populated by a monitoring addon. For demo purposes, we create static scores.

```bash
# Create simulated scores for spoke-cluster1 (GPU cluster)
cat <<EOF | oc apply -f -
apiVersion: cluster.open-cluster-management.io/v1alpha1
kind: AddOnPlacementScore
metadata:
  name: resource-usage-score
  namespace: spoke-cluster1
status:
  conditions:
  - lastTransitionTime: "2024-01-01T00:00:00Z"
    message: Score calculated successfully
    reason: ScoreCalculated
    status: "True"
    type: ScoreAvailable
  scores:
  - name: gpuClusterAvailable
    value: 80
  - name: cpuClusterAvailable
    value: 50
  validUntil: "2030-01-01T00:00:00Z"
EOF

# Create scores for spoke-cluster2 (CPU-only, low GPU score)
cat <<EOF | oc apply -f -
apiVersion: cluster.open-cluster-management.io/v1alpha1
kind: AddOnPlacementScore
metadata:
  name: resource-usage-score
  namespace: spoke-cluster2
status:
  conditions:
  - lastTransitionTime: "2024-01-01T00:00:00Z"
    message: Score calculated successfully
    reason: ScoreCalculated
    status: "True"
    type: ScoreAvailable
  scores:
  - name: gpuClusterAvailable
    value: 0  # No GPU
  - name: cpuClusterAvailable
    value: 90
  validUntil: "2030-01-01T00:00:00Z"
EOF
```

Verify scores:

```bash
oc get addonplacementscore -A
```

## Step 2: Create Dynamic GPU Placement

```bash
cat <<EOF | oc apply -f -
apiVersion: cluster.open-cluster-management.io/v1beta1
kind: Placement
metadata:
  name: dynamic-gpu-placement
  namespace: openshift-kueue-operator
spec:
  clusterSets:
  - global
  tolerations:
  - key: cluster.open-cluster-management.io/unreachable
    operator: Exists
  predicates:
    - requiredClusterSelector:
        labelSelector:
          matchExpressions:
          - key: accelerator
            operator: Exists
  numberOfClusters: 1  # Select only the best cluster
  prioritizerPolicy:
    mode: Exact
    configurations:
    - scoreCoordinate:
        type: AddOn
        addOn:
          resourceName: resource-usage-score
          scoreName: gpuClusterAvailable
      weight: 1
EOF
```

Verify:

```bash
# Check Placement status
oc get placement dynamic-gpu-placement -n openshift-kueue-operator -o yaml

# Check which cluster was selected (should be highest score)
oc get placementdecision -n openshift-kueue-operator \
  -l cluster.open-cluster-management.io/placement=dynamic-gpu-placement \
  -o jsonpath='{.items[0].status.decisions[*].clusterName}'
```

## Step 3: Create Dynamic Queue Resources

```yaml
# Dynamic GPU ClusterQueue
apiVersion: kueue.x-k8s.io/v1beta1
kind: ClusterQueue
metadata:
  name: "dynamic-gpu-queue"
spec:
  namespaceSelector: {}
  resourceGroups:
  - coveredResources: ["cpu", "memory", "nvidia.com/gpu"]
    flavors:
    - name: "default-flavor"
      resources:
      - name: "cpu"
        nominalQuota: 32
      - name: "memory"
        nominalQuota: 128Gi
      - name: "nvidia.com/gpu"
        nominalQuota: 8
  admissionChecks:
  - multikueue-dynamic
  - dynamic-gpu-check
---
# LocalQueue
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  namespace: "default"
  name: "dynamic-gpu-queue"
spec:
  clusterQueue: "dynamic-gpu-queue"
---
# AdmissionChecks
apiVersion: kueue.x-k8s.io/v1beta1
kind: AdmissionCheck
metadata:
  name: multikueue-dynamic
spec:
  controllerName: kueue.x-k8s.io/multikueue
  parameters:
    apiGroup: kueue.x-k8s.io
    kind: MultiKueueConfig
    name: dynamic-gpu-placement
---
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

Apply:

```bash
oc apply -f manifests/

# Or from repo root:
oc apply -f scenarios/scenario3-dynamic-score/manifests/
```

## Step 4: Submit Job and Observe

```bash
cat <<EOF | oc create -f -
apiVersion: batch/v1
kind: Job
metadata:
  generateName: demo3-dynamic-gpu-
  namespace: default
  labels:
    kueue.x-k8s.io/queue-name: "dynamic-gpu-queue"
spec:
  parallelism: 1
  completions: 1
  suspend: true
  template:
    spec:
      containers:
      - name: gpu-worker
        image: nvcr.io/nvidia/cuda:12.0.0-base-ubuntu22.04
        command: ["nvidia-smi", "-L"]
        resources:
          requests:
            cpu: "1"
            memory: "1Gi"
            nvidia.com/gpu: "1"
          limits:
            cpu: "1"
            memory: "1Gi"
            nvidia.com/gpu: "1"
      restartPolicy: Never
EOF
```

Monitor:

```bash
# Watch workload
oc get workload -n default -w

# Check nominated cluster
oc get workload -n default -o jsonpath='{.items[-1].status.nominatedClusterNames}'
```

## Step 5: Simulate Score Change

Change the scores to simulate a different cluster becoming more available:

```bash
# Reduce spoke-cluster1 score (simulate GPU exhaustion)
oc patch addonplacementscore resource-usage-score -n spoke-cluster1 \
  --type=merge --subresource=status \
  -p '{"status":{"scores":[{"name":"gpuClusterAvailable","value":10}]}}'

# Wait for Placement to re-evaluate
sleep 10

# Check new selection
oc get placementdecision -n openshift-kueue-operator \
  -l cluster.open-cluster-management.io/placement=dynamic-gpu-placement
```

## Expected Behavior

| Cluster | Initial Score | After Change | Selection |
|---------|---------------|--------------|-----------|
| spoke-cluster1 | 80 | 10 | First selected, then deselected |
| spoke-cluster2 | 0 | 0 | Never selected (no GPU) |

Jobs submitted after the score change will be dispatched to the newly highest-scoring cluster.

## Production Considerations

### Real Score Provider

In production, use a controller that monitors actual GPU usage:

```yaml
# Example: Custom score provider addon
apiVersion: addon.open-cluster-management.io/v1alpha1
kind: ClusterManagementAddOn
metadata:
  name: gpu-score-provider
spec:
  addOnMeta:
    displayName: GPU Score Provider
    description: Provides real-time GPU availability scores
```

### Score Update Frequency

Configure appropriate `validUntil` for scores to balance:
- **Too frequent:** High API server load
- **Too infrequent:** Stale scores, suboptimal placement

## Cleanup

```bash
oc delete job -n default -l kueue.x-k8s.io/queue-name=dynamic-gpu-queue
oc delete placement dynamic-gpu-placement -n openshift-kueue-operator
oc delete clusterqueue dynamic-gpu-queue
oc delete localqueue dynamic-gpu-queue -n default
oc delete admissioncheck multikueue-dynamic dynamic-gpu-check
oc delete addonplacementscore resource-usage-score -n spoke-cluster1
oc delete addonplacementscore resource-usage-score -n spoke-cluster2
```

## Next Steps

- [Troubleshooting Guide](../../docs/99-troubleshooting.md)
