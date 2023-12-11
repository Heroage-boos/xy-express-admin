/**
 * require('express')这部分代码是在导入Express模块。在Node.js中，require函数用于导入其他模块。这里，我们导入了名为'express'的模块。
   ()这部分代码是在调用Express模块导出的函数，以创建一个新的Express应用。这个应用可以用来设置路由、监听请求等。
 */
const app = require('express')();
const cheerio = require('cheerio');
const axios = require("axios")
const { writeToFile } = require('../utils/method');

app.get('/', async (req, res) => {
    const targetUrl = "https://zh.wikipedia.org/wiki/Wikipedia:%E5%8E%86%E5%8F%B2%E4%B8%8A%E7%9A%84%E4%BB%8A%E5%A4%A9";
    const header = {
        Cookie: "GeoIP=HK:::22.26:114.17:v4; zhwikimwuser-sessionId=a93a4e5bfcea0434e753; WMF-Last-Access=08-Dec-2023; WMF-Last-Access-Global=08-Dec-2023; NetworkProbeLimit=0.001",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    }
    try {
        console.log("1111")
        const html = await axios.get(targetUrl, { headers: header });
        console.log("html", html)
        const info = extractInformation(html);
        writeToFile('./public/txt/history_today.txt', info);
        res.json(info);
    } catch (err) {
        res.status(500).send('Server Error!');
    }
});

//筛选有效信息
function extractInformation(html) {
    const $ = cheerio.load(html);
    console.log("$$$$$", $)
    const date = $('.mw-content-ltr > table > .mw-heading .mw-headline').map((i, el) => $(el).text()).get();
    const content = $('.mw-content-ltr > table > .selected-anniversary').map((i, el) => $(el).text()).get();
    return { date, content };
}

module.exports = app;
