import React from 'react'
import { format } from 'date-fns'
import { CONF_DATETIME } from '../../constants/Conf'
import { PostStatus, CommentStatus } from '../../constants/PostStatus'

export const OrderRender = (text, record, index) => {
  index += 1
  return <span>{index}</span>
}

export const DateRender = text => {
  return text ? format(text, CONF_DATETIME) : '--'
}

export const PostStatusRender = text => {
  let msg = ''
  if (text === PostStatus.draft) {
    msg = '草稿'
  }
  if (text === PostStatus.publish) {
    msg = '已发布'
  }
  if (text === PostStatus.unpublish) {
    msg = '未发布'
  }
  return msg
}

export const CommentStatusRender = text => {
  let msg = ''
  if (text === CommentStatus.failReview) {
    msg = '审核失败'
  }
  if (text === CommentStatus.passReview) {
    msg = '审核通过'
  }
  if (text === CommentStatus.underReview) {
    msg = '审核中'
  }
  return msg
}

export const ObjectRender = (text, key) => {
  return text[key] ? text[key] : '--'
}
