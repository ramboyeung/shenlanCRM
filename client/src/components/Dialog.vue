<template>
  <div class="dialog_c">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-press-esape="false"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      class="dialogClass"
      align="left"
    >
      <el-form
        :model="formData"
        ref="foundForm"
        :rules="foundRules"
        label-width="100px"
        size="small"
      >
        <el-form-item label="收支类型：" :prop="formData.type">
          <el-select v-model="formData.type" placeholder="请选择收支类型">
            <el-option label="优惠券" value="优惠券"></el-option>
            <el-option label="发票" value="发票"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述：" :prop="formData.description">
          <el-input
            type="description"
            v-model="formData.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="收入：" :prop="formData.income">
          <el-input
            type="income"
            v-model="formData.income"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="支出：" :prop="formData.expend">
          <el-input
            type="expend"
            v-model="formData.expend"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="现金：" :prop="formData.cash">
          <el-input
            type="cash"
            v-model="formData.cash"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="dialog.show = false">取消</el-button>
        <el-button type="info" @click="onSubmit('foundForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialog_c',
  props: {
    dialog: Object,
    formData: Object
  },
  data () {
    return {
      foundRules: {
        income: [{ required: true, message: "收入不能为空！", trigger: "blur" }],
        expend: [{ required: true, message: "支出不能为空！", trigger: "blur" }],
        cash: [{ required: true, message: "现金不能为空！", trigger: "blur" }],
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;//验证失败不再往下执行

        const url = this.dialog.option === "add" ? "add" : `edit/${this.formData.id}`;
        if (url === "add") {
          this.$axios.post(`/profiles/${url}`, this.formData).then(res => {
            //console.log(res.data.code);
            if (res.data.code) {
              this.$message({ message: "添加成功！", type: "success" });//提示
              this.dialog.show = false;//关弹窗
              this.$emit("update");//回显
            } else {
              this.$message({ message: "添加失败！", type: "error" });//提示
              this.dialog.show = false;//关弹窗
            }
          });
        } else {
          this.$axios.put(`/profiles/${url}`, this.formData).then(res => {
            if (res.data.code) {
              this.$message({ message: "数据修改成功！", type: "success" });//提示
              this.dialog.show = false;//关弹窗
              this.$emit("update");//回显
            } else {
              this.$message({ message: "修改失败！", type: "error" });//提示
              this.dialog.show = false;//关弹窗
            }
          });
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.dialogClass {
  .el-dialog {
    .el-dialog__body {
      //border-top: 1px solid #dcdfe6;
      //border-bottom: 1px solid #dcdfe6;
      max-height: 500px !important;
      min-height: 100px;
      overflow-y: hidden;
    }
  }
}
</style>
