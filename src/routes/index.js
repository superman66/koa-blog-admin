import users from './users'
import dashboard from './dashboard'
import category from './category'
import tag from './tag'
import comment from './comment'
import post from './post'
import about from './about'
import { redirectToLogin } from '../utils/auth'

export default {
  childRoutes: [
    {
      path: '/',
      // onEnter: redirectToLogin,
      component: require('../containers/Index').default,
      indexRoute: {
        component: require('../containers/Dashboard').DashboardPage,
        onEnter: redirectToLogin,
      },
      childRoutes: [users, dashboard, category, tag, comment, post, about],
    },
    {
      path: 'login',
      getComponent(nextState, cb) {
        cb(null, require('../containers/Login').default)
      },
    },
  ],
}
