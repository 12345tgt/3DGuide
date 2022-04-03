const {mongoose} = require('../db/mongoose')

const Schema = mongoose.Schema

// 设备表字段规则
// "name": "华为MateBook D",
// "roomNumber": "G-318",
// "position": {
//   "x": 0,
//   "y": 0.5,
//   "z": 0.5
// } ,
// "desc": {
//   "内存容量": "8GB",
//   "屏幕尺寸": "14英寸",
//   "屏幕刷新率": "60Hz",
//   "类型": "轻薄笔记本",
//   "处理器": "intel i5",
//   "颜色": "银色",
//   "固态硬盘": "512GB",
//   "系统": "Windows 11",
//   "显卡型号": "集成显卡"
// } 
const equipmentScheme = new Schema({
  roomNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  // 设备热点在全景图中的位置
  // {
  //   x: 
  //   y:
  //   z:
  // }
  position: {
    x: Number,
    y: Number,
    z: Number
  },
  desc: {
    type: Object,
  }
})

const equipmentModel = mongoose.model('equipment', equipmentScheme)
 
module.exports = equipmentModel