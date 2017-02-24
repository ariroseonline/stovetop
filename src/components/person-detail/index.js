import React, {Component, PropTypes} from "react";
import './style.css';
import { FieldGroup } from '../../Utilities';

class PersonDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var person = this.props.item;

    return (
      <form>
        <h2>{person.name}</h2>
        <FieldGroup id="formControlsText" type="text" label="Where to Find"
                    placeholder="Website, Location in House, Friend's House, Youtube URL, etc"
                    value={person.location}
        />
        <FieldGroup id="formControlsTextarea" componentClass="textarea" label="Notes"
                    placeholder="Write some notes"
                    value={person.notes}
        />
      </form>
    );
  }
}

PersonDetail.propTypes = {
  item: PropTypes.object
}

export default PersonDetail;
