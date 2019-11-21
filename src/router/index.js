
import Vue from 'vue'
import Router from 'vue-router'
import { routes, asyncRouterMap } from './route';
import store from '@/store/index'

Vue.use(Router)

const routerConfig = {
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes
};

const router = new Router(routerConfig);


const whiteList = ['/login']// 不重定向白名单

router.beforeEach((to, from, next) => {
  if (store.getters.token) { //判断是否有token
    if (to.path === "/login") {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('getUserInfo').then(res => { // 拉取info
          const roles = res.role;
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to}) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        store.dispatch('getNowRoutes', to);
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }

    }
  } else {
    //在免登录白名单，直接进入,否则进入登录页
    (whiteList.indexOf(to.path) !== -1) ? next() : next('/login');
  }
})

export default router;
