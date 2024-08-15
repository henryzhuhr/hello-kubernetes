

## Kubernetes Pod

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
