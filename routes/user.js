/**
 * @fileoverview 该文件包含了用于处理 GET 请求的用户路由。
 * @module routes/user
 */

const express = require("express");
const router = express.Router()

/**
 * GET /user
 * 这是一个用于处理 GET 请求的用户路由。
 * @param {Object} req - 请求对象。
 * @param {Object} res - 响应对象。
 */
router.get("/user", (req, res) => {
    res.send("这是一个用于处理 GET 请求的用户路由");
})

router.get("/userInfo", (req, res) => {
    const {id,name}=req.query
    res.send("用户id"+id+"\r用户姓名"+name);
})

module.exports = router


