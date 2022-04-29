import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes';

Vue.use(Router);

/* 在创建router实例对象之前，手动覆盖原型链的push来吞掉报错catch */
// 先存储默认底层的push
const originPush = Router.prototype.push
// 覆盖原型链的push
Router.prototype.push = function (location, resolve, reject) {
  // this:路由实例对象

  // 判断用户有没有传后面两个可选参数
  if (resolve || reject) {
    return originPush.call(this, location, resolve, reject)
  } else {// 用户只传了第一个参数
    /* 
    默认底层： catch()方法代码  throw err : 抛出异常
    吞掉报错原理： 重写catch()方法,把默认底层的 throw err给去掉，就不会抛出异常
    */
    return originPush.call(this, location).catch(() => {
      //throw err
    })
  }
}
//没有以上代码控制台会报错，具体参考：https://blog.csdn.net/weixin_46873254/article/details/119358833


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem("eleToken") ? true : false;
  //if (to.path !== "/register" || to.path !== "/login") {
  if (isLogin || to.path === "/register" || to.path === "/login") {
    next();
  } else {
    next("/login");
  }
});
export default router;
