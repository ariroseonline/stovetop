import React, {Component, PropTypes} from "react"
import Burner from "../burner"
import './style.css';
import firebase from "firebase"
import {InterestStages} from "../../Constants"
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"

class Burners extends Component {

  getBurnerInterest(burnerId) {
    return this.props.userInterests.find((interest)=>interest.stage=== InterestStages.BURNER[burnerId])
  }

  render() {
    return (
      <div className="burners">
        <Burner stage={"burner1"} key={"burner1"} interest={this.getBurnerInterest(1)} assignInterestToBurner={this.props.assignInterestToStage} swapBurnerInterests={this.props.swapInterestStages} />
        <Burner stage={"burner2"} key={"burner2"} interest={this.getBurnerInterest(2)} assignInterestToBurner={this.props.assignInterestToStage} swapBurnerInterests={this.props.swapInterestStages} />
        <Burner stage={"burner3"} key={"burner3"} interest={this.getBurnerInterest(3)} assignInterestToBurner={this.props.assignInterestToStage} swapBurnerInterests={this.props.swapInterestStages} />
        <Burner stage={"burner4"} key={"burner4"} interest={this.getBurnerInterest(4)} assignInterestToBurner={this.props.assignInterestToStage} swapBurnerInterests={this.props.swapInterestStages} />
      </div>
    )
  }
}

Burners.propTypes = {
  children: PropTypes.node,
  userInterests: PropTypes.array,
  assignInterestToStage: PropTypes.func,
  swapInterestStages: PropTypes.func
}

reactMixin(Burners.prototype, reactFireMixin)

export default Burners
