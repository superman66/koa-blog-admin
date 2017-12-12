import { redirectToLogin } from '../utils/auth'

export default {
  onEnter: redirectToLogin,
  path: 'category',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Category').CategoryTablePage)
  }
};
