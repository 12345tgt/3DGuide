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
  async dbQueryRoomInfo(roomNum) {
    // 查询
    // console.log(roomNum);

    const res = await Room.findOne({
      roomNum
    })

    if(res == null) {
      throw("无该教室信息");
    }
    return res
  }

  // 查询某栋某层已有哪些教室数据
  async dbQueryFloorRooms(buildingName, floorNum) {
    let reg = new RegExp("^"+buildingName+"-"+floorNum)

    const res = await Room.find({
      roomNum: {
        $regex: reg,
        $options: 'i'
      }
    })

    return res
  }

  // 未完成
  async dbUpdateRoomInfo({roomNum, name, type, panoUrl}) {
    const filter = {}
    roomNum && Object.assign(filter, {roomNum})
    name && Object.assign(filter, {name})
    type && Object.assign(filter, {type})
    panoUrl && Object.assign(filter, {panoUrl})

    const res = await Room.updateOne()
  }
}

module.exports = new RoomService()