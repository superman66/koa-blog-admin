

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/users'
import { UserTable } from '../../components/Users'


function mapState2Props(state) {
  const currentState = state.store.user;
  return {
    status: currentState.status,
    userList: currentState.items,
    page: currentState.page
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    onFetchUser: actions.fetchUsers,
    onDeleteUser: actions.deleteUser,
  }
}

export default connect(mapState2Props, mapDispatch2Props)(UserTable)
