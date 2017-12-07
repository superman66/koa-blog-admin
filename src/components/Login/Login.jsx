import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
const propTypes = {}
const defaultProps = {}

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-wrapper">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
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
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
              )}
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

