import React, { Component, PropTypes } from "react"
import UpNext from "../up-next"
import Burners from "../burners"
import './style.css';
import firebase from "firebase"
import reactMixin from "react-mixin"
import reactFireMixin from "reactfire"
import {InterestStages} from "../../Constants"

class Main extends Component {


  render() {
    return (
        <div className="main">
          <Burners interests={this.props.interests}
                   moveInterest={this.props.moveInterest}
                   showModal={this.props.showModal}
                   saveInterestMetadata={this.props.saveInterestMetadata}
                   saveInterestResource={this.props.saveInterestResource} />
          <UpNext interests={this.props.interests}
                  moveInterest={this.props.moveInterest}
                  showModal={this.props.showModal}
                  saveInterestMetadata={this.props.saveInterestMetadata}
                  saveInterestResource={this.props.saveInterestResource}  />
        </div>
    )
  }
}

Main.propTypes = {
  children: PropTypes.node,
  interests: PropTypes.array,
  moveInterest: PropTypes.func,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func
}

// reactMixin(Main.prototype, reactFireMixin)

export default Main
