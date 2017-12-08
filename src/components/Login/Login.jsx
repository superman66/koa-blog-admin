import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Alert } from 'antd'

import { setToken, setUser } from '../../utils/auth'
import { goHomePage } from '../../utils/locationUtils'

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
        onLogin(values, (data) => {
          setUser(data.user)
          setToken(data.token)
          goHomePage()
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
              )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
          </FormItem>
          <FormItem>
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
            Or <a href="">register now!</a>
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

