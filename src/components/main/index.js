import React, { Component, PropTypes } from "react"
import UpNext from "../up-next"
import Burners from "../burners"
import './style.css';
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import firebase from "firebase"

class Main extends Component {

  render() {
    return (
        <div className="main">
          <Burners />
          <UpNext />
        </div>
    )
  }
}

Main.propTypes = {
  children: PropTypes.node
}

export default DragDropContext(HTML5Backend)(Main)
