import request from './request'

function getRoomInfo(roomNum) {
  return request({
    method: 'get', //default
    url: '/getRoomInfo',
    params: {
      roomNum
    }
  })
}

export {
  getRoomInfo
}