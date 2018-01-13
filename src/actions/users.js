import types from '../constants/ActionTypes';
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

export function fetchUserById(id) {
  return {
    actionType: types.FETCH_USER_BY_ID,
    options: {
      url: APIs.API_FETCH_USER_ID,
      params: {
        id
      }
    }
  }
}

export function deleteUser(id) {
  return {
    actionType: types.DELETE_USER,
    options: {
      method: 'delete',
      url: APIs.API_DELETE_USER,
      params: {
        id
      }
    }
  }
}

export function updateUser(id, body) {
  return {
    actionType: types.UPDATE_USER,
    options: {
      method: 'patch',
      url: APIs.API_UPDATE_USER,
      params: {
        id
      },
      body
    }
  }
}
