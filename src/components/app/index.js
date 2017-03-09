import React, {Component, PropTypes} from "react"
import HomeLink from "../nav-links/home-link";
import ArchiveLink from "../nav-links/archive-link";
import HabitsLink from "../nav-links/habits-link";
import './style.css';
import {Link} from "react-router";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {InterestStages} from "../../Constants";
import firebase from "firebase"
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"

class App extends Component {

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
      <div className="container-page">
        <h1 className="brand"><HomeLink assignInterestToStage={this.assignInterestToStage.bind(this)} /></h1> {/* stage name UPNEXT Used only for drag-dropping from another page*/}
        <ul className="nav">
          <li><ArchiveLink assignInterestToStage={this.assignInterestToStage.bind(this)} /></li>
          <li><HabitsLink assignInterestToStage={this.assignInterestToStage.bind(this)} /></li>
          <li><Link to="/account">Account</Link></li>
        </ul>
        <div className="content">
          {/*Complicated way of getting props to work with Router children of App*/}
          { React.Children.map(this.props.children, child => React.cloneElement(child, { userInterests: this.state.userInterests, assignInterestToStage: this.assignInterestToStage.bind(this), swapInterestStages: this.swapInterestStages.bind(this) }))}

        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

reactMixin(App.prototype, reactFireMixin)

export default DragDropContext(HTML5Backend)(App);
