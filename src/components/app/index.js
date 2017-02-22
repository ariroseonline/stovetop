import React, {Component, PropTypes} from "react"
import NavLink from "../nav-link";
import HomeLink from "../nav-links/home-link";
import ArchiveLink from "../nav-links/archive-link";
import HabitsLink from "../nav-links/habits-link";
import './style.css';
import {Link} from "react-router";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {InterestStages} from "../../Constants";

class App extends Component {
  render() {
    return (
      <div className="container-page">
        <h1 className="brand"><HomeLink /></h1> {/* stage name UPNEXT Used only for drag-dropping from another page*/}
        <ul className="nav">
          <li><ArchiveLink /></li>
          <li><HabitsLink /></li>
          <li><Link to="/account">Account</Link></li>
        </ul>
        <div className="content">
         {this.props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default DragDropContext(HTML5Backend)(App);
