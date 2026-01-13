# Troubleshooting



## Known Issues and Workarounds

### Issue 1: MultiKueueCluster Shows CONNECTED=False

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
  KUBECONFIG=${KUBECONFIG_DIR}/${cluster}-kubeconfig oc get clusterqueue 2>/dev/null || echo "Cannot access $cluster"
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


## Getting Help

### Resources

- [Kueue Documentation](https://kueue.sigs.k8s.io/)
- [OCM Kueue Addon](https://github.com/open-cluster-management-io/addon-contrib/tree/main/kueue-addon)
- [RHACM Documentation](https://access.redhat.com/documentation/en-us/red_hat_advanced_cluster_management_for_kubernetes)

### Collecting Debug Information

```bash
# Collect debug info
mkdir -p ./kueue-debug

# Hub info
oc get workload,clusterqueue,localqueue,admissioncheck,multikueueconfig,multikueuecluster -A -o yaml > ./kueue-debug/hub-resources.yaml
oc logs deployment/kueue-controller-manager -n openshift-kueue-operator > ./kueue-debug/kueue-controller.log 2>&1
oc logs deployment/kueue-addon-controller -n open-cluster-management-addon > ./kueue-debug/addon-controller.log 2>&1

# Tar it up
tar -czf ./kueue-debug.tar.gz -C /tmp kueue-debug/

echo "Debug info collected: ./kueue-debug.tar.gz"
```
