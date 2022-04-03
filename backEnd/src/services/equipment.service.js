const Equipment = require("../model/equipment.model")

class EquipmentService {
  async queryEquipmentInfo(roomNumber) {
    // 查询
    // console.log(roomNumber);

    const res = await Equipment.find({
      roomNumber
    })

    if(res.length == 0) {
      throw("无该教室中设备信息");
    }
    return res
  }
}

module.exports = new EquipmentService()