import request from '@/utils/request'

export const getArticleList = (params) => {
  return request({
    url: '/articles',
    params
  })
}
