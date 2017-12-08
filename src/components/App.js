import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd'
import { loggedIn } from '../utils/auth'
import Loading from './Loading'

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
      loggedIn() && fetchMenu(resolve);
    }))

    Promise.all(init)
      .then(() => {
        this.setState({ ready: true })
      })
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  render() {
    const { ready } = this.state
    const { children } = this.props;

    if (!ready) {
      return this.renderLoading()
    }
    return (
      <div className="page">
        {children}
      </div>
    );
  }
}

App.propTypes = propTypes;
App.contextTypes = contextTypes;
App.childContextTypes = childContextTypes;

export default App;

