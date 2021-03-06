import { redirectToLogin } from '../utils/auth'

export default {
  onEnter: redirectToLogin,
  path: 'dashboard',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Dashboard').DashboardPage)
  }
};
