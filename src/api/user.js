import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}

export function updataPassword(data) {
  return request({
    url: '/user/updataPassword',
    method: 'post',
    data
  })
}

export function userInfoByName(data) {
  return request({
    url: '/user/userInfoByName',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/user/getUserList',
    method: 'post',
    data
  })
}

export function updateUserById(data) {
  return request({
    url: '/user/updateUserById',
    method: 'post',
    data
  })
}
