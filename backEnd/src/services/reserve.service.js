const Reserve = require('../model/reserve.model')

class ReserveServer {
  async dbCreateReservation(newReservation) {
    const res = await Reserve.create(newReservation)
    console.log('预约成功');

    if(res == null) {
      throw('创建预约失败')
    }
    return res
  }

  async dbGetReservation(roomNum) {
    const res = await Reserve.find({roomNum})

    return res
  }

  // 删除过期预约，在每次查询和创建前进行删除
  async dbDeleteReservation() {

  }

}

module.exports = new ReserveServer()