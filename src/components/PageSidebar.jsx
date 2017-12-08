import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout
const { SubMenu } = Menu


const propTypes = {
  collapsed: PropTypes.bool
}

const contextTypes = {
  menus: PropTypes.array,
  router: PropTypes.object,
}

class PageSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey: [],
    }
  }

  componentWillMount() {
    const { menus } = this.context;
    this.actiiveMenu(menus)
  }

  actiiveMenu = (menus) => {
    const { router } = this.context
    menus.forEach((menu) => {
      if (router.isActive({ pathname: menu.link })) {
        this.setState({
          selectedKey: [menu.key]
        })
      }
      if (menu.children.length) {
        this.actiiveMenu(menu.children)
      }
    })
  }

  renderMenuItem(menus) {
    return menus.map((item) => {
      return (
        <Menu.Item key={item.key}>
          {item.icon && <Icon type={item.icon} />}
          <Link to={item.link}>
            {item.name}
          </Link>
        </Menu.Item>
      )
    })
  }
  render() {
    const { selectedKey } = this.state
    const { menus } = this.context
    const { collapsed } = this.props
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={selectedKey}>
          {this.renderMenuItem(menus)}
        </Menu>
      </Sider>
    )
  }
}

PageSidebar.propTypes = propTypes;
PageSidebar.contextTypes = contextTypes;

export default PageSidebar
