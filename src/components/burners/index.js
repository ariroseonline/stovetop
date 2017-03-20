import React, {Component, PropTypes} from "react"
import Burner from "../burner"
import './style.css';
import firebase from "firebase"
import {InterestStages} from "../../Constants"
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"

class Burners extends Component {

  getBurnerInterest(burnerId) {
    return this.props.interests.find((interest)=>interest.stage=== InterestStages.BURNER[burnerId])
  }

  render() {
    return (
      <div className="burners">
        <Burner stage={"burner1"} key={"burner1"} interest={this.getBurnerInterest(1)} moveInterest={this.props.moveInterest} swapInterests={this.props.swapInterests} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource} fetchInterestResource={this.props.fetchInterestResource} />
        <Burner stage={"burner2"} key={"burner2"} interest={this.getBurnerInterest(2)} moveInterest={this.props.moveInterest} swapInterests={this.props.swapInterests} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource} fetchInterestResource={this.props.fetchInterestResource} />
        <Burner stage={"burner3"} key={"burner3"} interest={this.getBurnerInterest(3)} moveInterest={this.props.moveInterest} swapInterests={this.props.swapInterests} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource} fetchInterestResource={this.props.fetchInterestResource} />
        <Burner stage={"burner4"} key={"burner4"} interest={this.getBurnerInterest(4)} moveInterest={this.props.moveInterest} swapInterests={this.props.swapInterests} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource} fetchInterestResource={this.props.fetchInterestResource} />
      </div>
    )
  }
}

Burners.propTypes = {
  children: PropTypes.node,
  interests: PropTypes.array,
  moveInterest: PropTypes.func,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func,
  fetchInterestResource: PropTypes.func
}

Burners.contextTypes = {
  store:React.PropTypes.object
}

reactMixin(Burners.prototype, reactFireMixin)


export default Burners
