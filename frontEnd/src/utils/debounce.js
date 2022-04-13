// 用法debounce(func,100)(要传入func的参数)
// 立即执行版防抖
export default function(func, wait) {
  let timeout
  let callNow

  return function(...args) {
    if(timeout) {
      clearTimeout(timeout)
    } else {
      func.apply(this, args)
    }
    // console.log("timeout",timeout);
    // callNow = !timeout
    // console.log("callNow",callNow);
    // timeout赋值 此时callNow为false， 并延迟wait后将timeout置空, 即wait后func可再次执行
    timeout = setTimeout(()=> {
      timeout = null
      // console.log("settimeout");
    }, wait)

    // if(callNow) {
    //   func.apply(this, args)
    // }
  }
}

