---
path: "/docs/install-with-kurl/upgrading"
date: "2020-07-24"
weight: 17
linktitle: "Upgrading"
title: "Upgrading"
---

To upgrade Kubernetes or an add-on in a kURL cluster, generate a new installer script and run it on the node where the original install was performed.

## Kubernetes

If the install script detects an upgrade of Kubernetes is required, it will first drain and upgrade the main primary where the script is running.
Then if there are any remote primaries to upgrade, the script will drain each sequentially and print out a script that must be run on that node.
The script will detect when Kubernetes has been upgraded on the remote node and proceed to drain the next node.
After upgrading all primaries the same operation will be performed sequentially on all remote secondaries.

## Container Runtimes

Existing versions of docker and containerd will never be upgraded by the install script.

## Airgap

Because upgraded components may have pods scheduled on any node in the cluster, images must be pre-loaded on every node prior to running the updated installer.
After downloading and extracting the airgap bundle to every node in the cluster, run this script to ensure all required images are available:

```bash
cat tasks.sh load-images
```