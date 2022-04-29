<template>
  <div class="home">
    <div class="container">
      <h1 class="title">深蓝法考</h1>
      <p>深蓝法考APP-万国法考旗下产品,带领学员走进智能学习时代！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {

  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../assets/images/banner_02.jpg") no-repeat;
  background-size: 100% 100%;
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 15%;
    text-align: center;
    color: #fff;
    .title {
      font-size: 26px;
      padding-bottom: 40px;
    }
    p {
      font-size: 22px;
      letter-spacing: 3px;
    }
  }
}
</style>