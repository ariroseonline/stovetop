import React, {Component, PropTypes} from "react"
import './style.css';
import Detail from "../detail";
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

class Master extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    }
  }

  onItemClick(selectedItemId) {
    var newItems = this.state.items.map(function(item) {
      item.active = item.id === selectedItemId ? true : false;
      return item;
    });
    this.setState({ items : newItems });
  }

  render() {
    var activeItem = this.state.items.find(item => item.active === true);

    return (
      <Row>
        <Col xs={6}>
          <ListGroup>
            {this.state.items.map(function(item){
              return (
                <ListGroupItem onClick={this.onItemClick.bind(this, item.id)} className={item.active ? "active" : ""} key={item.name}>
                  <span className={item.type === "book" ? "glyphicon glyphicon-book" : "glyphicon glyphicon-link"}></span>
                  <span className="item-name">{item.name}</span>
                </ListGroupItem>
              )
            }.bind(this))}
          </ListGroup>
        </Col>
        <Col xs={6}>
          <Detail item={activeItem} itemType={this.props.itemType}/>
        </Col>
      </Row>
    )
  }
}

Master.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string
}

export default Master;
