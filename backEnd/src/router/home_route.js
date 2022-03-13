const Router = require('koa-router')

// prefix前缀
const router = new Router({ prefix: '/home' });

// GET /users/
router.get('/', (ctx, next)=> {
  ctx.body = 'home_route.js'
})

module.exports = router