import React, {Component, PropTypes} from "react"
import NavigationLink from "../navigation-link";
import './style.css';
import {Link} from "react-router";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {InterestStages} from "../../Constants";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="brand"><Link to="/">{"Stovetop"}</Link></h1>
        <ul className="nav">
          <NavigationLink path="/" name="Home" stage={InterestStages.UPNEXT} /> {/* Used only for drag-dropping from another page*/}
          <NavigationLink path="/archive" name="Archive" stage={InterestStages.ARCHIVE} />
          <NavigationLink path="/habits" name="Habits" stage={InterestStages.HABIT} />
          <NavigationLink path="/account" name="Account" />
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
