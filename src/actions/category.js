import types from '../constants/ActionTypes'
import * as apis from '../constants/APIs'


export function fetchCategories(params) {
  return {
    actionType: types.FETCH_CATEGORIES,
    options: {
      url: apis.API_CATEGORIES,
      params
    }
  }
}

export function addCategory(body) {
  return {
    actionType: types.ADD_CATEGORY,
    options: {
      method: 'post',
      url: apis.API_ADD_CATEGORY,
      body,
    }
  }
}

export function updateCategory(id, body) {
  return {
    actionType: types.UPDATE_CATEGORY,
    options: {
      method: 'PATCH',
      url: apis.API_UPDATE_CATEGORY,
      params: {
        id
      },
      body
    }
  }
}

export function deleteCategory(id) {
  return {
    actionType: types.DELETE_CATEGORY,
    options: {
      method: 'delete',
      url: apis.API_DELETE_CATEGORY,
      params: {
        id
      }
    }
  }
}
