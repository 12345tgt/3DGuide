const {mongoose} = require('../db/mongoose')

const Schema = mongoose.Schema

// {
  // id使用mongoDB自动创建的_id，以确保唯一性
//   id: '01',
//   position:{
//       x:0,
//       y:0
//   },
//   detail:{
//       "title":"海尔空调",
//       // 使用数组方便处理
//       'describe': [
//           '名称: 海尔KF-35GW/20MCA75',
//           '能效等级: 五级能效',
//           '类型: 壁挂式',
//           '变频/定频: 定频'
//       ],
//   }
// }
const equipmentScheme = new Schema({
  roomNum: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  // 设备热点在全景图中的位置，只需要x和y值，z值由前端函数计算
  position: {
    x: Number,
    y: Number,
    z: Number
  },
  desc: []
})

const equipmentModel = mongoose.model('equipment', equipmentScheme)
 
module.exports = equipmentModel