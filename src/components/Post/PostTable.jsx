import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Modal } from 'antd'
import TableView from '../Common/TableView'
import {
  dateRender,
  orderRender
} from '../Common/CustomTableRender'

const propTypes = {
  postList: PropTypes.array,
  page: PropTypes.object,
  status: PropTypes.string,
  errors: PropTypes.object,
  fetchPosts: PropTypes.func,
  addPost: PropTypes.func,
  updatePost: PropTypes.func,
  deletePost: PropTypes.func,
  changePostStatus: PropTypes.func,
}


class PostTable extends Component {

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
        render: orderRender
      },
      {
        title: '标题',
        width: 200,
        dataIndex: 'title',
        key: 'title',
        sorter: true,
      },
      {
        title: '作者',
        width: 200,
        dataIndex: 'author',
        key: 'author',
        sorter: true,
        render: (text, record) => <span>{record.name}</span>
      },
      {
        title: '状态',
        width: 120,
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '分类',
        width: 120,
        dataIndex: 'category',
        key: 'category',
        render: (text, record) => <span>{record.name}</span>
      },

      {
        title: '访问量',
        width: 100,
        dataIndex: 'visitCount',
        key: 'visitCount',
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
    const { fetchPosts } = this.props
    fetchPosts(params)
  }

  handleDelete = (record) => {
    const { deletePost } = this.props

    deletePost(record._id)
      .then(() => {
        this.delRef.destroy()
        this.table.reload()
      })
  }


  handleSearch = (value) => {
    const nextParms = { ...this.table.getParams(), ...{ word: value } }
    this.loadTableData(nextParms)
  }

  render() {
    const { visible, values, errors } = this.state
    const {
      postList,
      status,
      page,
     } = this.props
    return (
      <div>
        <TableView
          status={status}
          data={postList}
          page={page}
          options={this.getTableOptions()}
          loadData={this.loadTableData}
          columns={this.getColumn()}
          ref={(ref) => {
            this.table = ref
          }}
        />
      </div>
    )
  }
}


PostTable.propTypes = propTypes


export default PostTable
