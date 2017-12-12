import { combineReducers } from 'redux'
import auth from './auth'
import user from './users'
import common from './common'
import category from './category'

const app = combineReducers({
  auth,
  user,
  common,
  category,
})

export default app
