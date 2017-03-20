import React, {Component, PropTypes} from "react"
import './style.css';
import * as actionCreators from "../../actions/";
import InterestCard from "../interest-card";
import { connect }  from "react-redux";
import { bindActionCreators } from "redux";


function mapStateToProps(state) {
  return {
    interests: state.interests
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

class InterestCardContainer extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    if (!this.props.newInterestMode) {
      this.props.fetchInterestResourceType(this.props.interest['.key'], 'chunks');
      this.props.fetchInterestResourceType(this.props.interest['.key'], 'materials');
      this.props.fetchInterestResourceType(this.props.interest['.key'], 'people');
      this.props.fetchInterestResourceType(this.props.interest['.key'], 'events');
    }
  }

  createInterestResource(interestResourceType) {
    //maybe reimplement part about newId?
    // var newState = this.state;
    // var newId = getRandomId(20);
    // //push a blank new record to store.
    // // newState[interestResourceType].push({
    // //   id: newId,
    // //   name: "New Item"
    // // });
    // //
    // // this.setState(newState);
    // this.props.createInterestResource(interestResourceType)
    // return newId;

    this.props.createInterestResource(this.props.interest['.key'], interestResourceType);
  }

  render() {
    var interestKey = this.props.interest['.key'];
    var interest = this.props.interests.find(function(interest) { return interest['.key'] === interestKey })
    return <InterestCard interest={interest} createInterestResource={this.createInterestResource.bind(this)} saveInterestResource={this.props.saveInterestResource} />
  }
}

InterestCardContainer.propTypes = {
  interest: PropTypes.object,
  newInterestMode: PropTypes.bool,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResourceType: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(InterestCardContainer);

