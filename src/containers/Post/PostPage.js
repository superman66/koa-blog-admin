import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
import * as actionCreators from '../../actions/post'
import * as categoryActionCreators from '../../actions/category'
import * as tagActionCreators from '../../actions/tag'
import {
  Post
} from '../../components/Post'

function mapState2Props(state) {
  const currentState = state.store.post
  const categoryState = state.store.category
  const tag = state.store.tag
  return {
    tags: tag.items,
    categoryList: categoryState.items,
    status: currentState.status,
    post: currentState.post,
    errors: currentState.errors
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(
    Object.assign({}, actionCreators, categoryActionCreators, tagActionCreators),
    dispatch
  )
  return {
    fetchPostById: actions.fetchPostById,
    addPost: actions.addPost,
    updatePost: actions.updatePost,
    fetchCategories: actions.fetchCategories,
    fetchTags: actions.fetchTags,
  }
}

export default connect(mapState2Props, mapDispatch2Props)(Post)