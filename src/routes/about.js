import { redirectToLogin } from '../utils/auth'

export default {
  onEnter: redirectToLogin,
  path: 'about',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Users').AboutMePage)
  }
};
