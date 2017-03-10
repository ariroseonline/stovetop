import React, {Component, PropTypes} from "react";
import './style.css';
import InterestCard from "../interest-card";

class BurnerInterest extends Component {

  handleClick = (e) => {
    //think about just passing a string instead of teh element, so you don't have to deal with all these props in many locations and instead just in original showModal
    this.props.showModal(<InterestCard data={this.props.data} newInterestMode={false} saveInterestMetadata={this.props.saveInterestMetadata} />)
  }

  render() {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(<div onClick={this.handleClick} className="burner-interest" style={{opacity: isDragging ? 0.5 : 1, cursor: "pointer"}}>
      {this.props.data.title}</div>);
  }
}

BurnerInterest.propTypes = {
  data: PropTypes.object,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func
};

export default BurnerInterest;
