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

export function getArticleByuserId(data) {
  return request({
    url: '/article/getArticleByuserId',
    method: 'post',
    data
  })
}

export function getArticleById(data) {
  return request({
    url: '/article/getArticleById',
    method: 'post',
    data
  })
}

export function updateArticleById(data) {
  return request({
    url: '/article/updateArticleById',
    method: 'post',
    data
  })
}
