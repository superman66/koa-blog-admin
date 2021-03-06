import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Alert } from 'antd'

import { setToken, setUser } from '../../utils/auth'
import { goHomePage } from '../../utils/locationUtils'
import FormErrorMsg from '../Common/FormErrorMsg'

const FormItem = Form.Item;
const propTypes = {}
const defaultProps = {}

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleSubmit = (e) => {
    const { onLogin } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onLogin(values)
          .then((data) => {
            setUser(data.user)
            setToken(data.token)
            goHomePage()
          })
          .catch((err) => {
          })
      }
    });
  }

  renderErrorMsg() {
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

  render() {
    const { errors, status } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-wrapper">

        <Form onSubmit={this.handleSubmit} className="login-form">
          {
            status === 'ERROR' &&
            this.renderErrorMsg()
          }
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="test4" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="123456" />
              )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>

          </FormItem>
        </Form>
      </div>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(LoginForm)

LoginForm.propTypes = propTypes

LoginForm.defaultProps = defaultProps

export default WrappedNormalLoginForm

