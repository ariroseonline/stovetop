import React, {Component, PropTypes} from "react";
import './style.css';
import { FieldGroup } from '../../Utilities';

class EventDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var event = this.props.item;

    return (
      <form>
        <h2>{event.name}</h2>
        <FieldGroup id="formControlsText" type="text" label="Where to Find"
                    placeholder="Website, Location in House, Friend's House, Youtube URL, etc"
                    value={event.location}
        />
        <FieldGroup id="formControlsTextarea" componentClass="textarea" label="Notes"
                    placeholder="Write some notes"
                    value={event.notes}
        />

      </form>
    );
  }
}

EventDetail.propTypes = {
  item: PropTypes.object,
  interestResourceType: PropTypes.string,
  newItemMode: PropTypes.bool,
  saveInterestResource: PropTypes.func
}

export default EventDetail;
