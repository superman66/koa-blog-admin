import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'

const propTypes = {}

const defaultProps = {}

const Loading = () => (
  <div className="loading-wrapper">
    <Spin size="large" />
  </div>
)

Loading.propTypes = propTypes

Loading.defaultProps = defaultProps

export default Loading
