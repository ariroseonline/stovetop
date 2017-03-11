import React, {Component, PropTypes} from "react";
import './style.css';
import { FieldGroup } from '../../Utilities';

class StepDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: this.props.item,
      isDirty: false
    }
    this.onUpdate = this.updateField.bind(this);

  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        step: nextProps.item
      });
  }


  updateField(e) {
    var attribute = e.target.dataset.itemAttribute;
    var newStep = this.state.step;
    newStep[attribute] = e.target.value;
    this.setState({ step: newStep, isDirty: true});
  }

  saveChanges() {
    this.props.saveItem();
  }

  render() {

    return (
      <form>
        <h2>{this.state.step.name || "Loading"}</h2>
        {this.state.isDirty || this.props.newItemMode ? <button onClick={this.saveChanges.bind(this)}>Save</button> : null}
        <FieldGroup id="formControlsText" type="text" label="Where to Find" data-item-attribute="location"
                    placeholder="Website, Location in House, Friend's House, Youtube URL, etc"
                    value={this.state.step.location || "Loading"} onChange={this.onUpdate}
        />
        <h4>Resources</h4>
      </form>
    );
  }
}

StepDetail.propTypes = {
  item: PropTypes.object,
  newItemMode: PropTypes.bool,
  saveItem: PropTypes.func
}

export default StepDetail;
