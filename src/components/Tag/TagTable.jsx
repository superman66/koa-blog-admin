import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Modal } from 'antd'
import TableView from '../Common/TableView'
import {
  dateRender,
  orderRender
} from '../Common/CustomTableRender'
import TagModal from './TagModal'

const propTypes = {
  tagList: PropTypes.array,
  page: PropTypes.object,
  status: PropTypes.string,
  errors: PropTypes.object,
  fetchTags: PropTypes.func,
  addTag: PropTypes.func,
  updateTag: PropTypes.func,
  deleteTag: PropTypes.func,
}


class TagTable extends Component {

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
        placeholder: '标签名称',
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
    const { fetchTags } = this.props
    fetchTags(params)
  }

  handleDelete = (record) => {
    const { deleteTag } = this.props

    deleteTag(record._id)
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
    const { addTag, updateTag } = this.props
    if (id) {
      updateTag(id, values)
        .then(() => {
          this.afterSubmit()
          // 提交成功后的回调，要重置 Modal 表单的数据，保证每次打开modal都是最新的
          cb()
        })
    } else {
      addTag(values, cb)
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
      tagList,
      status,
      page,
      addTag,
      updateTag,
     } = this.props
    return (
      <div>
        <TableView
          status={status}
          data={tagList}
          page={page}
          options={this.getTableOptions()}
          loadData={this.loadTableData}
          columns={this.getColumn()}
          ref={(ref) => {
            this.table = ref
          }}
        />

        <TagModal
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


TagTable.propTypes = propTypes


export default TagTable
