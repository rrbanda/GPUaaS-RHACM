#!/bin/bash
# fix-spoke-clusterqueues.sh
# Workaround script to remove admission checks from spoke ClusterQueues
#
# The RHACM kueue-addon incorrectly deploys hub's ClusterQueue spec
# (including admission checks) to spoke clusters. This script fixes that.

set -e

# Configuration
KUBECONFIG_DIR="${KUBECONFIG_DIR:-/tmp}"
SPOKE_CLUSTERS="${SPOKE_CLUSTERS:-spoke-cluster1 spoke-cluster2}"
CLUSTER_QUEUES="${CLUSTER_QUEUES:-cluster-queue gpu-cluster-queue dynamic-gpu-queue}"

echo "=== Fixing Spoke ClusterQueues ==="
echo "Kubeconfig dir: $KUBECONFIG_DIR"
echo "Spoke clusters: $SPOKE_CLUSTERS"
echo "ClusterQueues: $CLUSTER_QUEUES"
echo ""

for spoke in $SPOKE_CLUSTERS; do
  echo "--- Processing $spoke ---"
  
  # Try multiple kubeconfig naming conventions
  KUBECONFIG=""
  for pattern in "${spoke}-kubeconfig" "${spoke}.kubeconfig" "kubeconfig-${spoke}"; do
    if [ -f "${KUBECONFIG_DIR}/${pattern}" ]; then
      KUBECONFIG="${KUBECONFIG_DIR}/${pattern}"
      break
    fi
  done
  
  if [ -z "$KUBECONFIG" ]; then
    echo "  ⚠️  Kubeconfig not found for $spoke"
    echo "  Tried: ${spoke}-kubeconfig, ${spoke}.kubeconfig, kubeconfig-${spoke}"
    echo "  Skipping..."
    continue
  fi
  
  echo "  Using: $KUBECONFIG"
  
  # Test connection
  if ! KUBECONFIG="$KUBECONFIG" oc get nodes &>/dev/null; then
    echo "  ⚠️  Cannot connect to $spoke"
    continue
  fi
  
  for cq in $CLUSTER_QUEUES; do
    if KUBECONFIG="$KUBECONFIG" oc get clusterqueue "$cq" &>/dev/null; then
      # Check if it has admission checks
      if KUBECONFIG="$KUBECONFIG" oc get clusterqueue "$cq" -o jsonpath='{.spec.admissionChecks}' | grep -q "\["; then
        KUBECONFIG="$KUBECONFIG" oc patch clusterqueue "$cq" \
          --type=json \
          -p='[{"op": "remove", "path": "/spec/admissionChecks"}]'
        echo "  ✓ Fixed: $cq"
      else
        echo "  ✓ OK: $cq (no admission checks)"
      fi
    else
      echo "  - Skipped: $cq (not found)"
    fi
  done
done

echo ""
echo "=== Done ==="
echo ""
echo "Note: The addon may overwrite these changes on its next reconciliation."
echo "You may need to re-run this script after addon updates."
