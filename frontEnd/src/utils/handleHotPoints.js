
// 计算z值，有问题，只能得到正值
function locationCal(x, y) {
    return Math.pow((Math.pow(0.92, 2) - Math.pow(x, 2) - Math.pow(y, 2)), 0.5)
}

// 添加热点，设计通过后端api返回数据
// 将接口获取来的数据进行处理转化为接口
export default function (data) {
    let hotPoints = []
    data.forEach((item, index)=> {
        if(item.position) {
            hotPoints.push({
                id: item._id,
                position: {
                    x: item.position.x,
                    y: item.position.y,
                    z: -locationCal(item.position.x, item.position.y)   //临时
                },
                detail: {
                    title: item.name,
                    describe: item.desc
                }
            })
        }
    })
    // console.log(hotPoints);
    return hotPoints
}



// export default [
//   // 球体半径
//   // Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2)=1
//     {
//         id: '01',
//         position:{
//             x:0,
//             y:0,
//             z:-0.92
//         },
//         detail:{
//             "title":"海尔空调",
//             // 使用数组方便处理
//             'describe': [
//                 '名称: 海尔KF-35GW/20MCA75',
//                 '能效等级: 五级能效',
//                 '类型: 壁挂式',
//                 '变频/定频: 定频'
//             ],
//         }
//     },
//     {
//         id: '02',
//         position:{
//             x:-0.2,
//             y:-0.05,
//             // z:0.2
//             z: locationCal(-0.2, -0.05)
//         },
//         detail:{
//             "title":"信息点2",
//             'describe': [
//                 '名称: xxx彩电'
//             ],
//         }
//     }
// ];