# Scenario 1: Basic MultiKueue



> **Difficulty:** ⭐ Beginner | **Time:** ~10 minutes

## TL;DR - Quick Start

```bash
# From this directory
cd scenarios/scenario1-basic

# 1. Apply Kueue resources
oc apply -f manifests/

# 2. Apply workaround (IMPORTANT!)
../../scripts/fix-spoke-clusterqueues.sh

# 3. Submit test job
oc create -f manifests/sample-job.yaml

# 4. Watch workload
oc get workload -n default -w
```

# ClusterQueue with AdmissionChecks
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
  - multikueue-config-demo
# AdmissionCheck for MultiKueue
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
