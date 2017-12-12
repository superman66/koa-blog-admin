import React from 'react'
import { format } from 'date-fns'
import { CONF_DATETIME } from '../../constants/Conf'

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
