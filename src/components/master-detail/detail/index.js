import React, {Component, PropTypes} from "react"
import './style.css';
import ChunkDetail from "../../chunk-detail";
import MaterialDetail from "../../material-detail";
import PersonDetail from "../../person-detail";
import EventDetail from "../../event-detail";

class Detail extends Component {
  constructor(props) {
    super(props);
  }

  getDetailTemplate(item, interestResourceType) {
    switch(interestResourceType) {
      case "chunks":
        return <ChunkDetail item={item} saveItem={this.props.saveItem} />;
        break;
      case "materials":
        return <MaterialDetail item={item} saveItem={this.props.saveItem} />;
        break;
      case "people":
        return <PersonDetail item={item} saveItem={this.props.saveItem} />;
        break;
      case "events":
        return <EventDetail item={item} saveItem={this.props.saveItem} />;
        break;
    }
  }

  render() {
    var {item, itemType, newItemMode } = this.props;
    return this.getDetailTemplate(item, itemType, newItemMode)
  }
}

Detail.propTypes = {
  item: PropTypes.object,
  interestResourceType: PropTypes.string,
  newItemMode: PropTypes.bool,
  saveItem: PropTypes.func
}

export default Detail;