# Scenario 2: Label-Based GPU Selection

> **Difficulty:** ⭐⭐ Intermediate | **Time:** ~15 minutes

## TL;DR - Quick Start

```bash
# From this directory
cd scenarios/scenario2-label-based

# 1. Label your GPU cluster (if not done)
oc label managedcluster spoke-cluster1 accelerator=nvidia-l4 --overwrite

# 2. Apply Placement and Kueue resources
oc apply -f manifests/

# 3. Submit GPU job
oc create -f manifests/sample-gpu-job.yaml

# 4. Watch - should go to GPU cluster only
oc get workload -n default -w
```

## What This Scenario Demonstrates

- Label-based cluster selection via Placement
- GPU jobs routed only to clusters with `accelerator=nvidia-l4` label
- Separation of GPU and CPU workloads

## GPU LocalQueue

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  namespace: "default"
  name: "gpu-queue"
spec:
  clusterQueue: "gpu-cluster-queue"
```

## GPU Placement

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

## AdmissionCheck for GPU Placement

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

## Verification

```bash
# Check that MultiKueueConfig was created for GPU placement
oc get multikueueconfig gpu-placement -o yaml

# Should show only spoke-cluster1 (the one with nvidia-l4)
oc get placementdecision -n openshift-kueue-operator

# Check job was dispatched to GPU cluster
oc get workload -n default
KUBECONFIG=$SPOKE_KUBECONFIG oc get jobs -n default
```

## Cleanup

```bash
oc delete -f manifests/sample-gpu-job.yaml
oc delete -f manifests/
```
