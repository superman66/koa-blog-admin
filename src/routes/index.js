module.exports = {
  childRoutes: [{
    path: '/',
    // onEnter: redirectToLogin,
    component: require('../containers/Index').default,
    indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
    childRoutes: [
      require('./auth'),
      require('./users'),
      require('./dashboard')
    ]
  }]
};
