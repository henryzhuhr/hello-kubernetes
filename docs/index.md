---
# https://vitepress.dev/reference/default-theme-home-page
outline: deep
# layout: home

# hero:
#   name: "Hello Kubernetes"
#   text: "kubernetes Learning Log"
  # tagline: My great project tagline
#   actions:
#     - theme: brand
#       text: Markdown Examples
#       link: /markdown-examples
#     - theme: alt
#       text: API Examples
#       link: /api-examples

# features:
#   - title: Feature A
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---





## Kubernetes Hello World

Pod 是我们将要创建的第一个 k8s 资源，也是可以在 Kubernetes 中创建和管理的、最小的可部署的计算单元。在了解 `pod` 和 `container` 的区别之前，我们可以先创建一个简单的 pod 试试，

创建一个 `nginx.yaml` 文件，内容如下：

```yaml
# nginx.yaml
apiVersion: v1    # 指定API版本
kind: Pod         # 指定资源类型
metadata:
  name: nginx-pod # 指定Pod的名称
spec:
  containers:   # 容器列表
    - name: nginx-container # 容器名称
      image: nginx          # 容器镜像
```

通过执行 `kubectl apply` 命令来创建 Pod，接着通过 `kubectl get pods` 来查看 pod 是否正常启动，最后通过 `kubectl port-forward` 命令将 pod 默认的 `80` 端口映射到本机的 `4000` 端口，通过「浏览器」或「打开终端窗使用口 curl 」访问 `localhost:4000`

```shell
kubectl apply -f nginx.yaml # 创建 Pod
# pod/nginx-pod created

kubectl get pods    # 查看 Pod 状态，此时可能还在创建中
# NAME        READY   STATUS              RESTARTS   AGE
# nginx-pod   0/1     ContainerCreating   0          4s
kubectl get pods    # 查看 Pod 状态，创建完成
# NAME        READY   STATUS    RESTARTS   AGE
# nginx-pod   1/1     Running   0          62s

kubectl port-forward nginx-pod 4000:80  # 将 Pod 的 80 端口映射到本地的 4000 端口
# Forwarding from 127.0.0.1:4000 -> 80
# Forwarding from [::1]:4000 -> 80
```

可以通过 `kubectl exec -it` 命令进入 Pod 内容器的终端，并配置 nginx 的默认页面，最后通过「浏览器」或「打开终端窗使用口 curl 」访问 `localhost:4000`

```shell
kubectl exec -it nginx-pod -- /bin/bash
# kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
```

```shell
# 容器内终端
# root@nginx-pod:/#
echo "hello kubernetes by nginx!" > /usr/share/nginx/html/index.html
kubectl port-forward nginx-pod 4000:80
exit
```

## Helm 包管理

<!-- 教程中提到的所有资源，包括用 pod, deployment, service, ingress, configmap,secret 所有资源来部署一套完整的 hellok8s 服务的话，难道需要一个一个的 kubectl apply -f 来创建吗？如果换一个 namespace，或者说换一套 kubernetes 集群部署的话，又要重复性的操作创建的过程吗？ -->


<!-- 我们平常使用操作系统时，需要安装一个应用的话，可以直接使用 apt 或者 brew 来直接安装，而不需要关心这个应用需要哪些依赖，哪些配置。在使用 kubernetes 安装应用服务 hellok8s 时，我们自然也希望能够一个命令就安装完成，而提供这个能力的，就是 CNCF 的毕业项目 Helm。 -->


## 流程
### 业务升级流程


做一些环境变量
```shell
export NAMESPACE="xxx"     # 命名空间 `kubectl get ns` 获取
export REPO_NAME="xxx"     # 仓库名   `helm repo list` 获取
export CHART_NAME="xxx"    # chart 包名
export CHART_VERSION="xxx" # chart 版本
```

```shell
function INFO { echo -e "  - [INFO] \033[00;32m${$1}\033[0m"; }
INFO "NAMESPACE:  ${NAMESPACE}${DEFAULT}"
INFO "REPO_NAME:  ${REPO_NAME}${DEFAULT}"
INFO "CHART_NAME: ${CHART_NAME}${DEFAULT}"
```

获取 helm 包

```shell
helm repo add ${REPO_NAME} <repo-url>  # 添加 helm 仓库
helm repo list                        # 查看 helm 仓库列表
helm repo update                      # 更新 helm 仓库
```

下载 helm 包（可指定版本）
```shell
helm pull ${REPO_NAME}/${CHART_NAME} [--version ${CHART_VERSION} ]
```

解压并进入 helm 包目录
```shell
tar -xvf ${CHART_NAME}.tgz
cd ${CHART_NAME}
```

查看在线的 pod
```shell
kubectl get pods -n ${NAMESPACE}
kubectl get pods -n ${NAMESPACE} | grep ${CHART_NAME}
# 记录下 pod 的 id
```

获取在线 pod 的配置文件，保存在当前目录
```shell
POD_ID="xxxx" #
helm get values ${CHART_NAME} -a -n ${NAMESPACE} > ${CHART_NAME}.values.yaml
```

使用保存的配置文件，更新 helm 包
```shell
# helm upgrade [RELEASE] [CHART] [VERSION] [flags]
helm upgrade ${CHART_NAME} . \
  -n ${NAMESPACE} \
  -f ${CHART_NAME}.values.yaml
```

查看更新后的 pod
```shell
kubectl get pods -n ${NAMESPACE} | grep ${CHART_NAME}
```

如果产生报错，需要根据日志信息进行排查，可以通过 `kubectl logs` 命令查看 pod 的日志信息

```shell
POD_ID="xxxx" # id 是新 pod 的 id
kubectl logs ${CHART_NAME}-${POD_ID} -n ${NAMESPACE}
```


## 资料

- [Kubernetes Tutorials ｜ k8s 教程](https://github.com/guangzhengli/k8s-tutorials), [Online Pages](https://k8s-tutorials.pages.dev)