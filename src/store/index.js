import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import realname from './modules/realname'
import income from './modules/income'

export default new Vuex.Store({
  modules:{
    user,
    realname,
    income,
  }
})
