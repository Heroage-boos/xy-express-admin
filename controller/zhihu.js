/**
 * require('express')这部分代码是在导入Express模块。在Node.js中，require函数用于导入其他模块。这里，我们导入了名为'express'的模块。
   ()这部分代码是在调用Express模块导出的函数，以创建一个新的Express应用。这个应用可以用来设置路由、监听请求等。
 */
const app = require('express')();
const cheerio = require('cheerio');
const { writeToFile } = require('../utils/method');
const { fetchHTML } = require('../utils/request');

app.get('/', async (req, res) => {
    const targetUrl = "https://www.zhihu.com";
    const header = {
        Cookie: "z_c0=2|1:0|10:1701746396|4:z_c0|92:Mi4xMmFRQkVRQUFBQUFBb0JYYU5QN01GeGNBQUFCZ0FsVk4yLVJiWmdCcnJCMXE0N2NTam4yM2o4c3ZwRzNseVZySy1B|5764fb4372f14544c7aaa999bcfcb0079bc1346d16db63d6a8a4a12a31004bd5"
    }
    try {
        const html = await fetchHTML(targetUrl, header);
        const info = extractInformation(html);
        writeToFile('filename', info);
        res.json(info);
    } catch (err) {
        res.status(500).send('Server Error!');
    }
});

//筛选有效信息
function extractInformation(html) {
    const $ = cheerio.load(html);
    const titles = $('h2.ContentItem-title').map((i, el) => $(el).text()).get();
    const content = $('div.RichContent-inner > .css-376mun > span.RichText').map((i, el) => $(el).text()).get();
    return { titles, content };
}

module.exports = app;
