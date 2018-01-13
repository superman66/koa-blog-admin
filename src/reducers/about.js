import types from '../constants/ActionTypes'
import createReducer from '../utils/createReducer'
import createRequestHandler from '../utils/createRequestHandler'

const initialState = {}


export default createReducer(initialState, {
  [types.FETCH_ABOUT]: createRequestHandler((state, action) => {
    return {
      about: action.response.about || {},
      status: action.status,
      errors: action.errors || {}
    }
  })
})
