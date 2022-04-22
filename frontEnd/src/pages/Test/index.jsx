import React, {useEffect} from 'react'
import test from './test'


// 将监听器放组件外也只输出一次0
// document.addEventListener('click', handleClick)
export default function Test() {
  let num = 10
  function handleClick() {
    console.log(num);
  }
  console.log('test');
  useEffect(() => {
    num = test()
    console.log('---');

    // 放在这只输出一次 0
    // document.addEventListener('click', ()=> {
    //   console.log(num);
    // })
    
  }, [])
  
  // document.addEventListener('click', ()=> {
  //   // 输出两次 undefined和0  为什么两次且值不一样？
  //   /* 
  //     猜测是Test函数执行了两次，但根据console.log('test')只输出一次说明并不是

  //     调试发现回调函数执行了两次，且中间并没有执行其他操作

  //     放在useEffect里只执行了一次，猜测是因为在组件挂载前后的问题

  //   */
  // //  debugger
  //   console.log(num);
  // })

  /* 
    将num定义和handleClick放在组件函数里，输出10 0

    将num定义在组件函数外：
      将handleClick放在组件函数里，输出两次0
      将handleClick放在组件函数外，只输出一次
  */
  // 总结：不要把不相关的函数和操作放在组件函数里，会变得不幸
  // 放组件外或useEffect里
  document.addEventListener('click', handleClick)

  return (
    <div>Test {num}</div>
  )
}
