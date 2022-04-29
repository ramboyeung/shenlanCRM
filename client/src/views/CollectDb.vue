<template>
  <div class="echarts-box">
    <div class="echarts" id="echarts"></div>
  </div>
</template>

<script>
const echarts = require('echarts');//使用import echarts from 'echarts 会报错Cannot read properties of undefined (reading 'init')"
import option from '@/utils/option.js';
export default {
  mounted () {
    this.drawEcharts()
  },
  methods: {
    drawEcharts () {
      let chart = echarts.init(document.getElementById('echarts'))
      // 自定义工具事件
      option.toolbox.feature.myTool.onclick = () => {
        this.$message({
          type: 'info',
          message: '您刚刚点击了自定义工具按钮！'
        })
      }
      // 设置配置项
      chart.setOption(option)
      // 绑定点击事件
      chart.on('click', (param) => {
        this.$message({
          type: 'info',
          message: `您点击了： ${param.name} - ${param.seriesName} - ${param.data}`
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.echarts-box {
  margin-top: 100px;
  .echarts {
    width: 98%;
    height: 500px;
  }
}
</style>