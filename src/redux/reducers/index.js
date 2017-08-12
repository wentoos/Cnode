import { combineReducers } from 'redux'

let dataState = {
  isLogin: false,
  user: null,
  accesstoken: null
}

function user(state=dataState, action) {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.type, action.index)
      return {
      	isLogin: true,
        user: action.user,
        accesstoken: action.accesstoken
      }
    case 'LOGIN_OUT':
      return {
      	isLogin: false,
        user: null,
        accesstoken: null
      }
    default:
      return state
  }
}
let store = createStore(combineReducers({user}))

export default store;