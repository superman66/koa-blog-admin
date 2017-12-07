

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/dashboard';
import DashboardView from '../../components/Dashboard';


function mapState2Props(state) {
  return {
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
  };
}

export default connect(mapState2Props, mapDispatch2Props)(DashboardView);
