---
title: "Installation"
excerpt: "Step-by-step setup guide"
permalink: /installation/
---


## Overview

This guide covers installing the Kueue + RHACM MultiKueue integration on OpenShift clusters.

## Step 1: Install Kueue Operator on Hub

### Option A: Via OpenShift Console

1. Navigate to **Operators → OperatorHub**
2. Search for "Kueue"
3. Select **Red Hat Build of Kueue** (RHBoK)
4. Install with defaults (namespace: `openshift-kueue-operator`)

### Option B: Via CLI

```bash
# Create namespace
oc create namespace openshift-kueue-operator

# Create OperatorGroup (cluster-wide)
cat <<EOF | oc apply -f -
apiVersion: operators.coreos.com/v1
kind: OperatorGroup
metadata:
  name: openshift-kueue-operator
  namespace: openshift-kueue-operator
spec: {}
EOF

# Create Subscription
cat <<EOF | oc apply -f -
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: kueue-operator
  namespace: openshift-kueue-operator
spec:
  channel: stable-v1.2
  name: kueue-operator
  source: redhat-operators
  sourceNamespace: openshift-marketplace
EOF

# Wait for operator
oc wait --for=condition=Ready pod -l control-plane=controller-manager \
  -n openshift-kueue-operator --timeout=120s
```

## Step 2: Create Kueue CR

```bash
cat <<EOF | oc apply -f -
apiVersion: kueue.openshift.io/v1alpha1
kind: Kueue
metadata:
  name: cluster
  namespace: openshift-kueue-operator
spec:
  managementState: Managed
  config:
    integrations:
      frameworks:
        - BatchJob
EOF

# Verify
oc get kueue cluster -n openshift-kueue-operator
```

## Step 3: Install Kueue Addon for RHACM

### Install via Helm

```bash
# Add OCM Helm repo
helm repo add ocm https://open-cluster-management.io/helm-charts
helm repo update

# Create values file for OpenShift
cat <<EOF > kueue-addon-values.yaml
kueue:
  namespace: "openshift-kueue-operator"

skipClusterSetBinding: true

placement:
  name: default

installKueueViaOperator: true

kueueOperator:
  name: kueue-operator
  namespace: openshift-kueue-operator
  operatorGroupName: openshift-kueue-operator
  channel: stable-v1.2
  source: redhat-operators
  sourceNamespace: openshift-marketplace
  startingCSV: kueue-operator.v1.2.0
EOF

# Install
helm install kueue-addon ocm/kueue-addon \
  -n open-cluster-management-addon \
  --create-namespace \
  -f kueue-addon-values.yaml
```

### Verify Addon Installation

```bash
# Check addon manager
oc get pods -n open-cluster-management-addon | grep kueue

# Check ClusterManagementAddon
oc get clustermanagementaddon multicluster-kueue-manager

# Check addon on managed clusters
oc get managedclusteraddons -A | grep kueue
```

## Step 4: Create ManagedClusterSetBinding

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

## Step 5: Verify MultiKueue Setup

```bash
# Check MultiKueueClusters are connected
oc get multikueuecluster -o wide

# Expected output:
# NAME             CONNECTED   AGE
# spoke-cluster1   True        10m
# spoke-cluster2   True        5m

# Check MultiKueueConfig was created
oc get multikueueconfig

# Check AdmissionChecks
oc get admissioncheck
```

## Step 6: Apply Workaround for Spoke ClusterQueues

> ⚠️ **Important:** Due to a known issue, spoke ClusterQueues incorrectly have admission checks. Remove them:

```bash
# For each spoke cluster
for cluster in spoke-cluster1 spoke-cluster2; do
  echo "Fixing $cluster..."
  
  # Get kubeconfig for spoke (if using managed service account)
  # Or login directly to spoke cluster
  
  oc patch clusterqueue cluster-queue \
    --type=json \
    -p='[{"op": "remove", "path": "/spec/admissionChecks"}]'
done
```

Or use the provided script:

```bash
./scripts/fix-spoke-clusterqueues.sh
```

## Verification Checklist

| Component | Command | Expected |
|-----------|---------|----------|
| Kueue Operator | `oc get csv -n openshift-kueue-operator` | Succeeded |
| Kueue CR | `oc get kueue cluster` | Available |
| Addon Manager | `oc get pods -n open-cluster-management-addon` | Running |
| MultiKueueClusters | `oc get multikueuecluster` | All CONNECTED=True |
| AdmissionChecks | `oc get admissioncheck` | All Active |
| ClusterQueues (hub) | `oc get clusterqueue` | Has admissionChecks |
| ClusterQueues (spoke) | `oc get clusterqueue` | NO admissionChecks |

## Next Steps

- [Demo Scenario 1: Basic MultiKueue](../scenarios/scenario1-basic/)
- [Demo Scenario 2: Label-Based Selection](../scenarios/scenario2-label-based/)
- [Demo Scenario 3: Dynamic Score-Based Selection](../scenarios/scenario3-dynamic-score/)
