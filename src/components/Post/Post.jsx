import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin, Form, Input, Row, Col } from 'antd'
import Editor from 'react-md-editor'
import marked from 'marked'

const FormItem = Form.Item;

const propTypes = {
  post: PropTypes.object,
  errors: PropTypes.object,
  status: PropTypes.string,
  fetchPostById: PropTypes.func,
  addPost: PropTypes.func,
  updatePost: PropTypes.func,
}

const contextTypes = {
  router: PropTypes.object,
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '# test post content',
    }
  }

  componentWillMount() {
    const { fetchPostById } = this.props
    const { params } = this.context.router
    params.id && fetchPostById(params.id)
  }

  updateEditorContent = (content) => {
    this.setState({
      content,
    })
  }

  renderPreview() {
    const preview = marked(this.state.content)
    return (
      <div className="preview markdown-body" dangerouslySetInnerHTML={{ __html: preview }} />
    )
  }

  render() {
    const { content } = this.state
    const { post, status } = this.props
    if (status === 'REQUEST') {
      return <Spin size="large" />
    }
    return (
      <div className="post-editor-wrapper">
        <div className="post-title">
          <Input className="title" placeholder="请输入标题" />
        </div>
        <Row className="post-content">
          <Col className="editor" xs={12}>
            <Editor
              value={content}
              onChange={this.updateEditorContent}
            />
          </Col>
          {this.renderPreview()}
        </Row>
      </div>
    )
  }
}


Post.propTypes = propTypes
Post.contextTypes = contextTypes


export default Post
