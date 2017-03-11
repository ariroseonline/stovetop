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
    var activeItem = props.items[0] || {};
    this.state = {
      items: props.items,
      activeItemId: activeItem['.key']
    }
  }

  componentWillReceiveProps(nextProps) {
    //not great set up repeating the items part
    if(nextProps.items.length) {
      var activeItem = nextProps.items[0];

      this.setState({
        items: nextProps.items,
        activeItemId: activeItem['.key']
      })
    }


  }

  onItemClick(selectedItemId) {
    this.setState({ activeItemId : selectedItemId });
  }

  onAddItemClick() {
    var newItemId = this.props.createItem(this.props.itemType);
    this.setState({ activeItemId : newItemId, newItemMode: true });
  }

  saveItem() {
    this.props.saveItem(this.props.itemType);
  }

  render() {
    var activeItem = this.state.items.find(item => item['.key'] === this.state.activeItemId) || {};

    return (
      <Row>
        <Col xs={3}>
          <ListGroup>
            {this.state.items.map(function(item, i){
              return (
                <ListGroupItem onClick={this.onItemClick.bind(this, item['.key'])} className={item['.key'] === this.state.activeItemId ? "active" : ""} key={i}>
                  {this.props.itemType === "steps" ? <span>{i+1}.</span> :
                  <span className={item.type === "book" ? "glyphicon glyphicon-book" : "glyphicon glyphicon-link"}></span>}
                  &nbsp; <span className="item-name">{item.name}</span>
                </ListGroupItem>
              )
            }.bind(this))}
          </ListGroup>
          <Button block onClick={this.onAddItemClick.bind(this)}>Add New Item</Button>
        </Col>
        <Col xs={9}>
          <Detail item={activeItem} itemType={this.props.itemType} newItemMode={this.state.newItemMode} />
        </Col>
      </Row>
    )
  }
}

Master.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string,
  createItem: PropTypes.func,
  saveItem: PropTypes.func
}

export default Master;
