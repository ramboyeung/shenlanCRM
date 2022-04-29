import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './utils/http.js';
//import Utils from './utils/utils.js';//引入我们定义的Utils类，它的静态方法不会被继承，调用的话应该用Utils.xx()

//引入element ui包，大约1.1M，但是按需引入的组件超过19个就是3.1M，不划算了，是否按需引入视情况自己决定
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//解决路由刷新后title不更新的问题，兼容性良好，比document.title兼容好（document.title在ios上不兼容）
import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle);


// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor);


//引入处理时间的包：dayjs,只有2kb，非常地节约性能
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';// 加载中文语言包
import relativeTime from 'dayjs/plugin/relativeTime';// 导入相对时间插件
dayjs.locale('zh-cn');// 全局使用中文语言包
// console.log(dayjs().format('YYYY-MM-DD'));
dayjs.extend(relativeTime);// 配置相对时间插件
Vue.filter('formatTime', value => { //做成全局过滤器，方便使用
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
});


//兼容处理视频播放：
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import VideoPlayer from 'vue-video-player';//vue-video-player集成了videojs-contrib-hls和videojs-flash插件，以及 video.js，不再需要额外安装
//import 'videojs-flash';//使其可以播放 RTMP 流，项目如果需要的话（ flash 插件需要在 hls 之前引用）
//import 'videojs-contrib-hls';//使其可以播放 HLS 流，项目如果需要的话
Vue.use(VideoPlayer);



//把封装好的axios放vue原型上，就不用引来引去的了，在组件中用this.$axios就可以调用（注意在vuex和vueRouter中不行）
Vue.prototype.$axios = axios;
// Vue.prototype.Utils = Utils;


//开发环境下vue会提醒我们很多警告，不需要就设置false
Vue.config.productionTip = false;


/**
 * runtime-compiler:使用components属性注册App组件，在template属性是使用App组件。
 * runtime-only:直接使用render属性调用h()函数使用App组件
 * 比较：
 * 一、runtime-compiler:（性能稍差，多了转化成抽象语法树这个步骤）
 * 1.当把template传递给vue实例的时候，vue实例会把该模板内容保存到vm.options，然后对该template解析成ast(抽象语法树)，
 * 2.再将ast编译为render()函数，通过render函数翻译成虚拟DOM将虚拟DOM渲染成真实的DOM
 * 二、runtime-only不用解析以及编译，则生成项目时就少了处理template的源码，runtime-only打包的项目代码量更少。性能更好。
 */


/*
//脚手架建立目录时runtime + compiler模式下，下面两种写法可随意选择，但是：推荐render写法！
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

*/

//脚手架建立目录时runtime-only模式下，只能用render函数渲染根组件app，不能写成模板的形式去渲染根组件app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
