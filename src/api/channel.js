import request from '@/utils/request'

export const getUserChannel = () => {
  return request({
    url: '/user/channels'
  })
}
