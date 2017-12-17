import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
import * as actionCreators from '../../actions/post'
import {
  Post
} from '../../components/Post'

function mapState2Props(state) {
  const currentState = state.store.post
  return {
    status: currentState.status,
    post: currentState.post,
    errors: currentState.errors
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchPostById: actions.fetchPostById,
    addPost: actions.addPost,
    updatePost: actions.updatePost,
  }
}

export default connect(mapState2Props, mapDispatch2Props)(Post)
