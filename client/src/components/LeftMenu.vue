<template>
  <el-row class="left_menu">
    <el-col :span="12" class="left_menu_w">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="iconfont icon-shouye"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'iconfont ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="citem in item.children"
              :to="citem.path"
              :key="citem.path"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'left_menu',
  data () {
    return {
      items: [
        {
          icon: "icon-zijinguanli",
          name: "资金管理",
          path: "found",
          children: [{ path: "foundlist", name: "资金流水" }, { path: "collect_db", name: "数据统计" }]
        },
        {
          icon: "icon-a-weibiaoti-1_huaban1fuben32",
          name: "法考在线",
          path: "law_test_onlone",
          children: [{ path: "words_publish", name: "词条发布" }, { path: "live_law_test", name: "法考直播" }]
        },
        {
          icon: "icon-yewurenyuanxinxiguanli",
          name: "信息管理",
          path: "info",
          children: [{ path: "infoshow", name: "个人信息 " }]
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.left_menu {
  position: relative;
  height: 100%;
}
.left_menu_w {
  position: absolute;
  left: 0;
  width: 180px;
  height: 100%;
  min-height: 100%;
  background: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.iconfont {
  margin-left: -30px;
  padding-right: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 18px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
/deep/.el-submenu,
.el-menu-item {
  min-width: 180px !important;
}
a {
  text-decoration: none;
}
</style>
