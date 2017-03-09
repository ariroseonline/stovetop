import React, {Component, PropTypes} from "react"
import './style.css';
import MaterialDetail from "../../material-detail";
import PersonDetail from "../../person-detail";
import EventDetail from "../../event-detail";

class Detail extends Component {
  constructor(props) {
    super(props);
  }

  getDetailTemplate(item, itemType) {
    switch(itemType) {
      case "materials":
        return <MaterialDetail item={item}/>;
        break;
      case "people":
        return <PersonDetail item={item}/>;
        break;
      case "events":
        return <EventDetail item={item}/>;
        break;
    }
  }

  render() {
    var {item, itemType} = this.props;
    return this.getDetailTemplate(item, itemType)
  }
}

Detail.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string
}

export default Detail;