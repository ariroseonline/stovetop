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
    // var activeItem = props.items[0] || {};
    this.state = {
      newItemMode: false,
      activeItemId: ""
      // items: props.items,
      // activeItemId: activeItem['.key']
    }
  }

  componentWillReceiveProps(nextProps) {
    // //not great set up repeating the items part
    // if(nextProps.items.length) {
    //   var activeItem = nextProps.items[0];
    //
    //   this.setState({
    //     items: nextProps.items,
    //     activeItemId: activeItem['.key']
    //   })
    // }


  }

  onItemClick(selectedItemId) {
    this.setState({ activeItemId : selectedItemId });
  }

  onAddItemClick() {
    var newItemId = this.props.createItem(this.props.itemType);
    this.setState({ activeItemId : newItemId, newItemMode: true });
  }

  saveInterestResource() {
    this.props.saveInterestResource(this.props.itemType);
  }

  render() {
    var items = this.props.items,
        activeItem = items.find(item => item['.key'] === this.state.activeItemId) || items[0] || {};


    return (
      <Row>
        <Col xs={3}>
          <ListGroup>
            {items.map(function(item, i){
              var header = (this.props.itemType === "chunks" ? (i+1) + "." : "") + item.name;
              var subheader = "5 resources";

              return (
                <ListGroupItem header={header} onClick={this.onItemClick.bind(this, item['.key'])} className={item['.key'] === activeItem['.key'] ? "active" : ""} key={i}>
                  {subheader}
                </ListGroupItem>
              )
            }.bind(this))}
          </ListGroup>
          <Button block onClick={this.onAddItemClick.bind(this)}>Add New Item</Button>
        </Col>
        <Col xs={9}>
          <Detail item={activeItem} itemType={this.props.itemType} newItemMode={this.state.newItemMode} saveInterestResource={this.props.saveInterestResource} />
        </Col>
      </Row>
    )
  }
}

Master.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string,
  createItem: PropTypes.func,
  saveInterestResource: PropTypes.func
}

export default Master;
