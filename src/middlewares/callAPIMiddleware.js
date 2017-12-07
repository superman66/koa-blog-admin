import axios from 'axios'
import ReqeustStatus from '../constants/RequestStatus'

function getRequestConfig(options) {
  const { method = 'get', params, body, url } = options;
  if (method === 'get') {
    return {
      method,
      url,
      params
    }
  } else {
    return {
      method,
      url,
      data: body
    }
  }
}


function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      actionType,
      options,
      shouldCallAPI = () => true,
      payload = {}
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
      type: actionType
    }))


    const requestConfig = getRequestConfig(options);
    return axios(requestConfig).then(
      response => dispatch(Object.assign({}, payload, {
        status: ReqeustStatus.SUCCESS,
        response: response.data.data,
        type: actionType
      })))
      .catch(err => dispatch(Object.assign({}, payload, {
        status: ReqeustStatus.ERROR,
        err,
        type: actionType
      })))
  }
}

export default callAPIMiddleware
