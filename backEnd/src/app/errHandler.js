module.exports = (err, ctx)=>{ 
  // 服务器错误
  let status = 500
  // console.log('错误处理');
  // 客户端错误
  // switch (err.code) {
    // case '10001':
    //   status = 400;
    //   break;
    // case '10002':
    //   status = 409;
    //   break;
  // }
  ctx.status = status
  ctx.body = err
}