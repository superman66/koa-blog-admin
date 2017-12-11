

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/users'
import { UserForm } from '../../components/Users'

function mapState2Props(state) {
  const currentState = state.store.user;
  return {
    status: currentState.status,
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    onFetchUser: actions.fetchUsers
  }
}

export default connect(mapState2Props, mapDispatch2Props)(UserForm)
