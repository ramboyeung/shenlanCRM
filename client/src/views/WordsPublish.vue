<template>
  <!-- <div class="words-box">
    <el-row>
      <el-col :span="24">
        <div class="tool-box" align="left">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            size="small"
            @click="handleAdd"
            >新增</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="mulDelete"
            >批量删除</el-button
          >
        </div>
      </el-col>
      <el-col>
        <el-table
          :data="users"
          @selection-change="selectChange"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column sortable prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="title" label="标题" width="480">
          </el-table-column>
          <el-table-column prop="author" label="作者" width="280">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              {{ scope.row.status ? "已发布" : "未发布" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                plain
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 50]"
          :page-size="20"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        >
        </el-pagination>
      </el-col>
      <el-col>
        
      </el-col>
    </el-row>
    
    <el-dialog
      title="编辑"
      :visible.sync="articleFormVisible"
      top="10vh"
      @close="resetForm('articleForm')"
    >
      <el-form :model="words" ref="articleForm" :rules="rules">
        <el-form-item label="标题" prop="title" label-width="50px">
          <el-input v-model="words.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" label-width="50px">
          <el-input v-model="words.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期" label-width="50px">
          <el-date-picker
            v-model="words.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" label-width="50px">
          <el-switch
            v-model="words.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <quill-editor
            ref="TextEditor"
            v-model="words.content"
            :options="editorOption"
          >
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="articleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editArticle('articleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div> -->
  <div class="words_publish">
    <el-dialog
      title=""
      class="previewDialog"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      @close="playerVisible = false"
      :show-close="true"
      style="text-align: center; width: 100%"
    >
      <player
        class="dj-dialog-content"
        :playStyle="playStyle"
        :aliplayerSdkPath="aliplayerSdkPath"
        :autoplay="autoplay"
        :isLive="isLive"
        :playsinline="playsinline"
        :width="width"
        :height="height"
        :controlBarVisibility="controlBarVisibility"
        :useH5Prism="useH5Prism"
        :useFlashPrism="useFlashPrism"
        :vid="vid"
        :playauth="playauth"
        :source="source"
        :cover="cover"
        :format="format"
        :skinLayout="skinLayout"
        :x5_video_position="x5_video_position"
        :x5_type="x5_type"
        :x5_fullscreen="x5_fullscreen"
        :x5_orientation="x5_orientation"
        :autoPlayDelay="autoPlayDelay"
        :autoPlayDelayDisplayText="autoPlayDelayDisplayText"
        v-if="playerVisible"
      ></player>
    </el-dialog>
  </div>
</template>

<script>
import player from "@/components/VideoPlay.vue";
export default {
  name: "words_publish",
  data () {
    return {
      playStyle: "",
      aliplayerSdkPath: "//g.alicdn.com/de/prismplayer/2.6.0/aliplayer-min.js",
      autoplay: true,
      playsinline: false,
      isLive: false,
      width: "100%",
      height: "320px",
      controlBarVisibility: "hover",
      useH5Prism: false,
      useFlashPrism: false,
      vid: "",
      playauth: "",
      source: "https://act.mcake.com/fangli/2018/pc/zhou-nian/video/zhounian-7.mp4",
      cover: "",
      format: "m3u8",
      skinLayout: [],
      x5_video_position: "top",
      x5_type: "h5",
      x5_fullscreen: false,
      x5_orientation: 2,
      autoPlayDelay: 0,
      autoPlayDelayDisplayText: "",
      dialogVisible: true,//弹框默认不显示
      playerVisible: true,
      articles: [],
      users: [],
      user: {
        id: '',
        date: '',
        name: '',
        phone: '',
        address: '',
        status: 0
      },
      words: {
        id: '',
        date: '',
        title: '',
        author: '',
        content: '',
        status: 0
      },
      articleFormVisible: false,
      rowIndex: 9999,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link'],
            ['image', 'clean']
          ]
        },
        placeholder: '请输入文章内容...',
        theme: 'snow'
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    player
  },
  mounted () {
    this.getArticles()
  },
  methods: {
    playVideo (row) {
      console.log(row)
      this.dialogVisible = true
      this.video = {}
      // courseApi.getPlayAuth(row.vid)
      //   .then(response => {
      //     this.video.vid = row.vid
      //     this.video.playauth = response.data.data.res.playAuth
      //     this.playerVisible = true
      //   })
      //   .catch(error => {

      //   })
    },
    getArticles () {
      this.loading = true
      // this.$http('/api/articles').then((res) => {
      //   this.articles = res.data
      // }).catch((err) => {
      //   console.error(err)
      // })
    },
    handleEdit (index, row) {
      this.words = Object.assign({}, row)
      this.articleFormVisible = true
      this.rowIndex = index
    },
    editArticle (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.articles.splice(this.rowIndex, 1, this.words)
          this.articleFormVisible = false
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm(`确定删除新闻 【${row.title}】 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.articles.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        console.log('取消删除')
      })
    },
    resetForm (formName) {
      this.$refs[formName].clearValidate()
    },
    mulDelete () {
      let len = this.multipleSelection.length
      if (len === 0) {
        this.$message({
          type: 'warning',
          message: '请至少选择一项！'
        })
      } else {
        this.$confirm(`确定删除选中的 ${len} 个用户吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: `成功删除了${len}条数据！`
          })
        }).catch(() => {
          console.log('取消删除')
        })
      }
    },
    selectChange (val) {
      this.multipleSelection = val
    },
    handleAdd () {
      this.dialogTitle = '新增'
      this.user = Object.assign({}, this.userBackup)
      this.userFormVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
//去除el-dialog弹框的顶部和周围的白边
/deep/.el-dialog__header {
  //height: 0;
  // display: none;
  margin-bottom: -30px; //这个值自己按情况调
}
/deep/.el-dialog__body {
  padding: 0;
  height: 100%;
  overflow: unset;
}
/deep/.el-dialog {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateY(20%);
}
/* 修改 Dialog 右上角关闭按钮 */
/deep/.el-dialog__headerbtn .el-dialog__close {
  position: absolute;
  right: 5px;
  top: 5px;
  color: #fff;
  width: 10px;
  height: 10px;
  z-index: 1000 !important;
}
//------------
.words-box {
  width: 100%;
  .tool-box {
    box-sizing: border-box;
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
  }
  .el-pagination {
    margin-top: 20px;
  }
  .quill-editor {
    height: 300px;
    margin-bottom: 20px;
  }
}
</style>
