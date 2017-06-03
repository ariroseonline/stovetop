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

class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      topics: "",
      recurrenceTime: { phrase: "Weekly", duration: moment.duration(1, 'weeks').asMilliseconds()},
    }
  }

  //TODO: DRY these updates up
  onUpdateName(e) {
    var newName = e.target.value;
    this.setState({name: newName});
  }

  onUpdateTopics(e) {
    var newTopics = e.target.value;
    this.setState({topics: newTopics});
  }

  onUpdateBio(e) {
    var newBio = e.target.value;
    this.setState({bio: newBio});
  }

  onUpdateRecurrenceTime(e) {
    var newRecurrenceTime = e.target.value;
    var durationMap = {
      "Weekly": { phrase: "Weekly", duration: moment.duration(1, 'weeks').asMilliseconds()},
      "Monthly": { phrase: "Monthly", duration: moment.duration(1, 'months').asMilliseconds()},
      "Every 3 Months": { phrase: "Every 3 Months", duration: moment.duration(3, 'months').asMilliseconds()},
      "Every 6 Months": { phrase: "Every 6 Months", duration: moment.duration(6, 'months').asMilliseconds()},
      "Yearly": { phrase: "Yearly", duration: moment.duration(1, 'years').asMilliseconds()}
    }

    this.setState({recurrenceTime: durationMap[newRecurrenceTime]});
  }

  save() {
    var {name, bio, topics, recurrenceTime } = this.state;
    this.props.save({name, bio, topics, recurrenceTime});
    this.props.closeModal()
  }

  // addSpecialReminder() {
  //   this.setState({addingSpecialReminder: true});
  // }
  //
  // saveSpecialReminder() {
  //   var newSpecialReminders = [...this.state.specialReminders, {
  //     name: this.newSpecialReminderName.value,
  //     date: moment(this.newSpecialReminderDate.value).valueOf(),
  //     yearly: this.newSpecialReminderYearly.checked
  //   }];
  //   this.setState({
  //     specialReminders: newSpecialReminders,
  //     addingSpecialReminder: false
  //   });
  // }
  //
  // removeSpecialReminder(reminder) {
  //   var newSpecialReminders = [...this.state.specialReminders];
  //   var removeIndex = newSpecialReminders.indexOf(reminder);
  //   newSpecialReminders.splice(removeIndex, 1);
  //   this.setState({
  //     specialReminders: newSpecialReminders
  //   })
  // }
  //
  // renderSpecialReminders() {
  //   return this.state.specialReminders.map((reminder) => {
  //     return this.renderSpecialReminder(reminder)
  //   })
  // }
  //
  // renderAddSpecialReminder() {
  //   return (
  //     <Collapse in={this.state.addingSpecialReminder}>
  //       <Form inline>
  //         <Row>
  //           <Col xs={4}>
  //             <FormControl type="text" inputRef={(input) => { this.newSpecialReminderName = input;}} placeholder="Birthday, Wedding, etc"/>
  //           </Col>
  //           <Col xs={4}>
  //             <FormControl type="date" inputRef={(input) => { this.newSpecialReminderDate = input;}} />
  //           </Col>
  //           <Col xs={3}>
  //             <Checkbox inputRef={(input) => { this.newSpecialReminderYearly = input;}}> Repeat Yearly</Checkbox>
  //           </Col>
  //           <Col xs={1}>
  //             <Button className="btn btn-primary btn-xs pull-right" onClick={this.saveSpecialReminder.bind(this)}>Save</Button>
  //           </Col>
  //         </Row>
  //       </Form>
  //     </Collapse>
  //   )
  // }
  //
  // renderSpecialReminder(reminder) {
  //   //TODO: eventually want automatic holidays imported particularly holidays that don't fall on the same day every year
  //   return (
  //     <ListGroupItem>
  //       <Row className="form-inline">
  //         <Col xs={5}>
  //           {/*TODO: this needs to be editable*/}
  //           <span className="special-reminder-name">{reminder.name}</span>
  //         </Col>
  //         <Col xs={3}>
  //           <span
  //             className="special-reminder-date">{moment(reminder.date).format("MMM Do" + (reminder.yearly ? "" : " YYYY"))}</span>
  //         </Col>
  //         <Col xs={3}>
  //           <span className="special-reminder-yearly">{reminder.yearly ? "Repeats Yearly" : "Once" }</span>
  //         </Col>
  //         <Col xs={1}>
  //           <Glyphicon glyph="remove" className="pull-right" onClick={this.removeSpecialReminder.bind(this, reminder)} />
  //         </Col>
  //       </Row>
  //     </ListGroupItem>
  //   )
  // }

  render() {
    return (
      <div>
        <PageHeader>New Recurring Reminder</PageHeader>
        <Row>
          <Col xs={6}>
            <FieldGroup id="formName" type="text" label="Name"
                        placeholder="Bob, Sarah, Sally"
                        value={this.state.name} onChange={this.onUpdateName.bind(this)}
            />
          </Col>
          <Col xs={6}>

            <FormGroup controlId="formRecurrenceTime">
              <ControlLabel>How Often to Get In Touch</ControlLabel>
              <FormControl componentClass="select" value={this.state.recurrenceTime.phrase}
                           onChange={this.onUpdateRecurrenceTime.bind(this)}>
                <option value="" disabled>Please select</option>
                <option value={"Weekly"}>Weekly</option>
                <option value={"Monthly"}>Monthly</option>
                <option value={"Every 3 Months"}>Every 3 Months</option>
                <option value={"Every 6 Months"}>Every 6 Months</option>
                <option value={"Yearly"}>Yearly</option>
              </FormControl>
            </FormGroup>
            {/*Put specialreminders add feature after contact addition */}

            {/*<ControlLabel>Special Reminders <Glyphicon glyph="plus" className="pull-right"*/}
            {/*onClick={this.addSpecialReminder.bind(this)}/></ControlLabel>*/}
            {/*<ListGroup>*/}
            {/*{this.renderSpecialReminders()}*/}
            {/*{this.renderAddSpecialReminder()}*/}
            {/*</ListGroup>*/}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FieldGroup id="formBio" componentClass="textarea" rows="3" label="Personal Notes"
                        placeholder="Details about the person including hobbies, recent events, family, job, etc"
                        value={this.state.bio} onChange={this.onUpdateBio.bind(this)}
            />
          </Col>
          <Col xs={6}>
            <FieldGroup id="formTopics" componentClass="textarea" rows="3" label="Topics for Conversation"
                        placeholder="Topics to continue talking about. Politics, job hopping, travelling, art, etc"
                        value={this.state.topics} onChange={this.onUpdateTopics.bind(this)}
            />
          </Col>
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

NewContact.propTypes = {
  save: PropTypes.func,
  closeModal: PropTypes.func
}

export default NewContact
