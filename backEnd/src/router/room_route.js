const Router = require('koa-router')
const {getRoomInfo, createRoom} = require("../controller/room.controller")

// const { userValidator } = require("../middleware/user.middleware")

// prefix前缀
const router = new Router();

router.post('/createRoom', createRoom)

router.get('/getRoomInfo', getRoomInfo)

module.exports = router