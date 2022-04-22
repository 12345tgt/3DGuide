const {mongoose} = require('../db/mongoose')

const Scheme = mongoose.Schema

// 创建Schema(模式)对象，映射collection
// 房间信息。字段待定
const roomScheme = new Scheme({
  // 房间号，需要带有楼号，如G-101，用于侧边栏
  roomNum: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  type: String,
  // 房间全景图链接
  panoUrl: {
    type: String
  }
})

// 编译model，model负责创建和读取文档
const RoomModel = mongoose.model("room", roomScheme)

module.exports = RoomModel