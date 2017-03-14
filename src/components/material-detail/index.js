import React, {Component, PropTypes} from "react";
import './style.css';
import {FieldGroup} from '../../Utilities';

class MaterialDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirty: false
    }
    this.updateField = this.updateField.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   material: nextProps.item
    // });
  }


  updateField(e) {
    var attribute = e.target.id;
    var newState = this.state;
    newState[attribute] = e.target.value;
    newState.isDirty = true;
    this.setState(newState);
  }

  saveChanges() {
    //if user mutated input, it will be in state, otherwise use initial prop value
    var data = {
      name: this.state.name || this.props.item.name,
      location: this.state.location || this.props.item.location,
      notes: this.state.notes || this.props.item.notes
    }

    this.props.saveInterestResource(this.props.item['.key'], "materials", data, this.props.item.interest);
  }

  render() {
    var initialName = this.props.item.name,
      initialLocation = this.props.item.location,
      initialNotes = this.props.item.notes,
      newItemMode = this.props.newItemMode;

    return (
      <form>
        <h2>{name}</h2>
        {this.state.isDirty || newItemMode ? <button onClick={this.saveChanges.bind(this)}>Save</button> : null}
        <FieldGroup id="name" type="text" label="Title"
                    placeholder="Yoga: The Book, Yoga for Dummies, 2007 Yoga Lecture, etc"
                    value={this.state.name || initialName} onChange={this.updateField}
        />
        <FieldGroup id="location" type="text" label="Where to Find" on
                    placeholder="Website, Location in House, Friend's House, Youtube URL, etc"
                    value={this.state.location || initialLocation} onChange={this.updateField}
        />
        <FieldGroup id="notes" componentClass="textarea" label="Notes"
                    placeholder="Write some notes" value={this.state.notes || initialNotes} onChange={this.updateField}
        />
      </form>
    );
  }
}

MaterialDetail.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  newItemMode: PropTypes.bool,
  saveInterestResource: PropTypes.func
}

export default MaterialDetail;
