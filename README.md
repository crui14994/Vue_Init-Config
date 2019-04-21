# example

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
1. 
## 五.封装axios；统一管理api


