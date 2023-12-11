/**
 * @fileoverview 封装了模拟请求的 Request 类
 * @module Request
 */

let http = require('http');
//query-string 是一个 JavaScript 库，用于解析和序列化 URL 查询字符串（即问号后面的参数部分）。通过解析 URL 查询字符串，你可以轻松地从 URL 中提取参数，或将参数序列化为字符串并附加到 URL 上。
const queryString= require('node:querystring')
/**
 * Request 模拟请求封装
 */
class Request {
    /**
     * 发送 HTTP GET 请求
     * @param {Object} config - 请求配置对象
     * @param {string} config.host - 请求的主机名
     * @param {Object} config.data - 请求的数据
     * @param {string} config.path - 请求的路径
     * @param {boolean} config.https - 是否为 HTTPS 请求
     * @param {Object} config.headers - 请求的头部信息
     * @returns {Promise} - 返回一个 Promise 对象，用于处理请求结果
     */
    static httpGet(config) {
        const header = config.headers || {};
        let options = {
            host: config.host,
            port: 80,
            path: config.path + queryString.stringify(config.data),
            method: 'GET',
            encoding: null,
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
            }
        };
        options.headers = Object.assign({}, options.headers, header);
        // 判断是否为https请求
        if (config.https) {
            http = require('https');
            options.port = 443;
        }
        return this.PromiseData(options);
    }

    /**
     * 发送 AJAX GET 请求
     * @param {string} host - 请求的主机名
     * @param {Object} data - 请求的数据
     * @param {string} path - 请求的路径
     * @param {boolean} status - 是否为 HTTPS 请求
     * @returns {Promise} - 返回一个 Promise 对象，用于处理请求结果
     */
    static ajaxGet(host, data, path, status) {
        let options = {
            host: host,
            port: 80,
            path: path + queryString.stringify(data),
            method: 'GET',
            encoding: null,
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                Connection: 'keep-alive',
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
            }
        };
        // 判断是否为https请求
        if (status) {
            http = require('https');
            options.port = 443;
        }
        return this.PromiseData(options);
    }

    /**
     * 发送移动端 HTTP GET 请求
     * @param {string} host - 请求的主机名
     * @param {Object} data - 请求的数据
     * @param {string} path - 请求的路径
     * @param {boolean} status - 是否为 HTTPS 请求
     * @returns {Promise} - 返回一个 Promise 对象，用于处理请求结果
     */
    static httpMobileGet(host, data, path, status) {
        let options = {
            host: host,
            port: 80,
            path: path + queryString.stringify(data),
            method: 'GET',
            encoding: null,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent':
                    'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'
            }
        };
        // 判断是否为https请求
        if (status) {
            http = require('https');
            options.port = 443;
        }
        return this.PromiseData(options);
    }

    /**
     * 发送 HTTP POST 请求
     * @param {Object} config - 请求配置对象
     * @param {string} config.host - 请求的主机名
     * @param {Object} config.data - 请求的数据
     * @param {string} config.path - 请求的路径
     * @param {boolean} config.status - 是否为 HTTPS 请求
     * @param {Object} config.headers - 请求的头部信息
     * @returns {Promise} - 返回一个 Promise 对象，用于处理请求结果
     */
    static httpPost({ host, data, path, status, headers = {} }) {
        let options = {
            host: host,
            port: '80',
            path: path,
            formData: data,
            method: 'post',
            headers: Object.assign(
                {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36'
                },
                headers
            )
        };
        // 判断是否为https请求
        if (status) {
            http = require('https');
            options.port = 443;
        }
        return this.PromiseData(options);
    }

    /**
     * 发送请求并返回 Promise 对象
     * @param {Object} options - 请求配置对象
     * @returns {Promise} - 返回一个 Promise 对象，用于处理请求结果
     */
    static PromiseData(options) {
        return new Promise(function (resolve, reject) {
            let body = '';
            let getReq = http.request(options, function (response) {
                response.on('data', function (chunk) {
                    body += chunk;
                });
                response.on('end', () => {
                    resolve(body);
                });
                response.on('error', err => {
                    reject(err);
                });
            });
            getReq.end();
        });
    }
}

module.exports = Request;
