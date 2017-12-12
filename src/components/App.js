import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd'
import { loggedIn } from '../utils/auth'
import Loading from './Loading'
import PageHeader from './PageHeader'
import PageSidebar from './PageSidebar'
import PageFooter from './PageFooter'

const { Content } = Layout

const propTypes = {
  menus: PropTypes.array,
  fetchMenu: PropTypes.func,
};

const contextTypes = {
  router: PropTypes.object,
};

const childContextTypes = {
  menus: PropTypes.array
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      collapsed: false
    }
  }

  getChildContext() {
    const { menus } = this.props;
    return {
      menus
    }
  }
  componentWillMount() {
    this.initData()
  }

  initData = () => {
    const { fetchMenu } = this.props;
    const init = []
    init.push(new Promise((resolve) => {
      loggedIn() && fetchMenu().then(resolve);
    }))

    Promise.all(init)
      .then(() => {
        this.setState({ ready: true })
      })
  }

  handleOnToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  render() {
    const { ready, collapsed } = this.state
    const { children } = this.props;

    if (!ready) {
      return this.renderLoading()
    }
    return (
      <div className="page">
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
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;
App.childContextTypes = childContextTypes;

export default App;

