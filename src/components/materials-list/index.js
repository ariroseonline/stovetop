import React, {Component, PropTypes} from "react"
import './style.css';
import Material from "../material";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
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

class MaterialsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materials: [
        {
          id: 1,
          name: "The Heart of Yoga",
          type: "book",
          location: "Book in House",
          active: true,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        },
        {
          id: 2,
          name: "Yoga NYC",
          type: "book",
          location: "Book in Office",
          active: false,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        },
        {
          id: 3,
          name: "Yoga.com",
          type: "website",
          location: "http://yoga.com",
          active: false,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        }
      ]
    }
  }

  FieldGroup({id, label, help, ...props}) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  onMaterialClick(selectedMaterialId) {
    var newMaterials = this.state.materials.map(function(material) {
      material.active = material.id === selectedMaterialId ? true : false;
      return material;
    });
    this.setState({ materials : newMaterials });
  }

  render() {
    var activeMaterial = this.state.materials.find(material => material.active === true);

    return (
      <Row>
        <Col xs={6}>
          <ListGroup>
            {this.state.materials.map(function(material){
              return (
              <ListGroupItem onClick={this.onMaterialClick.bind(this, material.id)} className={material.active ? "active" : ""} key={material.name}>
                <span className={material.type === "book" ? "glyphicon glyphicon-book" : "glyphicon glyphicon-link"}></span>
                <span className="material-name">{material.name}</span>
              </ListGroupItem>
              )
            }.bind(this))}
          </ListGroup>
        </Col>
        <Col xs={6}>
          <Material material={activeMaterial} />
        </Col>
      </Row>
    )
  }
}

MaterialsList.propTypes = {
}

export default MaterialsList;
