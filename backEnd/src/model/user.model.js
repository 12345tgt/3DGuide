const { mongoose } = require("../db/mongoose")

const Scheme = mongoose.Schema

// 创建Schema(模式)对象，映射collection
const userScheme = new Scheme({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const hotSpotScheme = new Scheme({
  title:  String,
  author: Array,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
})

// 编译model，model负责创建和读取文档
const UserModel = mongoose.model("user", userScheme)

// const HotSpotModel = mongoose.model("hotSpot", hotSpotScheme)

module.exports = UserModel

// const newHotspot = {
//   title: "热点信息",
//   author: ["tgt",'zzz'],
//   body: "二五局势"
// }
// // 增
// HotSpotModel.create(newHotspot, (err, data)=> {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// })

// 删
// UserModel.remove({name: "小明"}, (err)=> {
//   if(err) {
//     console.log(err);
//   }
// })

// 增
// const ming = new UserModel({name: "小明", age: 16, password: 123456})
// ming.save((err, data)=> {
//   if(err){
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// })

// UserModel.find({name: "小明"}, (err, data)=> {
//   console.log(data);
//   // string 由SchemeType定义
//   console.log(typeof(data[0].password));
// })


