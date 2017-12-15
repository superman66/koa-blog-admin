import * as apis from '../constants/APIs'
import types from '../constants/ActionTypes'

export function fetchPosts(params) {
  return {
    actionType: types.FETCH_POSTS,
    options: {
      url: apis.API_POSTS,
      params
    }
  }
}

export function addPost(body) {
  return {
    actionType: types.ADD_POST,
    options: {
      method: 'post',
      url: apis.API_ADD_POST,
      body
    }
  }
}

export function updatePost(id, body) {
  return {
    actionType: types.UPDATE_POST,
    options: {
      method: 'patch',
      url: apis.API_UPDATE_POST,
      params: {
        id,
      },
      body
    }
  }
}

export function changePostStatus(id, body) {
  return {
    actionType: types.CHANGE_POST_STATUS,
    options: {
      method: 'patch',
      url: apis.API_CHANGE_POST_STATUS,
      params: {
        id
      },
      body
    }
  }
}

export function deletePost(id) {
  return {
    actionType: types.DELETE_POST,
    options: {
      method: 'delete',
      url: apis.API_DELETE_POST,
      params: {
        id
      }
    }
  }
}
