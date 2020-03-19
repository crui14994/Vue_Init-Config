
//所有权限通用路由表 ,如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/Login.vue') },
  {
    path: '/',
    component: () => import('@/components/layout/layout.vue'),
    redirect: '/dashboard',
    name: '首页',
    children: [{ path: 'dashboard', component: () => import('@/views/web/Home.vue') }]
  },
];


//异步挂载的路由,动态需要根据权限加载的路由表 默认admin可以访问所有页面
export const asyncRouterMap = [
  {
    path: '/user',
    redirect: '/addUser',
    meta: { role: [97] },
    component: () => import('@/components/layout/layout.vue'),
    children: [
      {
        name: 'addUser',
        path: '/addUser',
        meta: { roles: [] },
        component: () => import('@/views/user/Add.vue'),
      },
      {
        path: '/updataUser',
        name: '修改用户',
        meta: { roles: [] },
        component: () => import('@/views/user/UpdataUser.vue'),
      },
    ]
  },
  //消息中心
  {
    path: '/message',
    redirect: '/messageInfo',
    name: '消息中心',
    component: () => import('@/components/layout/layout.vue'),
    meta: { role: [98] },
    children: [
      {
        path: '/messageInfo',
        name: '添加列表',
        component: () => import('@/views/message/Message.vue'),
      }
    ]
  },
  //设置
  {
    path: '/setting',
    redirect: '/setCenter',
    name: '设置',
    component: () => import('@/components/layout/layout.vue'),
    meta: { role: [97] },
    children: [
      {
        path: '/setCenter',
        name: '设置中心',
        component: () => import('@/views/setting/Setting.vue'),
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];

