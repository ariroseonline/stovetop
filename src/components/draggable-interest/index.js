import React, {Component, PropTypes} from "react";
import './style.css';
import {ItemTypes} from "../../Constants";
import {DragSource} from "react-dnd";
import draggableInterestSource from "./source";
import draggableInterestCollect from "./collect";
import Modal from "react-modal";
import InterestCard from "../interest-card";
// import Interest from "../interest";
// import { Button } from 'react-bootstrap';

class DraggableInterest extends Component {
  render() {
    var displayComponent = this.props.displayComponent;
    return (
      React.createElement(DragSource(this.props.draggableItemType, draggableInterestSource, draggableInterestCollect, { dragEffect: "move"})(displayComponent), {...this.props})
    )
  }
}

DraggableInterest.propTypes = {
  draggableItemType: PropTypes.string,
  displayComponent: PropTypes.func
}

export default DraggableInterest;