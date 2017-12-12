import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../../actions/category'
import { CategoryTable } from '../../components/Category'

function mapState2Props(state) {
  const currentState = state.store.category
  return {
    status: currentState.status,
    categoriesList: currentState.items,
    page: currentState.page,
    errors: currentState.errors
  }
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch)
  return {
    fetchCategories: actions.fetchCategories,
    addCategory: actions.addCategory,
    updateCategory: actions.updateCategory,
    deleteCategory: actions.deleteCategory
  }
}

export default connect(mapState2Props, mapDispatch2Props)(CategoryTable)
