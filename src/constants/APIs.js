export const BASE_URL = 'http://localhost:3200/api'
// common
export const API_CAPTCHA_JPG = 'data/captcha.jpg';  // 这里需要替换为服务端地址
export const API_MENUS = '/menus';

// auth
export const API_LOGIN = '/login'
export const API_REGISTER = '/register'

// user
export const API_USERS = '/users';
export const API_ADD_USER = '/users/:id'
export const API_DELETE_USER = '/users/:id'

// category
export const API_CATEGORIES = '/categories'
export const API_ADD_CATEGORY = '/categories'
export const API_UPDATE_CATEGORY = '/categories/:id'
export const API_DELETE_CATEGORY = '/categories/:id'

// tags
export const API_TAGS = '/tags'
export const API_ADD_TAG = '/tags'
export const API_UPDATE_TAG = '/tags/:id'
export const API_DELETE_TAG = 'tags/:id'

// comment
export const API_COMMENTS = '/comments'
export const API_REVIEW_COMMENT = '/comments/:id' // 审核评论
export const API_DELETE_COMMENT = '/comments/:id'

// post
export const API_POSTS = '/posts'
export const API_POST_BY_ID = '/posts/:id'
export const API_ADD_POST = '/posts'
export const API_CHANGE_POST_STATUS = '/posts/:id'
export const API_UPDATE_POST = '/posts/:id'
export const API_DELETE_POST = '/posts/:id'
