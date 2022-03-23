const Koa = require('koa');
const koaBody = require('koa-body')

const { roomRouter } = require('../router');
const errHandler = require('./errHandler');


const app = new Koa();


// 注册中间件，只能接收函数作为参数。注意use顺序会决定中间件执行顺序
app
  // koaBody将请求字段写到ctx.request.body中
  .use(koaBody())
  .use(roomRouter.routes())
  //  .use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app