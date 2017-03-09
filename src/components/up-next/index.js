import React, {Component, PropTypes} from "react"
import './style.css';
import DraggableInterest from "../draggable-interest";
import firebase from "firebase"
import {InterestStages} from "../../Constants"
import {DropTarget} from "react-dnd"
import {ItemTypes} from "../../Constants"


class UpNext extends Component {
  constructor(props) {
    super();
    this.state = {
      interests: []
    }
  }
  //
  // componentDidMount() {
  //   var upNextInterestsRef = firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/interests").orderByChild("stage").equalTo(InterestStages.UP_NEXT);
  //   upNextInterestsRef.on("value", function(snapshot) {
  //     var items = [];
  //
  //     snapshot.forEach(function(childSnapshot) {
  //       var childKey = childSnapshot.key;
  //       var childData = childSnapshot.val();
  //       items.push(<UpNextInterest key={childKey} data={childData} />)
  //     }.bind(this));
  //
  //     this.setState({items: items});
  //
  //   }.bind(this));
  // }


  dropInterestOnUpNext(interestKey, stage) {
    this.props.assignInterestToUpNext(interestKey, InterestStages.UP_NEXT);
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

  renderUpNextInterests() {
    return this.props.userInterests.filter((interest) => interest.stage === InterestStages.UP_NEXT).map((upNextInterest, i) => {
      return <DraggableInterest key={"up-next-interest-" + i} data={upNextInterest} draggableItemType={ItemTypes.UP_NEXT_INTEREST} />
    })
  }

  render() {
    return this.props.connectDropTarget(
      <div className="up-next">
        {this.props.canDrop && !this.props.isOver ? this.renderCanDropMessage() : null}
        {this.props.isOver ?  this.renderIsOverMessage() : null}
        {this.renderUpNextInterests()}
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
    component.dropInterestOnUpNext(draggedItem.interestKey)
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
  children: PropTypes.node,
  interests: PropTypes.array,
  assignInterestToUpNext: PropTypes.func
}


export default DropTarget(ItemTypes.BURNER_INTEREST, upNextTarget, collect)(UpNext);
