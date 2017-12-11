import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Modal } from 'antd'
import { Link } from 'react-router'
import TableView from '../TableView'
import {
  dateRender,
  orderRender
} from '../customTableRender'


const propTypes = {
  userList: PropTypes.array,
  page: PropTypes.object,
  status: PropTypes.string,
  onFetchUser: PropTypes.func
}

const contextTypes = {
  router: PropTypes.object,
}

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.loadTableData(this.table.getParams());
  }

  getTableOptions() {
    const { page } = this.props;
    return {
      total: page.total || 0
    }
  }

  getColumns() {
    const columns = [
      {
        title: '序号',
        width: 80,
        key: 'index',
        render: orderRender
      },
      {
        title: '用户名',
        width: 200,
        dataIndex: 'username',
        key: 'username',
        sorter: true,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        width: 150,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 150,
        sorter: true,
        render: dateRender
      },
      {
        title: '操作',
        width: 100,
        key: 'action',
        render: (text, record) => (
          <span>
            {/* <Link to={`/users/edit/${record._id}`}>编辑</Link>
            <Divider type="vertical" /> */}
            <a onClick={() => this.openConfirmModal(record)}>删除</a>
          </span>
        ),
      },
    ];
    return columns;
  }

  loadTableData = (params) => {
    const { onFetchUser } = this.props;
    onFetchUser(params);
  }

  openConfirmModal = (record) => {
    this.confirmRef = Modal.confirm({
      title: '确认删除',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.handleDelete(record)
    });
  }

  handleDelete = (record) => {
    const { onDeleteUser } = this.props
    onDeleteUser(record._id)
      .then(() => {
        this.confirmRef.destroy()
        this.table.reload()
      })
  }

  render() {
    const { userList, status, page } = this.props;
    return (
      <TableView
        status={status}
        data={userList}
        page={page}
        options={this.getTableOptions()}
        loadData={this.loadTableData}
        columns={this.getColumns()}
        ref={(ref) => {
          this.table = ref
        }}
      />
    )
  }
}

UserTable.propTypes = propTypes
UserTable.contextTypes = contextTypes
export default UserTable
