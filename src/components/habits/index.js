import React, { Component, PropTypes } from "react"
import './style.css';
import firebase from "firebase"
import {InterestStages, ItemTypes} from "../../Constants"
import DraggableInterest from "../draggable-interest"
import Interest from "../interest";

class Habits extends Component {

  renderHabitInterests() {
    return this.props.interests.filter((interest) => interest.stage === InterestStages.HABIT).map((habitInterest, i) => {
      return <DraggableInterest key={"habit-interest-" + i} interest={habitInterest} draggableItemType={ItemTypes.HABIT_INTEREST} displayComponent={Interest} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} saveInterestResource={this.props.saveInterestResource} fetchInterestResourceType={this.props.fetchInterestResourceType} />
    })
  }

  render() {
    return (
      <div>
        {this.renderHabitInterests()}
      </div>
    )
  }
}

Habits.propTypes = {
  children: PropTypes.node,
  interests: PropTypes.array,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func,
  saveInterestResource: PropTypes.func
}

export default Habits
