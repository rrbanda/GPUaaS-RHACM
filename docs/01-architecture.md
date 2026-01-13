# Architecture



## High-Level Overview

![Overview](../assets/01-overview-4-steps.png)

## Components

### 1. Red Hat Build of Kueue (RHBoK)

Kueue is a Kubernetes-native job scheduler that improves on the default Kubernetes scheduler by optimizing for batch workloads.

**Key Features:**
- Resource quotas and fair sharing
- Priority-based scheduling
- Preemption support
- Job queueing and admission control

### 2. MultiKueue

MultiKueue extends Kueue functionality into a multi-cluster environment.

**How it works:**
1. Jobs are submitted to the hub cluster
2. Hub's Kueue evaluates admission checks
3. Jobs are dispatched to worker clusters
4. Results are synced back to hub

### 3. RHACM Kueue Addon

The addon automates the deployment and configuration of MultiKueue:

**What it does:**
- Installs Kueue Operator on managed clusters
- Creates MultiKueueConfig from Placement decisions
- Generates MultiKueueCluster resources with kubeconfigs
- Manages secrets and service accounts

## Admission Check Controllers

The RHACM hub runs **two admission check controllers**:

### 1. RHACM Admission Check Controller

- Converts OCM Placement to MultiKueue configuration
- Creates/updates `MultiKueueConfig` based on Placement decisions
- Creates/updates `MultiKueueCluster` resources

### 2. Kueue MultiKueue Admission Check Controller

- Orchestrates job dispatch to worker clusters
- Monitors job status across clusters
- Syncs results back to hub

## Data Flow

### Detailed Architecture

![Detailed Architecture](../assets/03-architecture-detailed.png)

### Workflow Steps

![Workflow](../assets/02-workflow-5-steps.png)

1. **Cluster admin creates Placement** - defines which clusters should receive workloads
2. **RHACM hub runs two admission check controllers** - RHACM controller and MultiKueue controller  
3. **RHACM Admission Check Controller** converts Placement to MultiKueue workload dispatching
4. **RHBoK MultiKueue Admission Check Controller** orchestrates dispatch to specific worker clusters
5. **Jobs are scheduled** with Kueues on RHACM managed clusters based on Placement criteria

## Key Resources

### Hub Cluster Resources

| Resource | Purpose |
|----------|---------|
| `ClusterQueue` | Defines quotas and admission checks |
| `LocalQueue` | Namespace-scoped queue for workloads |
| `AdmissionCheck` | Defines check controllers |
| `MultiKueueConfig` | Lists clusters for MultiKueue |
| `MultiKueueCluster` | Contains kubeconfig for each cluster |
| `Placement` | OCM resource for cluster selection |

### Spoke Cluster Resources

| Resource | Purpose |
|----------|---------|
| `ClusterQueue` | Local queue (NO admission checks) |
| `LocalQueue` | Local namespace queue |
| `Workload` | Represents dispatched job |

## Important: Hub vs Spoke Configuration

**Hub ClusterQueue:**
```yaml
spec:
  admissionChecks:
    - multikueue-demo        # MultiKueue controller
    - multikueue-config-demo # RHACM controller
```

**Spoke ClusterQueue:**
```yaml
spec:
  # NO admissionChecks!
  # Spoke queues should NOT have admission checks
```

## Next Steps

- [Installation Guide](02-installation.md)
- [Demo Scenario 1: Basic MultiKueue](../scenarios/scenario1-basic/)
