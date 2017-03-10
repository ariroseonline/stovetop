import React, {Component, PropTypes} from "react";
import './style.css';
import { FieldGroup } from '../../Utilities';

class MaterialDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material: this.props.item,
      isDirty: false
    }
    this.onUpdate = this.updateField.bind(this);

  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        material: nextProps.item
      });
  }


  updateField(e) {
    var attribute = e.target.dataset.itemAttribute;
    var newMaterial = this.state.material;
    newMaterial[attribute] = e.target.value;
    this.setState({ material: newMaterial, isDirty: true});
  }

  saveChanges() {
    this.props.saveItem();
  }

  render() {

    return (
      <form>
        <h2>{this.state.material.name || "Loading"}</h2>
        {this.state.isDirty || this.props.newItemMode ? <button onClick={this.saveChanges.bind(this)}>Save</button> : null}
        <FieldGroup id="formControlsText" type="text" label="Where to Find" data-item-attribute="location"
                    placeholder="Website, Location in House, Friend's House, Youtube URL, etc"
                    value={this.state.material.location || "Loading"} onChange={this.onUpdate}
        />
        <FieldGroup id="formControlsTextarea" componentClass="textarea" label="Notes" data-item-attribute="notes"
                    placeholder="Write some notes"
                    value={this.state.material.notes || "Loading"} onChange={this.onUpdate}
        />
      </form>
    );
  }
}

MaterialDetail.propTypes = {
  item: PropTypes.object,
  newItemMode: PropTypes.bool,
  saveItem: PropTypes.func
}

export default MaterialDetail;
