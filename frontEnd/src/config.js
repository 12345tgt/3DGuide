// 有问题，静态变量应该使用const，但是使用const后不可改变值，无法进行条件声明，所以暂时使用let，后续寻找正确方法

// 后端api端口
let PORT = 8088
// 前端页面端口
let WEB_PORT = 3000
let HOST = 'http://localhost'

switch (process.env.NODE_ENV) {
  case 'production':
    WEB_PORT = 9001
    HOST = 'http://47.108.179.245'
}



export {
  PORT,
  HOST,
  WEB_PORT
}