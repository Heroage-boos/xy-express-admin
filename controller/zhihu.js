/**
 * require('express')这部分代码是在导入Express模块。在Node.js中，require函数用于导入其他模块。这里，我们导入了名为'express'的模块。
   ()这部分代码是在调用Express模块导出的函数，以创建一个新的Express应用。这个应用可以用来设置路由、监听请求等。
 */
const app = require('express')();
const cheerio = require('cheerio');
const axios = require("axios")
const { writeToFile } = require('../utils/method');

app.get('/', async (req, res) => {
    const targetUrl = "https://www.zhihu.com/";
    const headers = {
        Cookie: "z_c0=2|1:0|10:1701746396|4:z_c0|92:Mi4xMmFRQkVRQUFBQUFBb0JYYU5QN01GeGNBQUFCZ0FsVk4yLVJiWmdCcnJCMXE0N2NTam4yM2o4c3ZwRzNseVZySy1B|5764fb4372f14544c7aaa999bcfcb0079bc1346d16db63d6a8a4a12a31004bd5"
    }

    try {
        const html = await axios.get(targetUrl, {
            headers
        });
        const info = extractInformation(html);
        writeToFile('./public/txt/zhihu.txt', info);
        res.json(info);
    } catch (err) {
        console.log('err', err)
        res.status(500).send('Server Error!');
    }
});

//筛选有效信息
function extractInformation(html) {
    console.log("知乎htmlhtml", html);
    const $ = cheerio.load(html.data);
    const titles = $('h2.ContentItem-title').map((i, el) => $(el).text()).get();
    const content = $('div.RichContent-inner > .css-376mun > span.RichText').map((i, el) => $(el).text()).get();
    return { titles, content };
}

module.exports = app;

