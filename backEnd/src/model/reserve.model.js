const {mongoose} = require('../db/mongoose')

const Schema = mongoose.Schema

const reserveScheme = new Schema({
  roomNum: {
    type: String,
    required: true
  },
  reserveDate: {
    type: String,
    required: true
  },
  reserveTime: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  studentID: {
    type: String,
    required: true
  }
})

const reserveModel = mongoose.model('reservation', reserveScheme)

module.exports = reserveModel