<template>
  <div>
    <div>
      <input type="file" @change="fileSelect($event)" />
      <button @click="fileSubmit">上传</button>
    </div>
    <div class="progress-wrap">
      <p>上传进度</p>
      <p class="progress"><span :style="style"></span></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      file: {}, //上传的文件对象
      progressBar: 0 // 记录上传进度的变量
    }
  },
  computed: {
    style () { // 进度条样式
      return {
        width: this.progressBar + "%"
      }
    }
  },
  methods: {
    fileSelect (e) {
      this.file = e.target.files[0]
    },
    async fileSubmit () {
      const formData = new FormData();
      formData.append('file', this.file);
      await this.$axios.post('http://localhost:5000/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          this.progressBar = percentCompleted
        }
      }).then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style>
.progress-wrap {
  width: 300px;
}
.progress-wrap p {
  width: 100%;
}
.progress {
  background-color: #c5c8ce;
  height: 20px;
}
.progress span {
  display: block;
  background-color: #19be6b;
  height: 100%;
  width: 0;
}
</style>