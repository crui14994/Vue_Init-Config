import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './route';
import store from '@/store/index'

Vue.use(Router)

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routerConfig = {
  mode: 'history',
  linkActiveClass: 'active',
  routes: constantRouterMap
};

const router = new Router(routerConfig);


const whiteList = ['/login']// 不重定向白名单

router.beforeEach((to, from, next) => {
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // console.log(store.getters.roles.length === 0)
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('getUserInfo').then(res => { // 拉取info
          const roles = res.role;
          // console.log(roles)
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            console.log(store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});


export default router;