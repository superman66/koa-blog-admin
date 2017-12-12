import users from './users'
import dashboard from './dashboard'
import category from './category'

export default {
  childRoutes: [{
    path: '/',
    // onEnter: redirectToLogin,
    component: require('../containers/Index').default,
    indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
    childRoutes: [
      users,
      dashboard,
      category
    ]
  }, {
    path: 'login',
    getComponent(nextState, cb) {
      cb(null, require('../containers/Login').default);
    }
  }]
};
