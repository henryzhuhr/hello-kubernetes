---
outline: deep
---

# 环境准备

## docker 安装
## minikube 安装

安装 [minikube](https://minikube.sigs.k8s.io/docs/)
::: code-group
```shell [MacOS]
brew install minikube
```
:::

使用以下命令启动 minikube ：

```shell
minikube start
# 😄  Darwin 15.0 (arm64) 上的 minikube v1.33.1
# ✨  根据现有的配置文件使用 docker 驱动程序
# 👍  Starting "minikube" primary control-plane node in "minikube" cluster
# 🚜  Pulling base image v0.0.44 ...
# 🔄  Restarting existing docker container for "minikube" ...
# 🐳  正在 Docker 26.1.1 中准备 Kubernetes v1.30.0…
# 🔎  正在验证 Kubernetes 组件...
#     ▪ 正在使用镜像 gcr.io/k8s-minikube/storage-provisioner:v5
# 🌟  启用插件： storage-provisioner, default-storageclass
# 🏄  完成！kubectl 现在已配置，默认使用"minikube"集群和"default"命名空间
```

## kubectl 安装

每次使用 `kubectl` 前确保 `minikube` 已经启动如果没有启动，使用命令查看集群状态

```shell
kubectl cluster-info 
# Kubernetes control plane is running at https://127.0.0.1:52187
# CoreDNS is running at https://127.0.0.1:52187/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
```

如果产生报错，则可能是集群没有启动，可以

随后执行上面的命令查看集群状态，如果集群状态正常，则可以使用 `kubectl` 命令进行操作。

## 注册 docker hub 账号登录

