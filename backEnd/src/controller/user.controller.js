const { createUser } = require('../services/user.service')

class UserController {
  async register(ctx, next) {
    // 1. 获取请求参数
    // console.log(ctx.request.body);
    const {user_name, password} = ctx.request.body

    // 2.操作数据库
    /* 
      TODO:
      使用try catch捕获await错误
    */
    const res = await createUser(user_name, password)
    
    // 3.返回结果
    ctx.body = {
      code: 0,
      msg: "用户注册成功",
      result: {
        id: res._id,
        name: res.name,
        // password: res.password
      }
    }
    
   
    
  }

  async login(ctx, next) {
    ctx.body = '用户登录'
  }
}

module.exports = new UserController()