import React, {Component, PropTypes} from "react"
import './style.css';
// import MaterialsList from "../materials-list";
import MasterDetail from "../master-detail/master";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";


class InterestCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      materials: [
        {
          id: 1,
          name: "The Heart of Yoga",
          type: "book",
          location: "Book in House",
          active: true,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        },
        {
          id: 2,
          name: "Yoga NYC",
          type: "book",
          location: "Book in Office",
          active: false,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        },
        {
          id: 3,
          name: "Yoga.com",
          type: "website",
          location: "http://yoga.com",
          active: false,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        }
      ],
      people: [
        {
          id: 1,
          name: "Barbara Corcoran",
          phone: "http://yoga.com",
          email: "blah@blah.com",
          met: "At Coffeeshop in East Village",
          active: true,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        },
        {
          id: 2,
          name: "Mark Cuban",
          phone: "http://yoga.com",
          email: "nora@fjdal.com",
          met: "At Yoga Con 2014",
          active: false,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        }
      ],
      events: [
        {
          id: 1,
          name: "Yoga Conference",
          date: "01/23/2018",
          active: true,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        },
        {
          id: 2,
          name: "Yoga Class on Mondays",
          date: "01/11/2018",
          active: false,
          notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quam nibh, laoreet sit amet vulputate vel, luctus imperdiet massa. Etiam nec neque vel odio consequat tristique. Integer id orci eu diam pharetra vulputate in a nisl. Vestibulum venenatis, nibh eget rutrum viverra, turpis leo finibus nulla, quis sollicitudin massa purus ac dolor. Nullam tristique sagittis magna, vitae iaculis enim elementum in. Praesent consequat pharetra magna, ac congue nisi tempus non. Vivamus posuere tristique egestas. Sed facilisis velit magna, eu feugiat sapien feugiat vel. Donec ac mauris non massa ullamcorper ultricies at ut justo. Pellentesque tempus vel velit rutrum tempus. Phasellus lacus risus, mollis sed iaculis vel, accumsan condimentum eros. Sed sapien quam, mollis ut feugiat quis, egestas id erat.",
        }
      ]
    }
  }


  render() {

    return (
      <div className="interest-card">
        <h1>{this.props.data.title}</h1>
        <Tabs>
          <TabList>
            <Tab>Materials</Tab>
            <Tab>People</Tab>
            <Tab>Events and Classes</Tab>
          </TabList>
          <TabPanel>
            <MasterDetail items={this.state.materials} itemType={"material"}/>
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.state.people} itemType={"person"} />
          </TabPanel>
          <TabPanel>
            <MasterDetail items={this.state.events} itemType={"event"} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

InterestCard.propTypes = {
  data: PropTypes.object
}

export default InterestCard;
