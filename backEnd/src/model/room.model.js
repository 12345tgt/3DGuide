const {mongoose} = require('../db/mongoose')

const Scheme = mongoose.Schema

// 创建Schema(模式)对象，映射collection
const roomScheme = new Scheme({
  number: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  type: String
})

// 编译model，model负责创建和读取文档
const RoomModel = mongoose.model("room", roomScheme)

module.exports = RoomModel