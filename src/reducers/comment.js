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
  [types.FETCH_COMMENTS]: createRequestHandler((state, action) => {
    return toTable(action)
  }),
  [types.REVIEW_COMMENT]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  })
})
