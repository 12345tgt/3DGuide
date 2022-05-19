import React, {useEffect, useState, useRef} from 'react'
import { Progress } from 'antd';

import '../../assets/css/component/loading.css'

// 执行多次
function useInterval(callback, delay) {
  const savedCallback = useRef();
  // console.log('useInterval');

  // 每次渲染，更新ref为最新的回调
  useEffect(()=> {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if(delay !== null) {
      let id = setInterval(tick, delay);
  
      return () => {
        clearInterval(id)
      }
    }
  }, [delay])
  
}

export default function Loading(props) {
  const [percent, setPercent] = useState(0)
  const [delay, setDelay] = useState(1000)
  const [isLoading, setIsLoading] = useState(true)
  const [flag, setFlag] = useState(true)

  // let percent=0;

  // 执行多次，一旦State改变就执行
  // console.log(props);

  useInterval(()=> {
    if(props.isLoaded != true && percent<=95){
      // console.log(Math.round(Math.random()+1));
      
      setPercent(percent=> percent += Math.round(Math.random()+1))
    }
    else if(props.isLoaded != true && percent>95) {
      console.log('还未加载完');
    }
    else {
      // setPercent(100)
      // clearInterval(timer)
      setIsLoading(false)

    }
  }, isLoading ? delay : null)

  // 加载完成，过渡
  useEffect(() => {
    if(!isLoading) {
      setPercent(percent=>percent + Math.floor((100-percent)/2))
      setTimeout(() => {
        setPercent(100)
      }, 800);

    }
  }, [isLoading])

  useEffect(() => {
    console.log(percent);
    if(percent == 100) {
      setTimeout(() => {
        // 清除进度条
        setFlag(false)
        // 清除遮罩层
        let dom = document.getElementsByClassName('loading')[0]
        dom && (dom.className = '');
      }, 1000);
    }
  }, [percent])

  return (
    <div className='loading'>
      {flag ? <Progress
        type="circle"
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}
        percent={percent}
        width='150px'
      /> : <></>}
    </div>
  )
}
