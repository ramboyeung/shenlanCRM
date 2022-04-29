<template>
  <div class="index">
    <div class="top"><Header /></div>
    <div class="leftwrap">
      <div class="left"><LeftMenu /></div>
    </div>
    <div class="rightwrap">
      <div class="right"><router-view></router-view></div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/GlobalHeader.vue";
import LeftMenu from "@/components/LeftMenu.vue";
export default {
  name: 'index',
  components: {
    Header, LeftMenu
  },
  // watch: {
  //   '$route': {
  //     handler: function (to, from) {
  //       //做更新操作
  //       if (to.path !== from.path) window.location.reload();//解决登录后title不改变，让它强制刷新
  //     },
  //     immediate: true
  //   }
  // }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.index {
  width: 100%;
  height: 100%;
}

.top {
  position: relative;
  z-index: 1;
  height: 60px;
}
.leftwrap {
  width: 180px;
  float: left;
  height: 100%;
  margin-top: -60px;
  text-align: center;
  background: #324057;
}
.left {
  padding-top: 60px;
  height: 100%;
}
.rightwrap {
  text-align: center;
  margin-top: -60px;
  height: 100%;
  margin-left: 180px;
}
.right {
  padding-top: 60px;
  height: 100%;
}
</style>