import React, {Component, PropTypes} from "react"
import './style.css';
import DraggableInterest from "../draggable-interest";
import firebase from "firebase"
import {InterestStages} from "../../Constants"
import {DropTarget} from "react-dnd"
import {ItemTypes} from "../../Constants"
import Interest from "../interest";

class UpNext extends Component {
  constructor(props) {
    super();
    this.state = {
      interests: []
    }
  }

  dropInterestOnUpNext(interestKey, stage) {
    this.props.moveInterest(interestKey, InterestStages.UP_NEXT);
  }

  renderCanDropMessage() {
    return (
      <div className="up-next-can-drop-message">Remove</div>
    );
  }

  renderIsOverMessage() {
    return (
      <div className="up-next-is-over-message">Remove</div>
    );
  }

  renderUpNextInterests() {
    return this.props.interests.filter((interest) => interest.stage === InterestStages.UP_NEXT).map((upNextInterest, i) => {
      return <DraggableInterest key={"up-next-interest-" + i} interest={upNextInterest} draggableItemType={ItemTypes.UP_NEXT_INTEREST} displayComponent={Interest} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource}  fetchInterestResource={this.props.fetchInterestResource} />
    })
  }

  render() {
    return this.props.connectDropTarget(
      <div className="up-next">
        {this.props.canDrop && !this.props.isOver ? this.renderCanDropMessage() : null}
        {this.props.isOver ?  this.renderIsOverMessage() : null}
        {this.renderUpNextInterests()}
      </div>
    )
  }
}

const upNextTarget = {
  // canDrop(props) {
  //   // if(burner not filled etc etc)
  //   //if filled put exchange icon?
  //   // console.log(props)
  //   debugger
  //   return true;
  // },

  drop(props, monitor, component) {
    var draggedItem = monitor.getItem();
    component.dropInterestOnUpNext(draggedItem.interestKey)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

UpNext.propTypes = {
  children: PropTypes.node,
  interests: PropTypes.array,
  moveInterest: PropTypes.func,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func
}


export default DropTarget(ItemTypes.BURNER_INTEREST, upNextTarget, collect)(UpNext);
