import types from '../constants/ActionTypes'
import createReducer from '../utils/createReducer'
import createRequestHandler from '../utils/createRequestHandler'
import {
  toTable
} from '../utils/actionToStore'

const initialState = {
  status: null,
  items: [],
  page: {},
  errors: {},
  post: {},
}

export default createReducer(initialState, {
  [types.FETCH_POSTS]: createRequestHandler((state, action) => {
    return toTable(action)
  }),
  [types.FETCH_POST_BY_ID]: createRequestHandler((state, action) => {
    return {
      post: action.response.post,
      status: action.status,
      errors: action.errors || {}
    }
  }),
  [types.ADD_POST]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  }),
  [types.UPDATE_POST]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  }),
  [types.CHANGE_POST_STATUS]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      errors: action.errors || {}
    }
  }),
  [types.RESET_POST]: createRequestHandler((state, action) => {
    return {
      post: {}
    }
  })
})
