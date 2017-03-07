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
    var activeItem = this.props.items[0] || {};
    this.state = {
      items: this.props.items,
      activeItemId: activeItem.id || null
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.items.length && !this.state.activeItemId) {
      this.setState({
        activeItemId: nextProps.items[0].id
      })
    }
  }

  onItemClick(selectedItemId) {
    this.setState({ activeItemId : selectedItemId });
  }

  onAddItemClick() {
    var newItems = this.state.items.push({

    })
    this.setState({ items : newItems });
  }

  render() {
    var activeItem = this.state.items.find(item => item.id === this.state.activeItemId) || {};

    return (
      <Row>
        <Col xs={3}>
          <ListGroup>
            {this.state.items.map(function(item){
              return (
                <ListGroupItem onClick={this.onItemClick.bind(this, item.id)} className={item.id === this.state.activeItemId ? "active" : ""} key={item.name}>
                  <span className={item.type === "book" ? "glyphicon glyphicon-book" : "glyphicon glyphicon-link"}></span>
                  &nbsp; <span className="item-name">{item.name}</span>
                </ListGroupItem>
              )
            }.bind(this))}
          </ListGroup>
          <Button block onClick={this.onAddItemClick}>Add New Material</Button>
        </Col>
        <Col xs={9}>
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
