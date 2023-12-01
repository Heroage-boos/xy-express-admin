express框架搭建爬虫系统

参考文档地址：https://expressjs.com/

### 1.使用nodemon 第三方依赖来自动监听文件的变化并重新启动

#### 1.1 使用npm下载nodemon

```console
$ npm i nodemon
```

#### 1.2 修改npm包配置

```json
---package.json
{
  "name": "acquaintance",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.13.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```



### 2.配置express测试程序

#### 2.1 使用npm安装express 

```console
$ npm install express
```

#### 2.2 编写express测试程序

```js
---index.js
const express = require("express");
const app = express();

// 添加根路由，返回 "hello world!"
app.get("/", (req, res) => {
    res.send("hello world!");
});

// 添加测试路由，用于测试 GET 请求
app.get("/test", (req, res) => {
    res.send("This is a test route for GET request.");
});

// 添加测试路由，用于测试 POST 请求
app.post("/test", (req, res) => {
    res.send("This is a test route for POST request.");
});

// 添加测试路由，用于测试 OPTIONS 请求
app.options("/test", (req, res) => {
    res.send("This is a test route for OPTIONS request.");
});

// 添加测试路由，用于测试 DELETE 请求
app.delete("/test", (req, res) => {
    res.send("This is a test route for DELETE request.");
});

// 添加测试路由，用于测试 PUT 请求
app.put("/test", (req, res) => {
    res.send("This is a test route for PUT request.");
});

app.listen("9999", (error) => {
    if (error) {
        console.log("服务器启动失败!");
        return;
    }
    console.log("服务器启动成功!");
});

```
#### 2.3 通过浏览器测试接口

此应用程序启动服务器并侦听端口 9999 上的连接。该应用程序响应“Hello World！” 用于请求根 URL( /) 或路由。对于所有其他路径，它将响应404 Not Found。

##### 2.3.1 启动应用 npm run dev

![image-20231201101549585](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201101549585.png)

##### 2.3.2 浏览器输入链接并展示

![image-20231201101626639](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201101626639.png)

测试http://localhost:9999/test

![image-20231201101723416](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201101723416.png)

### 3.路由配置

#### 3.1 创建routes文件夹，按模块管理route

![image-20231201135428372](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201135428372.png)



```js
-routes/test.js
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
```



```js
-routes/user.js
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
```



```js
-index.js

/**
 * Express应用程序的入口文件
 * @module index
 */

const express = require("express");
const httpErrors = require("http-errors");
const testRouter = require("./routes/test");
const userRouter = require("./routes/user");

const app = express();

// 添加根路由，返回 "hello world!"
app.get("/", (req, res) => {
    res.send("hello world!");
});

app.use(testRouter);
app.use(userRouter);

// 处理404错误
app.use(function (req, res, next) {
    next(httpErrors(404));
});

// 处理异常错误
app.use(function (err, req, res, next) {
    // 设置局部变量，仅提供开发中的错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});

/**
 * 启动Express应用程序的服务器
 * @param {string} port - 服务器监听的端口号
 * @param {function} callback - 服务器启动成功后的回调函数
 */
app.listen("9999", (error) => {
    if (error) {
        console.log("服务器启动失败!");
        return;
    }
    console.log("服务器启动成功!");
});
```

#### 3.2 页面测试

基础功能测试

localhost:9999/

![image-20231201140919037](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201140919037.png)

localhost:9999/userinfo?id=10&name=hhh

![image-20231201140703908](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201140703908.png)

localhost:9999/test

![image-20231201140746462](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201140746462.png)

错误测试 localhost:9999/test/hhh

![image-20231201141006638](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201141006638.png)



### 4.使用模板引擎

可以使用模板引擎渲染页面

下载pug模板引擎

```json
$ npm install pug --save
```

在 Express 可以呈现模板文件之前，必须设置以下应用程序设置：

- `views`：模板文件所在目录。例如：`app.set('views', './views')`
- `view engine`：要使用的模板引擎。例如：`app.set('view engine', 'pug')`

在设置视图引擎之后，不必指定该引擎或者在应用程序中装入模板引擎模块；Express 在内部装入此模块.

在 `views` 目录中创建名为 `index.pug` 的 Pug 模板文件

![image-20231201151403737](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201151403737.png)

-views/index.pug

```js

extends layout

block content
  h1= title
  p Welcome to #{title}
```

-views/error.pug

```js
extends layout

block content
  h1= message
  h2= error.status
  pre #{error.stack}
```

-views/layout.pug

```js
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
  body
    block content
```

随后创建路由以呈现 `index.pug` 文件。如果未设置 `view engine` 属性，必须指定 `view` 文件的扩展名。

##### 使用模板引擎

-index.js

```js

/**
 * Express应用程序的入口文件
 * @module index
 */

const express = require("express");
const httpErrors = require("http-errors");
const path=require("path")
const testRouter = require("./routes/test");
const userRouter = require("./routes/user");

const app = express();

//使用模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 添加根路由，返回 "hello world!"
app.get("/", (req, res) => {
    res.send("hello world!");
});

app.use(testRouter);
app.use(userRouter);

// 处理404错误
app.use(function (req, res, next) {
    next(httpErrors(404));
});

// 处理异常错误
app.use(function (err, req, res, next) {
    // 设置局部变量，仅提供开发中的错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});

/**
 * 启动Express应用程序的服务器
 * @param {string} port - 服务器监听的端口号
 * @param {function} callback - 服务器启动成功后的回调函数
 */
app.listen("9999", (error) => {
    if (error) {
        console.log("服务器启动失败!");
        return;
    }
    console.log("服务器启动成功!");
});

```

