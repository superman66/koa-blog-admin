import React, { Component } from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

class PageFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        React + Antd + Redux
      </Footer>
    );
  }
}

export default PageFooter
