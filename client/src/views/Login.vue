<template>
  <div class="login">
    <section class="form_container">
      <div class="manager_tip">
        <span class="title">深蓝法考后台管理系统</span>
        <el-form
          :model="loginUser"
          :rules="rules"
          ref="loginForm"
          label-width="80px"
          class="loginForm"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginUser.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
              >登录</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>还没有账号？去<router-link to="/register">注册</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import { isEmpty } from "@/utils/utils.js";

export default {
  name: 'login',
  components: {

  },
  data () {
    return {
      loginUser: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ type: "email", message: "邮箱格式不正确！", trigger: "blur" }, { required: true, message: "邮箱不能为空！", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空！", trigger: "blur" }, { min: 6, max: 12, message: "长度在6到12个字符之间", trigger: "blur" }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return;
        this.$axios.post("/users/login", this.loginUser).then(res => {
          //console.log(res);
          if (!(res && res.data && res.data.data)) {
            return;
          }
          const code = res.data.code;
          const msg = res.data.data.msg;
          const token = res.data.data.token;

          //code为1表示登录成功，成功才会跳转，登陆前需要做路由守卫，登录成功后需要本地存储token，并把解析后的token放到vuex中
          if (!code) {
            this.$message({ message: msg, type: "error" });
            return;
          }

          //this.$message({ message: msg, type: "success" });//放此处有点ui加载怪异，跳转时间太长了，改为放跳转之前
          sessionStorage.setItem("eleToken", token);

          const decodedToken = jwt_decode(token);//把token解析出来
          //console.log(decodedToken);

          this.$store.dispatch("setAuthenticated", !isEmpty(decodedToken));//把判断出的是否为登录状态存入vuex
          this.$store.dispatch("setUser", decodedToken);//把token中的用户信息存入vuex
          //console.log(!isEmpty(decodedToken));

          this.$message({ message: msg, type: "success" });
          this.$router.push("/index");
          document.title = "首页 | 深蓝法考中台";
        })
      });
    }
  }
}
</script>

<style lang="less" scoped>
/deep/input::-webkit-input-placeholder {
  color: #999;
}
/deep/input:-ms-input-placeholder {
  // IE 10 +
  color: #999;
}
/deep/input:-moz-placeholder {
  // Firefox 4 -18
  color: #999;
}
/deep/input::-moz-placeholder {
  // Firefox 19 +
  color: #999;
}

.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/images/new21_banner_bg.jpg") no-repeat center
    center;
  background-size: 100% 100%;
  .form_container {
    width: 370px;
    height: 210px;
    position: absolute;
    top: 10%;
    left: 34%;
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    .manager_tip {
      .title {
        font-family: "Microsoft Yahei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
      }
      .loginForm {
        margin-top: 40px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        color: #1a1a1a;
        box-shadow: 0px 5px 10px #cccc;
      }
      .submit_btn {
        width: 100%;
      }
      .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
        p {
          a {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
