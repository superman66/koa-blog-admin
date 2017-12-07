import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Layout, Icon } from 'antd'

const { Header } = Layout

const propTypes = {
  // Logo
  // brand: PropTypes.node,
  // // 顶部菜单
  // menuItems: PropTypes.array,
  // activeItem: PropTypes.string
};

const contextTypes = {
  // router: React.PropTypes.object.isRequired
};

class PageHeader extends Component {

  render() {

    const { collapsed, toggle } = this.props;
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </Header>
    );
  }
}

PageHeader.propTypes = propTypes;
PageHeader.contextTypes = contextTypes;

export default PageHeader;
