import * as types from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';

export function fetchUsers(params) {
  return {
    actionType: types.FETCH_USERS,
    options: {
      url: APIs.API_USERS,
      params
    }
  }
}

export function deleteUser(id, success) {
  return {
    actionType: types.DELETE_USERS,
    options: {
      method: 'delete',
      url: APIs.API_DELETE_USER,
      params: {
        id
      }
    },
    success
  }
}
