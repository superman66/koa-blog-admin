import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Modal } from 'antd'
import TableView from '../Common/TableView'
import {
  dateRender,
  orderRender
} from '../Common/CustomTableRender'

const propTypes = {
  commentList: PropTypes.array,
  page: PropTypes.object,
  status: PropTypes.string,
  errors: PropTypes.object,
  fetchComments: PropTypes.func,
  addCategory: PropTypes.func,
  updateCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
}


class CommentTable extends Component {

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


  getTableOptions() {
    const { page } = this.props;
    return {
      searchInput: {
        placeholder: '内容 / 评论者 / 个人主页',
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
        render: orderRender
      },
      {
        title: '状态',
        width: 80,
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '评论者',
        width: 120,
        dataIndex: 'name',
        key: 'name',
        sorter: true,
      },
      {
        title: '评论内容',
        width: 100,
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '个人主页',
        width: 100,
        dataIndex: 'website',
        key: 'website',
        render: text => <a href="#">{text}</a>
      },
      {
        title: '点赞数',
        width: 120,
        dataIndex: 'likes',
        key: 'likes',
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
    const { fetchComments } = this.props
    fetchComments(params)
  }

  handleDelete = (record) => {
    const { deleteCategory } = this.props

    deleteCategory(record._id)
      .then(() => {
        this.delRef.destroy()
        this.table.reload()
      })
  }

  handleSearch = (value) => {
    const nextParms = { ...this.table.getParams(), ...{ word: value } }
    this.loadTableData(nextParms)
  }
  renderExpandRow(record) {
    return (
      <p style={{ margin: 0 }}>{record.content}</p>
    )
  }
  render() {
    const { visible, values, errors } = this.state
    const {
      commentList,
      status,
      page,
      addCategory,
      updateCategory,
     } = this.props
    return (
      <div>
        <TableView
          status={status}
          data={commentList}
          page={page}
          options={this.getTableOptions()}
          loadData={this.loadTableData}
          columns={this.getColumn()}
          expandedRowRender={this.renderExpandRow}
          ref={(ref) => {
            this.table = ref
          }}
        />
      </div>
    )
  }
}


CommentTable.propTypes = propTypes


export default CommentTable
