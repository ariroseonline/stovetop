import React, {Component, PropTypes} from "react"
import './style.css';
import firebase from "firebase"
var moment = require('moment');
import {FieldGroup} from '../../Utilities';
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ListGroup,
  ListGroupItem,
  PageHeader,
  Glyphicon,
  Collapse,
  Checkbox,
  Button
} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker"

class NewSpecialReminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: "",
      title: "",
      date: new Date().toISOString(),
      repeatYearly: false
    }
  }

  componentDidMount() {

  }

  //TODO: DRY these updates up

  onUpdateRecipient(e) {
    var newRecipient = e.target.value;
    this.setState({recipient: newRecipient});
  }

  onUpdateTitle(e) {
    var newTitle = e.target.value;
    this.setState({title: newTitle});
  }

  onUpdateDate(value, formattedValue) {
    var newDate = value;
    this.setState({date: newDate});
  }

  onUpdateRepeatYearly(e) {
    var newRepeatYearly = e.target.checked;
    this.setState({repeatYearly: newRepeatYearly});
  }

  save() {
    var {title, date, recursYearly} = this.state;
    this.props.save({title, date, recursYearly})
    this.props.closeModal()
  }


  render() {
    return (
      <div>
        <PageHeader>New Special Reminder</PageHeader>
        <Row>
          <Col xs={4}>

            <FormGroup controlId="formRecurrenceTime">
              <ControlLabel>Who</ControlLabel>
              <FormControl componentClass="select" value={this.state.recipient}
                           onChange={this.onUpdateRecipient.bind(this)}>
                <option value="" disabled>Please select</option>

                {this.props.contacts.map(function(contact, i) {
                  return <option key={i} value={contact['.key']}>{contact.name}</option>
                })}

              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={3}>
            <FieldGroup id="formTitle" type="text" label="Name"
                        placeholder="Birthday, Wedding, etc"
                        value={this.state.title} onChange={this.onUpdateTitle.bind(this)}
            />
          </Col>
          <Col xs={3}>
            <FormGroup>
              <ControlLabel>Date</ControlLabel>
              <DatePicker id="example-datepicker" value={this.state.date} onChange={this.onUpdateDate.bind(this)}/>
            </FormGroup>
          </Col>
          <Col xs={2}>
            {/*<Checkbox inputRef={(input) => { this.newSpecialReminderYearly = input;}}> Repeat Yearly</Checkbox>*/}
            <Checkbox value={this.state.repeatYearly} onChange={this.onUpdateRepeatYearly.bind(this)}> Repeat
              Yearly</Checkbox>
          </Col>
        </Row>
        <Row>

        </Row>
        <Row>
          <Col xs={6}>
            <button className="btn btn-danger pull-left" onClick={this.props.closeModal}>Cancel</button>
          </Col>
          <Col xs={6}>
            <button className="btn btn-primary pull-right" onClick={this.save.bind(this)}>Save</button>
          </Col>
        </Row>
      </div>
    )
  }
}

NewSpecialReminder.propTypes = {
  save: PropTypes.func,
  contacts: PropTypes.array,
  closeModal: PropTypes.func
}

export default NewSpecialReminder
