import { redirectToLogin } from '../utils/auth'

export default {
  onEnter: redirectToLogin,
  path: 'tag',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Tag').TagTablePage)
  }
};
