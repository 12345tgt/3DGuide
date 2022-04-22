const mongoose = require("mongoose")
const {MDB_HOST, MDB_PORT, MDB_DB, MDB_USER, MDB_PWD} = require("../config/config.default")

// 连接mongodb数据库
mongoose.connect(`mongodb://${MDB_USER}:${MDB_PWD}@${MDB_HOST}:${MDB_PORT}/${MDB_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> {
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