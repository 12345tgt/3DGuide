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

function getFloorRooms(buildingName, floorNum) {
  return request({
    url: '/getFloorRooms',
    params: {
      buildingName,
      floorNum
    }
  })
}

export {
  getRoomInfo,
  getFloorRooms
}