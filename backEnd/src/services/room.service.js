const Room = require("../model/room.model")

class RoomService {
  async queryRoomInfo(roomNumber) {
    // 查询
    // console.log(roomNumber);

    // 进入回调后不继续向下进行，原因未知
    // let res;
    // await Room.findOne({
    //   number: roomNumber
    // },(err,data)=> {
    //   if(err){
    //     console.log(err);
    //   } else {
    //     res = data
    //     // console.log(data);
    //   }
    // })

    const res = await Room.findOne({
      number: roomNumber
    })

    if(res == null) {
      throw("无该教室信息");
    }
    // console.log("res"+res);
    return res
  }
}

module.exports = new RoomService()