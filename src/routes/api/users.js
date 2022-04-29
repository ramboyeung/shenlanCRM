const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
router.get("/test", (req, res) => {
  res.json({ msg: "login works" })
});
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.json({ code: 0, data: { msg: "邮箱已被注册，请更换邮箱注册！" } });
      return;
    } else {
      //const gravatar = require("gravatar");
      //const avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });

      //因gravatar在国内基本被墙，国内基本都是使用cravatar。cravatar替换gravatar,换成https://cravatar.cn/avatar/HASH
      //HASH计算的方法是先把邮箱字符串去除左右空格，再全部转为小写，最后用MD5加密，hash值前面拼接上网址就是图片的地址

      const md5 = require("js-md5");
      const HASH = md5(req.body.email);//md5加密算法能够保持数据的完整性和不变性
      const avatar = `https://cravatar.cn/avatar/${HASH}`;

      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        avatar,
        identity: req.body.identity
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json({ code: 1, data: { msg: "注册成功，请登录！", user } }))
            .catch(err => res.json(err));
        })
      });
    }

  })
});
// router.post("api/users/register/checkname", (req, res) => {
//   console.log(req.body);
//   User.findOne({ name: req.body.name }).then(name => {
//     if (name) {//用户名被占用
//       res.json({ code: 0, msg: "用户名已被占用！" })
//     } else {
//       res.json({ code: 1, msg: "用户名可以使用" })
//     }
//   });
// });
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.json({ code: 0, data: { desc: "登录页", msg: "用户不存在！" } }).status(404);
    }
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (!isMatch) {
        res.json({ code: 0, data: { desc: "登录页", msg: "密码不正确！" } }).status(400);
      }
      const curTime = (new Date()).valueOf();//返回当前时间的时间戳
      //const curTime = (new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')+".100").toString();//
      const rules = { id: user.id, name: user.name, avatar: user.avatar, identity: user.identity, date: user.date, login_time: curTime };
      const secretOrKey = require("../../config/key").secretOrKey;
      jwt.sign(rules, secretOrKey, { expiresIn: 3600 }, (err, token) => {//3600表示过期时间为1小时，单位为秒
        if (err) throw err;
        res.json({
          code: 1,
          data: {
            msg: "登录成功",
            desc: "登录页",
            token: "Bearer " + token
          }
        })
      });
    })
  })
});
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json(req.user);
});
module.exports = router;