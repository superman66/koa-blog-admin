import { redirectToLogin } from '../utils/auth'

export default {
  onEnter: redirectToLogin,
  path: 'post',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Post').PostTablePage)
  }
};
