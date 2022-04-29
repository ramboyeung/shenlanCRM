const express = require("express");
const router = express.Router();
const passport = require("passport");
const MenuList = require("../../models/MenuList");

router.get("/test", (req, res) => {
  res.json({ msg: "menu_list works" })
});
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  MenuList.find({}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  MenuList.find({}, (err, docs) => {
    if (err) throw err;
    //get all data
    var result = [];//存放起始对象
    var allMenu = docs;//获取数据库查出的全部json对象
    for (i = 0; i < allMenu.length; i++) {
      if (allMenu[i].id == req.params.id) {
        result.push(allMenu[i]);//根据id号获取根对象
        break;
      }
    }
    //judege result exist or not
    if (result.length == 0) {
      return res.json('Failed! id is not exist!');
    } else {
      result.sub = [];
      result.sub = getAllChild(result);//调用
      res.json(result[0]);
    }
    //find some item all child
    function findItemChild (item) {
      var arrayList = [];
      for (var i in allMenu) {
        if (allMenu[i].parent == item.id) {
          arrayList.push(allMenu[i]);
        }
      }
      return arrayList;
    }
    //get all child
    function getAllChild (array) {
      var childList = findItemChild(array[0]);
      if (childList == null) {
        return [];
      }
      else {
        for (var j in childList) {
          childList[j].sub = [];
          childList[j].sub = getAllChild([childList[j]]);
        }
        array[0].sub = childList;
      }
      return childList;
    }
  });
});

module.exports = router;

/*
树形菜单的数据库存储结构：[
  {
    "id": 1,
    "name": "111",
    "parent": null,
    "icon": "555,,"
  },
  {
    "id": 2,
    "name": "极地测试菜单2",
    "parent": 1,
    "icon": "/img/002.png"
  },
  {
    "id": 4,
    "name": "555",
    "parent": 2,
    "icon": "88"
  },
  {
    "id": 5,
    "name": "ddd",
    "parent": 2,
    "icon": "555.png"
  },
  {
    "id": 6,
    "name": "666",
    "parent": 4,
    "icon": null
  },
  {
    "id": 7,
    "name": "777",
    "parent": 5,
    "icon": null
  },
  {
    "id": 9,
    "name": "8888",
    "parent": 1,
    "icon": null
  },
  {
    "id": 10,
    "name": "9999",
    "parent": 9,
    "icon": null
  },
  {
    "id": 11,
    "name": "10000",
    "parent": 1,
    "icon": null
  }
]

需要转化为结构：{
  "id": 1,
    "name": "111",
      "parent": null,
        "icon": "555,,",
          "sub": [
            {
              "id": 2,
              "name": "极地测试菜单2",
              "parent": 1,
              "icon": "/img/002.png",
              "sub": [
                {
                  "id": 4,
                  "name": "555",
                  "parent": 2,
                  "icon": "88",
                  "sub": [
                    {
                      "id": 6,
                      "name": "666",
                      "parent": 4,
                      "icon": null,
                      "sub": []
                    }
                  ]
                },
                {
                  "id": 5,
                  "name": "ddd",
                  "parent": 2,
                  "icon": "555.png",
                  "sub": [
                    {
                      "id": 7,
                      "name": "777",
                      "parent": 5,
                      "icon": null,
                      "sub": []
                    }
                  ]
                }
              ]
            },
            {
              "id": 9,
              "name": "8888",
              "parent": 1,
              "icon": null,
              "sub": [
                {
                  "id": 10,
                  "name": "9999",
                  "parent": 9,
                  "icon": null,
                  "sub": []
                }
              ]
            },
            {
              "id": 11,
              "name": "10000",
              "parent": 1,
              "icon": null,
              "sub": []
            }
          ]
}
*/