import React, {Component, PropTypes} from "react";
import './style.css';
import {ItemTypes} from "../../Constants";
import {DragSource} from "react-dnd";
// import Modal from "react-modal";
import InterestCard from "../interest-card";

class Interest extends Component {

  handleClick = (e) => {
    this.props.showModal(<InterestCard data={this.props.data}/>)
  }

  render() {
    const {connectDragSource, isDragging} = this.props;

    return (

      <div className="up-next-interest-slot">
        {connectDragSource(
          <div onClick={this.handleClick} style={{opacity: isDragging ? 0.5 : 1}}
               className="up-next-interest panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{this.props.data.title}</h3>
            </div>
            <div className="panel-body">
              Here is the goal
            </div>
            <div className="panel-footer">
              <button className="btn btn-default"><span className="glyphicon glyphicon-option-horizontal"></span>
              </button>
            </div>
          </div>)}

      </div>
    )
  }
}

Interest.propTypes = {
  data: PropTypes.object,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool,
  showModal: PropTypes.func
}

export default Interest;
