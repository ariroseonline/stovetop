import React, {Component, PropTypes} from "react"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/";
import App from "../app";

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments,
    interests: state.interests
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
