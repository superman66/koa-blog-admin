import { combineReducers } from 'redux'
import auth from './auth'
import user from './users'
import common from './common'
import category from './category'
import tag from './tag'

const app = combineReducers({
  auth,
  user,
  common,
  category,
  tag
})

export default app
