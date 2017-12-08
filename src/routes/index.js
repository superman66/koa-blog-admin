module.exports = {
  childRoutes: [{
    path: '/',
    // onEnter: redirectToLogin,
    component: require('../containers/Index').default,
    indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
    childRoutes: [
      require('./users'),
      require('./dashboard')
    ]
  }, {
    path: 'login',
    getComponent(nextState, cb) {
      cb(null, require('../containers/Login').default);
    }
  }]
};
