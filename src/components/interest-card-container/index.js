import React, {Component, PropTypes} from "react"
import './style.css';
import * as actionCreators from "../../actions/";
import InterestCard from "../interest-card";
import { connect }  from "react-redux";
import { bindActionCreators } from "redux";

class InterestCardContainer extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    if (!this.props.newInterestMode) {
      this.props.fetchInterestResource(this.props.interest['.key'], 'chunks');
      this.props.fetchInterestResource(this.props.interest['.key'], 'materials');
      this.props.fetchInterestResource(this.props.interest['.key'], 'people');
      this.props.fetchInterestResource(this.props.interest['.key'], 'events');
    }
  }

  render() {
    var interestKey = this.props.interest['.key'];
    var interest = this.props.interests.find(function(interest) { return interest['.key'] === interestKey })
    return <InterestCard interest={interest} />
  }
}

InterestCardContainer.propTypes = {
  interest: PropTypes.object,
  newInterestMode: PropTypes.bool,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResource: PropTypes.func
}


function mapStateToProps(state) {
  return {
    interests: state.interests
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(InterestCardContainer);

