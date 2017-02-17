import React, {Component, PropTypes} from "react"
import './style.css';
import {ItemTypes} from "../../Constants"
import {DropTarget} from "react-dnd"
import firebase from "firebase"
import {InterestStages} from "../../Constants"
import InterestPot from "../interest-pot"

class Burner extends Component {

  constructor(props) {
    super();

    this.state = {
      activeInterest: null
    }

  }

  componentDidMount() {

    //listen to firebase changes to any interest's stage, see if it changed to this burner's ID
    var burnerInterestRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests").orderByChild("stage").equalTo(InterestStages.BURNER[this.props.burnerId]);
    burnerInterestRef.on("value", function(snapshot) {
      //should  just unwrap the one
      var interest = null;
      snapshot.forEach(function(childSnapshot) {
        interest = childSnapshot.val();
      });

      //put full interest data into burner state
      this.setState({ activeInterest: interest });

    }.bind(this));
  }

  addInterest(interestId) {
    //update dragged firebase interest to correct stage with this burner's Id
    var interestRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests/" + interestId);
    interestRef.update({
      stage: InterestStages.BURNER[this.props.burnerId]
    });
  }

  swapInterest(currentInterestId, draggedInterestId) {
    //get current firebase interest on burner. update it to use whatever the dragged item came from  (burner2, burner3, up-next, etc)
    var currentInterestRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests/" + currentInterestId);
    var draggedInterestRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests/" + draggedInterestId);

    draggedInterestRef.once("value", function(snapshot){
      currentInterestRef.update({
        stage: snapshot.val().stage
      });
    });

    //update dragged firebase interest to dropped stage with this burner's Id
    draggedInterestRef.update({
      stage: InterestStages.BURNER[this.props.burnerId]
    });

  }

  dropInterestOnBurner(interestId) {
    if (this.state.activeInterest) { //if burner has something, do swap operation
      this.swapInterest(this.state.activeInterest.id, interestId);
    } else { //just add to empty burner
      this.addInterest(interestId)
    }
  }

  renderCanDrop() {
    return (
      <div className={this.props.isOver ? "can-drop-burner is-over-burner" : "can-drop-burner"}>
        {this.props.isOver && !this.state.activeInterest && <div className="burner-action-icon">+</div> }
        {this.props.isOver && this.state.activeInterest && <div className="burner-action-icon">SWITCH</div>}
      </div>
    )
  }
  render() {
    return (
      <div className="burner-slot">

        {this.props.connectDropTarget(
          <div className="burner">
            {this.props.canDrop ?
              this.renderCanDrop()
              :
              null
            }
          </div>
        )}

        {/*if interest exists, put Pot there */}
        { this.state.activeInterest ? <InterestPot data={this.state.activeInterest} /> : null }
      </div>
    )
  }
}

const burnerTarget = {
  canDrop(props, monitor) {
    //if the item being dragged is already on the current burner, don't allow dropping actions
    if(monitor.getItem().stage !== ("burner" + props.burnerId)) {
      return true;
    } else {
      return false;
    }
  },

  drop(props, monitor, component) {
    var draggedItem = monitor.getItem();
    component.dropInterestOnBurner(draggedItem.interestId)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

Burner.propTypes = {
  burnerId: PropTypes.number,
  // activeInterestId: PropTypes.string,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func
};

export default DropTarget([ItemTypes.INTEREST, ItemTypes.INTERESTFROMPOT], burnerTarget, collect)(Burner);

