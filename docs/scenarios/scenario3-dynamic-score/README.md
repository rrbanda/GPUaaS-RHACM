# Scenario 3: Dynamic Score-Based Selection

> **Difficulty:** ⭐⭐⭐ Advanced | **Time:** ~20 minutes

## TL;DR - Quick Start

```bash
# From this directory
cd scenarios/scenario3-dynamic-score

# 1. Create sample AddonPlacementScores
oc apply -f manifests/sample-scores.yaml

# 2. Apply Placement and Kueue resources
oc apply -f manifests/

# 3. Submit job - will go to highest-scored cluster
oc create -f manifests/sample-gpu-job.yaml

# 4. Watch workload
oc get workload -n default -w
```

## What This Scenario Demonstrates

- Dynamic cluster selection using AddonPlacementScore
- Jobs routed to cluster with highest GPU availability score
- Automatic rebalancing as scores change

## AddonPlacementScore

AddonPlacementScore allows external controllers to provide scores for clusters:

```yaml
apiVersion: cluster.open-cluster-management.io/v1alpha1
kind: AddOnPlacementScore
metadata:
  name: gpu-score
  namespace: spoke-cluster1
status:
  scores:
  - name: gpuAvailable
    value: 80  # Higher = more GPUs available
```

## Dynamic GPU Placement

```yaml
apiVersion: cluster.open-cluster-management.io/v1beta1
kind: Placement
metadata:
  name: dynamic-gpu-placement
  namespace: openshift-kueue-operator
spec:
  numberOfClusters: 1
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

## LocalQueue

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  namespace: "default"
  name: "dynamic-gpu-queue"
spec:
  clusterQueue: "dynamic-gpu-queue"
```

## AdmissionCheck

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

## Verification

```bash
# Check AddonPlacementScores
oc get addonplacementscore -A

# Check PlacementDecision - should select highest scored cluster
oc get placementdecision -n openshift-kueue-operator

# Watch jobs being dispatched
oc get workload -n default -w
```

## Simulating Score Changes

```bash
# Update score for spoke-cluster2 to be higher
oc patch addonplacementscore gpu-score -n spoke-cluster2 \
  --type=merge -p '{"status":{"scores":[{"name":"gpuAvailable","value":90}]}}'

# Submit new job - should go to spoke-cluster2 now
oc create -f manifests/sample-gpu-job.yaml
```

## Cleanup

```bash
oc delete -f manifests/sample-gpu-job.yaml
oc delete -f manifests/
```
