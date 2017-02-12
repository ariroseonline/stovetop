import React, {Component, PropTypes} from "react"
import './style.css';
import { browserHistory } from "react-router";
import firebase from "firebase"

class Register extends Component {

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
      // The signed-in user info.
      var user = result.user;
      //load up user challenges
      this.initUserInDB(user)
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
    // Add signup event
    firebase.auth().createUserWithEmailAndPassword(email, pw)
      .then((user)=> {
        //load up user challenges
        component.initUserInDB(user)
      })
      .catch(()=> {
        component.setState({error: e.message})
      });
  }

  initUserInDB(user) {
    //save user with user challenges to db
    firebase.database().ref(`users/${user.uid}`).set({
      provider: user.providerData[0].providerId,
      uid: user.uid,
      name: user.providerData[0].displayName,
      email: user.providerData[0].email
    }).then(function() {
      //finally transition to home
      browserHistory.push("/")
    });
  }

  render() {
    var errors = this.state.error ? <p> {this.state.error} </p> : "";
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1> Register </h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref={(input) => { this.emailInput = input; }}  placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref={(input) => { this.pwInput = input; }} type="password" className="form-control" placeholder="Password"/>
          </div>
          {errors}
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <span>OR</span>
        <button onClick={this.handleGoogle}>GOOGLE LOGIN</button>
      </div>
    )
  }
}

export default Register;
