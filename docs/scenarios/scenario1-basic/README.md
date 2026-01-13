# Scenario 1: Basic MultiKueue

> **Difficulty:** ⭐ Beginner | **Time:** ~10 minutes

## TL;DR - Quick Start

```bash
# From this directory
cd scenarios/scenario1-basic

# 1. Apply Kueue resources
oc apply -f manifests/

# 2. Submit test job
oc create -f manifests/sample-job.yaml

# 3. Watch workload
oc get workload -n default -w
```

## ClusterQueue with AdmissionChecks

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: ClusterQueue
metadata:
  name: "cluster-queue"
spec:
  namespaceSelector: {}
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
  - multikueue-demo
```

## AdmissionCheck for MultiKueue

```yaml
apiVersion: kueue.x-k8s.io/v1beta1
kind: AdmissionCheck
metadata:
  name: multikueue-demo
spec:
  controllerName: kueue.x-k8s.io/multikueue
  parameters:
    apiGroup: kueue.x-k8s.io
    kind: MultiKueueConfig
    name: default
```

## What This Scenario Demonstrates

- Basic MultiKueue setup with RHACM
- Job submission to hub cluster
- Automatic dispatch to spoke clusters via Placement

## Verification

```bash
# Check workload status
oc get workload -n default

# Check which cluster the job was dispatched to
oc get workload <workload-name> -o jsonpath='{.status.admission.clusterQueue}'

# Check job on spoke cluster
KUBECONFIG=$SPOKE_KUBECONFIG oc get jobs -n default
```

## Cleanup

```bash
oc delete -f manifests/sample-job.yaml
oc delete -f manifests/
```
