import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Spin,
  Form,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Tag,
  Divider,
} from 'antd'
import _ from 'lodash'
import Editor from 'react-md-editor'
import marked from 'marked'

const CheckableTag = Tag.CheckableTag;
const { TextArea } = Input;

const propTypes = {
  categoryList: PropTypes.array,
  tagList: PropTypes.array,
  post: PropTypes.object,
  errors: PropTypes.object,
  status: PropTypes.string,
  fetchPostById: PropTypes.func,
  addPost: PropTypes.func,
  updatePost: PropTypes.func,
  fetchCategories: PropTypes.func,
  fetchTags: PropTypes.func,
}

const contextTypes = {
  router: PropTypes.object,
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        content: props.post.content,
        title: '',
      },
      selectedCategory: '',
      visible: false,
      tagPanelVisible: false,
    }
  }

  componentWillMount() {
    const { fetchPostById } = this.props
    const { params } = this.context.router
    params.id && fetchPostById(params.id)

  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.post, this.props.post)) {
      this.setState({
        post: {
          content: nextProps.post.content,
          title: nextProps.post.title
        }
      })
    }
  }

  updateEditorContent = (content) => {
    this.setState({
      content,
    })
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }

  handleOpenModal = () => {
    const { fetchCategories } = this.props
    fetchCategories()
    this.setState({
      visible: true,
    })
  }

  hideModal = () => {
    this.setState({
      visible: false,
    })
  }

  handleSelectCategory = (category, checked) => {
    const nextSelectedCategory = checked ? category._id : ''
    this.setState({
      selectedCategory: nextSelectedCategory
    })
  }

  handleTagChange = (e) => {
    const { fetchTags } = this.props;
    if (!e.target.value) {
      this.setState({
        tagPanelVisible: false,
      })
      return
    }
    this.setState({
      tagPanelVisible: true,
    })
    const params = {
      word: e.target.value
    }
    fetchTags(params)
  }

  renderPreview() {
    const { post } = this.state
    if (!post.content) {
      return null;
    }
    const preview = marked(post.content)
    return (
      <div className="preview markdown-body" dangerouslySetInnerHTML={{ __html: preview }} />
    )
  }

  renderSuggestTags() {
    const { tagPanelVisible } = this.state
    const { tagList } = this.props
    const style = tagPanelVisible ? { display: 'block' } : {}
    return (
      <ul className="suggest-tag-list" style={style}>
        {tagList.map(tag => (
          <li key={tag._id}>{tag.name}</li>
        ))}
      </ul>
    )
  }

  renderPublishModal() {
    const { visible, selectedCategory } = this.state
    const { categoryList } = this.props
    return (
      <Modal
        title="发布文章"
        visible={visible}
        onOk={this.hideModal}
        onCancel={this.hideModal}
        okText="确认发布"
        cancelText="取消"
      >
        <h4>选择分类</h4>
        {categoryList.map((category) => (
          <CheckableTag
            key={category._id}
            checked={selectedCategory === category._id}
            onChange={checked => this.handleSelectCategory(category, checked)}
          >
            {category.name}
          </CheckableTag>
        ))}

        <h4>选择标签</h4>
        <div className="suggest-tag-wrapper">
          <Input
            placeholder="输入标签"
            onChange={this.handleTagChange}
          />
          {this.renderSuggestTags()}
        </div>
        <h4>简介</h4>
        <TextArea rows={3} />
      </Modal>
    )
  }

  render() {
    const { post } = this.state
    const { status } = this.props
    if (status === 'REQUEST') {
      return <Spin size="large" />
    }
    return (
      <div className="post-editor-wrapper">
        <div className="post-title">
          <div className="left-box">
            <Input
              className="title"
              placeholder="请输入标题"
              value={post.title}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="right-box">
            <Button onClick={this.handleOpenModal} >发布</Button>
          </div>
        </div>
        <Row className="post-content">
          <Col className="editor" xs={12}>
            <Editor
              value={post.content}
              onChange={this.updateEditorContent}
            />
          </Col>
          {this.renderPreview()}
        </Row>

        {this.renderPublishModal()}
      </div>
    )
  }
}


Post.propTypes = propTypes
Post.contextTypes = contextTypes


export default Post
