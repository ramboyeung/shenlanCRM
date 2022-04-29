<template>
  <!-- 分页组件 -->
  <div class="common-pagination-wrap">
    <el-pagination
      class="pagination"
      background
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page.sync="pageOption.page_index"
      :page-sizes="pageOption.pageSizes"
      :page-size="pageOption.pageSize"
      :layout="pageOption.layout"
      :total="pageOption.total"
      :prev-text="pageOption.prevText"
      :next-text="pageOption.nextText"
      :hide-on-single-page="false"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageOption: Object
  },
  methods: {
    onSizeChange (size) {
      //console.log(`每页已被限定显示 ${size} 条`)
      this.size = size
      // 通知父组件页数改变，并传参新的页数
      this.$emit('handleSizeChange', size)
    },
    onCurrentChange (currentIndex) {
      //console.log(`当前是第 ${currentIndex} 页`)
      // 通知父组件页数改变，并传参新的页数
      this.$emit('handleCurrentChange', currentIndex)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
