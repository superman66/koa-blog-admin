import { combineReducers } from 'redux'
import login from './login'
import user from './users'
import common from './common'

const app = combineReducers({
  login,
  user,
  common
})

export default app
