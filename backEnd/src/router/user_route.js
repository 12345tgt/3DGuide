const Router = require('koa-router')

const { userValidator } = require("../middleware/user.middleware")
const { register, login } = require('../controller/user.controller')

// prefix前缀
const router = new Router({ prefix: '/users' });

// // GET /users/
// router.get('/', (ctx, next)=> {
//   ctx.body = 'user_route.js'
// })

// 注册接口,userValidator中间件做验证（错误处理）
router.post('/register', userValidator, register)

// 登录接口
router.post('/login', login)


module.exports = router