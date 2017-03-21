import React, {Component, PropTypes} from "react"
import './style.css';
import * as actionCreators from "../../actions/";
import InterestCard from "../interest-card";
import {connect}  from "react-redux";
import {bindActionCreators} from "redux";


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
      this.props.fetchInterestResourceType(this.props.interestKey, 'chunks');
      this.props.fetchInterestResourceType(this.props.interestKey, 'materials');
      this.props.fetchInterestResourceType(this.props.interestKey, 'people');
      this.props.fetchInterestResourceType(this.props.interestKey, 'events');
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

  getInterest(interestKey) {
    return this.props.interests.find(function (interest) {
      return interest['.key'] === interestKey
    });
  }

  render() {
    var interest = this.props.newInterestMode ? {} : this.getInterest(this.props.interestKey);
    return <InterestCard interest={interest} createInterestResource={this.createInterestResource.bind(this)}
                         saveInterestResource={this.props.saveInterestResource} newInterestMode={this.props.newInterestMode}/>
  }
}

InterestCardContainer.propTypes = {
  interestKey: PropTypes.string,
  interests: PropTypes.array,
  newInterestMode: PropTypes.bool,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResourceType: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(InterestCardContainer);

