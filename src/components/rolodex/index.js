import React, {Component, PropTypes} from "react"
import './style.css';
import firebase from "firebase"
var moment = require('moment');
import NewContact from "./new-contact";
import {Row, Col, InputGroup, FormGroup, FormControl, Glyphicon} from "react-bootstrap";

class Rolodex extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    //initialize reactive action
    this.props.fetchCorrespondences();
    this.props.fetchContacts();
  }

  //TODO: extra to utility?
  containsSpecialReminder(correspondence) {
    return correspondence.reminders.some(function (reminder) {
      return !reminder.recurring;
    });
  }

  updateSearchQuery(e) {
    this.setState({
      searchQuery: e.target.value
    })
  }

  renderFilteredCorrespondences(correspondences) {
    var query = this.state.searchQuery.toLowerCase();

    var filteredCorrespondences = correspondences.filter(function(correspondence) {
      return correspondence.recipient.toLowerCase().includes(query)
    }.bind(this));

    return this.renderCorrespondences(filteredCorrespondences);
  }

  renderCorrespondences(correspondences) {
    var sortedCorrespondences = correspondences.sort(function (a, b) {
      return a.dueTime - b.dueTime;
    });

    return sortedCorrespondences.map((correspondence, i) => {

      if (correspondence.completed) {
        return;
      }
      var today = moment().startOf('day').valueOf();
      var daysRemaining = Math.round(moment.duration(correspondence.dueTime - today).asDays());

      return (
        <li key={i} className={"list-group-item clearfix"}>
          <h4 className="countdown">{daysRemaining} days</h4>
          <h4 className="pull-left">{correspondence.recipient}</h4>
          <button className="btn pull-right"
                  onClick={this.props.completeCorrespondence.bind(this, correspondence['.key'])}>Done
          </button>
          <button disabled={this.containsSpecialReminder(correspondence)} className="btn pull-right"
                  onClick={this.props.snoozeCorrespondence.bind(this, correspondence['.key'], correspondence.dueTime + moment.duration(3, 'days').valueOf())}>
            Snooze
          </button>
          {correspondence.reminders.map((reminder, i) => {
            return (
              <span key={i}>{reminder.name}</span>
            )
          })}
        </li>)
    })
  }

  //add new contact from special reminder
  // addNewContact() {
  //   this.props.showModal(<NewContact saveContact={this.props.saveContact} />)
  // }

  addContact() {
    this.props.showModal(<NewContact saveContact={this.props.saveContact}/>)
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
            <button className="btn btn-primary pull-right" onClick={this.addContact.bind(this)}>
              New Contact
            </button>
          </Col>
        </Row>
        <br/>
        <ol className="list-group correspondences">
          {this.state.searchQuery ? this.renderFilteredCorrespondences(this.props.correspondences) : this.renderCorrespondences(this.props.correspondences)}
        </ol>
      </div>
  )
  }
  }

  Rolodex.propTypes = {
    correspondences: PropTypes.array,
    fetchCorrespondences: PropTypes.func,
    completeCorrespondence: PropTypes.func,
    snoozeCorrespondence: PropTypes.func,
    showModal: PropTypes.func,
    fetchContacts: PropTypes.func,
    saveContact: PropTypes.func
  }

  export default Rolodex
