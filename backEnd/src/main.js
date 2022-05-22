const app = require('./app')
const {APP_PORT} = require('./config/config.default')

app.listen(APP_PORT, ()=> {
  console.log(`start-quick is starting at port http://localhost:${APP_PORT}`);
});