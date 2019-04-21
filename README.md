# vue中关于router，vuex，axios，api，utils的一些常用配置

### 一.项目介绍
> github地址：https://github.com/crui14994/Vue_Init-Config

本项目主要是vue2.0项目开发中的一些思路，主要包括：

1. 使用脚手架初始化项目
2. 将需要用到的工具函数新建一个utils文件夹统一管理
3. 使用router的一些优化
4. 使用Vuex的一些优化
5. 封装axios；统一管理api

``` bash
# 在项目目录和server目录分别进行安装依赖
git clone git@github.com:crui14994/Vue_Init-Config.git

# 在项目目录和server目录分别进行安装依赖
cnpm install

# 运行项目
npm run dev

```

## 一.使用脚手架初始化项目
```bash
# 安装cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 用cnpm 命令安装vue-cli了，在命令行输入下面的命令：
cnpm install vue-cli -g

# 用vue init命令来初始化项目
vue init webpack-simple Vue_Init-Config

# 在项目目录和server目录分别进行安装依赖
cnpm install

# 运行项目
npm run dev
```


## 二.将需要用到的工具函数新建一个utils文件夹统一管理
   1. 在根目录新建一个utils文件夹
   2. 在文件夹下新建index.js用于几种管理工具函数
        ```
        export default {
            storage: require('./storage.js').default, //本地存储localStorage
            formatDate: require('./formatDate.js').default,  //日期格式化
        }
        ```
   3. 编写工具函数导出右index.js导入

       formatDate.js
       ```
            /**
        * 格式化日期
        * @param  {string} str 需要格式化的样子
        * @param  {String|Date} day 日期对象或者日期字符串
        * @return  {String}
        * @template  formatDate('YYYY年mm月dd日hh小时ff分钟ss秒 星期w','2017/1/1 12:13:14') 返回：2017年01月01日12小时13分钟14秒 星期日;
        */
        function formatDate (str, day) {
            let d, arr
            let type = Object.prototype.toString.call(day)
            if (type === '[object Date]') {
            d = day
            } else if (type === '[object String' && (arr = day.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/))) {
            arr = arr.slice(0, arr[4] ? 7 : 4)
            arr[2] = arr[2] - 1
            d = new (Function.prototype.bind.apply(Date, arr))()
            } else {
            return ''
            }
            const obj = {
            'yyyy': d.getFullYear(),
            'yy': ('' + d.getFullYear()).slice(-2),
            'm': d.getMonth() + 1,
            'mm': ('0' + (d.getMonth() + 1)).slice(-2),
            'd': d.getDate(),
            'dd': ('0' + d.getDate()).slice(-2),
            'h': d.getHours(),
            'hh': ('0' + d.getHours()).slice(-2),
            'f': d.getMinutes(),
            'ff': ('0' + d.getMinutes()).slice(-2),
            's': d.getSeconds(),
            'ss': ('0' + d.getSeconds()).slice(-2),
            'w': ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
            }
            return ('' + str).replace(/([a-z]+)/ig, function (k) {
            return obj[k.toLowerCase()] || ''
            })
        }

        export default formatDate
        ```
        storage.js
        ```
        // 本地存储localStorage
        class Storage {
            constructor () {
                this.storage = window.localStorage
                this.prefix = 'mytest_' //给key家一个前缀
            }

            set (key, value, fun) {
                if (typeof value !== 'string') {
                try {
                    value = JSON.stringify(value)
                } catch (e) {
                }
                }
                this.storage.setItem(this.prefix + key, value)
                typeof fun === 'function' && fun()
            }

            get (key, fun) {
                let value = this.storage.getItem(this.prefix + key)
                try {
                value = JSON.parse(value)
                if (value === null) value = {}
                } catch (e) {
                value = {}
                }
                return typeof fun === 'function' ? fun.call(this, value) : value
            }

            remove (key) {
                this.storage.removeItem(this.prefix + key)
            }

            cle() {
                this.storage.clear();
            }
        }

        export default new Storage()

        ```
   4. 在main.js中把通用方法挂载到Vue原型上在组件中只需使用this即可使用相关的函数
        ```
        import utils from "./utils/index" //导入工具函数

        // 把通用方法挂载到Vue原型上
        Vue.prototype.$formatDate = utils.formatDate
        Vue.prototype.$storage = utils.storage
        ```
    5. 在组件中使用
        ```
        computed:{
            dateNow(){
                return this.$formatDate('YYYY年mm月dd日hh小时ff分钟ss秒 星期w',new Date())
            }
        }
        ```
## 三.使用vue-router的一些优化（代码中只提供思路；没有具体实现）
1. 在根目录新建一个router文件夹；安装vue-router
    ```
    cnpm install vue-router --save-dev
    ```
