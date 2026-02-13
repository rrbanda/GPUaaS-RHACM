RHACM & MultiKueue Deployment Requirements
Product Stack Requirements
RHACM: Red Hat Advanced Cluster Management (RHACM) 2.15.0 installed on the hub cluster.

Kueue Operator: Red Hat build of Kueue Operator v1.0.1 installed on the hub cluster.

Must be installed via OLM using the appropriate channel (e.g., stable-v1.0).

Kueue CRDs must be available and healthy.

Kueue Addon: Kueue Addon Helm chart must be accessible.

Compatibility: MultiKueue components must be supported with the selected RHACM version.

Required RHACM Addons:

Cluster Permission Addon

Managed Service Account Addon

Cluster Proxy Addon (Required for the recommended connectivity mode)

Customer & Environment Requirements
Cluster Infrastructure:

Hub cluster provisioned and operational.

One or more managed (spoke) clusters registered with RHACM, connected, and healthy.

GPU Resources: GPU nodes available on managed clusters (if GPU workloads are planned).

Connectivity Model: One of the following must be selected and configured:

Direct connection

Cluster proxy (Recommended)

Cluster proxy with impersonation

Networking & Security:

Network configuration must allow hub–spoke communication based on the selected model.

All proxy, firewall, or certificate requirements validated.

RBAC and security policies must be aligned with cross-cluster operations.

Quick Tip for Implementation
Since Cluster Proxy is the recommended model, ensure the cluster-proxy addon is not only installed but that the ManagedClusterAddon lease is active on all target spoke clusters before attempting to deploy MultiKueue workloads.
