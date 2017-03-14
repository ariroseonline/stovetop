import React, {Component, PropTypes} from "react";
import './style.css';
import {FieldGroup, convertFirebaseObjectToArrayOfObjects} from '../../Utilities';
import {
  ListGroup,
  ListGroupItem,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Row,
  Col,
  Button
} from "react-bootstrap";
import reactMixin from "react-mixin";
import firebase from "firebase";
import reactFireMixin from "reactfire";

import _ from "lodash";

class ChunkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // chunk: this.props.item,
      isDirty: false,
      resources: []
    }
    this.onUpdate = this.updateField.bind(this);

  }

  // componentWillReceiveProps(nextProps) {
  //     //TODO: check to see if you need this in componentWillReceiveProps
  //     this.setState({
  //       chunk: nextProps.item
  //     });
  //
  // }

  componentDidMount() {
    // var chunksRef = this.props.firebaseRef ||;
    // console.log(this.props)
    // var chunkRef = firebase.database().ref('chunks').child(this.props.item['.key'])
    // var chunkResourcesRef = chunkRef.child('resources');
    // this.bindAsArray(chunkResourcesRef, "resources");
    //convert to firebase object to array
    //this is crazy, making a firebase call for every resource in list to get metadata...but it's the best way to make sure you get updated resource data without saving to potentially unlimited places on resource update
    var chunksRef = firebase.database().ref('chunks').child(this.props.item['.key'])
    chunksRef.on('value', (snapshot) => {
      console.log('SNAPSHOT', snapshot.val())
      this.setState({
        resources:snapshot.val()
      })
    })
  }



  componentWillReceiveProps(newProps) {
    if(newProps.item['.key']) {
      // var chunkRef = firebase.database().ref('chunks').child(newProps.item['.key'])
      // var chunkResourcesRef = chunkRef.child('resources');
      // this.bindAsArray(chunkResourcesRef, "resources");
    }
    // var chunksRef = firebase.database().ref('chunks').orderByChild("interest").equalTo(this.props.item.interest);

  }


  updateField(e) {
    var attribute = e.target.dataset.itemAttribute;
    var newChunk = this.state.chunk;
    newChunk[attribute] = e.target.value;
    this.setState({chunk: newChunk, isDirty: true});
  }

  saveChanges() {
    this.props.saveInterestResource();
  }

  // getResources(item) {
  //   return _.merge(item.materials, item.people, item.events);
  // }
  renderResourceList(resourceList, i) {
    return (
      <Col xs={4} key={i}>
        <h5>{resourceList.name}</h5>
        <ListGroup>
        {resourceList.map(function(chunkResource, i){
          return this.renderResource(chunkResource, i);
        }.bind(this))}
        </ListGroup>
      </Col>
    );
  }

  renderResource(resource, i) {
    console.log(resource.name);
    return (
      <ListGroupItem key={i}>
        {resource.name}
      </ListGroupItem>
    )
  }

  render() {
    var resources = this.props.item.resources ? convertFirebaseObjectToArrayOfObjects(this.props.item.resources) : [];
    console.log(resources)
    var materialsResources =  resources.filter((resource) => resource.type === "materials");
    materialsResources.name = "Materials";
    var peopleResources =  resources.filter((resource) => resource.type === "people");
    peopleResources.name = "People";
    var eventsResources =  resources.filter((resource) => resource.type === "events");
    eventsResources.name = "Events";
    var resourcesByType = [];
    resourcesByType.push(materialsResources, peopleResources, eventsResources);

    return (
      <div>
        {/*{this.state.isDirty || this.props.newItemMode ? <button onClick={this.saveChanges.bind(this)}>Save</button> : null}*/}
        <h4>Resources</h4>
          <Row>
          {resourcesByType.map(function(resourceList, i) {
            return this.renderResourceList(resourceList, i);
          }.bind(this))}
        </Row>
      </div>
    );
  }
}

ChunkDetail.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  newItemMode: PropTypes.bool,
  saveInterestResource: PropTypes.func
}

reactMixin(ChunkDetail.prototype, reactFireMixin)

export default ChunkDetail;
