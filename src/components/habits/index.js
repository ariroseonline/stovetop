import React, { Component, PropTypes } from "react"
import './style.css';
import firebase from "firebase"
import {InterestStages, ItemTypes} from "../../Constants"
import InterestBrick from "../interest-brick"

class Habits extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    //potentially reusable with UPNEXT interests list, and HABITS interests list
    var archiveInterestsRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests").orderByChild("stage").equalTo(InterestStages.HABIT);
    archiveInterestsRef.on("value", function(snapshot) {
      var items = [];

      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        items.push(<InterestBrick key={childKey} data={childData} location={this.props.location} />)
      }.bind(this));

      this.setState({items: items});

    }.bind(this));
  }

  render() {
    return (
      <div>
        {this.state.items}
      </div>
    )
  }
}

Habits.propTypes = {
  children: PropTypes.node
}

export default Habits
