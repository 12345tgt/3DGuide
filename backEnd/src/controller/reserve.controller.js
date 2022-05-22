const {dbCreateReservation, dbGetReservation} = require('../services/reserve.service')
const {reserveCreationError, reserveQueryError} = require('../constant/err.type')


class ReserveController {
  async createReservation(ctx, next) {
    const {roomNum, reserveDate, reserveTime, phoneNumber, studentID} = ctx.request.body;

    try {
      const res = await dbCreateReservation({roomNum, reserveDate, reserveTime, phoneNumber, studentID})
      ctx.body = {
        code: 0,
        msg: '预约成功',
        result: res
      }
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', reserveCreationError, ctx)
      return
    }

    next()
  }

  async getReservation(ctx, next) {
    const {roomNum} = ctx.query
    // console.log("roomNum",roomNum,typeof roomNum);

    // 2.操作数据库
    // 调用service层前最好都使用try catch捕获await错误
    
    try{
      const res = await dbGetReservation(roomNum)
      ctx.body = {
        code: 0,
        msg: "获取预约信息成功",
        result: res
      }
    } catch(err) {
      console.log(err);
      ctx.app.emit('error', reserveQueryError, ctx)
      return
    }
    
    next()
  }
}

module.exports = new ReserveController()