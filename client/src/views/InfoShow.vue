<template>
  <div class="infoshow">
    <el-row type="flex" jusity="center" class="row-bg">
      <el-col :span="8" class="user_welcome">
        <div class="user">
          <img :src="user.avatar" alt="" class="avatar" />
        </div>
        <div class="user_tip">
          <h1>您好，欢迎来到深蓝法考中台！</h1>
          <p class="tips_one">这里是深蓝法考后台个人中心,</p>
          <p>
            您目前的身份是<span
              :class="
                user.identity === 'manager' ? 'identity i_m' : 'identity i_e'
              "
              >{{ user.identity === "manager" ? "管理员" : "普通员工" }}</span
            >！
          </p>
        </div>
      </el-col>
      <el-col :span="16" class="user_info">
        <div class="user_item">
          <h1><i class="iconfont icon-nicheng"></i> 昵称</h1>
          <hr class="style-two" />
          <p>{{ user.name }}</p>
        </div>
        <hr class="style-one" />
        <div class="user_item">
          <h1><i class="iconfont icon-shijianriqi"></i> 账号注册时间</h1>
          <hr class="style-two" />
          <p>{{ user.date | formatTime }}</p>
        </div>
        <hr class="style-one" />
        <div class="user_item">
          <h1><i class="iconfont con-yidenglu"></i> 本次登录时间</h1>
          <hr class="style-two" />
          <p>{{ user.login_time | formatTime }}</p>
        </div>
        <hr class="style-one" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'infoshow',
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style lang="less" scoped>
@h1: 24px;
.p(@size:18px,@space:2px) {
  font-size: @size;
  letter-spacing: @space;
}
.font(@color:#fff,@ff:"Microsoft YaHei") {
  color: @color;
  font-family: @ff;
}

.iconfont {
  font-size: 28px;
  padding-right: 10px;
}
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .row-bg {
    background: #eee;
    width: 100%;
    height: 100%;
    .user_welcome {
      background: rgb(104, 125, 218);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 5%;
      .user {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        .avatar {
          width: 150px;
          height: 150px;
          border: 3px solid #333;
          padding: 5px;
          background: #fff;
          border-radius: 50%;
        }
      }
      .user_tip {
        text-align: center;
        .font();
        h1 {
          font-size: @h1;
          margin-top: 20px;
        }
        p {
          .p();
          margin: 20px 0;
          &.tips_one {
            margin-top: 60px;
          }
          .identity {
            font-weight: 900;
            padding: 0 10px;
            font-size: 28px;
          }
          .i_m {
            color: red;
          }
          .i_e {
            color: green;
          }
        }
      }
    }
    .user_info {
      height: 100%;
      background: #eee;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .user_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .font(@color:#1a1a1a);
        h1 {
          font-size: @h1;
          padding: 60px 0 0 20px;
          i {
            margin-left: 30px;
          }
        }
        p {
          .p(@space:1px);
          padding: 30px 0 30px 50px;
        }
      }
    }
  }
}

hr.style-one {
  /*内嵌水平线*/
  width: 85%;
  margin: 0 auto;
  border: 0;
  height: 0;
  border-bottom: 1px dashed rgb(10, 5, 5);
}
hr.style-two {
  /*透明渐变水平线*/
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
}
hr.style-three {
  /*渐变*/
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
}
</style>