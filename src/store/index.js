import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import { alertInitialState, alertMutations } from './modules/alert'
import { confirmInitialState, confirmMutations } from './modules/confirm'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    alert: alertInitialState,
    confirm: confirmInitialState
  },
  actions,
  mutations: [alertMutations, confirmMutations],
  strict: debug,
  middlewares: debug ? [Vuex.createLogger()] : []
})