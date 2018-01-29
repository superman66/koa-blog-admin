import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Modal } from 'antd'
import TableView from '../Common/TableView'
import {
  DateRender,
  OrderRender
} from '../Common/CustomTableRender'
import CategoryModal from './CategoryModal'

const propTypes = {
  categoriesList: PropTypes.array,
  page: PropTypes.object,
  status: PropTypes.string,
  errors: PropTypes.object,
  fetchCategories: PropTypes.func,
  addCategory: PropTypes.func,
  updateCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
}


class CategoryTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      values: {},
      errors: props.errors
    }
  }

  componentDidMount() {
    this.loadTableData(this.table.getParams())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  getTableOptions() {
    const { page } = this.props;
    return {
      addButton: {
        onClick: this.openAddOrUpdateModal
      },
      searchInput: {
        placeholder: '名称',
        onSearch: this.handleSearch
      },
      total: page.total || 0
    }
  }

  getColumn() {
    return [
      {
        title: '序号',
        width: 80,
        key: 'index',
        render: OrderRender
      },
      {
        title: '分类名称',
        width: 200,
        dataIndex: 'name',
        key: 'name',
        sorter: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 300,
        sorter: true,
        render: DateRender
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 300,
        sorter: true,
        render: DateRender
      },
      {
        title: '操作',
        width: 100,
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.openAddOrUpdateModal(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.openDeleteModal(record)}>删除</a>
          </span>
        ),
      },
    ]
  }

  openDeleteModal = (record) => {
    this.delRef = Modal.confirm({
      title: '确认删除',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.handleDelete(record)
    });
  }
  loadTableData = (params) => {
    const { fetchCategories } = this.props
    fetchCategories(params)
  }

  handleDelete = (record) => {
    const { deleteCategory } = this.props

    deleteCategory(record._id)
      .then(() => {
        this.delRef.destroy()
        this.table.reload()
      })
  }

  openAddOrUpdateModal = (record = {}) => {
    this.setState({
      visible: true,
      values: record,
      errors: {}
    })
  }

  hideAddOrUpdateModal = () => {
    this.setState({
      visible: false,
      errors: {},
      values: {}
    })
  }

  handleSubmit = (id, values, cb) => {
    const { addCategory, updateCategory } = this.props
    // update category when id exist
    if (id) {
      updateCategory(id, values)
        .then(() => {
          this.afterSubmit()
          // modal 提交成功后的回调，要重置 Modal 表单的数据，保证每次打开modal都是最新的
          cb()
        })
    } else {
      addCategory(values)
        .then(() => {
          this.afterSubmit()
          cb()
        })
    }
  }

  afterSubmit = () => {
    this.hideAddOrUpdateModal()
    this.table.reload()
  }

  handleSearch = (value) => {
    const nextParms = { ...this.table.getParams(), ...{ word: value } }
    this.loadTableData(nextParms)
  }

  render() {
    const { visible, values, errors } = this.state
    const {
      categoriesList,
      status,
      page,
      addCategory,
      updateCategory,
     } = this.props
    return (
      <div>
        <TableView
          status={status}
          data={categoriesList}
          page={page}
          options={this.getTableOptions()}
          loadData={this.loadTableData}
          columns={this.getColumn()}
          ref={(ref) => {
            this.table = ref
          }}
        />

        <CategoryModal
          status={status}
          formData={values}
          errors={errors}
          visible={visible}
          submit={this.handleSubmit}
          hideModal={this.hideAddOrUpdateModal}
        />
      </div>
    )
  }
}


CategoryTable.propTypes = propTypes


export default CategoryTable
