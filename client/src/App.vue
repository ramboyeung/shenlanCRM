<template>
  <div id="app" v-wechat-title="$route.meta.htmlTitle">
    <router-view></router-view>
  </div>
</template>

<script>
//import '@/assets/reset.css';
import jwt_decode from "jwt-decode";
import { isEmpty } from "@/utils/utils.js";
export default {
  name: "app",
  created () {
    const token = sessionStorage.getItem("eleToken");
    if (token) {

      const decodedToken = jwt_decode(token);
      this.$store.dispatch("setAuthenticated", !isEmpty(decodedToken));//把判断出的是否为登录状态存入vuex
      this.$store.dispatch("setUser", decodedToken);//把token中的用户信息存入vuex
    } else {
      this.$router.push('/index');
    }
  }
}
</script>


<style lang="less">
@import "./assets/commonLess/reset.less";
@import "./assets/iconfont/iconfont.css";
#app {
  font-family: Avenir, "PingFang SC", "PingFang TC", "Hiragino Sans GB", Arial,
    "Microsoft Yahei", sans-serif;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}

body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
}
//全局设置
</style>
