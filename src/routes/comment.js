import { redirectToLogin } from '../utils/auth'

export default {
  onEnter: redirectToLogin,
  path: 'comment',
  getComponent(nextState, cb) {
    cb(null, require('../containers/Comment').CommentTablePage)
  }
};
