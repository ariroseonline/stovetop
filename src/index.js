import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from "react-router";
import {Provider} from "react-redux";
import store, {history} from "./store"
import './index.css';
import firebase from "firebase";
import {FirebaseConfig} from './Secrets';
import App from "./components/app";
import AppContainer from "./components/app-container";
import Main from "./components/main";
import Archive from "./components/archive";
import Habits from "./components/habits";
import Account from "./components/account";
import Login from "./components/login-register/login";
import Logout from "./components/login-register/logout";
import Register from "./components/login-register/register";
import {InterestStages} from "./Constants"
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    );
  });

  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
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

firebase.initializeApp(config);

function requireAuth(nextState, replace, callback) {
  firebase.auth().onAuthStateChanged((user) => {
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
  <Provider store={store}>
    <Router history={history}>
      <Route component={AppContainer} path="/">
        <IndexRoute component={Main} onEnter={requireAuth}/>
        <Route component={Archive} path="/archive" onEnter={requireAuth} stage={ InterestStages.ARCHIVE }/>
        <Route component={Habits} path="/habits" onEnter={requireAuth} stage={ InterestStages.HABIT }/>
        <Route component={Account} path="/account" onEnter={requireAuth}/>
        <Route component={Login} path="/login"/>
        <Route component={Logout} path="/logout"/>
        <Route component={Register} path="/register"/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
