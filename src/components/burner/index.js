import React, {Component, PropTypes} from "react"
import './style.css';
import {ItemTypes} from "../../Constants"
import {DropTarget} from "react-dnd"
import BurnerInterest from "../burner-interest"
import DraggableInterest from "../draggable-interest"

class Burner extends Component {

  dropInterestOnBurner(interestKey, fromBurnerStage) {
    if (this.props.interest) { //if burner has something, do swap operation
      this.props.swapInterests(interestKey, this.props.interest['.key'], this.props.stage, fromBurnerStage);
    } else { //just add to empty burner
      this.props.moveInterest(interestKey, this.props.stage);
    }
  }

  renderCanDrop() {
    return (
      <div className={this.props.isOver ? "can-drop-burner is-over-burner" : "can-drop-burner"}>
        {this.props.isOver && !this.props.interest && <div className="burner-action-icon">+</div> }
        {this.props.isOver && this.props.interest && <div className="burner-action-icon">SWITCH</div>}
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
        {/*if interest exists, put BurnerInterest there */}
        { this.props.interest ? <DraggableInterest key={"burner-interest-" + this.props.stage} interest={this.props.interest} draggableItemType={ItemTypes.BURNER_INTEREST} displayComponent={BurnerInterest} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource}  fetchInterestResource={this.props.fetchInterestResource} /> : null }
      </div>
    )
  }
}

const burnerTarget = {
  canDrop(props, monitor) {
    //if the item being dragged is already on the current burner, don't allow dropping actions
    if(monitor.getItem().stage !== (props.stage)) {
      return true;
    } else {
      return false;
    }
  },

  drop(props, monitor, component) {
    var draggedItem = monitor.getItem();
    component.dropInterestOnBurner(draggedItem.interestKey, draggedItem.stage)
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
  stage: PropTypes.string,
  interest: PropTypes.object,
  moveInterest: PropTypes.func,
  swapInterests: PropTypes.func,
  isOver: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResource: PropTypes.func
};


export default DropTarget([ItemTypes.UP_NEXT_INTEREST, ItemTypes.BURNER_INTEREST], burnerTarget, collect)(Burner);

