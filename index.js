
/**
 * Express应用程序的入口文件
 * @module index
 */

const express = require("express");
const httpErrors = require("http-errors");
const path = require("path");
const logger = require('morgan'); //记录日志
var cookieParser = require('cookie-parser'); //cookie解析器
const testRouter = require("./routes/test");
const userRouter = require("./routes/user");

const app = express();

// 使用模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 日志服务中间件
app.use(logger('dev'));

app.use(express.json());//用于解析 JSON 格式的请求体 当客户端发送一个包含 JSON 数据的 POST 或 PUT 请求时，Express.js 会自动解析请求体中的 JSON 数据，使其可以通过 req.body 访问。
app.use(express.urlencoded({ extended: false }));//解析 URL 编码的请求体
app.use(cookieParser());//cookie-parser 会解析 cookies，并将结果添加到 req.cookies 对象中。
app.use(express.static(path.join(__dirname, 'public')));//配置为提供 public 目录下的静态文件

// 添加根路由，返回 "hello world!"
/**
 * 根路由处理函数
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
app.get("/", (req, res) => {
    res.send("hello world!");
});

app.use(testRouter);
app.use(userRouter);

// 处理404错误
app.use(function (req, res, next) {
    next(httpErrors(404));
});

// 处理异常错误
app.use(function (err, req, res, next) {
    // 设置局部变量，仅提供开发中的错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});

// /**
//  * 启动Express应用程序的服务器
//  * @param {string} port - 服务器监听的端口号
//  * @param {function} callback - 服务器启动成功后的回调函数
//  */
// app.listen("9999", (error) => {
//     if (error) {
//         console.log("服务器启动失败!");
//         return;
//     }
//     console.log("服务器启动成功!");
// });

module.exports = app;

