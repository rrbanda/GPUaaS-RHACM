# GPUaaS with RHACM

**GPU-as-a-Service using MultiKueue and Red Hat Advanced Cluster Management**

[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://rrbanda.github.io/GPUaaS-RHACM/)
[![Interactive Demo](https://img.shields.io/badge/demo-Interactive-red)](https://rrbanda.github.io/GPUaaS-RHACM/demo/)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](LICENSE)

---

## What is This?

This repository demonstrates how to build a **GPU-as-a-Service (GPUaaS)** platform across multiple OpenShift clusters using:

| Component | Purpose |
|-----------|---------|
| **Red Hat Build of Kueue (RHBoK)** | Kubernetes-native job scheduler for batch/AI workloads |
| **MultiKueue** | Extends Kueue to dispatch jobs across multiple clusters |
| **RHACM** | Automates MultiKueue setup and provides intelligent cluster selection |

### The Problem It Solves

| Persona | Pain Point | Solution |
|---------|------------|----------|
| **Data Scientist** | "Which cluster has GPUs? How do I submit there?" | Submit to one hub queue → automatically routed |
| **Platform Admin** | "GPUs are underutilized, config is complex" | Centralized management, auto-configuration |

---

## Demo Environment

| Cluster | Role | Hardware | Label |
|---------|------|----------|-------|
| **Hub** | RHACM + Kueue Manager | CPU | — |
| **spoke-cluster1** | GPU Worker | NVIDIA L4 × 4 | `accelerator=nvidia-l4` |
| **spoke-cluster2** | CPU Worker | CPU only | `cluster-type=cpu-only` |

---

## 🎮 Interactive Demo

Experience the architecture and job flow visually:

**[▶ Launch Interactive Demo](https://rrbanda.github.io/GPUaaS-RHACM/demo/)**

Features:
- 🏗️ **Progressive Architecture** - See how GPU-as-a-Service is built, step by step
- 👥 **Persona Views** - Toggle between Hub Admin and Data Scientist perspectives  
- ⚡ **Job Flow Simulator** - Click to simulate jobs routing to worker clusters

---

## 📚 Documentation

**Full documentation:** [https://rrbanda.github.io/GPUaaS-RHACM/](https://rrbanda.github.io/GPUaaS-RHACM/)

| Guide | Description |
|-------|-------------|
| [Concepts](https://rrbanda.github.io/GPUaaS-RHACM/concepts/) | Kueue, MultiKueue, and RHACM explained |
| [Prerequisites](https://rrbanda.github.io/GPUaaS-RHACM/00-prerequisites/) | What you need before starting |
| [Architecture](https://rrbanda.github.io/GPUaaS-RHACM/01-architecture/) | Technical deep dive |
| [Installation](https://rrbanda.github.io/GPUaaS-RHACM/02-installation/) | Step-by-step setup |

---

## 🎯 Demo Scenarios

| Scenario | What It Does | Difficulty |
|----------|--------------|------------|
| [**Basic MultiKueue**](https://rrbanda.github.io/GPUaaS-RHACM/scenarios/scenario1-basic/) | Submit to hub → auto-dispatch to any cluster | ⭐ Beginner |
| [**Label-Based Selection**](https://rrbanda.github.io/GPUaaS-RHACM/scenarios/scenario2-label-based/) | Route GPU jobs to GPU clusters only | ⭐⭐ Intermediate |
| [**Dynamic Score-Based**](https://rrbanda.github.io/GPUaaS-RHACM/scenarios/scenario3-dynamic-score/) | Route to cluster with most available GPUs | ⭐⭐⭐ Advanced |

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/rrbanda/GPUaaS-RHACM.git
cd GPUaaS-RHACM

# 2. Verify your hub cluster has RHACM and Kueue
oc get multiclusterhub -A
oc get csv -n openshift-kueue-operator

# 3. Check managed clusters
oc get managedclusters

# 4. Follow the Installation guide
# https://rrbanda.github.io/GPUaaS-RHACM/02-installation/
```

---

## Repository Structure

```
GPUaaS-RHACM/
├── docs/
│   ├── index.md                    # Landing page
│   ├── concepts.md                 # Core concepts
│   ├── 00-prerequisites.md         # Requirements
│   ├── 01-architecture.md          # Architecture
│   ├── 02-installation.md          # Setup guide
│   ├── 99-troubleshooting.md       # Known issues
│   ├── assets/                     # Images and diagrams
│   └── scenarios/
│       ├── scenario1-basic/        # Basic MultiKueue demo
│       ├── scenario2-label-based/  # Label-based selection
│       └── scenario3-dynamic-score/# Score-based selection
├── mkdocs.yml                      # MkDocs configuration
└── README.md                       # This file
```

---

## Status

> **Developer Preview** in RHACM 2.15

| Component | Version |
|-----------|---------|
| RHACM | 2.15 |
| OpenShift | 4.18 |
| Kueue | 1.2.x |

---

## License

[Apache License 2.0](LICENSE)
