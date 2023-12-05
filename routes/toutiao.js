// router.js
const express = require('express');
const router = express.Router();
const toutiaoController = require('../controller/routiaoController');

router.get('/toutiao/hot_list', async (req, res) => {
    const targetUrl = "https://www.zhihu.com";
    const header = {
        Cookie: "z_c0=2|1:0|10:1701673875|4:z_c0|92:Mi4xMmFRQkVRQUFBQUFBb0JYYU5QN01GeVlBQUFCZ0FsVk5rOGxhWmdBbTNQQTduOFVmWXlXV2xVNS01NWNrREJocnVn|4bbf25628b6fa401d6b6acf497377165cedaee7563d2d05f068f3dcd6920b901"
    }
    try {
        const html = await toutiaoController.fetchHTML(targetUrl, header);
        const info = toutiaoController.extractInformation(html);
        toutiaoController.writeToFile('filename', info);
        res.json(info);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;