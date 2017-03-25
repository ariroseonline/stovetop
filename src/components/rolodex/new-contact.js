import React, {Component, PropTypes} from "react"
import './style.css';
import firebase from "firebase"
var moment = require('moment');
import { FieldGroup } from '../../Utilities';

class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  //TODO: DRY these updates up
  onUpdateName(e) {
    var newName = e.target.value;
    this.setState({ name: newName });
  }

  onUpdateNotes(e) {
    var newNotes = e.target.value;
    this.setState({ notes: newNotes });
  }

  saveChanges() {
    this.props.saveContact({ name: this.state.name, notes: this.state.notes });
  }


  render() {
    return (
      <div>
        <FieldGroup id="form-name" type="text" label="Contact Name"
                    placeholder="Bob, Sarah, Sally"
                    value={this.state.name} onChange={this.onUpdateName.bind(this)}
        />

        <FieldGroup id="form-notes" componentClass="textarea" label="Conversational Notes"
                    placeholder="Details about the person including hobbies, recent events, family, job, etc"
                    value={this.state.notes} onChange={this.onUpdateNotes.bind(this)}
        />
        <button onClick={this.saveChanges.bind(this)}>Save</button>
      </div>
    )
  }
}

NewContact.propTypes = {
  saveContact: PropTypes.func
}

export default NewContact
