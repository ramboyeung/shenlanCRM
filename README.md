## 项目依赖安装：
分别在根目录和client文件夹下，执行：
```
npm install
```

## 项目启动
启动项目前请安装mongoDB，并启动。然后在根目录下执行：
```
npm run dev
```


### Notice
- 本项目采用前后端分离的方式开发。
- 推荐Robomongo作为数据库的可视化管理工具，你也可以使用其他的，譬如navicat、MongoDB Compass等。
- 推荐Postman作为验证restful API的工具，你也可以使用其他的，譬如postwoman、apipost、apifox、36nu等。

## 快速启动：
分别运行以下两个文件

- 新建a.bat文件如下：
```
:: 管理员身份运行
%1 start "" mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c ""%~s0"" ::","","runas",1)(window.close)&&exit

:: 2个冒号是注释
@echo off
:: 设置颜色
color 0a
echo 你好，欢迎使用mongodb一键启动
:: 打印换行
echo.
:: 切换目录
D:
cd \ProgramFiles\MongoDB\bin
@echo 当前目录 %cd%

@echo 执行 mongodb shell
@echo 正在启动mongodb服务端
echo.

:: mongod  -- dbpath 指定mongodb存储的目录，--logpath指定日志的存放目录，必须具体到.log文件
mongod.exe --dbpath "D:\ProgramFiles\mongoDB\data\db" --logpath "D:\ProgramFiles\mongoDB\log\mongod.log"

:: pause暂停一下，让你看清启动的过程，mongodb默认启用的端口是 27017 你可以在上面指定自己的端口
pause


```


- 新建b.bat文件如下：
```
@echo off
color 0a
echo 你好，欢迎使用一键启动项目
echo.
H:
cd \shenlanCRM
@echo 当前目录 %cd%

@echo 执行 windows10 shell
@echo 正在启动命令行...
echo.
@echo 启动中，请勿关闭窗口......
npm run dev

pause

```

## package.json部分拷贝
```
"scripts": {
    "client-install": "npm install --prefix client",
    "client": "npm start --prefix client",
    "server": "node dist/index.js",
    "build": "babel src -d dist",
    "start": "nodemon --watch src --watch config src/index.js --exec babel-node",
    "dev": "concurrently \"npm run start\" \"npm run client\""
  }
```

