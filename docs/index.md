# GPUaaS with RHACM

**GPU-as-a-Service using MultiKueue and RHACM for Kubernetes-native Job Queueing at Scale**

---

## Overview

This repository provides step-by-step instructions for setting up GPU-as-a-Service (GPUaaS) across multiple OpenShift clusters using:

| Component | Description |
|-----------|-------------|
| **Red Hat Build of Kueue (RHBoK)** | Kubernetes-native job scheduler optimized for batch workloads |
| **MultiKueue** | Extends Kueue functionality into a multi-cluster environment |
| **Red Hat Advanced Cluster Management (RHACM)** | Automates deployment, configuration, and integration of MultiKueue with Placement |

## Demo Environment

This demo uses **3 OpenShift clusters** - 1 hub and 2 spoke clusters:

| Cluster | Role | Hardware | Labels |
|---------|------|----------|--------|
| **Hub** | RHACM Hub + Kueue Manager | CPU only | - |
| **spoke-cluster1** | Worker | **NVIDIA L4 GPUs** | `accelerator=nvidia-l4` |
| **spoke-cluster2** | Worker | CPU only | `cluster-type=cpu-only` |

## What You Can Do

As an administrator, you can:

- **Install Kueue add-on for RHACM** - Enable RHBoK on managed clusters automatically
- **Use Placement for MultiKueue** - Connect to spoke clusters and dispatch jobs through MultiKueue
- **Label-based cluster selection** - Select clusters with specific attributes (e.g., `nvidia-l4` GPUs)
- **Dynamic workload scheduling** - Use AddonPlacementScore to select clusters with more available GPU resources

## Quick Start

```bash
# On Hub Cluster - verify prerequisites
oc get multiclusterhub -A                    # RHACM installed?
oc get csv -n openshift-kueue-operator       # Kueue Operator installed?
oc get managedclusters                       # Managed clusters available?
```

Then follow the **Getting Started** guides in the navigation above.

## Status

!!! info "Developer Preview"
    This feature is in **Developer Preview** in RHACM 2.15.

| Component | Version |
|-----------|---------|
| RHACM | 2.15 |
| OpenShift | 4.18 |
| Kueue Operator | 1.2.x |
| GPU | NVIDIA L4 |
