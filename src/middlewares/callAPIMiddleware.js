import axios from 'axios'
import ReqeustStatus from '../constants/RequestStatus'
import { getToken } from '../utils/auth'

function getRequestConfig(options) {
  const { method = 'get', params, body, url } = options;
  if (method.toLowerCase() === 'get') {
    return {
      method,
      url,
      params,
    }
  }
  return {
    method,
    url,
    data: body,
  }
}


/**
 * actionType
 * options: { 参数
 *    method,
 *    url,
 *    params,
 *    body
 * },
 * payload,
 * success  成功的回调
 * error 失败的回调
 * @param {*} param
 */
function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      actionType,
      options,
      shouldCallAPI = () => true,
      payload = {},
      success,
      error,
    } = action

    if (!actionType) {
      return next(action)
    }

    if (typeof type === 'string') {
      throw new Error('Expected string types.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    dispatch(Object.assign({}, payload, {
      status: ReqeustStatus.REQUEST,
      type: `${actionType}_request`
    }))


    const requestConfig = getRequestConfig(options);
    return axios.request(requestConfig).then((response) => {
      success && success(response.data.data)
      return dispatch(Object.assign({}, payload, {
        status: ReqeustStatus.SUCCESS,
        response: response.data.data,
        type: actionType
      }))
    })
      .catch((err) => {
        error && error(err)
        return dispatch(Object.assign({}, payload, {
          status: ReqeustStatus.ERROR,
          err,
          type: `${actionType}_fail`
        }))
      })

  }
}

export default callAPIMiddleware
