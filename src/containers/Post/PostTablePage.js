import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
import * as actionCreators from '../../actions/post'
import {
  PostTable
} from '../../components/Post'

function mapState2Props(state) {
  const currentState = state.store.post
  return {
    status: currentState.status,
    postList: currentState.items,
    page: currentState.page,
    errors: currentState.errors
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchPosts: actions.fetchPosts,
    addPost: actions.addPost,
    updatePost: actions.updatePost,
    changePostStatus: actions.changePostStatus,
    deletePost: actions.deletePost
  }
}

export default connect(mapState2Props, mapDispatch2Props)(PostTable)