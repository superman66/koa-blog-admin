import { combineReducers } from 'redux'
import auth from './auth'
import user from './users'
import common from './common'
import category from './category'
import tag from './tag'
import comment from './comment'
import post from './post'

const app = combineReducers({
  auth,
  user,
  common,
  category,
  tag,
  comment,
  post
})

export default app
