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
        return <ChunkDetail item={item} saveInterestResource={this.props.saveInterestResource} />;
        break;
      case "materials":
        return <MaterialDetail item={item} saveInterestResource={this.props.saveInterestResource} />;
        break;
      case "people":
        return <PersonDetail item={item} saveInterestResource={this.props.saveInterestResource} />;
        break;
      case "events":
        return <EventDetail item={item} saveInterestResource={this.props.saveInterestResource} />;
        break;
    }
  }

  render() {
    var {item, interestResourceType, newItemMode } = this.props;
    return this.getDetailTemplate(item, interestResourceType, newItemMode)
  }
}

Detail.propTypes = {
  item: PropTypes.object,
  interestResourceType: PropTypes.string,
  newItemMode: PropTypes.bool,
  saveInterestResource: PropTypes.func
}

export default Detail;