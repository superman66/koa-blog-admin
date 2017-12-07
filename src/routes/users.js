import { redirectToLogin } from '../utils/auth'

module.exports = {
  onEnter: redirectToLogin,
  path: 'users',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Users').UserTablePage)
  }
};
