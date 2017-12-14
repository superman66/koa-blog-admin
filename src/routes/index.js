import users from './users'
import dashboard from './dashboard'
import category from './category'
import tag from './tag'
import comment from './comment'

export default {
  childRoutes: [{
    path: '/',
    // onEnter: redirectToLogin,
    component: require('../containers/Index').default,
    indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
    childRoutes: [
      users,
      dashboard,
      category,
      tag,
      comment
    ]
  }, {
    path: 'login',
    getComponent(nextState, cb) {
      cb(null, require('../containers/Login').default);
    }
  }]
};
