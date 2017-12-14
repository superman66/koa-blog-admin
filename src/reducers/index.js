import { combineReducers } from 'redux'
import auth from './auth'
import user from './users'
import common from './common'
import category from './category'
import tag from './tag'
import comment from './comment'

const app = combineReducers({
  auth,
  user,
  common,
  category,
  tag,
  comment
})

export default app