2. 在文件夹下新建index.js和route.js两个文件
    > 在index.js中对路由进行配置；通过全局路由钩子函数进行一些如loading和给每个页面设置title的操作

    > 在route.js中对各个路劲进行配置（具体参考源码）
    ```
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import { routers } from './route';
    // import { Loading } from 'element-ui';
    // import { setTitle } from 'src/assets/js/util';

    Vue.use(VueRouter);

    const routerConfig = {
    mode: 'history',
    linkActiveClass: 'active',
    routes: routers
    };

    const router = new VueRouter(routerConfig);

    // let loading;
    // router.beforeEach((to, form, next) => {
    //   loading = Loading.service({
    //     // fullscreen: true,
    //     target: '.content-wrapper',
    //     text: '跳转中...'
    //   });
    
    //   // 设置window.document.title 的名称
    //   setTitle(to.meta.title);
    
    //   if (!to.matched.length) {
    //     next({
    //       path: '/error/404',
    //       replace: true
    //     });
    //   } else {
    //     next();
    //   }
    // });

    // router.afterEach((to, from) => {
    //   // 解决某些情况下loading无法关闭的情况
    //   setTimeout(() => {
    //     loading.close();
    //   }, 0)
    // });


    export default router;

    ```

3. 在main.js中引入router
    ```
    import router from './router/index';
    ```

## 四.使用Vuex的一些优化
1. 在根目录新建一个store文件夹；安装vue-router
    ```
    cnpm install  vuex --save
    ```
2. 在文件夹下新建index.js和user.js两个文件
    > 在index.js引入我们的vue和vuex
    > 在user.js中定义user需要使用到的状态
    ```
    //index.js
    import Vue from 'vue';
    import Vuex from 'vuex';
    import user from './user';
    Vue.use(Vuex);

    export default new Vuex.Store({
    modules: {
        user
    }
    });
    ```
    ```
    //user.js
    import utils from "./../utils/index";

    const state = {
    //token
    token: utils.storage.get("token")
    };
    const mutations = {
    setToken(state, data) {
        state.token = data;
    }
    };
    export default {
    state,
    mutations
    };
    ```


3. 在main.js中引入router
    ```
    //sotre
    import store from "./store/index";
    ```

## 五.封装axios；统一管理api
1. 在utils下新建axios.js文件
    ```
    import axios from 'axios'
    // import { Message } from 'element-ui'
    //sotre
    import store from "./../store/index";

    import qs from 'qs' // 序列化请求数据，视服务端的要求

    // 创建axios实例
    const service = axios.create({
        //这里baseurl就是刚开始配置的开发环境和线上环境地址，webpack会自动读取无需手动再改
        baseURL: process.env.BASE_URL, //baseurl
        timeout: 5000 // 请求超时时间
    })

    // request拦截器
    service.interceptors.request.use(config => {
        // Tip: 1
        // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
        
        // Tip: 2 
        // 带上 token , 可以结合 vuex 或者重 localStorage
        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        // } else {
        //     // 重定向到登录页面    
        // }

        // Tip: 3
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method.toLocaleLowerCase() === 'post'
            || config.method.toLocaleLowerCase() === 'put'
            || config.method.toLocaleLowerCase() === 'delete') {

            config.data = qs.stringify(config.data)
        }
        return config
    }, error => {
        // 请求错误时做些事(接口错误、超时等)
        // Tip: 4
        // 关闭loadding

        console.log('request:', error);
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
    })

    // respone拦截器
    service.interceptors.response.use(
        response => response,
        /**
        * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
        * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
        */
        //  const res = response.data;
        //     if (res.code !== 20000) {
        //       Message({
        //         message: res.message,
        //         type: 'error',
        //         duration: 5 * 1000
        //       });
        //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
        //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //           confirmButtonText: '重新登录',
        //           cancelButtonText: '取消',
        //           type: 'warning'
        //         }).then(() => {
        //           store.dispatch('FedLogOut').then(() => {
        //             location.reload();// 为了重新实例化vue-router对象 避免bug
        //           });
        //         })
        //       }
        //       return Promise.reject('error');
        //     } else {
        //       return response.data;
        //     }
        error => {
            console.log('err' + error)// for debug
            // Message({
            //     message: error.message,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
            return Promise.reject(error)
        })

    export default service

    ```
2. 在src下新建目录api和user.js文件
   ```
    import service from "./../utils/axios";

    export function mock(apiRouter) {
    return service({
        url: "https://easy-mock.com/mock/5c9c8e9ba0feb92705bf12b7/example/"+apiRouter,
        method: "get",
    });
    }
   ```

3. 在组件中的使用
    ```
    import { mock } from "./api/user";
    ```
    ```
    created() {
        mock("mock").then(response => {
        this.reponseData = response.data;
        });
    }
  ```
