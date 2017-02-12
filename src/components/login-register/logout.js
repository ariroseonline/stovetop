import React, {Component, PropTypes} from "react"
import firebase from "firebase"
import './style.css';

class Logout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  componentDidMount() {
    firebase.auth().signOut(); //maybe needs a then callback
    this.setState({loggedIn: false});
    // this.context.router.replace("/");
    //TODO: I think we want to reload the route...there's some problems with logging out and immediately logging in again
  }

  render() {
    return <p>You are now logged out</p>;
  }

}

export default Logout;
