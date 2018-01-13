import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
import * as actionCreators from '../../actions/about'
import {
  AboutMe
} from '../../components/Users'

function mapProps2Props(state) {
  const st = state.store.about
  return {
    about: st.about,
    status: st.status
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    onFetchAbout: actions.fetchAbout,
    onAddAbout: actions.addAbout,
    onUpdateAbout: actions.updateAbout,
  }
}

export default connect(mapProps2Props, mapDispatch2Props)(AboutMe)
