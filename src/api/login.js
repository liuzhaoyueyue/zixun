import request from '@/utils/request'

export const getToken = (data) => {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}

export const getSms = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}
