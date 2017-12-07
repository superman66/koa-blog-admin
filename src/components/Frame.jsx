import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Breadcrumb, Menu, Icon } from 'antd'
import PageHeader from './PageHeader'
import PageSidebar from './PageSidebar'
import PageFooter from './PageFooter'

const { Content, Sider } = Layout
const { SubMenu } = Menu

const propTypes = {
  activeItem: PropTypes.string,
  hideSidebar: PropTypes.bool,
  hideHeader: PropTypes.bool,
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  menus: PropTypes.array
};

const defaultProps = {
  headerProps: {}
};

class Frame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

  handleOnToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed } = this.state;
    const { children } = this.props;

    return (
      <Layout className="ant-layout-has-sider table-content">
        <PageSidebar collapsed={collapsed} />
        <Layout>
          <PageHeader
            collapsed={collapsed}
            toggle={this.handleOnToggle}
          />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {children}
          </Content>
          <PageFooter />
        </Layout>
      </Layout>
    );
  }
}

Frame.propTypes = propTypes;
Frame.contextTypes = contextTypes;
Frame.defaultProps = defaultProps;
export default Frame;
