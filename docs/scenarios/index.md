# Demo Scenarios

Choose a scenario based on your use case:

| Scenario | Description | Difficulty |
|----------|-------------|------------|
| [**Scenario 1: Basic**](scenario1-basic/) | Dispatch to all clusters | ⭐ Beginner |
| [**Scenario 2: Label-Based**](scenario2-label-based/) | Target specific GPU types | ⭐⭐ Intermediate |
| [**Scenario 3: Dynamic Score**](scenario3-dynamic-score/) | Real-time GPU availability | ⭐⭐⭐ Advanced |

## Quick Comparison

```
Scenario 1 (Basic)          → Jobs go to ANY available cluster
Scenario 2 (Label-Based)    → Jobs go to clusters with specific GPU labels
Scenario 3 (Dynamic Score)  → Jobs go to cluster with HIGHEST GPU availability
```

## Prerequisites

Before running any scenario:

1. Complete the [Installation Guide](../02-installation.md)
2. Verify MultiKueueClusters are connected: `oc get multikueuecluster`
3. Ensure spoke clusters have the kueue-addon installed

!!! warning "Queue Naming"
    The ClusterQueue and LocalQueue names (`cluster-queue`, `user-queue`) must match what the kueue-addon syncs to spoke clusters. See the [Installation Guide](../02-installation.md) for details.
