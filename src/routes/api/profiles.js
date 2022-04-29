const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const passport = require("passport");

router.get("/test", (req, res) => {
  res.json({ msg: "profile works" })
});
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const profileField = {};
  if (req.body.date) profileField.date = req.body.date;
  if (req.body.type) profileField.type = req.body.type;
  if (req.body.description) profileField.description = req.body.description;
  if (req.body.income) profileField.income = req.body.income;
  if (req.body.expend) profileField.expend = req.body.expend;
  if (req.body.cash) profileField.cash = req.body.cash;
  if (req.body.remark) profileField.remark = req.body.remark;
  new Profile(profileField).save().then(profile => res.json({ code: 1, msg: "添加数据成功！", data: profile })).catch(err => res.json({ code: 0, msg: err }));
});

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  //Profile.find().then(profile=>profile.length?res.json(profile):res.json({msg:"没有任何数据"})).catch(err=>console.log(err));
  Profile.find({}, (err, docs) => err ? res.json({ code: 0, msg: err }) : (docs.length ? res.json({ code: 1, data: docs }) : res.json({ code: 1, msg: "没有任何数据！" })));
});
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  //按id查找写法一：模型.findById(字符串属性)
  //Profile.findById(req.params.id).then(profile=>res.json(profile)).catch(err=>console.log(err));

  //按id查找写法二：模型.findOne(对象)，注意此时对象的属性写作_id
  Profile.findOne({ _id: req.params.id }).then(profile => res.json({ code: 1, data: profile })).catch(err => res.json({ code: 0, msg: err }));
});

router.put("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const profileField = {};
  if (req.body.date) profileField.date = req.body.date;
  if (req.body.type) profileField.type = req.body.type;
  if (req.body.description) profileField.description = req.body.description;
  if (req.body.income) profileField.income = req.body.income;
  if (req.body.expend) profileField.expend = req.body.expend;
  if (req.body.cash) profileField.cash = req.body.cash;
  if (req.body.remark) profileField.remark = req.body.remark;
  Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileField }, { new: true })
    .then(profile => res.json({ code: 1, msg: "修改数据成功！", data: profile }))
    .catch(err => res.status(400).json({ code: 0, msg: "编辑失败" }));
});

router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.deleteOne({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.json({ code: 0, msg: "删除失败" });
    }
    res.json(docs);//注意此处返回的是一个对象，deletedCount的值不为0表示有成功的删除操作
  });

  // Profile.findOneAndRemove({_id:req.params.id},(err,docs)=>{
  //   if(err){
  //     res.json("删除失败");
  //   }
  //   res.json(docs);//注意此处返回的是删除的数据，无删除操作则返回null
  // });

  // Profile.findOneAndRemove({_id:req.params.id},(err,docs)=>{
  //   if(err){
  //     res.json("删除失败")
  //   }else{
  //     Profile.find({},(err,result)=>{
  //       res.json(result)
  //     });
  //   }
  // })

});
module.exports = router;