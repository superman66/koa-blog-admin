import { redirectToLogin } from '../utils/auth'

module.exports = {
  onEnter: redirectToLogin,
  path: 'dashboard',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Dashboard').DashboardPage)
  }
};
