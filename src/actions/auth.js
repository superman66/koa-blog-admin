import types from '../constants/ActionTypes'
import * as APIs from '../constants/APIs'

export function login(data) {
  return {
    actionType: types.LOGIN,
    options: {
      method: 'post',
      url: APIs.API_LOGIN,
      body: data,
      disableNotification: true,
    },
  }
}
