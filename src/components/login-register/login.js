import React, {Component, PropTypes} from "react";
import { hashHistory } from "react-router";
import firebase from "firebase";
import './style.css';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  handleGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result)=> {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;

      var location = this.props.location
      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace("/challenges")
      }
    }).catch((error)=> {
      console.log("ERROr", error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user"s account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      this.setState({error: error.message})

    });
  }

  handleSubmit(e) {
    e.preventDefault();

    var email = this.emailInput.value;
    var pw = this.pwInput.value;
    var component = this;

    firebase.auth().signInWithEmailAndPassword(email, pw).then((result)=> {
      var location = component.props.location
      if (location.state && location.state.nextPathname) {
        hashHistory.push(location.state.nextPathname)
      } else {
        hashHistory.push("/");
      }
      // User signed in!
      console.log("User signed in!");
      // var uid = result.user.uid;
    }).catch((error)=> {
      this.setState({error: error});
    });
  }

  render() {
    var errors = this.state.error ? <p> {this.state.error} </p> : "";
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref={(input) => { this.emailInput = input; }}  placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref={(input) => { this.pwInput = input; }}  type="password" className="form-control" placeholder="Password"/>
          </div>
          {errors}
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <span>OR</span>
        <button onClick={this.handleGoogle}>GOOGLE LOGIN</button>
      </div>
    );
  }
}

export default Login;
