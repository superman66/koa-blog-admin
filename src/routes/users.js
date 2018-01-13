import {
  redirectToLogin
} from '../utils/auth'

export default {
  path: 'users',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/users/items')
  },
  childRoutes: [
    {
      path: 'items',
      getComponent(nextState, cb) {
        cb(null, require('../containers/Users').UserTablePage)
      },
    }, {
      onEnter: redirectToLogin,
      path: 'edit/:id',
      getComponent(nextState, cb) {
        cb(null, require('../containers/Users').UserFormPage)
      }
    }
  ]
}
