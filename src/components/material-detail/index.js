import React, {Component, PropTypes} from "react";
import './style.css';
import { FieldGroup } from '../../Utilities';

class MaterialDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var material = this.props.item;
    console.log("material", material)

    return (
      <form>
        <h2>{material.name}</h2>
        <FieldGroup id="formControlsText" type="text" label="Where to Find"
                    placeholder="Website, Location in House, Friend's House, Youtube URL, etc"
                    value={material.location}
        />
        <FieldGroup id="formControlsTextarea" componentClass="textarea" label="Notes"
                    placeholder="Write some notes"
                    value={material.notes}
        />
      </form>
    );
  }
}

MaterialDetail.propTypes = {
  item: PropTypes.object
}

export default MaterialDetail;
