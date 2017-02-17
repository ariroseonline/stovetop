import React, {Component, PropTypes} from "react"
import './style.css';
import UpNextInterest from "../up-next-interest"
import firebase from "firebase"
import {InterestStages} from "../../Constants"
import {DropTarget} from "react-dnd"
import {ItemTypes} from "../../Constants"

class UpNext extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    var upNextInterestsRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests").orderByChild("stage").equalTo(InterestStages.UP_NEXT);
    upNextInterestsRef.on("value", function(snapshot) {
      var items = [];

      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        items.push(<UpNextInterest key={childKey} data={childData} />)
      }.bind(this));

      this.setState({items: items});

    }.bind(this));
  }

  componentWillUnmount() {
    var upNextInterestsRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests").orderByChild("stage").equalTo(InterestStages.UP_NEXT);
    upNextInterestsRef.off("value");
  }


  dropInterestOnUpNext(interestId) {
    //update dragged firebase interest to up-next stage
    var interestRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests/" + interestId);
    interestRef.update({
      stage: InterestStages.UP_NEXT
    });
  }

  renderCanDropMessage() {
    return (
      <div className="up-next-can-drop-message">Remove</div>
    );
  }

  renderIsOverMessage() {
    return (
      <div className="up-next-is-over-message">Remove</div>
    );
  }


  render() {
    return this.props.connectDropTarget(
      <div className="up-next">
        {this.props.canDrop && !this.props.isOver ? this.renderCanDropMessage() : null}
        {this.props.isOver ?  this.renderIsOverMessage() : null}
        {this.state.items}
      </div>
    )
  }
}

const upNextTarget = {
  // canDrop(props) {
  //   // if(burner not filled etc etc)
  //   //if filled put exchange icon?
  //   // console.log(props)
  //   debugger
  //   return true;
  // },

  drop(props, monitor, component) {
    var draggedItem = monitor.getItem();
    component.dropInterestOnUpNext(draggedItem.interestId)
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

UpNext.propTypes = {
  children: PropTypes.node
}

export default DropTarget(ItemTypes.BURNER_INTEREST, upNextTarget, collect)(UpNext);
