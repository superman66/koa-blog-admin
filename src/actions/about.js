import types from '../constants/ActionTypes'
import * as api from '../constants/APIs'

export function fetchAbout() {
  return {
    actionType: types.FETCH_ABOUT,
    options: {
      url: api.API_ABOUT
    }
  }
}

export function addAbout(body) {
  return {
    actionType: types.ADD_ABOUT,
    options: {
      url: api.API_ADD_ABOUT,
      method: 'post',
      body
    }
  }
}

export function updateAbout(id, body) {
  return {
    actionType: types.UPDATE_ABOUT,
    options: {
      url: api.API_UPDATE_ABOUT,
      method: 'patch',
      params: {
        id,
      },
      body
    }
  }
}
