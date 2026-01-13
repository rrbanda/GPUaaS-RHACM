---
layout: default
title: Troubleshooting
nav_order: 9
description: "Known issues and fixes"
---


## Known Issues and Workarounds

### Issue 1: Spoke ClusterQueues Have Hub's Admission Checks

**Symptom:**
- Jobs dispatched to spoke but stay "Suspended"
- Spoke's ClusterQueue has `admissionChecks` that should only be on hub

**Diagnosis:**
```bash
# Check spoke ClusterQueue
KUBECONFIG=/tmp/spoke-kubeconfig oc get clusterqueue -o yaml | grep -A 3 admissionChecks
```

If you see admission checks like `multikueue-demo`, this is incorrect.

**Root Cause:**
The RHACM kueue-addon template incorrectly copies the full ClusterQueue spec (including admission checks) to spoke clusters.

**Workaround:**
```bash
# Remove admission checks from spoke ClusterQueues
KUBECONFIG=/tmp/spoke-kubeconfig oc patch clusterqueue cluster-queue \
  --type=json -p='[{"op": "remove", "path": "/spec/admissionChecks"}]'

KUBECONFIG=/tmp/spoke-kubeconfig oc patch clusterqueue gpu-cluster-queue \
  --type=json -p='[{"op": "remove", "path": "/spec/admissionChecks"}]'
```

> **Note:** The addon may overwrite this fix on its reconciliation loop. You may need to reapply after addon reconciliation.

---

### Issue 2: Jobs Running on Hub Instead of Spoke

**Symptom:**
- Workload shows "Admitted" on hub
- Pod created on hub (not spoke)
- Pod stuck in "Pending" (hub has no GPUs)

**Diagnosis:**
```bash
# Check if workload has admissionChecks in status
oc get workload -n default -o jsonpath='{.items[0].status.admissionChecks}'

# If empty/null, admission checks were bypassed
```

**Root Cause:**
AdmissionChecks marked as complete before MultiKueue controller could dispatch the job.

**Workaround:**
1. Delete the stuck job
2. Ensure ClusterQueue has admission checks:
   ```bash
   oc patch clusterqueue gpu-cluster-queue --type=merge \
     -p='{"spec":{"admissionChecks":["multikueue-demo","multikueue-config-demo"]}}'
   ```
3. Resubmit the job

---

### Issue 3: MultiKueueCluster Shows CONNECTED=False

**Symptom:**
```bash
oc get multikueuecluster
# NAME             CONNECTED
# spoke-cluster1   False
```

**Diagnosis:**
```bash
# Check ManagedServiceAccount
oc get managedserviceaccount -n spoke-cluster1 multikueue

# Check if secret exists
oc get secret -n spoke-cluster1 | grep multikueue
```

**Solutions:**

1. **Check addon status:**
   ```bash
   oc get managedclusteraddon -n spoke-cluster1 multicluster-kueue-manager
   ```

2. **Check cluster proxy addon:**
   ```bash
   oc get managedclusteraddon -n spoke-cluster1 cluster-proxy
   ```

3. **Restart addon agent (if needed):**
   ```bash
   oc delete pod -n open-cluster-management-addon -l app=kueue-addon-controller
   ```

---

### Issue 4: Placement Shows "NoManagedClusterSetBindings"

**Symptom:**
```bash
oc get placement default -n openshift-kueue-operator
# SUCCEEDED   REASON
# False       NoManagedClusterSetBindings
```

**Solution:**
Create ManagedClusterSetBinding:

```bash
cat <<EOF | oc apply -f -
apiVersion: cluster.open-cluster-management.io/v1beta2
kind: ManagedClusterSetBinding
metadata:
  name: global
  namespace: openshift-kueue-operator
spec:
  clusterSet: global
EOF
```

---

### Issue 5: Kueue Operator Installation Fails

**Symptom:**
```
OwnNamespace InstallModeType not supported
```

**Root Cause:**
Kueue Operator requires cluster-wide installation, not namespace-scoped.

**Solution:**
1. Delete existing OperatorGroup:
   ```bash
   oc delete operatorgroup -n openshift-kueue-operator --all
   ```

2. Create cluster-wide OperatorGroup:
   ```bash
   cat <<EOF | oc apply -f -
   apiVersion: operators.coreos.com/v1
   kind: OperatorGroup
   metadata:
     name: openshift-kueue-operator
     namespace: openshift-kueue-operator
   spec: {}
   EOF
   ```

3. Recreate Subscription

---

### Issue 6: Jobs Stuck in "Pending" on Spoke

**Symptom:**
- Job dispatched to spoke
- Pod created but stuck in "Pending"
- Scheduler error: "Insufficient nvidia.com/gpu"

