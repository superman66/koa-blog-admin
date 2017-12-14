import * as APIs from '../constants/APIs'
import types from '../constants/ActionTypes'

export function fetchMenus(cb) {
  return {
    actionType: types.FETCH_MENUS,
    options: {
      url: APIs.API_MENUS
    },
    success: cb,
  }
}
