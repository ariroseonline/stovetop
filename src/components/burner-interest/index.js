import React, {Component, PropTypes} from "react";
import './style.css';
import InterestCardContainer from "../interest-card-container";

class BurnerInterest extends Component {

  handleClick = (e) => {
    //think about just passing a string instead of the element, so you don't have to deal with all these props in many locations and instead just in original showModal
    this.props.showModal(<InterestCardContainer data={this.props.data}
                                       newInterestMode={false}
                                       saveInterestMetadata={this.props.saveInterestMetadata}
                                       saveInterestResource={this.props.saveInterestResource}
                                       fetchInterestResource={this.props.fetchInterestResource}
    />)
  }

  render() {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(<div onClick={this.handleClick} className="burner-interest"
                                  style={{opacity: isDragging ? 0.5 : 1, cursor: "pointer"}}>
      {this.props.data.title}</div>);
  }
}

BurnerInterest.propTypes = {
  data: PropTypes.object,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResource: PropTypes.func
};

export default BurnerInterest;