##### 查看页面效果

![image-20231201151914217](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201151914217.png)

### 5.使用morgan日志服务中间件

#### 5.1 下载morgan

```console
$ npm install morgan
```

#### 5.2 使用

--index.js

```js
/**
 * Express应用程序的入口文件
 * @module index
 */

const express = require("express");
const httpErrors = require("http-errors");
const path=require("path")
const logger = require('morgan');
const testRouter = require("./routes/test");
const userRouter = require("./routes/user");

const app = express();

//使用模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//日志服务中间件
app.use(logger('dev'));

// 添加根路由，返回 "hello world!"
app.get("/", (req, res) => {
    res.send("hello world!");
});

app.use(testRouter);
app.use(userRouter);


// 处理404错误
app.use(function (req, res, next) {
    next(httpErrors(404));
});

// 处理异常错误
app.use(function (err, req, res, next) {
    // 设置局部变量，仅提供开发中的错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});

/**
 * 启动Express应用程序的服务器
 * @param {string} port - 服务器监听的端口号
 * @param {function} callback - 服务器启动成功后的回调函数
 */
app.listen("9999", (error) => {
    if (error) {
        console.log("服务器启动失败!");
        return;
    }
    console.log("服务器启动成功!");
});
```

#### 5.3 测试

![image-20231201154126198](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20231201154126198.png)



### 6.添加调试与错误处理

#### 导出app

--index.js

```js

/**
 * Express应用程序的入口文件
 * @module index
 */
const express = require("express");
const httpErrors = require("http-errors");
const path = require("path");
const logger = require('morgan'); //记录日志
var cookieParser = require('cookie-parser'); //cookie解析器
const testRouter = require("./routes/test");
const userRouter = require("./routes/user");

const app = express();

// 使用模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 日志服务中间件
app.use(logger('dev'));

app.use(express.json());//用于解析 JSON 格式的请求体 当客户端发送一个包含 JSON 数据的 POST 或 PUT 请求时，Express.js 会自动解析请求体中的 JSON 数据，使其可以通过 req.body 访问。
app.use(express.urlencoded({ extended: false }));//解析 URL 编码的请求体
app.use(cookieParser());//cookie-parser 会解析 cookies，并将结果添加到 req.cookies 对象中。
app.use(express.static(path.join(__dirname, 'public')));//配置为提供 public 目录下的静态文件

// 添加根路由，返回 "hello world!"
/**
 * 根路由处理函数
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
app.get("/", (req, res) => {
    res.send("hello world!");
});

app.use(testRouter);
app.use(userRouter);

// 处理404错误
app.use(function (req, res, next) {
    next(httpErrors(404));
});

// 处理异常错误
app.use(function (err, req, res, next) {
    // 设置局部变量，仅提供开发中的错误
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误页面
    res.status(err.status || 500);
    res.render('error');
});

// /**
//  * 启动Express应用程序的服务器
//  * @param {string} port - 服务器监听的端口号
//  * @param {function} callback - 服务器启动成功后的回调函数
//  */
// app.listen("9999", (error) => {
//     if (error) {
//         console.log("服务器启动失败!");
//         return;
//     }
//     console.log("服务器启动成功!");
// });

module.exports = app;
```

#### 安装debug

```console
$ npm install debug
```

#### 配置启动参数

--bin/www.js

```js
#!/usr/bin/env node
var app = require('../index');
var debug = require('debug')('myapp:server');
var http = require('http');

/**
 * 获取端口号
 */
var port = normalizePort(process.env.PORT || '9999');
app.set('port', port);

/**
 * 创建 HTTP 服务器。
 */
var server = http.createServer(app);

/**
 * 事件监听器，用于处理服务器的 "error" 事件。当服务器启动失败时，会触发 "error" 事件。
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
   // 命名管道
    return val;
  }

  if (port >= 0) {
    // 端口号
    return port;
  }

  return false;
}

/**
 * 事件监听器，用于处理服务器的 "error" 事件。当服务器启动失败时，会触发 "error" 事件。
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // 处理特殊的错误类型，并给出友好的错误提示
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // 处理特殊的错误类型，并给出友好的错误提示
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * 事件监听器，用于处理服务器的 "listening" 事件。当服务器开始在指定的端口上监听请求
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);//打印出服务器正在监听的地址和端口。
}
```

#### 更改npm包启动项

--package.json

```json
{
  "name": "xy-express-admin",
  "version": "1.0.0",
  "description": "express搭建爬虫系统",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon ./bin/www"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cookie-parser": "^1.4.6",
    "debug": "^4.3.4",
    "express": "^4.18.2",
    "http-errors": "^2.0.0",
    "morgan": "^1.10.0",
    "nodemon": "^3.0.1",
    "pug": "^3.0.2"
  }
}
```



### 7.express 快速应用程序生成器

以上对于学习的朋友来说可以练习，对于快速开发的同学可以直接生成程序，

可以使用应用程序生成工具`express-generator`快速创建应用程序框架。

使用以下命令运行应用程序生成器`npx`（Node.js 8.2.0 中提供）。

```console
$ npx express-generator
```

创建一个名为*myapp*的 Express 应用程序。该应用程序将在当前工作目录中名为*myapp*的文件夹中创建，并且视图引擎将设置为[Pug](https://pugjs.org/)：

```console
$ express --view=pug myapp
```

然后安装依赖项：

```console
$ cd myapp
$ npm install
```

启动程序

```console
$ npm run start
```

