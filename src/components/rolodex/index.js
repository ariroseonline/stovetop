import React, {Component, PropTypes} from "react"
import './style.css';
import firebase from "firebase"
var moment = require('moment');
import NewContact from "./new-contact";
import NewSpecialReminder from "./new-special-reminder";
import {Row, Col, InputGroup, FormGroup, FormControl, Glyphicon} from "react-bootstrap";

class Rolodex extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    //initialize reactive action
    this.props.fetchReminders();
    this.props.fetchContacts();
  }

  updateSearchQuery(e) {
    this.setState({
      searchQuery: e.target.value
    })
  }

  renderFilteredReminders(reminders) {
    var query = this.state.searchQuery.toLowerCase();

    var filteredReminders = reminders.filter(function(reminder) {
      return reminder.recipient.toLowerCase().includes(query);
    });

    return this.renderReminders(filteredReminders);
  }

  renderReminders(reminders) {
    var sortedReminders = reminders.sort(function (a, b) {
      return a.dueTime - b.dueTime;
    });

    return sortedReminders.map((reminder, i) => {

      if (reminder.completed) {
        return;
      }
      var today = moment().startOf('day').valueOf();
      var daysRemaining = Math.round(moment.duration(reminder.dueTime - today).asDays());

      return (
        <li key={i} className={"list-group-item clearfix"}>
          <h4 className="countdown">{daysRemaining} days</h4>

          <h4 className="pull-left">{reminder.recipient}</h4>
          <button className="btn pull-right"
                  onClick={this.props.completeReminder.bind(this, reminder['.key'])}>Done
          </button>
          <button className="btn pull-right"
                  onClick={this.props.snoozeReminder.bind(this, reminder['.key'], reminder.dueTime + moment.duration(3, 'days').valueOf())}>
            Snooze
          </button>

          <span key={i}>{reminder.name}</span>
        </li>)
    })
  }

  //add new contact from special reminder
  // addNewContact() {
  //   this.props.showModal(<NewContact saveContact={this.props.saveContact} />)
  // }

  newContact () {
    this.props.showModal(<NewContact closeModal={this.props.closeModal} save={this.props.saveContact}/>)
  }

  newSpecialReminder () {
    this.props.showModal(<NewSpecialReminder contacts={this.props.contacts} closeModal={this.props.closeModal} save={this.props.saveSpecialReminder}/>)
  }

  render() {
    return (
      <div>
        <Row className="clearfix">
          <Col xs={6}>
            <form>
              <FormGroup>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="search" /></InputGroup.Addon>
                    <FormControl type="text" placeholder="Search Contacts" value={this.state.searchQuery} onChange={this.updateSearchQuery.bind(this)} />
                </InputGroup>
              </FormGroup>
            </form>
          </Col>
          <Col xs={6}>

            <button className="btn btn-primary pull-right" onClick={this.newContact.bind(this)}>
              New Contact
            </button>
            <button className="btn btn-primary pull-right" onClick={this.newSpecialReminder.bind(this)}>
              New Special Reminder
            </button>
          </Col>
        </Row>
        <br/>
        <ol className="list-group reminders">
          {this.state.searchQuery ? this.renderFilteredReminders(this.props.reminders) : this.renderReminders(this.props.reminders)}
        </ol>
      </div>
  )
  }
  }

  Rolodex.propTypes = {
    reminders: PropTypes.array,
    fetchReminders: PropTypes.func,
    completeReminder: PropTypes.func,
    snoozeReminder: PropTypes.func,
    showModal: PropTypes.func,
    closeModal: PropTypes.func,
    fetchContacts: PropTypes.func,
    saveContact: PropTypes.func
  }

  export default Rolodex
