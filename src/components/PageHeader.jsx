import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Layout,
  Menu,
  Dropdown,
  Icon,
  Row,
  Col,
} from 'antd'
import { getUser, logout } from '../utils/auth';
import { goLoginPage } from '../utils/locationUtils'


const { Header } = Layout

const propTypes = {
};

const contextTypes = {
  // router: React.PropTypes.object.isRequired
};

class PageHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getUser()
    }
  }

  handleLogout = () => {
    logout()
    goLoginPage()
  }

  renderSubMenu() {
    return (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleLogout}>登出</a>
        </Menu.Item>
      </Menu>
    )
  }

  renderProfile() {
    const { user } = this.state
    const menu = this.renderSubMenu()
    return (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          <Icon type="user" /> {user.username}
        </a>
      </Dropdown>
    )
  }

  render() {
    const { collapsed, toggle } = this.props;
    return (
      <Header style={{ background: '#fff', padding: '0 0 0 15px' }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
        <div style={{ float: 'right', paddingRight: 15 }}>
          {this.renderProfile()}
        </div>
      </Header >
    );
  }
}

PageHeader.propTypes = propTypes;
PageHeader.contextTypes = contextTypes;

export default PageHeader;
