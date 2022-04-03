const { queryRoomInfo } = require('../services/room.service')

class RoomController {
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

      ctx.body = {
        code: 10001,
        msg: err || "获取教室信息失败",
        result: ''
      }
    }
    
  }
}

module.exports = new RoomController()