const app = require('./app')
const {APP_PORT, MDB_HOST} = require('./config/config.default')

app.listen(APP_PORT, ()=> {
  console.log(`start-quick is starting at port http://${MDB_HOST}:${APP_PORT}`);
});