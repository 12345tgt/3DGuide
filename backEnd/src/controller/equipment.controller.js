const { dbGetEquipmentInfo, dbCreateEquipment } = require('../services/equipment.service')
const { eqptCreationError, eqptQueryError } = require('../constant/err.type')

class EquipmentController {
  // 创建设备信息
  async createEquipment(ctx, next) {
    // console.log(ctx.request.body);
    const {roomNum, name, position, desc } = ctx.request.body

    try {
      const res = await dbCreateEquipment({roomNum, name, position, desc})
      ctx.body = {
        code: 0,
        msg: "创建设备信息成功",
        result: res
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', eqptCreationError, ctx)
      return
    }

    next()
  }

  // 获取房间中所有设备的信息
  async getEquipmentInfo(ctx, next) {
    // console.log(ctx.query);
    // 获取查询字符串
    const {roomNum} = ctx.query
    // console.log("roomNumber",roomNumber,typeof roomNumber);

    // 2.操作数据库
    // 调用service层前最好都使用try catch捕获await错误
    
    try{
      const res = await dbGetEquipmentInfo(roomNum)
      ctx.body = {
        code: 0,
        msg: "获取设备信息成功",
        result: res
      }
    } catch(err) {
      console.log(err);
      ctx.app.emit('error', eqptQueryError, ctx)
      return
    }
    
    next()
  }
}

module.exports = new EquipmentController()