import * as types from '../constants/ActionTypes'
import * as APIs from '../constants/APIs'

export function login(data, success) {
  return {
    actionType: types.LOGIN,
    options: {
      method: 'post',
      url: APIs.API_LOGIN,
      body: data,
    },
    success,
  }
}
