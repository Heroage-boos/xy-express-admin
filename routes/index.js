const zhihu = require("./zhihu")
const toutiao=require("./toutiao")
const routers = [
    //默认

    //知乎
    ...zhihu,
    ...toutiao,
    {
      path:"/history/today",
      component:"./controller/historyToday.js"
    }
]

module.exports = routers