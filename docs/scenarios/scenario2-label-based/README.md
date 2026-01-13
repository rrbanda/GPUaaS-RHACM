# Scenario 2: Label-Based Selection



> **Difficulty:** ⭐⭐ Intermediate | **Time:** ~15 minutes

## TL;DR - Quick Start

```bash
# From this directory
cd scenarios/scenario2-label-based

# 1. Label your GPU cluster (if not done)
oc label managedcluster spoke-cluster1 accelerator=nvidia-l4 --overwrite

# 2. Apply Placement and Kueue resources
oc apply -f manifests/

# 3. Apply workaround (IMPORTANT!)
../../scripts/fix-spoke-clusterqueues.sh

# 4. Submit GPU job
oc create -f manifests/sample-gpu-job.yaml

# 5. Watch - should go to GPU cluster only
oc get workload -n default -w
```

# GPU LocalQueue
apiVersion: kueue.x-k8s.io/v1beta1
kind: LocalQueue
metadata:
  namespace: "default"
  name: "gpu-queue"
spec:
  clusterQueue: "gpu-cluster-queue"
# AdmissionCheck for GPU Placement
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

## Step 4: Verify MultiKueueConfig

```bash
# Check that MultiKueueConfig was created for GPU placement
oc get multikueueconfig gpu-placement -o yaml

# Should show only spoke-cluster1 (the one with nvidia-l4)
```

## Step 5: Submit GPU Job

```bash
cat <<EOF | oc create -f -
apiVersion: batch/v1
kind: Job
metadata:
  generateName: demo2-gpu-job-
  namespace: default
  labels:
    kueue.x-k8s.io/queue-name: "gpu-queue"
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

## Step 6: Monitor Job

```bash
# Watch workload
oc get workload -n default -w

# Check nominated cluster (should be spoke-cluster1 only)
oc get workload -n default -o jsonpath='{.items[-1].status.nominatedClusterNames}'

# Check job on spoke-cluster1
KUBECONFIG=$SPOKE_KUBECONFIG oc get job -n default
KUBECONFIG=$SPOKE_KUBECONFIG oc get pods -n default
```

## Step 7: Verify Label-Based Selection

Submit a job to the regular queue and compare:

```bash
# Submit CPU job to regular queue (should go to any cluster)
cat <<EOF | oc create -f -
apiVersion: batch/v1
kind: Job
metadata:
  generateName: demo2-cpu-job-
  namespace: default
  labels:
    kueue.x-k8s.io/queue-name: "user-queue"
spec:
  parallelism: 1
  completions: 1
  suspend: true
  template:
    spec:
      containers:
      - name: worker
        image: gcr.io/k8s-staging-perf-tests/sleep:v0.1.0
        args: ["10s"]
        resources:
          requests:
            cpu: "1"
            memory: "200Mi"
      restartPolicy: Never
EOF

# Check which cluster got the CPU job
oc get workload -n default
```

## Expected Results

| Job Type | Queue | Placement | Target Cluster |
|----------|-------|-----------|----------------|
| GPU Job | gpu-queue | gpu-placement | spoke-cluster1 (L4 GPU) |
| CPU Job | user-queue | default | Any spoke cluster |

## Cleanup

```bash
oc delete job -n default -l kueue.x-k8s.io/queue-name
oc delete placement gpu-placement -n openshift-kueue-operator
oc delete clusterqueue gpu-cluster-queue
oc delete localqueue gpu-queue -n default
oc delete admissioncheck multikueue-gpu gpu-placement-check
```

## Next Steps

- [Demo Scenario 3: Dynamic Score-Based Selection](../scenario3-dynamic-score/)
