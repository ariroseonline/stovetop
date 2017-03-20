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
      this.props.fetchInterestResource(this.props.data['.key'], 'chunks');
      this.props.fetchInterestResource(this.props.data['.key'], 'materials');
      this.props.fetchInterestResource(this.props.data['.key'], 'people');
      this.props.fetchInterestResource(this.props.data['.key'], 'events');
      // var materialsRef = firebase.database().ref('materials').orderByChild("interest").equalTo(this.props.data['.key']);
      // var peopleRef = firebase.database().ref('people').orderByChild("interest").equalTo(this.props.data['.key']);
      // var eventsRef = firebase.database().ref('events').orderByChild("interest").equalTo(this.props.data['.key']);
      // this.bindAsArray(chunksRef, "chunks");
      // this.bindAsArray(materialsRef, "materials");
      // this.bindAsArray(peopleRef, "people");
      // this.bindAsArray(eventsRef, "events");
    }
  }

  render() {
    var interestKey = this.props.data['.key'];
    var interest = this.props.interests.find(function(interest) { return interest['.key'] === interestKey })
    return <InterestCard interest={interest} />
  }
}

InterestCardContainer.propTypes = {
  data: PropTypes.object,
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

