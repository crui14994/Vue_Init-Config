var express = require("express");

var app = express();
// 引入json解析中间件
var bodyParser = require('body-parser');
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.post("/login", function (_req, res) {
    if (_req.body.username === 'admin' && _req.body.password === 'admin') {
        res.send(
            {
                token: "admin"
            }
        )
    } else if (_req.body.username === 'editor' && _req.body.password === 'editor') {
        res.send(
            {
                token: "editor"
            }
        )
    } else {
        res.send("登录账号不对" + _req.body.username)
    }

});

app.get("/userInfo", function (_req, res) {
    if (_req.query.token === 'admin') {
        res.send({
            role: ['admin'],
            token: 'admin',
            introduction: '我是超级管理员',
            name: 'Super Admin',
            uid: '001'
        })
    } else if (_req.query.token === 'editor') {
        res.send({
            role: ['editor'],
            token: 'editor',
            introduction: '我是编辑',
            name: 'Normal Editor',
            uid: '002'
        })
    } else {
        res.send("登录失败")
    }

});

app.listen(3000);