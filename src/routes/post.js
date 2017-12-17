import {
  redirectToLogin
} from '../utils/auth'

export default {
  onEnter: redirectToLogin,
  path: 'post',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/post/items')
  },
  childRoutes: [{
    path: 'items',
    onEnter: redirectToLogin,
    getComponent(nextState, cb) {
      cb(null, require('../containers/Post').PostTablePage)
    }
  }, {
    onEnter: redirectToLogin,
    path: '/post/edit/:id',
    getComponent(nextState, cb) {
      cb(null, require('../containers/Post').PostPage)
    },
  }, {
    onEnter: redirectToLogin,
    path: '/post/add',
    getComponent(nextState, cb) {
      cb(null, require('../containers/Post').PostPage)
    },
  }]
}
