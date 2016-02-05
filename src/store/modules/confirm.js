import {
  SHOW_CONFIRM,
  HIDE_CONFIRM
} from '../mutation-types'

// initial state
export const confirmInitialState = {
  title: '',
  show: false,
  width: null,
  callback: function() {},
  effect: 'zoom',
  backdrop: true,
  large: false,
  small: false,
  msg: ''
}

// mutations
export const confirmMutations = {
  SHOW_CONFIRM (state, msg, callback) {
    state.confirm.show = true
    state.confirm.callback = callback
    state.confirm.msg = msg
  },
  HIDE_CONFIRM (state) {
  	state.confirm.show = false
  }
}