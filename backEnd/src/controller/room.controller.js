const { dbQueryRoomInfo, dbCreateRoom, dbQueryFloorRooms, dbUpdateRoomInfo } = require('../services/room.service')
const { roomCreationError, roomQueryError, floorRoomQueryError } = require('../constant/err.type')

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
    const {roomNum} = ctx.query
    // console.log("roomNum",roomNum,typeof roomNum);

    // 2.操作数据库
    // 调用service层前最好都使用try catch捕获await错误
    
    try{
      const res = await dbQueryRoomInfo(roomNum)
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

  // 查询某层中哪些教室有数据，
  /* 
    TODO:
      当不传floorNum时返回每一层
  */
  async getFloorRooms(ctx, next) {
    const {buildingName, floorNum} = ctx.query
    try {
      const res = await dbQueryFloorRooms(buildingName, floorNum)

      // 数据处理
      let roomArr = []
      res.map((item, index)=> {
        roomArr.push(item.roomNum)
      })

      ctx.body = {
        code: 0,
        msg: "获取楼层教室信息成功",
        result: roomArr
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', floorRoomQueryError, ctx)
      return
    }

    next()
  }

  // 未完成
  async updateRoomInfo(ctx, next) {
    try {
      const res = await dbUpdateRoomInfo(ctx.request.body)
    } catch (err) {
      console.error(err);
      return
    }


    next()
  }
}

module.exports = new RoomController()