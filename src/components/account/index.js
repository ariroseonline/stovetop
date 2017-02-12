import React, { Component, PropTypes } from "react"
import './style.css';

class Account extends Component {
  render() {
    return (
        <div>
           Account
        </div>
    )
  }
}

Account.propTypes = {
  children: PropTypes.node
}

export default Account
