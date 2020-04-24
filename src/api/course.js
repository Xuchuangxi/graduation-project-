import request from '@/utils/request'

export function getCourse(data) {
  return request({
    url: '/course/getCourse',
    method: 'post',
    data
  })
}

export function getCourseList(data) {
  return request({
    url: '/course/getCourseList',
    method: 'post',
    data
  })
}

export function addCourse(data) {
  return request({
    url: '/course/addCourse',
    method: 'post',
    data
  })
}

export function updateCourse(data) {
  return request({
    url: '/course/updateCourse',
    method: 'post',
    data
  })
}

export function deleteCourse(data) {
  return request({
    url: '/course/deleteCourse',
    method: 'post',
    data
  })
}
export function getCourseById(data) {
  return request({
    url: '/course/getCourseById',
    method: 'post',
    data
  })
}
