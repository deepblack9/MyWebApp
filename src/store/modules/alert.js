import {
  SHOW_ALERT,
  HIDE_ALERT
} from '../mutation-types'

// initial state
export const alertInitialState = {
	show: false,
  type: 'info',
  msg: ''
}

// mutations
export const alertMutations = {
  SHOW_ALERT (state, type, msg) {
    state.alert.show = true
    state.alert.type = type
    state.alert.msg = msg
  },
  HIDE_ALERT (state, type, msg) {
  	state.alert.show = false
  }
}