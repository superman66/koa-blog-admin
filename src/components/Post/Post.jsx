import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hljs from 'highlight.js'
import {
  Spin,
  Icon,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Tag,
  AutoComplete
} from 'antd'
import _ from 'lodash'
// import Editor from 'react-md-editor'
import Editor from 'tui-editor'
import marked from 'marked'
import { getUser } from '../../utils/auth'
import { PostStatus } from '../../constants/PostStatus'

const CheckableTag = Tag.CheckableTag
const { TextArea } = Input
marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value
})

const propTypes = {
  categoryList: PropTypes.array,
  tags: PropTypes.array,
  post: PropTypes.object,
  errors: PropTypes.object,
  status: PropTypes.string,
  fetchPostById: PropTypes.func,
  addPost: PropTypes.func,
  updatePost: PropTypes.func,
  fetchCategories: PropTypes.func,
  fetchTags: PropTypes.func
}

const contextTypes = {
  router: PropTypes.object
}

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getUser(),
      post: {
        content: props.post.content,
        title: '',
        desc: ''
      },
      selectedCategory: '', // 已选择的分类
      selectedTags: [], // 已选中的tag
      visible: false, // modal visible
      dataSource: [], // 标签 autocomplete 的数据源
      tagInputValue: '' // 标签 autocomplte input框的值
    }
  }

  componentDidMount() {
    const { fetchPostById } = this.props
    const { params } = this.context.router
    params.id &&
      fetchPostById(params.id).then(res => {
        this.initUIEditor(res.post.content)
      })
  }

  componentWillReceiveProps(nextProps) {
    const { post, tags } = nextProps
    if (!_.isEqual(post, this.props.post)) {
      const selectedCategory = _.get(nextProps, 'post.category._id') || ''
      this.setState({
        post: {
          content: post.content,
          title: post.title,
          desc: post.desc
        },
        selectedCategory,
        selectedTags: post.tags
      })
    }
    if (!_.isEqual(tags, this.props.tags)) {
      this.setState({
        dataSource: this.getDataSource(tags)
      })
    }
  }

  getDataSource(tags) {
    return tags.map(tag => {
      return {
        value: tag._id,
        text: tag.name
      }
    })
  }

  /**
   * 将选中的tags转换为post提交所需的数组格式
   * @param {*} tags
   */
  convertTags(tags) {
    if (!Array.isArray(tags)) {
      throw new Error('tags should be array')
    }
    return tags.map(tag => {
      return tag._id
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
      height: '600px'
    })
  }

  updateEditorContent = content => {
    this.setState(prevState => {
      return {
        post: Object.assign({}, prevState.post, {
          content
        })
      }
    })
  }

  handleTitleChange = e => {
    const nextPost = { ...this.state.post, ...{ title: e.target.value } }
    this.setState({
      post: nextPost
    })
  }

  handleDescChange = e => {
    const nextPost = { ...this.state.post, ...{ desc: e.target.value } }
    this.setState({
      post: nextPost
    })
  }

  handleOpenModal = () => {
    const { fetchCategories } = this.props
    fetchCategories()
    this.setState({
      visible: true
    })
  }

  hideModal = () => {
    this.setState({
      visible: false
    })
  }

  handleSelectCategory = (category, checked) => {
    const nextSelectedCategory = checked ? category._id : ''
    this.setState({
      selectedCategory: nextSelectedCategory
    })
  }

  handleTagSearch = value => {
    const { fetchTags } = this.props
    if (value === '') {
      this.setState({
        dataSource: [],
        tagInputValue: value
      })
      return
    }
    this.setState({
      tagInputValue: value
    })
    fetchTags({ word: value })
  }

  /*
   * 选择标签后的回调
   */
  handleTagSelect = (value, option) => {
    const { selectedTags } = this.state
    if (selectedTags.filter(tag => tag._id === value).length === 0) {
      const nextSelectedTags = selectedTags.concat([
        {
          _id: value,
          name: option.props.children
        }
      ])
      this.setState({
        selectedTags: nextSelectedTags,
        tagInputValue: '',
        dataSource: []
      })
    }
  }

  /**
   * 删除tag回调
   */
  handleDeleteTag = id => {
    const { selectedTags } = this.state
    const nextSelectedTags = selectedTags.filter(tag => tag._id !== id)
    this.setState({
      selectedTags: nextSelectedTags
    })
  }

  handlePublish = (e, postStatus = PostStatus.publish) => {
    const { selectedTags, selectedCategory, user } = this.state
    const { addPost, post, updatePost } = this.props
    const tagss = this.convertTags(selectedTags)
    let formData = {
      status: postStatus,
      ...this.state.post,
      ...{
        tags: this.convertTags(selectedTags)
      }
    }
    if (selectedCategory) {
      formData.category = selectedCategory
    }
    formData.content = this.editor.getMarkdown()
    // update post
    if (post._id) {
      updatePost(post._id, formData).then(this.publishSuccess())
    } else {
      formData.author = user._id
      addPost(formData).then(this.publishSuccess())
    }
    this.hideModal()
  }

  handleDraft = e => {
    this.handlePublish(e, PostStatus.draft)
  }
  publishSuccess() {
    const { router } = this.context
    router.goBack()
  }

  renderPreview() {
    const { post } = this.state
    if (!post.content) {
      return null
    }
    const preview = marked(post.content)
    return (
      <div
        className="preview markdown-body"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    )
  }

  /**
   *显示已选择的tag
   */
  renderTags() {
    const { selectedTags } = this.state
    return selectedTags.map(tag => (
      <span className="ant-tag" key={tag._id}>
        {tag.name}
        <Icon type="close" onClick={() => this.handleDeleteTag(tag._id)} />
      </span>
    ))
  }

  renderModalFooter() {
    const { post } = this.props
    return (
      <div>
        <Button onClick={this.hideModal}>返回修改</Button>
        {!post._id ? (
          <Button onClick={this.handleDraft}>存为草稿</Button>
        ) : null}
        <Button type="primary" onClick={this.handlePublish}>
          确认发布
        </Button>
      </div>
    )
  }

  renderPublishModal() {
    const {
      visible,
      selectedCategory,
      dataSource,
      tagInputValue,
      post
    } = this.state
    const { categoryList } = this.props

    return (
      <Modal
        title="发布文章"
        visible={visible}
        onCancel={this.hideModal}
        footer={this.renderModalFooter()}
      >
        <h4>选择分类</h4>
        {categoryList.map(category => (
          <CheckableTag
            key={category._id}
            checked={selectedCategory === category._id}
            onChange={checked => this.handleSelectCategory(category, checked)}
          >
            {category.name}
          </CheckableTag>
        ))}

        <h4>选择标签</h4>
        <div className="selected-tags">{this.renderTags()}</div>

        <AutoComplete
          placeholder="输入标签"
          dataSource={dataSource}
          onSearch={this.handleTagSearch}
          onSelect={this.handleTagSelect}
          value={tagInputValue}
        />
        <h4>简介</h4>
        <TextArea rows={3} value={post.desc} onChange={this.handleDescChange} />
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
              placeholder="输入文章标题..."
              value={post.title}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="right-box" />
        </div>
        <Row className="post-content">
          <Col className="editor" xs={24}>
            <div id="editor" />
            <Button className="publish-button" onClick={this.handleOpenModal}>
              发布
            </Button>
            {/* <Editor value={post.content} onChange={this.updateEditorContent} /> */}
          </Col>
          {/* {this.renderPreview()} */}
        </Row>

        {this.renderPublishModal()}
      </div>
    )
  }
}

Post.propTypes = propTypes
Post.contextTypes = contextTypes

export default Post
