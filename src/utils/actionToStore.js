import RequestStatus from '../constants/RequestStatus'

export function toTable(action) {
  return {
    status: action.status,
    items: action.response.items ? action.response.items : [],
    page: action.response.page ? action.response.page : {}
  }
}

export function toItems(action) {
  return action.status === RequestStatus.SUCCESS ? action.response.items : []
}
