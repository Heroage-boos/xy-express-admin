const app = require('express')();
const request = require('../utils/request');
const {writeToFile} =require("../utils/method")

/**
 * GET /api/24k/hot
 * @tags 24k
 * @summary 头条新闻
 * @description
 * @param {string}  req.query.type.require
 */
app.get('/', function (req, res) {
    const type = parseInt(req.query.type) || 0;
    console.log('req.query.type', type);
    //100007微博热搜榜--0   100000百度热点--1  100012微信24h热文--2  100015知乎热榜--3  100020抖音热点榜--4
    const map = {
        0: '/search/suggest/hot_words/?_signature=_02B4Z6wo009019NKs6QAAIDC-MDoYT3MUH.TbrcAAJGpzL4z8fRrp0tMano8ZCWFiR6GrxxO4N7.pc5W4ckQkbM-H9Jt8iM7YrFRKS8Od8DErBnwt.4YHTPM3f8HeurJpAv0OMTsF-pOZ01a7b',
    };
    const path = map[type];
    const host = 'www.toutiao.com';
    const headers = {
        "Content-Type": "application/json;charset=UTF-8",
        "Set-Cookie": "X_CACHE_KEY=489fd2225ee9b81067a462fe829577d0; path=/; Expires=Fri, 31-Dec-9999 23:59:59 GMT",
    }
    request
        .httpGet({ host, path, status: true, https: true, headers })
        .then(function (result) {
            console.log('result', result);
            writeToFile("./public/txt/toutiao.txt",JSON.parse(result).data)
            res.json(JSON.parse(result).data);//res.API() 是在调用Express的响应对象res的API方法，并将data作为参数传入。这个API方法可能是你在Express响应对象上自定义的一个方法，用于处理或格式化响应数据。
        })
        .catch(function (err) {
            //   res.API_ERROR('网络好像有点问题', 500);
            res.send("网络好像有点问题");
        });
});

module.exports = app;
