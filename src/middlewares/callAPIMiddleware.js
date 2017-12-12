import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { message } from 'antd'
import cloneDeep from 'lodash/cloneDeep'
import pathToRegexp from 'path-to-regexp'
import ReqeustStatus from '../constants/RequestStatus'
import { getToken } from '../utils/auth'

function getRequestConfig(options) {
  const { method = 'get', params = {}, body, url } = options;
  const match = pathToRegexp.parse(url)
  const nextUrl = pathToRegexp.compile(url)(params)
  const nextParams = cloneDeep(params)

  match.forEach((item) => {
    if (item instanceof Object && item.name in nextParams) {
      delete nextParams[item.name]
    }
  })

  if (method.toLowerCase() === 'get') {
    return {
      method,
      url: nextUrl,
      params: nextParams,
    }
  }
  return {
    method,
    url: nextUrl,
    data: body,
  }
}

function alert(options, text, type) {
  let { method = 'get', disableNotification = false } = options
  if (['post', 'patch', 'delete'].indexOf(method.toLowerCase()) !== -1 && !disableNotification) {
    if (type === 'success') {
      message.success(text)
    } else {
      message.error(text)
    }
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
      type: `${actionType}`,
      response: {},
    }))


    const requestConfig = getRequestConfig(options);
    return axios.request(requestConfig)
      .then((response) => {
        const { data, message } = response.data

        // alert when request is done
        alert(options, message, 'success')

        dispatch(Object.assign({}, payload, {
          type: actionType,
          status: ReqeustStatus.SUCCESS,
          response: data,
          message,

        }))
        return data
      })
      .catch((err) => {

        // error alert when catch request error
        err.message && alert(options, err.message, 'error')

        dispatch(Object.assign({}, payload, {
          type: actionType,
          status: ReqeustStatus.ERROR,
          errors: err.errors,
          response: {},
        }))
        return Promise.reject(err)
      })
  }
}

export default callAPIMiddleware
