
import * as types from '../constants/ActionTypes'
import createReducer from '../utils/createReducer'
import createRequestHandler from '../utils/createRequestHandler'

const initialState = {
  status: '',
  token: '',
  user: {},
};

export default createReducer(initialState, {
  [types.LOGIN]: createRequestHandler((state, action) => {
    return {
      status: action.status,
      // user: action.response.user || {},
      // token: action.response.user.token || null,
    }
  })
})
