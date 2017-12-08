import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { message } from 'antd'
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

function succesAlert(options, text) {
  let { method = 'get' } = options
  method = method.toLowerCase()
  if (method === 'post' || method === 'patch' || method === 'delete') {
    message.success(text)
  }
}

function errorAlert(text) {
  message.error(text)
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
      type: `${actionType}`
    }))


    const requestConfig = getRequestConfig(options);
    return axios.request(requestConfig)
      .then((response) => {
        const { data, message } = response.data

        // success callback
        success && success(data)

        // alert when request is done
        succesAlert(options, message)

        return dispatch(Object.assign({}, payload, {
          type: actionType,
          status: ReqeustStatus.SUCCESS,
          response: data,
          message,

        }))
      })
      .catch((err) => {
        // error callback
        error && error(err)

        // error alert when catch request error
        err.message && errorAlert(err.message)

        return dispatch(Object.assign({}, payload, {
          type: actionType,
          status: ReqeustStatus.ERROR,
          errors: err.errors,
        }))
      })
      .then((response) => {
        console.log(response);
      })
  }
}

export default callAPIMiddleware
