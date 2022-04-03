const {} = require("../constant/err.type")

const roomValidator = async (ctx, next)=> {
  // 合法性
  if(!user_name || !password) {
    // 存放错误日志
    console.error();


    // 通过app.emit发送错误，从而抽离错误类型
    // ctx.app.emit('error', userFormateError, ctx)
    return 
  }
  // 合理性

  // 没有错误交由下一个中间件处理
  await next()
}

module.exports = {
  roomValidator
}