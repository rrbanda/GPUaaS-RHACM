---
layout: default
title: Prerequisites
nav_order: 3
description: "What you need before starting"
---


## Required Components

### 1. Hub Cluster Requirements

| Component | Version | Status Check Command |
|-----------|---------|---------------------|
| OpenShift | 4.16+ | `oc version` |
| RHACM (MultiClusterHub) | 2.15+ | `oc get multiclusterhub -A` |
| Kueue Operator (RHBoK) | 1.2+ | `oc get csv -n openshift-kueue-operator` |
| Kueue Addon | - | `oc get clustermanagementaddon multicluster-kueue-manager` |

### 2. Managed Cluster Requirements

| Component | Version | Notes |
|-----------|---------|-------|
| OpenShift | 4.14+ | Any managed cluster |
| Kueue Operator | Auto-installed | Installed by RHACM addon |
| GPU Support (optional) | - | For GPU workloads |

### 3. Networking

- Hub cluster must be able to reach managed cluster API servers
- Managed clusters must be able to reach hub cluster API server
- If using proxy, ensure proper configuration

## Cluster Setup

### Current Environment

| Cluster | Role | URL | GPU | Labels |
|---------|------|-----|-----|--------|
| cluster-75hkb | Hub | api.cluster-75hkb.dynamic.redhatworkshops.io:6443 | None | - |
| spoke-cluster1 | Spoke (GPU) | api.ocp.fc9th.sandbox2082.opentlc.com:6443 | NVIDIA L4 | `accelerator=nvidia-l4`, `cluster-type=gpu` |
| spoke-cluster2 | Spoke (CPU) | api.cluster-7g89k.dynamic.redhatworkshops.io:6443 | None | `cluster-type=cpu-only` |

## Verification Commands

### Check Hub Cluster

```bash
# Login to hub
oc login --server=https://api.cluster-75hkb.dynamic.redhatworkshops.io:6443

# Verify RHACM
oc get multiclusterhub -A
oc get managedclusters

# Verify Kueue Operator
oc get csv -n openshift-kueue-operator | grep kueue

# Verify Kueue Addon
oc get clustermanagementaddon multicluster-kueue-manager

# Verify MultiKueue connectivity
oc get multikueuecluster -o wide
```

### Check Managed Clusters

```bash
# Check addon status
oc get managedclusteraddons -A | grep kueue

# Check Kueue on spoke
oc get clusterqueue
oc get localqueue -A
```

## Environment Setup

For commands that need to run on spoke clusters, set up kubeconfig files:

```bash
# Export kubeconfig paths for spoke clusters
export SPOKE_KUBECONFIG=~/.kube/spoke-cluster1-config
export SPOKE2_KUBECONFIG=~/.kube/spoke-cluster2-config

# Generate kubeconfig for spoke-cluster1 (GPU cluster)
oc login --server=https://api.ocp.fc9th.sandbox2082.opentlc.com:6443 \
  --kubeconfig=$SPOKE_KUBECONFIG

# Generate kubeconfig for spoke-cluster2 (CPU cluster)  
oc login --server=https://api.cluster-7g89k.dynamic.redhatworkshops.io:6443 \
  --kubeconfig=$SPOKE2_KUBECONFIG

# Verify access
KUBECONFIG=$SPOKE_KUBECONFIG oc get nodes
KUBECONFIG=$SPOKE2_KUBECONFIG oc get nodes
```

> **Tip:** Add these exports to your `~/.bashrc` or `~/.zshrc` for persistence.

## Quick Verification Script

```bash
#!/bin/bash
echo "=== Hub Cluster Verification ==="
echo "RHACM:" && oc get multiclusterhub -A -o jsonpath='{.items[0].status.phase}'
echo ""
echo "Managed Clusters:"
oc get managedclusters -o custom-columns=NAME:.metadata.name,AVAILABLE:.status.conditions[0].status

echo ""
echo "Kueue Operator:" && oc get csv -n openshift-kueue-operator -o jsonpath='{.items[0].spec.version}'

echo ""
echo "Kueue Addon:" && oc get clustermanagementaddon multicluster-kueue-manager -o jsonpath='{.metadata.name}'

echo ""
echo "MultiKueue Clusters:"
oc get multikueuecluster -o custom-columns=NAME:.metadata.name,CONNECTED:.status.conditions[0].status

echo ""
echo "=== All Prerequisites Met ==="
```

## Common Issues

### Issue: Kueue Addon not deploying to managed cluster

**Symptom:** `oc get managedclusteraddons -n <cluster> multicluster-kueue-manager` shows no resource

**Solution:** Ensure the Kueue addon is installed and the cluster is in the correct ManagedClusterSet:

```bash
# Check if addon exists
oc get clustermanagementaddon multicluster-kueue-manager

# Check cluster set binding
oc get managedclustersetbinding -n openshift-kueue-operator
```

### Issue: MultiKueueCluster shows CONNECTED=False

**Symptom:** `oc get multikueuecluster` shows False

**Solution:** Check managed service account and secrets:

```bash
# Check managed service account
oc get managedserviceaccount -n <cluster-name> multikueue

# Check secret exists
oc get secret -n <cluster-name> | grep multikueue
```

## Next Steps

Once prerequisites are verified, proceed to:

1. [Architecture Overview](01-architecture.md)
2. [Installation Guide](02-installation.md)
