import React, { Component, PropTypes } from "react"
import './style.css';
import {Link} from "react-router";
import {InterestStages, ItemTypes} from "../../../Constants"
import {DropTarget} from "react-dnd"
import firebase from "firebase"

class ArchiveLink extends Component {
  render() {
    var classes = [];
    this.props.canDrop ? classes.push("link-can-drop") : null;
    this.props.isOver ? classes.push("link-is-over") : null;
    return this.props.connectDropTarget(
      <span><Link className={classes.join(" ")} to="/archive">Archive</Link></span>
    )

  }

  dropInterestOnLink(interestKey) {
    this.props.assignInterestToStage(interestKey, InterestStages.ARCHIVE);
    //TODO: potentially reusable with other instances of updating an interest
  }

}

ArchiveLink.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  assignInterestToStage: PropTypes.func
}


const linkTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor, component) {
    var draggedItem = monitor.getItem();
    component.dropInterestOnLink(draggedItem.interestKey, props.stage)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

export default DropTarget([ItemTypes.BURNER_INTEREST, ItemTypes.UP_NEXT_INTEREST, ItemTypes.HABIT_INTEREST], linkTarget, collect)(ArchiveLink);
