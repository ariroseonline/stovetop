import React, {Component, PropTypes} from "react";
import './style.css';
import InterestCardContainer from "../interest-card-container";

class BurnerInterest extends Component {

  handleClick = (e) => {
    //think about just passing a string instead of the element, so you don't have to deal with all these props in many locations and instead just in original showModal
    this.props.showModal(<InterestCardContainer interestKey={this.props.interest['.key']}
                                       newInterestMode={false}
                                       saveInterestMetainterest={this.props.saveInterestMetainterest}
                                       saveInterestResource={this.props.saveInterestResource}
                                       fetchInterestResourceType={this.props.fetchInterestResourceType}
    />)
  }

  render() {
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(<div onClick={this.handleClick} className="burner-interest"
                                  style={{opacity: isDragging ? 0.5 : 1, cursor: "pointer"}}>
      {this.props.interest.title}</div>);
  }
}

BurnerInterest.propTypes = {
  interest: PropTypes.object,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResourceType: PropTypes.func
};

export default BurnerInterest;
