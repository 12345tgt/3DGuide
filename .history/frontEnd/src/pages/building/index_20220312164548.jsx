import React from 'react'


export default function Building() {

  window.addEventListener('message',(e)=> {
    try {
      // F123456
      let data
      typeof e.data == 'string' ? data = e.data : data = '';
       
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  })


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