**Diagnosis:**
```bash
# Check pod events
KUBECONFIG=/tmp/spoke-kubeconfig oc describe pod <pod-name> -n default | tail -10

# Check node GPU capacity
KUBECONFIG=/tmp/spoke-kubeconfig oc get nodes -o custom-columns=NAME:.metadata.name,GPU:.status.allocatable.nvidia\\.com/gpu
```

**Solutions:**

1. **Check if GPU nodes exist:**
   ```bash
   KUBECONFIG=/tmp/spoke-kubeconfig oc get nodes -l nvidia.com/gpu.present=true
   ```

2. **Check NFD and GPU Operator:**
   ```bash
   KUBECONFIG=/tmp/spoke-kubeconfig oc get csv -n nvidia-gpu-operator
   ```

3. **Check existing GPU usage:**
   ```bash
   KUBECONFIG=/tmp/spoke-kubeconfig oc get pods -A -o jsonpath='{range .items[*]}{.metadata.name}{" "}{.spec.containers[*].resources.requests.nvidia\.com/gpu}{"\n"}{end}' | grep -v "^$"
   ```

---

## Debugging Commands

### Check Complete MultiKueue Flow

```bash
#!/bin/bash
echo "=== 1. Hub Workloads ==="
oc get workload -n default

echo ""
echo "=== 2. AdmissionChecks ==="
oc get admissioncheck

echo ""
echo "=== 3. MultiKueueConfigs ==="
oc get multikueueconfig -o wide

echo ""
echo "=== 4. MultiKueueClusters ==="
oc get multikueuecluster -o wide

echo ""
echo "=== 5. Placements ==="
oc get placement -n openshift-kueue-operator

echo ""
echo "=== 6. PlacementDecisions ==="
oc get placementdecision -n openshift-kueue-operator

echo ""
echo "=== 7. Spoke ClusterQueues ==="
for cluster in spoke-cluster1 spoke-cluster2; do
  echo "--- $cluster ---"
  KUBECONFIG=/tmp/${cluster}-kubeconfig oc get clusterqueue 2>/dev/null || echo "Cannot access $cluster"
done
```

### Check Kueue Controller Logs

```bash
# Hub Kueue controller
oc logs deployment/kueue-controller-manager -n openshift-kueue-operator --tail=50

# Kueue addon controller
oc logs deployment/kueue-addon-controller -n open-cluster-management-addon --tail=50
```

### Check Workload Status Details

```bash
oc get workload <workload-name> -n default -o yaml | grep -A 50 "status:"
```

---

## Script: Fix All Spoke ClusterQueues

Save as `scripts/fix-spoke-clusterqueues.sh`:

```bash
#!/bin/bash
# Fix spoke ClusterQueues by removing admission checks

SPOKES=("spoke-cluster1" "spoke-cluster2")
KUBECONFIG_DIR="/tmp"

for spoke in "${SPOKES[@]}"; do
  echo "Fixing $spoke..."
  
  KUBECONFIG="${KUBECONFIG_DIR}/${spoke}-kubeconfig"
  
  if [ ! -f "$KUBECONFIG" ]; then
    echo "  Kubeconfig not found: $KUBECONFIG"
    continue
  fi
  
  for cq in cluster-queue gpu-cluster-queue dynamic-gpu-queue; do
    KUBECONFIG="$KUBECONFIG" oc patch clusterqueue "$cq" \
      --type=json \
      -p='[{"op": "remove", "path": "/spec/admissionChecks"}]' 2>/dev/null \
      && echo "  Fixed: $cq" \
      || echo "  Skipped: $cq (not found or already fixed)"
  done
done

echo "Done!"
```

---

## Getting Help

### Resources

- [Kueue Documentation](https://kueue.sigs.k8s.io/)
- [OCM Kueue Addon](https://github.com/open-cluster-management-io/addon-contrib/tree/main/kueue-addon)
- [RHACM Documentation](https://access.redhat.com/documentation/en-us/red_hat_advanced_cluster_management_for_kubernetes)

### Collecting Debug Information

```bash
# Collect debug info
mkdir -p /tmp/kueue-debug

# Hub info
oc get workload,clusterqueue,localqueue,admissioncheck,multikueueconfig,multikueuecluster -A -o yaml > /tmp/kueue-debug/hub-resources.yaml
oc logs deployment/kueue-controller-manager -n openshift-kueue-operator > /tmp/kueue-debug/kueue-controller.log 2>&1
oc logs deployment/kueue-addon-controller -n open-cluster-management-addon > /tmp/kueue-debug/addon-controller.log 2>&1

# Tar it up
tar -czf /tmp/kueue-debug.tar.gz -C /tmp kueue-debug/

echo "Debug info collected: /tmp/kueue-debug.tar.gz"
```
