import React, { Component, PropTypes } from "react"
import UpNext from "../up-next"
import Burners from "../burners"
import './style.css';
import firebase from "firebase"
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"
import {InterestStages} from "../../Constants"

class Main extends Component {

  constructor(props) {
    super();
    this.state = {
      userInterests: []
    }
  }

  componentDidMount() {

    var userInterestsRef = firebase.database().ref('interests').orderByChild("user").equalTo(firebase.auth().currentUser.uid);
    this.bindAsArray(userInterestsRef, "userInterests");

  }
  assignInterestToStage(draggedInterestKey, stage) {
    this.firebaseRefs.userInterests.child(draggedInterestKey).update({ stage: stage });
  }

  swapInterestStages(toStage, fromStage,  currentInterestKey, draggedInterestKey) {
    this.firebaseRefs.userInterests.child(currentInterestKey).update({ stage: fromStage });
    this.firebaseRefs.userInterests.child(draggedInterestKey).update({ stage: toStage });
  }

  render() {
    return (
        <div className="main">
          <Burners userInterests={this.state.userInterests} assignInterestToStage={this.assignInterestToStage.bind(this)} swapInterestStages={this.swapInterestStages.bind(this)} />
          <UpNext userInterests={this.state.userInterests} assignInterestToUpNext={this.assignInterestToStage.bind(this)} />
        </div>
    )
  }
}

Main.propTypes = {
  children: PropTypes.node
}

reactMixin(Main.prototype, reactFireMixin)

export default Main
