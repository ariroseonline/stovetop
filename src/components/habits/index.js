import React, { Component, PropTypes } from "react"
import './style.css';
import firebase from "firebase"
import {InterestStages, ItemTypes} from "../../Constants"
import HabitInterest from "../habit-interest"

class Habits extends Component {


  renderHabitInterests() {
    return this.props.userInterests.filter((interest) => interest.stage === InterestStages.HABIT).map((habitInterest, i) => {
      return <HabitInterest key={"habit-interest-" + i} data={habitInterest} />
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
  userInterests: PropTypes.array
}

export default Habits
