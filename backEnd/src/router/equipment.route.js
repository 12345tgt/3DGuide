const Router = require('koa-router')
const {getEquipmentInfo} = require("../controller/equipment.controller")

// const { userValidator } = require("../middleware/user.middleware")

// prefix前缀
const router = new Router();

router.get('/getEquipmentInfo', getEquipmentInfo)

module.exports = router