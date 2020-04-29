import request from '@/utils/request'

export function addArticle(data) {
  return request({
    url: '/article/addArticle',
    method: 'post',
    data
  })
}

export function getArticleList(data) {
  return request({
    url: '/article/getArticleList',
    method: 'post',
    data
  })
}

export function deleteArticle(data) {
  return request({
    url: '/article/deleteArticle',
    method: 'post',
    data
  })
}
