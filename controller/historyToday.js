/**
 * require('express')这部分代码是在导入Express模块。在Node.js中，require函数用于导入其他模块。这里，我们导入了名为'express'的模块。
   ()这部分代码是在调用Express模块导出的函数，以创建一个新的Express应用。这个应用可以用来设置路由、监听请求等。
 */
const app = require('express')();
const cheerio = require('cheerio');
const axios = require("axios")
const { writeToFile } = require('../utils/method');

app.get('/', async (req, res) => {
    console.log("req", req.query);
    //获取当前日期的年月日
    const { year, month, day, id } = req.query

    let targetUrl = "https://today.supfree.net/"
    if (id) {
        targetUrl += `/sheshou.asp?id=${id}`
    } else if (month && day) {
        targetUrl += `/sheshou.asp?m=${month}&d=${day}`

    } else if (year) {
        targetUrl += `/mojie.asp?y=${year}`

    } else {
        res.send("参数错误");
    }
    const headers = {
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    }
    try {
        console.log("1111", targetUrl)
        const html = await axios.get(targetUrl, { headers });
        console.log("html", html)
        const data = extractInformation(html.data);
        writeToFile('./public/txt/history_today.txt', data);
        res.json(data);
    } catch (err) {
        res.status(500).send('Server Error!');
    }
});

//筛选有效信息
function extractInformation(html) {
    const $ = cheerio.load(html);
    console.log("$$$$$", $)
    const yearInfo = $('div.cdiv > p:first-child > a:nth-child(1)').map((i, el) => {
        const yearTitle = $(el).text()
        const href = $(el).attr('href');
        const yearId = href.split('=')[1];
        return { yearTitle, yearId };
    })
    const monthDayInfo = $('div.cdiv > p:first-child > a:nth-child(2)').map((i, el) => {
        const monthDayTitle = $(el).text()
        const href = $(el).attr('href');
        const monthId = href.split('=')[1].split("&")[0];
        const dayId = href.split('=')[2];
        return { monthDayTitle, monthId, dayId };
    })

    const todayTitle = $('div.cdiv > p:first-child > a:nth-child(3)').map((i, el) => {
        const title = $(el).text()
        const href = $(el).attr('href');
        const id = href.split('=')[1];
        return { title, id };
    })

    let todayInfo = []
    for (let i = 0; i < yearInfo.length; i++) {
        todayInfo.push({
            yearTitle: yearInfo[i].yearTitle,
            yearId: yearInfo[i].yearId,
            monthDayTitle: monthDayInfo[i].monthDayTitle,
            monthId: monthDayInfo[i].monthId,
            dayId: monthDayInfo[i].dayId,
            title: todayTitle[i].title,
            titleId: todayTitle[i].id,
        });
    }
    return { todayInfo };
}

module.exports = app;
