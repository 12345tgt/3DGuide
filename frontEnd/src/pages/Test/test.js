export default function() {
  let count = 0

  // document.addEventListener('click', ()=> {
  //   console.log('点击');
  //   count++
  // })

  /* 
    只会执行一次，原因未知
  */
  setTimeout(()=> {
    console.log('count加');
    count++
  })

  return count
}