import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // use locale globally

dayjs.extend(relativeTime)

Vue.filter('relativeTime', (val) => {
  return dayjs().to(val)
})
