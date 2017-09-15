import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export default (mapStateToProps=null, actions=null) =>
  (Component) => withRouter(connect(
    mapStateToProps,
    actions
  )(Component))