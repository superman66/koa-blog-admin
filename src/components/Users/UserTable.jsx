import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
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

class UserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        render: dateRender
      },
      {
        title: '操作',
        width: 100,
        key: 'action',
        render: () => (
          <span>
            <a href="#">编辑</a>
            <Divider type="vertical" />
            <a href="#">删除</a>
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
export default UserTable
