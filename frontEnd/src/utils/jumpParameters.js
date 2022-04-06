// 将从unity传来的跳转参数进行处理
// 格式：G_101和G_101_1转换为"G","101"和"101-1"
export default (msg)=> {
  let buildingNum
  let roomNum

  // 使用正则表达式
  let re = /(^[A-G]_\d{3}$)|(^[A-G]_\d{3}_\d$)/
  if(re.test(msg)) {
    // console.log("true",msg);
    let temp = msg.split('_');
    buildingNum = temp[0];
    temp[2] ? roomNum = `${temp[1]}_${temp[2]}` : roomNum = `${temp[1]}`

    return `${buildingNum}-${roomNum}`
  }
}