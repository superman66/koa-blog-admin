import * as types from '../constants/ActionTypes'
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
  [types.FETCH_TAGS]: createRequestHandler((state, action) => {
    return toTable(action)
  }),
  [types.ADD_TAG]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  }),
  [types.UPDATE_TAG]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  })
})
