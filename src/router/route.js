
//所有权限通用路由表 ,如首页和登录页和一些不用权限的公用页面
export const routes = [
  { path: '/login', component: () => import('@/views/Login.vue') },
];


//异步挂载的路由,动态需要根据权限加载的路由表 默认admin可以访问所有页面
export const asyncRouterMap = [
  //网站管理
  {
    path: '/',
    redirect: '/home',
    name: '首页',
    component: () => import('@/components/layout/layout.vue'),
    meta: { role: ['editor'] }, //页面需要的权限
    children: [
      { path: '/home', name: '网站管理', component: () => import('@/views/web/Home.vue'), },
      {
        path: '/web',
        redirect: '/web/banner',
        name: '首页管理',
        component: { render(c) { return c('router-view') } },
        children: [
          { path: 'banner', name: 'banner管理', component: () => import('@/views/web/Banner.vue'), },
          { path: 'video', name: '视频管理', component: () => import('@/views/web/Video.vue'), },
        ]
      },
      { path: '/about', name: '关于我们', component: () => import('@/views/web/About.vue'), },
    ]
  },
  //用户管理
  {
    path: '/user',
    redirect: '/addUser',
    name: '用户管理',
    component: () => import('@/components/layout/layout.vue'),
    meta: { role: ['editor'] },
    children: [
      {
        path: '/addUser',
        name: '添加用户',
        meta: { role: ['editor'] },
        component: () => import('@/views/user/Add.vue'),
      },
      {
        path: '/updataUser',
        name: '修改用户',
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
    meta: { role: [] },
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
    meta: { role: [] },
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

