import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu


const propTypes = {
  collapsed: PropTypes.bool
}

const contextTypes = {
  menus: PropTypes.array
}

class PageSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { menus } = this.context;
    const { collapsed } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

PageSidebar.propTypes = propTypes;
PageSidebar.contextTypes = contextTypes;

export default PageSidebar
