import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

const propTypes = {}

const defaultProps = {}

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h1>
      </div>
    )
  }
}

UserForm.propTypes = propTypes

UserForm.defaultProps = defaultProps
const WrappedUserForm = Form.create()(UserForm);

export default WrappedUserForm
