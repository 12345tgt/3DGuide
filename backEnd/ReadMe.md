.env是配置文件，和dotenv配合使用。作用是将.env中定义的键值对传入到process.env中。
层级关系
  routes转发url给控制器不同的方法，建立映射关系->controller层，解析请求，操作数据库（调用service层写好的方法），返回结果->services层，处理业务逻辑，操作数据库（调用model）->model层，数据库基础的CRUD操作->db层，数据库连接等

