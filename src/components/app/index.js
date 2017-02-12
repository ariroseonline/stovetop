import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="brand"><Link to="/">{"Stovetop"}</Link></h1>
        <ul className="nav">
          <li><Link to="/">{"Home"}</Link></li>
          <li><Link to="/archive">{"Archive"}</Link></li>
          <li><Link to="/habits">{"Habits"}</Link></li>
          <li><Link to="/account">{"Account"}</Link></li>
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

export default App
