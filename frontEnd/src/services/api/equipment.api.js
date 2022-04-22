import request from './request'

function getEquipmentInfo(roomNum) {
  return request({
    method: 'get',
    url: '/getEquipmentInfo',
    params: {
      roomNum
    }
  })
}

export {
  getEquipmentInfo
}