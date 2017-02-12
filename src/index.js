import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from "react-router"
import './index.css';
import firebase from "firebase";
import {FirebaseConfig} from './Secrets';
import App from "./components/app";
import Main from "./components/main";
import Archive from "./components/archive";
import Habits from "./components/habits";
import Account from "./components/account";
import Login from "./components/login-register/login";
import Logout from "./components/login-register/logout";
import Register from "./components/login-register/register";

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    );
  });
}

require("normalize.css/normalize.css");

// Initialize Firebase
var config = {
  apiKey: FirebaseConfig.FIREBASE_API_KEY,
  authDomain: FirebaseConfig.FIREBASE_AUTH_DOMAIN,
  databaseURL: FirebaseConfig.FIREBASE_DATABASE_URL,
  storageBucket: FirebaseConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FirebaseConfig.FIREBASE_MESSAGING_SENDER_ID
};

// var config = {
//   apiKey: "AIzaSyAckj1NRJSC_1-ndeLERLysW_ylqxVaVfI",
//   authDomain: "stovetop-eab65.firebaseapp.com",
//   databaseURL: "https://stovetop-eab65.firebaseio.com",
//   storageBucket: "stovetop-eab65.appspot.com",
//   messagingSenderId: "108628706661"
// };

firebase.initializeApp(config);

function requireAuth(nextState, replace, callback) {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    if (!user) {
      let hasLocalStorageUser = false;
      for (let key in localStorage) {
        if (key.startsWith("firebase:authUser:")) {
          hasLocalStorageUser = true;
        }
      }
      if (!hasLocalStorageUser) {
        console.log("Attempting to access a secure route. Please authenticate first.");
        replace({
          pathname: "/login",
          state: {nextPathname: nextState.location.pathname}
        });
      }
      //
      // replace({
      //   pathname: "/login",
      //   state: { nextPathname: nextState.location.pathname },
      // });
    }
    callback();
  });
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route component={App} path="/">
      <IndexRoute component={Main} onEnter={requireAuth} />
      <Route component={Archive} path="/archive" onEnter={requireAuth} />
      <Route component={Habits} path="/habits" onEnter={requireAuth} />
      <Route component={Account} path="/account" onEnter={requireAuth} />
      <Route component={Login} path="/login" />
      <Route component={Logout} path="/logout" />
      <Route component={Register} path="/register" />
    </Route>
  </Router>
), document.getElementById('root'))