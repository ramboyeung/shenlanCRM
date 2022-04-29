const express = require("express");
const router = express.Router();
const Word = require("../../models/Word");
const passport = require("passport");

router.get("/test", (req, res) => {
  res.json({ msg: "page words test works!" })
});
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const wordField = {};
  if (req.body.date) wordField.date = req.body.date;
  if (req.body.word_til) wordField.word_til = req.body.word_til;
  if (req.body.author) wordField.author = req.body.author;
  if (req.body.avatar) wordField.avatar = req.body.avatar;
  if (req.body.content) wordField.content = req.body.content;
  if (req.body.video) wordField.video = req.body.video;
  if (req.body.is_pass) wordField.is_pass = req.body.is_pass;
  new Word(wordField).save().then(Word => res.json({ code: 1, msg: "添加数据成功！", data: Word })).catch(err => res.json({ code: 0, msg: err }));
});

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  //Word.find().then(Word=>Word.length?res.json(Word):res.json({msg:"没有任何数据"})).catch(err=>console.log(err));
  Word.find({}, (err, docs) => err ? res.json({ code: 0, msg: err }) : (docs.length ? res.json({ code: 1, data: docs }) : res.json({ code: 1, msg: "没有任何数据！" })));
});
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  //按id查找写法一：模型.findById(字符串属性)
  //Word.findById(req.params.id).then(Word=>res.json(Word)).catch(err=>console.log(err));

  //按id查找写法二：模型.findOne(对象)，注意此时对象的属性写作_id
  Word.findOne({ _id: req.params.id }).then(Word => res.json({ code: 1, data: Word })).catch(err => res.json({ code: 0, msg: err }));
});

router.put("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const wordField = {};
  if (req.body.date) wordField.date = req.body.date;
  if (req.body.word_til) wordField.word_til = req.body.word_til;
  if (req.body.author) wordField.author = req.body.author;
  if (req.body.avatar) wordField.avatar = req.body.avatar;
  if (req.body.content) wordField.content = req.body.content;
  if (req.body.video) wordField.video = req.body.video;
  if (req.body.is_pass) wordField.is_pass = req.body.is_pass;
  Word.findOneAndUpdate({ _id: req.params.id }, { $set: wordField }, { new: true })
    .then(Word => res.json({ code: 1, msg: "修改数据成功！", data: Word }))
    .catch(err => res.status(400).json({ code: 0, msg: "编辑失败" }));
});

router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Word.deleteOne({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.json({ code: 0, msg: "删除失败" });
    }
    res.json(docs);//注意此处返回的是一个对象，deletedCount的值不为0表示有成功的删除操作
  });

  // Word.findOneAndRemove({_id:req.params.id},(err,docs)=>{
  //   if(err){
  //     res.json("删除失败");
  //   }
  //   res.json(docs);//注意此处返回的是删除的数据，无删除操作则返回null
  // });

  // Word.findOneAndRemove({_id:req.params.id},(err,docs)=>{
  //   if(err){
  //     res.json("删除失败")
  //   }else{
  //     Word.find({},(err,result)=>{
  //       res.json(result)
  //     });
  //   }
  // })

});
module.exports = router;