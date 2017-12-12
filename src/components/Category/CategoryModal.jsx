import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Icon, Alert } from 'antd'

const FormItem = Form.Item
const propTypes = {
  visible: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  form: PropTypes.object,
  submit: PropTypes.func,
  hideModal: PropTypes.func,
}


class CategoryModal extends Component {

  handleSubmit = (e) => {
    const { submit } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        submit(this.props.values._id, values)
      }
    });
  }

  handleCancel = () => {
    const { hideModal } = this.props
    hideModal()
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
    const { visible, values } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="Modal"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form className="login-form">
          {
            this.renderErrorMsg()
          }
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: values.name,
              rules: [{ required: true, message: '分类名称不能为空' }],
            })(
              <Input placeholder="分类名称" />
              )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedNormalCategoryModalForm = Form.create()(CategoryModal)
CategoryModal.propTypes = propTypes


export default WrappedNormalCategoryModalForm
