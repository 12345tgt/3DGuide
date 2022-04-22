const { queryRoomInfo, dbCreateRoom } = require('../services/room.service')
const { roomCreationError, roomQueryError } = require('../constant/err.type')

class RoomController {
  async createRoom(ctx, next) {
    const { roomNum, name, type, panoUrl} = ctx.request.body

    try {
      const res = await dbCreateRoom({roomNum, name, type, panoUrl})
      ctx.body = {
        code: 0,
        msg: "创建教室信息成功",
        result: res
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', roomCreationError, ctx)
      return
    }

    next()
  }


  async getRoomInfo(ctx, next) {
    // console.log(ctx.query);
    // 获取查询字符串
    const {roomNumber} = ctx.query
    // console.log("roomNumber",roomNumber,typeof roomNumber);

    // 2.操作数据库
    // 调用service层前最好都使用try catch捕获await错误
    
    try{
      const res = await queryRoomInfo(roomNumber)
      ctx.body = {
        code: 0,
        msg: "获取教室信息成功",
        /* 
          {
            "教室类型": "多媒体教室",
            "教室名称": "xxx实验室"
          }
        */
        result: res
      }
    } catch(err) {
      console.log(err);
      ctx.app.emit('error', roomQueryError, ctx)
      return
    }
    next()
  }
}

module.exports = new RoomController()