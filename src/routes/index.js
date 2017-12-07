module.exports = {
  childRoutes: [{
    path: '/',
    component: require('../containers/Index').default,
    indexRoute: { onEnter: (nextState, replace) => replace('/dashboard') },
    childRoutes: [
      require('./login'),
      require('./users'),
      require('./dashboard')
    ]
  }]
};
