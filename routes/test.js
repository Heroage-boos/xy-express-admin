/**
 * @fileoverview 路由文件，包含用于测试不同请求方法的路由。
 * @module routes/test
 */

const express = require("express");
const router = express.Router()

/**
 * GET请求测试路由
 * @name GET /test
 * @function
 * @memberof module:routes/test
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
router.get("/test", (req, res) => {
    res.send("This is a test route for GET request.");
});

/**
 * POST请求测试路由
 * @name POST /test
 * @function
 * @memberof module:routes/test
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
router.post("/test", (req, res) => {
    res.send("This is a test route for POST request.");
});

/**
 * OPTIONS请求测试路由
 * @name OPTIONS /test
 * @function
 * @memberof module:routes/test
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
router.options("/test", (req, res) => {
    res.send("This is a test route for OPTIONS request.");
});

/**
 * DELETE请求测试路由
 * @name DELETE /test
 * @function
 * @memberof module:routes/test
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
router.delete("/test", (req, res) => {
    res.send("This is a test route for DELETE request.");
});

/**
 * PUT请求测试路由
 * @name PUT /test
 * @function
 * @memberof module:routes/test
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
router.put("/test", (req, res) => {
    res.send("This is a test route for PUT request.");
});

module.exports = router
