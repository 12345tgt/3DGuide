const Equipment = require("../model/equipment.model")

class EquipmentService {
  // 创建设备信息
  async dbCreateEquipment(newEquipment) {
    const res = await Equipment.create(newEquipment)
    console.log('创建设备');
    if(res == null) {
      throw("创建设备失败")
    }
    
    return  res
  }


  // 查询设备信息
  async dbGetEquipmentInfo(roomNum) {
    // 查询
    // console.log(roomNum);

    const res = await Equipment.find({
      roomNum
    })

    // 无信息就返回空数组，不用报错
    // if(res.length == 0) {
    //   throw("无该教室设备信息");
    // }

    return res
  }
}

module.exports = new EquipmentService()