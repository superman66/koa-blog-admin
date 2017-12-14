import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
import * as actionCreators from '../../actions/comment'
import {
  CommentTable
} from '../../components/Comment'

function mapState2Props(state) {
  const currentState = state.store.comment
  return {
    status: currentState.status,
    commentList: currentState.items,
    page: currentState.page,
    errors: currentState.errors
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchComments: actions.fetchComments,
    reviewComment: actions.reviewComment,
    deleteComment: actions.deleteComment
  }
}

export default connect(mapState2Props, mapDispatch2Props)(CommentTable)
