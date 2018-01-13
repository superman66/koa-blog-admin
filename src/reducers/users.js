import types from '../constants/ActionTypes'
import createReducer from '../utils/createReducer'
import createRequestHandler from '../utils/createRequestHandler'
import {
  toTable
} from '../utils/actionToStore'

const initialState = {
  status: null,
  items: [],
  page: {}
}


export default createReducer(initialState, {
  [types.FETCH_USERS]: createRequestHandler((state, action) => {
    return toTable(action)
  }),
  [types.DELETE_USER]: createRequestHandler((state, action) => {
    return action
  }),
  [types.FETCH_USER_BY_ID]: createRequestHandler((state, action) => {
    return {
      user: action.response.user || {},
      status: action.status,
      errors: action.errors || {}
    }
  })
})
