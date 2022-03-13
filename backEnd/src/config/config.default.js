// dotenv的功能是把项目根目录中.env文件中的配置（键值对）添加到process.env
const dotenv = require('dotenv')

dotenv.config()

// 当前终端所在位置，是dotenv默认路径
// console.log((process.cwd()));

// process.env获取的是上面路径下的.env文件
// console.log(process.env.APP_PORT);

module.exports = process.env