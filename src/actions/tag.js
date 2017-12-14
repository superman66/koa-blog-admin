
import types from '../constants/ActionTypes'
import * as apis from '../constants/APIs'


export function fetchTags(params) {
  return {
    actionType: types.FETCH_TAGS,
    options: {
      url: apis.API_TAGS,
      params
    }
  }
}

export function addTag(body) {
  return {
    actionType: types.ADD_TAG,
    options: {
      method: 'post',
      url: apis.API_ADD_TAG,
      body,
    }
  }
}

export function updateTag(id, body) {
  return {
    actionType: types.UPDATE_TAG,
    options: {
      method: 'PATCH',
      url: apis.API_UPDATE_TAG,
      params: {
        id
      },
      body
    }
  }
}

export function deleteTag(id) {
  return {
    actionType: types.DELETE_TAG,
    options: {
      method: 'delete',
      url: apis.API_DELETE_TAG,
      params: {
        id
      }
    }
  }
}
