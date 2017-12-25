import React from 'react'
import { format } from 'date-fns'
import { CONF_DATETIME } from '../../constants/Conf'
import { PostStatus } from '../../constants/PostStatus';

export const orderRender = (text, record, index) => {
  index += 1
  return (
    <span>{index}</span>
  )
}

export const dateRender = (text) => {
  return (
    format(text, CONF_DATETIME)
  )
}

export const PostStatusRender = (text) => {
  let msg = ''
  if (text === PostStatus.draft) {
    msg = '草稿'
  }
  if (text === PostStatus.publish) {
    msg = '已发布'
  }
  if (text === PostStatus.unpublish) {
    msg = '已下架'
  }
  return msg
}

