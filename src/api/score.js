import request from '@/utils/request'

export function getScoreById(data) {
  return request({
    url: '/score/getScoreById',
    method: 'post',
    data
  })
}

export function updateScore(data) {
  return request({
    url: '/score/updateScore',
    method: 'post',
    data
  })
}
