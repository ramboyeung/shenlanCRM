const express = require("express");
const router = express.Router(); // 引入express路由
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const passport = require("passport");

/*
  multer是node的中间件, 处理表单数据 主要用于上传文件  multipart/form-data
*/


// 指定存储位置
const storage = multer.diskStorage({
  // 存储位置
  destination (req, file, callback) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate();
    const dir = "./uploads/" + year + month + day;

    //判断目录是否存在，没有则创建
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      });
    }

    // 参数一 错误信息   参数二  上传路径（此处指定dir文件夹）
    callback(null, dir); //dir就是上传文件存放的目录
  },
  // 确定文件名
  filename (req, file, cb) {
    const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);//fileName就是上传文件的文件名
    cb(null, Date.now() + fileName)
  }
})

// 得到multer对象  传入storage对象
const upload = multer({ storage })

//定义接口
router.post("/upload", passport.authenticate("jwt", { session: false }), upload.single("file"), (req, res) => { // upload.single("file")挂载中间件
  // 需要返回图片的访问地址    域名+文件名
  const url = "http://localhost:5000/" + req.file.filename
  res.json({ url })
})

module.exports = router;

//注意：post请求的中间件 upload.single('file') 中的参数要和前端 formData.append('file',this.file); 中的键名保持一致。