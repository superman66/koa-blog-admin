import createConstants from '../utils/createConstants'

export default createConstants(
  // auth
  'LOGIN',
  // menu
  'FETCH_MENUS',
  // users
  'FETCH_USERS',
  'DELETE_USERS',
  // category
  'FETCH_CATEGORIES',
  'ADD_CATEGORY',
  'UPDATE_CATEGORY',
  'DELETE_CATEGORY',
  // tags
  'FETCH_TAGS',
  'ADD_TAG',
  'UPDATE_TAG',
  'DELETE_TAG',
  // comments
  'FETCH_COMMENTS',
  'REVIEW_COMMENT',
  'DELETE_COMMENT',
  // post
  'FETCH_POSTS',
  'FETCH_POST_BY_ID',
  'ADD_POST',
  'UPDATE_POST',
  'CHANGE_POST_STATUS',
  'DELETE_POST',
  'RESET_POST',   // 重置post文章数据
)
