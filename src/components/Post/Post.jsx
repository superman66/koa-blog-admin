import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Spin,
  Form,
  Icon,
  Input,
  Row,
  Col,
  Button,
  Modal,
  Tag,
  AutoComplete,
} from 'antd'
import _ from 'lodash'
import Editor from 'react-md-editor'
import marked from 'marked'

const CheckableTag = Tag.CheckableTag;
const { TextArea } = Input;

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
      selectedCategory: '', // 已选择的分类
      selectedTags: [], // 已选中的tag
      visible: false,   // modal visible
      dataSource: [],   // 标签 autocomplete 的数据源
      tagInputValue: '', // 标签 autocomplte input框的值
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
    if (!_.isEqual(nextProps.tags, this.props.tags)) {
      this.setState({
        dataSource: this.getDataSource(nextProps.tags)
      })
    }
  }

  getDataSource(tags) {
    return tags.map((tag) => {
      return {
        value: tag._id,
        text: tag.name,
      }
    })
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

  handleTagSearch = (value) => {
    const { fetchTags } = this.props;
    if (value === '') {
      this.setState({
        dataSource: [],
        tagInputValue: value,
      })
      return
    }
    this.setState({
      tagInputValue: value,
    })
    fetchTags({ word: value })
  }

  /*
   * 选择标签后的回调
   */
  handleTagSelect = (value, option) => {
    const { selectedTags } = this.state
    if (selectedTags.filter(tag => tag.id === value).length === 0) {
      const nextSelectedTags = selectedTags.concat([{
        id: value,
        name: option.props.children
      }])
      this.setState({
        selectedTags: nextSelectedTags,
        tagInputValue: '',
        dataSource: [],
      })
    }
  }

  /**
   * 删除tag回调
   */
  handleDeleteTag = (id) => {
    const { selectedTags } = this.state
    const nextSelectedTags = selectedTags.filter(tag => tag.id !== id)
    this.setState({
      selectedTags: nextSelectedTags
    })
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

  /**
   *显示已选择的tag
   */
  renderTags() {
    const { selectedTags } = this.state
    return selectedTags.map((tag) => (
      <span className="ant-tag" key={tag.id}>
        {tag.name}
        <Icon type="close" onClick={() => this.handleDeleteTag(tag.id)} />
      </span>
    ))
  }

  renderPublishModal() {
    const { visible, selectedCategory, dataSource, tagInputValue } = this.state
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
        <div className="selected-tags">
          {this.renderTags()}
        </div>

        <AutoComplete
          placeholder="输入标签"
          dataSource={dataSource}
          onSearch={this.handleTagSearch}
          onSelect={this.handleTagSelect}
          value={tagInputValue}
        />
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
