import { getItem, setItem, removeItem } from './storage'


export function getUser() {
  return JSON.parse(decodeURIComponent(getItem('user')));
}

export function setUser(user) {
  setItem('user', encodeURIComponent(JSON.stringify(user)))
}

export function setToken(token) {
  setItem('token', token)
}

export function getToken() {
  return getItem('token')
}

export function removeToken() {
  removeItem('token')
}

export function loggedIn() {
  return !!getItem('token')
}

export function logout() {
  removeToken()
  removeItem('user')
}

export function redirectToLogin(nextState, replace, callback) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
  callback();
}

export function redirectToDashboard(nextState, replace) {
  if (loggedIn()) {
    replace('/')
  }
}
