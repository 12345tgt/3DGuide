const Room = require("../model/room.model")

class RoomService {
  async dbCreateRoom(newRoom) {
    const res = await Room.create(newRoom)
    console.log("房间创建成功");

    if(res == null) {
      throw("创建失败")
    }
    return res
  }

  // 查询教室信息
  async queryRoomInfo(roomNumber) {
    // 查询
    // console.log(roomNumber);

    const res = await Room.findOne({
      number: roomNumber
    })

    if(res == null) {
      throw("无该教室信息");
    }
    return res
  }

  // 查询某栋某层已有哪些教室数据
}

module.exports = new RoomService()