<template>
  <div class="register">
    <section class="form_container">
      <div class="manager_tip">
        <span class="title">深蓝法考后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registerUser.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              v-model="registerUser.password2"
              placeholder="请再次输入密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="普通员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('registerForm')"
              >注册</el-button
            >
          </el-form-item>
          <div class="tiparea">
            <p>已有账号？去<router-link to="/login">登录</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: 'register',
  components: {

  },
  data () {
    var checkUsername = (rule, value, callback) => {
      let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/;
      if (!value) {
        callback(new Error('用户名为必填项'));
      } else if (value.length < 3 || value.length > 12) {
        callback(new Error('长度在 3 到 12 个字符'));
      } else if (!reg.test(value)) {
        callback(new Error('姓名不支持特殊字符'));
      }// else if (this.usernameRules()) {
      //   callback(new Error('用户名已存在'));}
      else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致！'));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        name: [{ validator: checkUsername, trigger: 'blur' }],
        email: [{ type: "email", required: true, message: "邮箱格式不正确！", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空！", trigger: "blur" }, { min: 6, max: 12, message: "长度在6到12个字符之间", trigger: "blur" }],
        password2: [{ required: true, message: "密码不能为空！", trigger: "blur" }, { min: 6, max: 12, message: "长度在6到12个字符之间", trigger: "blur" }, { validator: validatePass2, trigger: "blur" }],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => { //如果不传参也可以这样写this.$refs[registerForm].validate((valid) => {……}
        if (!valid) return;
        this.$axios.post("/users/register", this.registerUser).then(res => {
          //code为1表示注册成功
          if (!(res && res.data && res.data.data)) {
            return;
          }
          const code = res.data.code;
          const msg = res.data.data.msg;

          if (code) {
            this.$message({ message: msg, type: "success" });
            this.$router.push("/login");
          } else {
            this.$message({ message: msg, type: "error" });//有错误提示则停留在当前页
            return;
          }
        })

      });
    },
    // usernameRules () {
    //   axios.post("http://localhost:5000/api/users/register/checkname", this.registerUser.name).then(res => {
    //     console.log(res);
    //     if (res.code == 0) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });//访问后台
    // },

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

.register {
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
      .registerForm {
        margin-top: 20px;
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
