const Router = require('koa-router')
const {getRoomInfo, createRoom, getFloorRooms, updateRoomInfo} = require("../controller/room.controller")

// const { userValidator } = require("../middleware/user.middleware")
/* 
  TODO: 
    添加房间验证，如房间已创建
    完善房间更新接口
*/

// prefix前缀
const router = new Router();

router.post('/createRoom', createRoom)

router.get('/getRoomInfo', getRoomInfo)

router.get('/getFloorRooms',getFloorRooms)

router.post('/updateRoomInfo', updateRoomInfo)

module.exports = router