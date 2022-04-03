

// 添加热点，设计通过后端api返回数据
export default [
  // 球体半径
  // Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2)=1
    {
        position:{
            x:0,
            y:0,
            z:-0.92
        },
        detail:{
            "title":"信息点1",
            'describe': '<span style="display: block;">xxx冰箱</span><a href="http://www.baidu.com">链接</a>',
        }
    },
    {
        position:{
            x:-0.2,
            y:-0.05,
            // z:0.2
            z:Math.pow((Math.pow(0.92,2)-Math.pow(-0.2,2)-Math.pow(-0.05,2)),0.5)
        },
        detail:{
            "title":"信息点2",
            'describe': '<span style="display: block;">xxx彩电</span><a href="http://www.baidu.com">链接</a>',
        }
    }
];