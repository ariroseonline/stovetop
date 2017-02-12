import React, {Component, PropTypes} from "react"
import Burner from "../burner"
import './style.css';
import firebase from "firebase"
import {InterestStages} from "../../Constants"

class Burners extends Component {

  constructor () {
    super();
    this.state = {
      burnerCount: [{}, {}, {}, {}],
      burnerInterestId1: null,
      burnerInterestId2: null,
      burnerInterestId3: null,
      burnerInterestId4: null
    }

    // var userInterestsRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests").orderByChild("stage").equalTo(InterestStages.BURNER);
    //
    // var newBurners = [];
    // userInterestsRef.once("value", function(snapshot) {
    //   var i = 1;
    //   snapshot.forEach(function(childSnapshot) {
    //     var childKey = childSnapshot.key;
    //     var childData = childSnapshot.val();
    //     var newState = {};
    //     newState["burnerInterestId" + i] = childKey;
    //     this.setState(newState);
    //     i++;
    //   );
    //
    // }.bind(this));
  }



//   activeInterestId={this.state.burnerInterestId1}
// activeInterestId={this.state.burnerInterestId2}
// activeInterestId={this.state.burnerInterestId3}
// activeInterestId={this.state.burnerInterestId4}
  render() {
    return (
      <div className="burners">
        <Burner burnerId={1} key={"burner1"}/>
        <Burner burnerId={2} key={"burner2"}/>
        <Burner burnerId={3} key={"burner3"}/>
        <Burner burnerId={4} key={"burner4"}/>
      </div>
    )
  }
}

Burners.propTypes = {
  children: PropTypes.node
}

export default Burners
