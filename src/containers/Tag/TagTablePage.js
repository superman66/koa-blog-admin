import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/tag'
import { TagTable } from '../../components/Tag'

function mapState2Props(state) {
  const currentState = state.store.tag
  return {
    status: currentState.status,
    tagList: currentState.items,
    page: currentState.page,
    errors: currentState.errors
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchTags: actions.fetchTags,
    addTag: actions.addTag,
    updateTag: actions.updateTag,
    deleteTag: actions.deleteTag
  }
}

export default connect(mapState2Props, mapDispatch2Props)(TagTable)
