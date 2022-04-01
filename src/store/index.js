import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_TOKEN = 'USER_TOKEN'

export default new Vuex.Store({
  state: {
    user: getItem(USER_TOKEN)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(USER_TOKEN, data) // 使token持久化
    }
  },
  actions: {},
  modules: {}
})
