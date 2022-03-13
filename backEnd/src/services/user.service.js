const User = require("../model/user.model")

class UserService {
  async createUser(user_name, password) {
    // todo: 写入数据库(model层)
    const res = await User.create({
      name: user_name,
      password,
    })

    console.log(res);
    return res
    // return '写入数据库成功'
  }
}

module.exports = new UserService()