import React, {Component, PropTypes} from "react"
import HomeLink from "../nav-links/home-link";
import ArchiveLink from "../nav-links/archive-link";
import HabitsLink from "../nav-links/habits-link";
import './style.css';
import {Link} from "react-router";
import {Button} from "react-bootstrap";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {InterestStages} from "../../Constants";
import firebase from "firebase"
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"
import Modal from "react-modal";
import InterestCardContainer from "../interest-card-container";

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      interests: [],
      modalContent: null
    }
  }

  componentDidMount() {
    this.props.fetchInterests();
    // var interestsRef = firebase.database().ref('interests').orderByChild("user").equalTo(firebase.auth().currentUser.uid);
    // this.bindAsArray(interestsRef, "interests");
  }

  createInterest() {
    this.setState({
      modalContent: <InterestCardContainer interest={{}}
                                           newInterestMode={true}
                                           saveInterestMetainterest={this.props.saveInterestMetainterest}
                                           saveInterestResource={this.props.saveInterestResource}
                                           fetchInterestResourceType={this.props.fetchInterestResourceType}
      />,
      showModal: true
    })
  }

  saveInterestMetadata(isNew, data, interestKey) {

    if (isNew) {
      data.user = firebase.auth().currentUser.uid;
      data.stage = InterestStages.UP_NEXT;
      //fixes bug where this.firebaseRefs.interests doesn't work for some reason in this  condition
      var interestsRef = firebase.database().ref('interests');
      interestsRef.push(data);
    } else {
      //or just update existing interest
      this.firebaseRefs.interests.child(interestKey).update(data);
    }
  }

  saveInterestResource(interestResourceKey, interestResourceType, data, interestKey) {

    var isNew = !interestResourceKey;
    if (isNew) {
      // newData.user = firebase.auth().currentUser.uid; //TODO: might want to associate resource with user? currently references interest, which is associated with user

      //TODO: make interestResourceType into a config constant application wide
      //a) must push to a /{resource} endpoint
      var interestResourceTypeRef = firebase.database().ref(interestResourceType);
      var newInterestResourceKey = interestResourceTypeRef.push(data);
      //b) must add reference in /interest/resources endpoint with  name, resource (key), type (plural)
      var interestResourceRef = firebase.database().ref('interests').child(interestKey).child(interestResourceType);
      // DONT THINK THESE ARE NEEDED var newInterestResource = {};
      // newInterestResource[newInterestResourceKey] = true;
      interestResourceRef.update({
        newInterestResourceKey: true
      })

    } else {
      //or just update existing interest resource
      var interestResourceRef = firebase.database().ref(interestResourceType).child(interestResourceKey);
      interestResourceRef.update(data);
    }
  }

  showModal(el) {
    this.setState({
      modalContent: el,
      showModal: true
    })
  }

  closeModal = (e) => {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div className="container-page">
        <h1 className="brand"><HomeLink moveInterest={this.props.moveInterest}/>
        </h1> {/* stage name UPNEXT Used only for drag-dropping from another page*/}
        <ul className="nav">
          <li><Button block onClick={this.createInterest.bind(this)}>Create New Interest</Button></li>
          <li><ArchiveLink moveInterest={this.props.moveInterest}/></li>
          <li><HabitsLink moveInterest={this.props.moveInterest}/></li>
          <li><Link to="/account">Account</Link></li>
        </ul>
        <div className="content">
          {/*Complicated way of getting props to work with Router children of App*/}
          { React.Children.map(this.props.children, child => React.cloneElement(child, {
              interests: this.props.interests,
              moveInterest: this.props.moveInterest,
              swapInterests: this.props.swapInterests,
              showModal: this.showModal.bind(this),
              saveInterestMetadata: this.saveInterestMetadata.bind(this),
              saveInterestResource: this.saveInterestResource.bind(this),
              fetchInterestResourceType: this.props.fetchInterestResourceType

            })
          )}

        </div>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          contentLabel="Interest Details"
        >
          {this.state.modalContent}
        </Modal>

      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

reactMixin(App.prototype, reactFireMixin)

export default DragDropContext(HTML5Backend)(App);
