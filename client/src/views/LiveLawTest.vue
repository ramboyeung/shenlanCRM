<template>
  <div class="live_law_test">
    <div class="app-container">
      <!-- 表格搜索 -->
      <div class="filter-container">
        <div class="filter-left">
          <el-button
            class="filter-item"
            style="margin-bottom: 0px"
            type="primary"
            @click="addTableData"
          >
            新增
          </el-button>
        </div>

        <div class="filter-right">
          <el-input
            placeholder="请输入讲师姓名或者推荐教材查询"
            class="filter-item"
            style="margin-bottom: 0px; margin-right: 10px"
          ></el-input>
          <el-button
            class="filter-item"
            style="margin-bottom: 0px"
            type="primary"
            @click="tableSearch"
          >
            搜索
          </el-button>

          <el-button
            class="filter-item"
            style="margin-bottom: 0px"
            @click="resetTable"
          >
            重置
          </el-button>
        </div>
      </div>

      <!-- 表格主体 -->
      <div class="table-container">
        <el-table
          border
          :data="tableData"
          style="width: 100%"
          :height="tableHeight"
        >
          <!-- 属性与字段根据实际情况进行修改 -->
          <el-table-column
            prop="date"
            label="直播日期"
            width="200"
            align="center"
            sortable
          >
            <template slot-scope="scope">{{ scope.row.date | date }}</template>
          </el-table-column>
          <el-table-column
            prop="teacher"
            label="讲师"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="course_nm"
            label="课程名称"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="introduce"
            label="简介"
            width="400"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="is_free"
            label="是否免费"
            width="100"
            align="center"
            ><template slot-scope="scope">
              {{ scope.row.is_free ? "是" : "否" }}
            </template></el-table-column
          >
          <el-table-column
            prop="price"
            label="价值"
            width="150"
            align="center"
            sortable
          >
            <template slot-scope="scope">
              <span class="price"
                ><i class="CNY_symbol">￥</i>{{ scope.row.price | price }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="book_rec"
            label="教材推荐"
            width="250"
            align="center"
          ></el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
            fixed="right"
          >
            <template slot-scope="obj">
              <el-button type="primary" @click="editTableData(obj.row.id)">
                编辑
              </el-button>
              <el-button
                type="danger"
                @click="deleteTableData(obj.$index, obj.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <Dialog :dialog="dialog" :formData="formData" @update="getProfile" />
      </div>

      <!-- 表格分页 -->
      <el-pagination
        background
        class="pagination"
        :total="tablePaginate.total"
        :layout="tablePaginate.layout"
        :page-size="tablePaginate.limit"
        :page-sizes="tablePaginate.sizes"
        :current-page="tablePaginate.current"
        @size-change="tablePageSizeChange"
        @current-change="tablePageNumChange"
      />
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui';

import { transUTCTimestamp } from "@/utils/utils.js";
import Dialog from "@/components/Dialog.vue";

export default {
  name: "",
  data () {
    return {
      // 表格查询接口
      tableUrl: "",
      // 表格查询参数
      tableParam: {
        page: 1,
        pagesize: 20,
        // 其它条件
      },
      // 表格加载动画
      tableLoading: null,
      // 表格计算高度
      tableHeight: 0,
      // 表格动态数据
      tableData: [],
      // 表格分页配置
      tablePaginate: {
        limit: 20,
        total: 0,
        current: 0,
        sizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
      },
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        date: '',
        teacher: '',
        course_nm: '',
        introduce: '',
        is_free: "",
        price: "",
        book_rec: '',
        id: ""
      }
    };
  },
  components: {
    Dialog
  },
  filters: {
    date (val) {
      return transUTCTimestamp(val);
    },
    price (val) {
      return `${Number(val).toFixed(2)}`;
    }
  },

  created () {
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 表格高度 = 屏幕高度 - 表格以外的其它元素高度总和
    this.tableHeight = windowHeight - 272;
  },

  mounted () {
    this.getTableData();
  },


  methods: {
    // 表格查询
    getTableData () {
      if (this.tableLoading == null) {
        this.tableLoading = Loading.service({
          text: "加载中",
          target: ".table-container",
        });
        this.$axios.get("/courses").then((result) => {
          //console.log(result);
          if (result.data.code) {
            // 表格数据
            this.tableData = result.data.data;
            // 分页信息
            this.tablePaginate.total = this.tableData.length;
            this.tablePaginate.current = result.data.current;
            this.$nextTick(() => {
              this.tableLoading.close();
              this.tableLoading = null;
            });
          }
        });
      }
    },


    // 表格搜索
    tableSearch () {
      this.tableParam.page = 1;
      this.getTableData();
    },

    // 重置表格
    resetTable () {

      // 重置表格查询参数

      // 重新调用表格查询

    },

    // 新增表格数据
    addTableData () {
      this.dialog = { show: true, title: "新增直播课程信息", option: "add" }
      // 打开新增模态框，可与编辑共用
      this.formData = {
        date: '',
        teacher: '',
        course_nm: '',
        introduce: '',
        is_free: "",
        price: "",
        book_rec: '',
        id: ""
      };
    },

    // 确认新增表格数据
    confirmAddTableData () {

      // 添加模态框点击确认
    },


    // 关闭添加与编辑模态框
    closeAddEditModal () {




    },

    // 编辑表格数据
    editTableData (id) {

      // 打开编辑模态框，可与新增共用

    },

    // 确认编辑表格数据
    confirmEditTableData () {


      // 编辑模态框点击确认


    },

    // 删除表格数据
    deleteTableData (index, row) {
      //console.log(row);
      this.$confirm('确定要删除这条数据吗 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = "/courses/delete/" + row._id;
        this.$axios.delete(url).then((result) => {
          console.log(result);
          if (result.data.deletedCount) {
            this.$message.success("删除成功")
            this.getTableData();
          }
        });

      })
    },
    // 改变页大小
    tablePageSizeChange (size) {
      this.tableParam.pagesize = size;
      this.getTableData();
    },

    // 改变当前页
    tablePageNumChange (num) {
      this.tableParam.page = num;
      this.getTableData();
    },

  }
};
</script>

<style lang="less" scoped>
.live_law_test {
  padding: 20px;
  box-sizing: border-box;
}
.CNY_symbol {
  font-style: normal;
}

//---------------------
.app-container {
  // 屏幕高度 - 面包屑高度
  height: calc(100vh - 132px);
  overflow: hidden;
  .filter-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    height: 50px;
    .filter-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    .filter-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .table-container {
    // 屏幕高度 - 表格以外的其它元素高度总和
    height: calc(100vh - 272px);
    overflow: hidden;
  }
  .pagination {
    height: 50px;
    line-height: 50px;
    padding: 11px 10px;
    border: 1px solid #eaedf1;
  }
}
</style>