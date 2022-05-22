const Router = require('koa-router')
const {createReservation, getReservation} = require('../controller/reserve.controller')

const router = new Router()

router.post('/reserve', createReservation)

router.get('/getReservation', getReservation)

module.exports = router
