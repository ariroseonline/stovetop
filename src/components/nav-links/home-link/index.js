import React, { Component, PropTypes } from "react"
import './style.css';
import {Link} from "react-router";
import {InterestStages, ItemTypes} from "../../../Constants"
import {DropTarget} from "react-dnd"
import firebase from "firebase"

class HomeLink extends Component {
  render() {
    var classes = [];
    this.props.canDrop ? classes.push("link-can-drop") : null;
    this.props.isOver ? classes.push("link-is-over") : null;
    return this.props.connectDropTarget(
      <span><Link className={classes.join(" ")} to="/">Home</Link></span>
    )

  }

  dropInterestOnLink(interestId) {

    //TODO: potentially reusable with other instances of updating an interest
    //update dragged firebase interest to stage of link
    var interestRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests/" + interestId);
    interestRef.update({
      stage: InterestStages.UP_NEXT
    });
  }
}

HomeLink.propTypes = {
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

export default DropTarget([ItemTypes.ARCHIVE_INTEREST, ItemTypes.HABIT_INTEREST], linkTarget, collect)(HomeLink);
