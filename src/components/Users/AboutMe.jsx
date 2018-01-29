import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Editor from 'tui-editor'
import marked from 'marked'
import hljs from 'highlight.js'
import { Button, Row, Col } from 'antd'
import Loading from '../Loading'
import RequestStatus from '../../constants/RequestStatus'

marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value,
})

const propTypes = {
  about: PropTypes.object,
  status: PropTypes.string,
  onFetchAbout: PropTypes.func,
  onAddAbout: PropTypes.func,
  onUpdateAbout: PropTypes.func,
}

class AboutMe extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const { onFetchAbout } = this.props
    onFetchAbout &&
      onFetchAbout().then(res => {
        this.initUIEditor(res.about.content)
      })
  }

  /**
   * 初始化编辑器
   */
  initUIEditor = content => {
    this.editor = new Editor({
      el: document.querySelector('#editor'),
      initialEditType: 'markdown',
      previewStyel: 'tab',
      initialValue: content,
      height: '600px',
    })
  }

  handleSubmit = () => {
    const { about, onAddAbout, onUpdateAbout } = this.props
    const nextAbout = {
      content: this.editor.getMarkdown(),
    }
    if (about._id) {
      onUpdateAbout && onUpdateAbout(about._id, nextAbout)
    } else {
      onAddAbout(nextAbout)
    }
  }

  render() {
    const { status } = this.props
    if (status === RequestStatus.REQUEST) {
      return <Loading />
    }
    return (
      <div>
        <Row type="flex" className="about-content">
          <Col className="editor" xs={24}>
            <div id="editor" />
          </Col>
          <Col xs={24} style={{ marginTop: '15px', textAlign: 'center' }}>
            <Button type="primary" onClick={this.handleSubmit}>
              确定
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

AboutMe.propTypes = propTypes
export default AboutMe
