import React, {Component, PropTypes} from "react";
import './style.css';
import {ItemTypes} from "../../Constants";
import {DragSource} from "react-dnd";
// import Modal from "react-modal";
import InterestCardContainer from "../interest-card-container";

class Interest extends Component {


  handleClick = (e) => {
    //TODO: consider DRYing up this InterestCard declaration used in two other places
    this.props.showModal(<InterestCardContainer interestKey={this.props.interest['.key']}
                                                newInterestMode={false}
                                                saveInterestMetainterest={this.props.saveInterestMetainterest}
                                                saveInterestResource={this.props.saveInterestResource}
                                                fetchInterestResourceType={this.props.fetchInterestResourceType}
    />)
  }

  render() {
    const {connectDragSource, isDragging} = this.props;

    return (

      <div className="up-next-interest-slot">
        {connectDragSource(
          <div onClick={this.handleClick} style={{opacity: isDragging ? 0.5 : 1}}
               className="up-next-interest panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{this.props.interest.title}</h3>
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
  interest: PropTypes.object,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func
}

export default Interest;
