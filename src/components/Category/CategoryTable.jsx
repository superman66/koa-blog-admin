import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Modal } from 'antd'
import TableView from '../Common/TableView'
import {
  dateRender,
  orderRender
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
      values: {}
    }
  }


  componentDidMount() {
    this.loadTableData(this.table.getParams())
  }

  getTableOptions() {
    const { page } = this.props;
    return {
      addButton: {
        onClick: this.openAddOrUpdateModal
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
        render: orderRender
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
        render: dateRender
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 300,
        sorter: true,
        render: dateRender
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
      values: record
    })
  }

  handleSubmit = (id, values) => {
    const { addCategory, updateCategory } = this.props
    // update category when id exist
    if (id) {
      updateCategory(id, values)
        .then(() => {
          this.afterSubmit()
        })
    } else {
      addCategory(values)
        .then(() => {
          this.afterSubmit()
        })
    }
  }
  afterSubmit = () => {
    this.handleHideModal()
    this.table.reload()
  }
  handleHideModal = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible, values } = this.state
    const { categoriesList, status, page, errors } = this.props
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
          values={values}
          errors={errors}
          visible={visible}
          hideModal={this.handleHideModal}
          submit={this.handleSubmit}
        />
      </div>
    )
  }
}


CategoryTable.propTypes = propTypes


export default CategoryTable
