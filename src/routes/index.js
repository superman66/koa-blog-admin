import users from './users'
import dashboard from './dashboard'
import category from './category'
import tag from './tag'
import comment from './comment'
import post from './post'
import about from './about'

export default {
  childRoutes: [{
    path: '/',
    // onEnter: redirectToLogin,
    component: require('../containers/Index').default,
    indexRoute: {
      onEnter: (nextState, replace) => replace('/dashboard')
    },
    childRoutes: [
      users,
      dashboard,
      category,
      tag,
      comment,
      post,
      about,
    ]
  }, {
    path: 'login',
    getComponent(nextState, cb) {
      cb(null, require('../containers/Login').default);
    }
  }]
};