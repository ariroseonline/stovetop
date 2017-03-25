import React, {Component, PropTypes} from "react"
import './style.css';
import firebase from "firebase"
var moment = require('moment');
import { FieldGroup } from '../../Utilities';

class NewReminder extends Component {
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
        {/*PICK A CONTACT FROM SELECT*/}
        {/* ADD NEW CONTACT -- SLIDE DOWN AND S*/}
        {/*PICK RECURRING OR SPECIAL*/}
        {/*IF SPECIAL SELECT DATE*/}
        {/*IF RECURRING SELECT TIMESPAN*/}

        <button onClick={this.saveChanges.bind(this)}>Save</button>
      </div>
    )
  }
}

NewReminder.propTypes = {
  saveContact: PropTypes.func
}

export default NewReminder
