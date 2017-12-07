import { combineReducers } from 'redux'
import auth from './auth'
import user from './users'
import common from './common'

const app = combineReducers({
  auth,
  user,
  common
})

export default app
