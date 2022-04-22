const Router = require('koa-router')
const {getEquipmentInfo, createEquipment} = require("../controller/equipment.controller");
const { route } = require('./room_route');

// const { userValidator } = require("../middleware/user.middleware")

// prefix前缀
const router = new Router();

router.post('/createEquipment', createEquipment)

router.get('/getEquipmentInfo', getEquipmentInfo)


module.exports = router