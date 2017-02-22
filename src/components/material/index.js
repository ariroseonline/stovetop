import React, {Component, PropTypes} from "react"
import './style.css';
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
} from "react-bootstrap";

class Material extends Component {

  FieldGroup({id, label, help, ...props}) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  render() {

    var FieldGroup = this.FieldGroup;
    var material = this.props.material;

    return (
      <form>
        <h2>{material.name}</h2>
        <FieldGroup id="formControlsText" type="text" label="Where to Find"
                    placeholder="Website, Location in House, Friend's House, Youtube URL, etc"
                    value={material.location}
        />
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Notes</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" defaultValue={material.notes} />
        </FormGroup>
      </form>
    );
  }
}

Material.propTypes = {
  material: PropTypes.object
}

export default Material;
