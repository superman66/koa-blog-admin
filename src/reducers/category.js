import types from '../constants/ActionTypes'
import createReducer from '../utils/createReducer'
import createRequestHandler from '../utils/createRequestHandler'
import { toTable } from '../utils/actionToStore'

const initialState = {
  status: null,
  items: [],
  page: {},
  errors: {}
}

export default createReducer(initialState, {
  [types.FETCH_CATEGORIES]: createRequestHandler((state, action) => {
    return toTable(action)
  }),
  [types.ADD_CATEGORY]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  }),
  [types.UPDATE_CATEGORY]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  })
})
