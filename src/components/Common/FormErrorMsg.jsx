import React, { Component } from 'react';
import { Alert } from 'antd'

class FormErrorMsg extends Component {
  render() {
    const { errors } = this.props
    return Object.keys(errors).map((error) => {
      return (
        <Alert
          key={error}
          message={errors[error]}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )
    })
  }
}

export default FormErrorMsg;
