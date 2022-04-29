const Index = () => import('@/views/Index.vue');
const Register = () => import('@/views/Register.vue');
const Login = () => import('@/views/Login.vue');
const NotFound = () => import('@/views/NotFound.vue');
const Home = () => import('@/views/Home.vue');
const InfoShow = () => import('@/views/InfoShow.vue');
const FoundList = () => import("@/views/FoundList.vue");
const CollectDb = () => import("@/views/CollectDb.vue");

//const isAuthenticated = sessionStorage.getItem("eleToken");
export default [
  {
    path: '/',
    redirect: '/index'
    //也可写成redirect: { path: '/index' }或者redirect: { name: 'index' }
  },
  {
    path: '/index',
    name: 'index',
    meta: { htmlTitle: "首页 | 深蓝法考中台" },
    component: Index,
    // component: resolve => require(['@/views/Index.vue'], resolve),
    // beforeEnter: (to, from, next) => {
    //   // 若访问的不是登录页面且未授权，则自动跳转到登录页面
    //   if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) {
    //     next({ name: 'login' })
    //   } else {
    //     next()
    //   }
    // },
    children: [
      { path: "", component: Home },
      { path: "/home", name: "home", meta: { htmlTitle: "首页 | 深蓝法考中台" }, component: Home },
      { path: "/infoshow", name: "infoshow", meta: { htmlTitle: "个人信息页" }, component: InfoShow },
      { path: "/foundlist", name: "foundlist", meta: { htmlTitle: "资金流水页" }, component: FoundList, keepAlive: false },
      { path: "/collect_db", name: "collect_db", meta: { htmlTitle: "数据统计页 | 深蓝法考中台" }, component: CollectDb },
      { path: "/words_publish", name: "words_publish", meta: { htmlTitle: "词条发布页" }, component: resolve => require(['@/views/WordsPublish.vue'], resolve) },
      { path: "/live_law_test", name: "live_law_test", meta: { htmlTitle: "法考在线页" }, component: resolve => require(['@/views/LiveLawTest.vue'], resolve) },
    ]
  },
  {
    path: '/register',
    name: 'register',
    meta: { htmlTitle: "注册页 | 深蓝法考中台" },
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    meta: { htmlTitle: "登录页 | 深蓝法考中台" },
    component: Login
  },
  {
    path: '*',
    name: '404',
    meta: { htmlTitle: "哦豁，您需要的页面找不到了" },
    component: NotFound
  }
]