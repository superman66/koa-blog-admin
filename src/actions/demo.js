/**
 * action 示例模板
 */
import * as types from '../constants/ActionTypes'
import * as apis from '../constants/APIs'

/**   action 参数
 *    actionType, // action type
      options = {
        url,      // api 地址
        params,   // 请求的 参数
        body,     // post 请求的body数据
        disableNotification: post、patch、delete 请求是否请求message通知
      },
      shouldCallAPI = () => true,
      payload = {},
 * @param {*} params
 */
export function fetchCategories(params) {
  return {
    actionType: types.FETCH_CATEGORIES,
    options: {
      url: apis.API_CATEGORIES,
      params
    }
  }
}
