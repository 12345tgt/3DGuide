const Room = require("../model/room.model")

class RoomService {
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
}

module.exports = new RoomService()