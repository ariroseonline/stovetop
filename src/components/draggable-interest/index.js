import React, {Component, PropTypes} from "react";
import './style.css';
import {ItemTypes} from "../../Constants";
import {DragSource} from "react-dnd";
import draggableInterestSource from "./source";
import draggableInterestCollect from "./collect";
import Modal from "react-modal";
import InterestCard from "../interest-card";
// import { Button } from 'react-bootstrap';
import Interest from "../interest";

class DraggableInterest extends Component {
  render() {
    return (
      <div>
        {React.createElement(DragSource(this.props.draggableItemType, draggableInterestSource, draggableInterestCollect, { dragEffect: "move"})(Interest), {...this.props})}
      </div>
    )
  }
}

DraggableInterest.propTypes = {
  draggableItemType: PropTypes.string
}

// export default DragSource(this.props.draggableItemTypes, draggableInterestSource, draggableInterestCollect, { dragEffect: "move"})(Interest);
export default DraggableInterest;