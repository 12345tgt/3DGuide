const mongoose = require("mongoose")

// 连接mongodb数据库
mongoose.connect("mongodb://localhost/3DGuide", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((res)=> {
  console.log("数据库连接成功");
}).catch((err)=> {
  console.log(err);
})

// // 3.监听mongodb数据库的连接状态
// // 绑定数据库连接成功事件
// mongoose.connection.once("open", () => {
//   console.log("数据库连接成功！");
// });
// // 绑定数据库连接失败事件
// mongoose.connection.once("close", () => {
//   console.log("数据库已断开");
// });

module.exports = {
  mongoose,
}