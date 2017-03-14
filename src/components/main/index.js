import React, { Component, PropTypes } from "react"
import UpNext from "../up-next"
import Burners from "../burners"
import './style.css';
import firebase from "firebase"
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"
import {InterestStages} from "../../Constants"

class Main extends Component {

  // constructor(props) {
  //   super();
  //   this.state = {
  //     userInterests: []
  //   }
  // }

  //{/*componentDidMount() {*/}

  //   var userInterestsRef = firebase.database().ref('interests').orderByChild("user").equalTo(firebase.auth().currentUser.uid);
  //   this.bindAsArray(userInterestsRef, "userInterests");
  //
  // }
  // assignInterestToStage(draggedInterestKey, stage) {
  //   this.firebaseRefs.userInterests.child(draggedInterestKey).update({ stage: stage });
  // }
  //
  // swapInterestStages(toStage, fromStage,  currentInterestKey, draggedInterestKey) {
  //   this.firebaseRefs.userInterests.child(currentInterestKey).update({ stage: fromStage });
  //   this.firebaseRefs.userInterests.child(draggedInterestKey).update({ stage: toStage });
  // }

  render() {
    return (
        <div className="main">
          <Burners userInterests={this.props.userInterests}
                   assignInterestToStage={this.props.assignInterestToStage.bind(this)}
                   swapInterestStages={this.props.swapInterestStages.bind(this)}
                   showModal={this.props.showModal}
                   saveInterestMetadata={this.props.saveInterestMetadata}
                   saveInterestResource={this.props.saveInterestResource} />
          <UpNext userInterests={this.props.userInterests}
                  assignInterestToUpNext={this.props.assignInterestToStage.bind(this)}
                  showModal={this.props.showModal}
                  saveInterestMetadata={this.props.saveInterestMetadata}
                  saveInterestResource={this.props.saveInterestResource}  />
        </div>
    )
  }
}

Main.propTypes = {
  children: PropTypes.node,
  userInterests: PropTypes.array,
  assignInterestToStage: PropTypes.func,
  swapInterestStages: PropTypes.func,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func
}

// reactMixin(Main.prototype, reactFireMixin)

export default Main
