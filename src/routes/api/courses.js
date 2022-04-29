const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");
const passport = require("passport");
const mongoose = require("mongoose");

router.get("/test", (req, res) => {
  res.json({ msg: "course works" })
});
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const courseField = {};
  if (req.body.date) courseField.date = req.body.date;
  if (req.body.teacher) courseField.teacher = req.body.teacher;
  if (req.body.course_nm) courseField.course_nm = req.body.course_nm;
  if (req.body.introduce) courseField.introduce = req.body.introduce;
  if (req.body.is_free) courseField.is_free = req.body.is_free;
  if (req.body.price) courseField.price = req.body.price;
  if (req.body.book_rec) courseField.book_rec = req.body.book_rec;
  new Course(courseField).save().then(course => res.json({ code: 1, msg: "添加数据成功！", data: course })).catch(err => res.json({ code: 0, msg: err }));
});

//搜索接口：前端按?传参查询
router.get("/search", passport.authenticate("jwt", { session: false }), (req, res) => {
  //Course.find({"teacher": { $regex: req.query.teacher } }, (err, docs) => err ? res.json({ code: 0, msg: err }) : (docs.length ? res.json({ code: 1, data: docs }) : res.json({ code: 1, msg: "没有任何数据！" })));
  switch (JSON.stringify(req.query) === '{}') {
    case true://为空
      Course.find({}, (err, docs) => err ? res.json({ code: 0, msg: err }).status(400) : (docs.length ? res.json({ code: 1, data: docs }) : res.json({ code: 1, msg: "没有查询到任何数据！" })));

      break;
    default:
      if (req.query.id) {
        const id = req.query.id;
        const sid = mongoose.Types.ObjectId(id);
        //前端需要按?id查：
        Course.find({ "_id": sid }, (err, docs) => err ? res.json({ code: 0, msg: err }).status(400) : (docs.length ? res.json({ code: 1, data: docs }) : res.json({ code: 1, msg: "没有查询到任何数据！" })));
      } else {

        //注意数据库查询前端的字段，如果后台错误，不一定有error返给前端，有时可能为空，所以如果发生错误，msg请一定不要用error代替
        Course.find({ $or: [{ "teacher": req.query.teacher }, { "price": req.query.price }, { "book_rec": req.query.book_rec }] }, (err, docs) => err ? res.json({ code: 0, msg: err }).status(400) : (docs.length ? res.json({ code: 1, data: docs }) : res.json({ code: 1, msg: "没有查询到任何数据！" })));
      }
  }

});

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  //Course.find().then(course=>course.length?res.json(course):res.json({msg:"没有任何数据"})).catch(err=>console.log(err));
  Course.find({}, (err, docs) => err ? res.json({ code: 0, msg: err }) : (docs.length ? res.json({ code: 1, data: docs }) : res.json({ code: 1, msg: "没有任何数据！" })));
});
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  //按id查找写法一：模型.findById(字符串属性)
  //Course.findById(req.params.id).then(course=>res.json(course)).catch(err=>console.log(err));

  //按id查找写法二：模型.findOne(对象)，注意此时对象的属性写作_id
  Course.findOne({ _id: req.params.id }).then(course => res.json({ code: 1, data: course })).catch(err => res.json({ code: 0, msg: err }));
});

router.put("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const courseField = {};
  if (req.body.date) courseField.date = req.body.date;
  if (req.body.teacher) courseField.teacher = req.body.teacher;
  if (req.body.course_nm) courseField.course_nm = req.body.course_nm;
  if (req.body.introduce) courseField.introduce = req.body.introduce;
  if (req.body.is_free) courseField.is_free = req.body.is_free;
  if (req.body.price) courseField.price = req.body.price;
  if (req.body.book_rec) courseField.book_rec = req.body.book_rec;
  Course.findOneAndUpdate({ _id: req.params.id }, { $set: courseField }, { new: true })
    .then(course => res.json({ code: 1, msg: "修改数据成功！", data: course }))
    .catch(err => res.status(400).json({ code: 0, msg: "编辑失败" }));
});

router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Course.deleteOne({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.json({ code: 0, msg: "删除失败" });
    }
    res.json(docs);//注意此处返回的是一个对象，deletedCount的值不为0表示有成功的删除操作
  });

  // Course.findOneAndRemove({_id:req.params.id},(err,docs)=>{
  //   if(err){
  //     res.json("删除失败");
  //   }
  //   res.json(docs);//注意此处返回的是删除的数据，无删除操作则返回null
  // });

  // Course.findOneAndRemove({_id:req.params.id},(err,course)=>{
  //   if(err){
  //     res.json("删除失败")
  //   }else{
  //     Course.find({},(err,result)=>{
  //       res.json(result)
  //     });
  //   }
  // })

});
module.exports = router;