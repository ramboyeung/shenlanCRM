const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/key").mongoURI;
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const courses = require("./routes/api/courses");
const words = require("./routes/api/words");
const uploadRouter = require("./routes/api/upLoad");
const menuLists = require("./routes/api/menuLists");
const bodyParser = require("body-parser");
const passport = require("passport");
const ejs = require("ejs");
const app = express();

mongoose.connect(db)
  .then(() => console.log("mongoDB connected"))
  .catch(err => console.log(err));

/**/
//获取post过来的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

//设置web工程的根目录
app.use(express.static(__dirname + "/"));


//配置ejs模板
app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", ejs.__express);//注意此处是双下划线！或者也可写成app.engine("html",ejs.renderFile)，这是指定ejs模板文件的后缀名
app.get('/article', function (req, res) {//路由为ejs时，发送网页
  res.render('article_ejs.html', { til: "你好a", arr: [{ msg: "今天天气八错" }, { msg: "今天我要吃肉" }] });//html中变量用<%= til %>表示即可，或者在server.js中定义app.locals["til"]="你好"。
})


// 允许跨域
app.all("*", (req, res, next) => {
  //console.log(req.headers.origin);
  //console.log(req.environ);
  res.header("Access-Control-Allow-Origin", req.headers.origin);// res.header("Access-Control-Allow-Origin", "*");

  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");//也可省事，直接设为*
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", "3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Content-Type", "multipart/form-data");
  if (req.method === "OPTIONS") res.send(200);//让options请求快速返回
  else next();
});


app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/courses", courses);
app.use("/api/words", words);

//app.use(express.static("upload"))
app.use("/api/upload", uploadRouter);

app.use("/api/menu_list", menuLists);

//app.use("/", (req, res) => res.send({ msg: "hello" }));
//----- 配置静态资源托管 -----
//app.use('/', express.static(path.join(__dirname, '/')));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});