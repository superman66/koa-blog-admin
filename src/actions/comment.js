import types from '../constants/ActionTypes'
import * as apis from '../constants/APIs'

export function fetchComments(params) {
  return {
    actionType: types.FETCH_COMMENTS,
    options: {
      url: apis.API_COMMENTS,
      params
    }
  }
}

/**
 *  审核评论
 * @param {*} id
 * @param {*} status
 */
export function reviewComment(id, body) {
  return {
    actionType: types.REVIEW_COMMENT,
    options: {
      method: 'PATCH',
      url: apis.API_REVIEW_COMMENT,
      params: {
        id
      },
      body
    }
  }
}

export function deleteComment(id) {
  return {
    actionType: types.DELETE_COMMENT,
    options: {
      method: 'delete',
      url: apis.API_DELETE_COMMENT,
      params: {
        id
      }
    }
  }
}
