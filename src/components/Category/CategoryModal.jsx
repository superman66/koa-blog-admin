import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Icon, Alert } from 'antd'

const FormItem = Form.Item
const propTypes = {
  visible: PropTypes.bool,
  formData: PropTypes.object,
  errors: PropTypes.object,
  form: PropTypes.object,
  addCategory: PropTypes.func,
  updateCategory: PropTypes.func,
  hideModal: PropTypes.func
}

// 需要手动清空的数据 form表单数据、errors数据
class CategoryModal extends Component {

  handleSubmit = (e) => {
    const { submit, formData, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        submit(formData._id, values)
      }
    });
  }

  handleHide = () => {
    const { hideModal, form } = this.props
    hideModal()
    form.resetFields()
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
    const { visible, formData } = this.props
    const { getFieldDecorator } = this.props.form
    const title = formData._id ? '编辑分类' : '新建分类'
    return (
      <Modal
        key="modal"
        title={title}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.handleHide}
        okText="确认"
        cancelText="取消"
      >
        <Form className="login-form">
          {
            this.renderErrorMsg()
          }
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: formData.name,
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
