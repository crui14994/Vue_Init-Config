// store/permission.js
import { routes, asyncRouterMap } from '@/router/route';

//判断当前路由是否有权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

function getNowRouter(asyncRouterMap, to) {
  return asyncRouterMap.some(route => {
    // console.log(asyncRouterMap);
    if (to.path.indexOf(route.path) !== -1) {
      return true;
    } else if (route.children && route.children.length) { //如果有孩子就遍历孩子
      return getNowRouter(route.children, to)
    }
  })
}

const permission = {
  state: {
    routers: routes,
    addRouters: [],
    siderbar_routers: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = routes.concat(routers);
    },
    SET_NOW_ROUTERS: (state, to) => {
      // 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给siderbar_routers
      state.addRouters.forEach(e => {
        if (e.children && e.children.length) {
          if (getNowRouter(e.children, to) === true)
            state.siderbar_routers = e;
        }
      })
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          // admin权限 直接通过
          if (roles.indexOf('admin') >= 0) return true;
          // console.log(v,hasPermission(roles, v))
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    },
    getNowRoutes({ commit }, data) {
      return new Promise(resolve => {
        //data => to
        commit('SET_NOW_ROUTERS', data);
        resolve();
      })
    },
  }
};

export default permission;
