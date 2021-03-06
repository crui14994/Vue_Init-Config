# 基于vue-cli@3.0搭建项目并进行配置优化

### 使用vue-cli@3.0搭建

本示例根据vue-cli@2.0项目进一步优化;主要针对项目结构和权限管理进行优化。

注意：运行项目前先运行server

```
npm run server
```

详细说明：[基于vue-cli@3.0搭建管理系统项目并进行配置优化](https://www.jianshu.com/p/b1eed0ea854e)



### 如需查看@2.0版本切换到vuecli@2.0分支或查看文章：

[vue中关于router，vuex，axios，api，utils的一些常用配置](https://www.jianshu.com/p/e2f7942215a4)

---

# 优化记录

## 2019.11.21

#### 1.增加server文件夹使用express简单模拟登陆和获取用户信息接口(因为easy mock不稳定放弃使用)。

#### 2.解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题

原因：在路由中添加了相同的路由。

解决：重写路由的push方法

```js
//在src/router/index.js 里面import Router from 'vue-router'下面写入下面方法即可
/**
* 重写路由的push方法
*/
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
```
