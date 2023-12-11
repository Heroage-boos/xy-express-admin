const app = require('express')();
const request = require('../utils/request');
const { writeToFile } = require("../utils/method")

/**
 * GET /toutiao_hot
 * @tags 24k
 * @summary 头条新闻 -0 头条热点信息
 * @description
 * @param {string}  req.query.type.require
 */
app.get('/', function (req, res) {
    const type = parseInt(req.query.type) || 0;
    console.log('req.query.type', type);
    const map = {
        0: '/hot-event/hot-board/?origin=toutiao_pc&_signature=_02B4Z6wo00901X4X10QAAIDAVZ2MgZ8Q0tF-M9PAADr3wqh8Tboxk3nJSZR.Ii9PDD4hC5GS8q30WtCKAi6rdRxkjVuM1226L.FXzQlJYgl.PKa519.BTsZ4mU9DcqI.JAPBD2i8shsoqhrg54',
    };
    const path = map[type];
    const host = 'www.toutiao.com';
    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Set-Cookie": "X_CACHE_KEY=489fd2225ee9b81067a462fe829577d0; path=/; Expires=Fri, 31-Dec-9999 23:59:59 GMT",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    }
    request
        .httpGet({ host, path, status: true, https: true, headers })
        .then(function (result) {
            console.log('result', result);
            writeToFile("./public/txt/toutiao.txt", JSON.parse(result).data)
            res.json(JSON.parse(result).data);//res.API() 是在调用Express的响应对象res的API方法，并将data作为参数传入。这个API方法可能是你在Express响应对象上自定义的一个方法，用于处理或格式化响应数据。
        })
        .catch(function (err) {
            //   res.API_ERROR('网络好像有点问题', 500);
            res.send("网络好像有点问题");
        });
});

module.exports = app;
