import React, { Component, PropTypes } from "react"
import './style.css';

class Habits extends Component {
  render() {
    return (
        <div>
            Habits
        </div>
    )
  }
}

Habits.propTypes = {
  children: PropTypes.node
}

export default Habits
