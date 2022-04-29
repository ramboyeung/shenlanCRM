<template>
  <el-container class="foundlist">
    <el-header class="foundlist-hd">流水台账记录</el-header>
    <div class="foundlist-main">
      <el-form :inline="true" class="main_top" v-model="searchData">
        <div class="date_picker_c">
          <el-form-item class="date_picker_tip" label="请选择查询时间区间：">
            <el-date-picker
              class="date_picker"
              :clearable="true"
              v-model="searchData.startTime"
              size="small"
              type="datetime"
              placeholder="请选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              :picker-options="{
                disabledDate: (time) => {
                  return time.getTime() > Date.now();
                },
                selectableRange: '00:00:00 - 23:59:59',
              }"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="--" class="date_picker_tip">
            <el-date-picker
              class="date_picker"
              :clearable="true"
              v-model="searchData.endTime"
              size="small"
              type="datetime"
              placeholder="请选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="search">
            <el-button
              class="search_btn"
              type="primary"
              size="small"
              icon="view"
              @click="handleSearch()"
              >筛选</el-button
            >
          </el-form-item>
        </div>

        <el-form-item class="btnAdd" v-if="user.identity === 'manager'">
          <el-button
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
            >添加</el-button
          >
        </el-form-item>

        <Dialog :dialog="dialog" :formData="formData" @update="getProfile" />
      </el-form>
    </div>
    <el-container class="layout_tb">
      <div
        style="
          padding: 10px;
          background: #fff !important;
          height: 100%;
          overflow: scroll;
          color: #333;
        "
      >
        <el-table
          id="tableData"
          border
          fit
          highlight-current-row
          :data="tableData"
          ref="table"
          style="width: 100%"
          :row-style="{
            height: '80px',
          }"
          :header-cell-style="{
            background: '#212130',
            color: '#CF8400',
            borderColor: '#ccc',
          }"
          :row-key="(record) => record.id"
        >
          <template slot="empty">
            <div style="height: 92px; line-height: 92px">数据空空如也！</div>
          </template>
          <el-table-column
            label="序号"
            type="index"
            width="65"
            align="center"
            fixed
          >
          </el-table-column
          ><el-table-column
            label="创建时间"
            prop="date"
            width="250"
            align="center"
            ><template slot-scope="scope">
              <i class="el-icon-time" v-if="scope.row.date"></i>
              <span>{{ scope.row.date | formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收支类型"
            prop="type"
            width="80"
            align="center"
            ><template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="收支描述"
            prop="description"
            width="130"
            align="center"
          ></el-table-column>
          <el-table-column label="收入" prop="income" width="80" align="center">
            <template slot-scope="scope"
              ><span style="color: #00d053">{{
                scope.row.income ? `+ ${scope.row.income}` : null
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="支出" prop="expend" width="80" align="center"
            ><template slot-scope="scope"
              ><span style="color: #f56767">{{
                scope.row.expend ? `- ${scope.row.expend}` : null
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="账户现金"
            prop="cash"
            width="80"
            align="center"
            ><template slot-scope="scope"
              ><span style="color: #4db3ff">{{ scope.row.cash }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
            width="200"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="user.identity === 'manager'"
            label="操作"
            prop="operation"
            width="180"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                icon="edit"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                icon="delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row class="pagination-part">
          <el-col :span="24" align="center">
            <!-- <el-pagination
              class="pagination"
              align="right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.pageSizes"
              :page-size="paginations.pageSize"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination> -->

            <Pagination
              :pageOption="paginations"
              @handleSizeChange="handleSizeChange"
              @handleCurrentChange="handleCurrentChange"
            />
          </el-col>
        </el-row>
      </div>
    </el-container>
  </el-container>
</template>
<script>
import Dialog from "@/components/Dialog.vue";
import Pagination from '@/components/Pagination.vue';
export default {
  name: 'foundlist',
  data () {
    return {
      searchData: {
        startTime: "",
        endTime: ""
      },
      tableData: [],
      allTableData: [],
      filterTableData: [],
      formData: {
        date: '',
        type: '',
        description: '',
        income: '',
        expend: "",
        cash: "",
        remark: '',
        id: ""
      },
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      paginations: {
        page_index: 1,//当前页码
        total: 0,//数据总条数
        pageSize: 5,//每页限定的条数
        pageSizes: [1, 5, 10, 15, 20],//每页可选择设置的限定条数
        //layout: "total, sizes, prev, pager, next, jumper",
        layout: "total,prev, pager, next",
        prevText: "上一页",
        nextText: "下一页"
      }
    };
  },
  components: {
    Dialog, Pagination
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
  created () {
    this.getProfile();//保证登录进来后台数据库里的内容能够展示
  },
  mounted () {
    this.getAutoHeight();
  },
  methods: {
    getProfile () {
      this.$axios.get("/profiles").then(res => {
        //console.log(res);
        if (!(res && res.data && res.data.data)) {
          return;
        }
        //const code = res.data.code;
        //const msg = res.data.data.msg;
        //console.log(code, msg);

        //this.tableData = res.data.data;
        this.allTableData = res.data.data;
        this.filterTableData = res.data.data;//筛选数据源

        //后台返回全部数据，前端获取到数据后自己分页（分页有两种：前端分页和后端分页，这里是前端搞）
        this.setPaginations();
      }).catch(err => console.log(err));
    },
    handleSearch () {
      if (!this.searchData.startTime) {
        this.$message({ message: "请选择开始时间", type: "warning" });
        return;
      }
      if (!this.searchData.endTime) {
        this.$message({ message: "请选结束择时间", type: "warning" });
        return;
      }
      //console.log(this.searchData.startTime);//注意时间需要new Date(date)一下
      const sTime = (new Date(this.searchData.startTime)).getTime();//获取开始时间戳
      const eTime = (new Date(this.searchData.endTime)).getTime();//获取结束时间戳
      this.allTableData = this.filterTableData.filter(item => {
        //console.log(item);//每个对象里都有date属性
        let date = new Date(item.date);
        let time = date.getTime();//获取到每个对象里的时间戳
        return time >= sTime && time <= eTime;
      });

      //筛选引起分页数据的变化
      this.setPaginations();
    },
    handleAdd () {
      this.dialog = { show: true, title: "添加资金信息", option: "add" };
      this.formData = { type: "", description: "", income: "", expend: "", cash: "", remark: "", id: "" };
    },
    handleEdit (index, row) {
      this.dialog = { show: true, title: "编辑资金信息", option: "edit" };
      this.formData = { type: row.type, description: row.description, income: row.income, expend: row.expend, cash: row.cash, remark: row.remark, id: row._id };
    },
    handleDelete (index, row) {
      //console.log(index, row._id);

      this.$axios.delete(`/profiles/delete/${row._id}`).then(res => {
        //console.log(res.data.deletedCount);//0表示无删除 1表示有删除
        if (res.data.deletedCount) {
          this.$message({ message: "删除成功！" });//弹框提示删除成功
          this.tableData.splice(index, 1);//前端必须做删除，否则数据清空时不会自动刷新
          this.getProfile();//删除后需要刷新页面数据回显一下
        } else {
          this.$message({ message: "删除失败！", type: "error" });//弹框提示删除失败
        }
      });
    },
    handleSizeChange (pageSize) {
      this.paginations.page_index = 1;//初始化
      this.paginations.pageSize = pageSize;//初始化
      this.tableData = this.allTableData.filter((item, index) => index < pageSize);//过滤数据
    },
    handleCurrentChange (page) {
      //思路：假如pageSize=5，那么page1: 0-4   page2: 5-9   page3: 10-14
      this.paginations.page_index = page;//设置当前页页码
      const startIndex = this.paginations.pageSize * (page - 1);//设置当前页数据开始的索引
      const endIndex = (this.paginations.pageSize * page) - 1;//设置当前页数据截止到第几条（不一定有这么多））
      this.tableData = this.allTableData.filter((item, index) => index >= startIndex && index <= endIndex);//当前页应该显示哪些数据
      // const index = this.paginations.pageSize * (page - 1);//获取当前页数据开始的索引
      // const dataNums = this.paginations.pageSize * page;//获取至当前页的数据的总条数
      // const tables = [];//新数据容器
      // for (let i = index; index < dataNums; i++) {
      //   if (this.allTableData[i]) {
      //     tables.push(this.allTableData[i]);
      //   }
      //   this.tableData = tables;
      // }
    },
    setPaginations () {
      //设置总条数、当前页码、每页显示的数据条数的默认值
      if (this.paginations.total === 0) this.paginations.total = this.allTableData.length;//数据总条数
      this.paginations.page_index = 1;//当前页码
      this.paginations.pageSize = 5;//每页的数据总条数

      //给出默认的页码那一页的全部数据: 即请求到的全部数据过滤出索引小于页面条数的数据
      this.tableData = this.allTableData.filter((item, index) => index < this.paginations.pageSize);//第0到第4条
    },
    getAutoHeight () {//让表格自适应
      this.$nextTick(function () {
        //在页面渲染完成后
        this.height = window.innerHeight - this.$refs.table.$el.getBoundingClientRect().top - 50
        this.$refs.table.$el.getBoundingClientRect().top //表格距离浏览器的高度
        var that = this
        // 添加监听窗口大小变化事件
        window.onresize = function () {
          that.height = window.innerHeight - that.$refs.table.$el.getBoundingClientRect().top - 50
        }
      })
    },
  }
};
</script>

<style lang="less" scoped>
.foundlist {
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
}
.foundlist-hd {
  text-align: center;
  color: #1a1a1a;
  font-size: 22px;
  font-weight: 900;
}
.foundlist-main {
  width: 100%;
  height: 60px;
  margin: 10px 0 10px;
}
/deep/.main_top {
  margin: 0 10px;
  overflow: hidden; //清除浮动
  justify-content: space-between;
  align-items: center;
  margin-top: 5px; //居中计算：(60/2-40/2)/2
}
.date_picker_c {
  //子集脱离文档流，垂直居中需要去动父级位置
  height: 40px;
  float: left;
  margin-left: 10px;
}
.btnAdd {
  margin-right: 20px;
  float: right;
}
.layout_tb {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.el-header {
  background-color: #b3c0d1;
  color: #1a1a1a;
  line-height: 60px;
}

//高亮显示：scoped时，注意加less样式加/deep/的同时，给el-table加属性highlight-current-row
/deep/.el-table__body tr:hover > td {
  background-color: #b87100 !important;
  color: #fff !important;
}
/deep/.el-table__body tr:nth-child(odd) {
  background-color: #fbce74 !important;
}
/deep/.el-table__body tr:nth-child(even) {
  background-color: #ffd3c9 !important;
}
::v-deep .el-table__empty-block {
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}

.el-icon-time {
  padding-right: 10px;
}
.pagination {
  margin: 15px 0;
}
</style>