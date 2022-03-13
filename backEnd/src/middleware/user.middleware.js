const {userFormateError, userExisted} = require("../constant/err.type")

const userValidator = async (ctx, next)=> {
  const {user_name, password} = ctx.request.body
  // 合法性
  if(!user_name || !password) {
    // 存放错误日志
    console.error('用户名或密码为空', ctx.request.body);
    // ctx.status = 400
    // ctx.body = {
    //   // code用于定位错误位置
    //   code: '10001',
    //   msg: "用户名或密码为空",
    //   result: ''
    // }

    // 通过app.emit发送错误，从而抽离错误类型
    ctx.app.emit('error', userFormateError, ctx)
    return 
  }
  // 合理性，用户存在则return，调用service层的查询接口

  // 没有错误交由下一个中间件处理
  await next()
}

module.exports = {
  userValidator
}