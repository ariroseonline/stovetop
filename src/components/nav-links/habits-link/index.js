import React, { Component, PropTypes } from "react"
import './style.css';
import {Link} from "react-router";
import {InterestStages, ItemTypes} from "../../../Constants"
import {DropTarget} from "react-dnd"
import firebase from "firebase"

class HabitsLink extends Component {
  render() {
    var classes = [];
    this.props.canDrop ? classes.push("link-can-drop") : null;
    this.props.isOver ? classes.push("link-is-over") : null;
    return this.props.connectDropTarget(
      <span><Link className={classes.join(" ")} to="/habits">Habits</Link></span>
    )

  }

  dropInterestOnLink(interestId) {

    //TODO: potentially reusable with other instances of updating an interest
    //update dragged firebase interest to stage of link
    var interestRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests/" + interestId);
    interestRef.update({
      stage: InterestStages.HABIT
    });
  }
}

HabitsLink.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string
}


const linkTarget = {
  canDrop(props, monitor) {
    return true;

  },

  drop(props, monitor, component) {
    var draggedItem = monitor.getItem();
    component.dropInterestOnLink(draggedItem.interestId, props.stage)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

export default DropTarget([ItemTypes.BURNER_INTEREST, ItemTypes.UP_NEXT_INTEREST, ItemTypes.ARCHIVE_INTEREST], linkTarget, collect)(HabitsLink);
