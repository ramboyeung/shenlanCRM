<template>
  <header class="header-nav">
    <el-row class="header-box">
      <el-col :span="12" class="logo-container">
        <router-link to="/index"
          ><img src="../assets/images/top-logo.png" class="logo" alt=""
        /></router-link>
        <span class="title">中台管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="todayDate">
          <span>{{ todayDate() }}</span>
        </div>
        <div class="userinfo">
          <img :src="user.avatar" class="avatar" alt="" />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{ user.name }}</p>
          </div>
          <span class="username">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showInfo">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { todayDate } from "@/utils/utils.js";
export default {
  name: 'header-nav',
  data () {
    return {

    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    handleCommand (command) {
      if (command == 'showInfo') {
        this.$router.push("/infoshow");
      } else if (command == 'logout') {
        sessionStorage.removeItem("eleToken");//清除用户信息
        this.$router.push('/login');
      }
    },
    todayDate
  }
}
</script>

<style lang="less" scoped>
.header-nav {
  height: 60px;
  min-width: 600px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.header-box {
  display: flex;
  justify-content: space-between;
}
.logo-container {
  height: 100%;
  line-height: 60px;
  min-width: 400px;
}
.logo {
  width: 100px;
  height: 25px;
  margin-left: 25px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-family: "Microsoft YaHei";
  font-size: 22px;
  letter-spacing: 3px;
  margin-left: 20px;
}
.user {
  height: 60px;
  padding: 10px;
  // float: right;
  text-align: right;
}
.todayDate {
  display: inline-block;
  margin-right: 20px;
}
.userinfo {
  display: inline-block;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  text-align: center;
  padding: 0 15px;
}
.comename {
  font-size: 12px;
  padding-bottom: 8px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-caret-bottom {
  font-size: 16px;
}
</style>

