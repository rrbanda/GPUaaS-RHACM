
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

## Important

After deploying any scenario, always run the workaround script:

```bash
./scripts/fix-spoke-clusterqueues.sh
```

See [Troubleshooting](../docs/99-troubleshooting.md) for details.
