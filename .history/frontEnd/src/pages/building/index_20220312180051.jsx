import React from 'react'


window.addEventListener('message',(e)=> {
  try {
    // F123456
    let data
    typeof e.data == 'string' ? data = e.data : data = '';
    switch (data) {
      case 'F1':
        // 跳转到一层界面
        break;
      case 'F2':
        // 跳转到一层界面
        break;
      case 'F3':
        // 跳转到一层界面
        break;
      case 'F4':
        // 跳转到一层界面
        break;
      case 'F5':
        // 跳转到一层界面
        break;
      case 'F6':
        // 跳转到一层界面
        break;
    }
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
})

export default function Building() {

  return (
    <div>
      {/* Building */}
      {/* 
        TODO:
          如何做到点击跳转页面
      */}
      <iframe src="http://47.108.179.245:8088" frameborder="0" width='1400' height='600'></iframe>
    </div>
  )
}
