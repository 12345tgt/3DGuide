// 全局控制弹窗是否出现
class IsPopup {
  constructor(flag=false, id="") {
    this.flag = flag
    this.id = id
  }

  setPopup() {
    this.flag = !this.flag
  }

  setHotPointId(id) {
    this.id = id
  }
}

export default new IsPopup()

