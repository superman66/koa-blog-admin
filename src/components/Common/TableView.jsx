import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Pagination, Button, Input } from 'antd'
import _ from 'lodash'
import ReqeustStatus from '../../constants/RequestStatus'
import convertOrderType from '../../utils/covertOrderType'

const Search = Input.Search

const propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  status: PropTypes.string,
  loadData: PropTypes.func,
  options: PropTypes.object,
}

const defaultProps = {
  options: {},
}

class TablveView extends Component {
  constructor(props) {
    super(props)
    const { total } = props.options
    this.state = {
      pagination: {
        total,
        current: 1,
        pageSize: 30,
        showTotal: this.showTotal,
      },
      params: {
        page: 1,
        pageSize: 30,
      },
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState(prevState => {
        return {
          pagination: {
            ...prevState.pagination,
            ...{ total: nextProps.options.total },
          },
        }
      })
    }
  }

  getParams() {
    return _.omit(this.state.params, _.isUndefined)
  }

  setParams(params, callback) {
    this.setState(
      prevState => {
        return {
          params: { ...prevState.params, ...params },
        }
      },
      () => {
        callback && callback()
      },
    )
  }
  reload() {
    this.setState(
      {
        params: { ...this.state.params, page: 1 },
      },
      this.update,
    )
  }

  update() {
    const { params } = this.state
    this.loadTableData(params)
  }

  showTotal = total => {
    return `Total ${total} items`
  }

  handlePaginatiChange = (page, pageSize) => {
    this.setState(prevState => {
      return {
        pagination: { ...prevState.pagination, ...{ current: page } },
      }
    })
    const params = {
      page,
      pageSize,
    }

    this.setParams(params, this.loadTableData)
  }

  handleTableChange = (pagination, filters, sorter) => {
    const params = {
      orderColumn: sorter.field,
      orderType: convertOrderType(sorter.order),
    }

    this.setParams(params, this.loadTableData)
  }

  handleShowSizeChange = (current, pageSize) => {
    this.setState(prevState => {
      return {
        pagination: { ...prevState.pagination, ...{ pageSize } },
      }
    })
    const params = {
      page: 1,
      pageSize,
    }
    this.setParams(params, this.loadTableData)
  }

  loadTableData = params => {
    const { loadData } = this.props
    loadData(params || this.state.params)
  }

  renderPagination() {
    const { pagination } = this.state
    return (
      <Pagination
        className="custom-table-pagination"
        showSizeChanger
        onShowSizeChange={this.handleShowSizeChange}
        total={pagination.total}
        showTotal={total => `Total ${total} items`}
        pageSize={pagination.pageSize}
        current={pagination.current}
        defaultCurrent={1}
        onChange={this.handlePaginatiChange}
      />
    )
  }
  renderSearch() {
    const { searchInput = {} } = this.props.options
    const { placeholder = '', style = { width: 250 }, onSearch } = searchInput

    return (
      Object.keys(searchInput).length !== 0 && (
        <Search
          className="search"
          placeholder={placeholder}
          onSearch={value => onSearch(value.trim())}
          style={style}
          enterButton
        />
      )
    )
  }

  renderAddButton() {
    const { addButton = {} } = this.props.options
    const { icon = 'plus', text = '新建', onClick } = addButton
    return Object.keys(addButton).length !== 0 ? (
      <Button type="primary" icon={icon} onClick={onClick}>
        {text}
      </Button>
    ) : null
  }

  render() {
    const { data, columns, status } = this.props
    return (
      <div>
        <div className="table-filter-section">
          {this.renderAddButton()}
          {this.renderSearch()}
        </div>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          loading={status === ReqeustStatus.REQUEST}
          onChange={this.handleTableChange}
          {...this.props}
        />
        {this.renderPagination()}
      </div>
    )
  }
}

TablveView.propTypes = propTypes
TablveView.defautlProps = defaultProps

export default TablveView
