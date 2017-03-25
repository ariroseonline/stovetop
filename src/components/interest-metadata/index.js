import React, {Component, PropTypes} from "react"
import './style.css';
import { FieldGroup } from '../../Utilities';


class InterestMetadata extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title
    }

    this.onUpdateTitle = this.onUpdateTitle.bind(this);
  }

  onUpdateTitle(e) {
    var newTitle = e.target.value;
    this.setState({ title: newTitle, isDirty: true });
  }

  saveChanges(e) {
    //gather data and tell top level component to update firebase
    this.props.saveInterestMetadata(this.props.newInterestMode, { title: this.state.title }, this.props.interestKey);
    this.setState({ isDirty: false });
  }

  render() {

    return (
      <div className="interest-metadata">
        {this.state.isDirty || this.props.newItemMode ? <button onClick={this.saveChanges.bind(this)}>Save</button> : null}

        <FieldGroup id="formControlsText" type="text" label="Interest Name"
                    placeholder="Yoga, Cooking, React.js"
                    value={this.state.title} onChange={this.onUpdateTitle}
        />

      </div>
    )
  }
}

InterestMetadata.propTypes = {
  title: PropTypes.string,
  interestKey: PropTypes.string,
  newInterestMode: PropTypes.bool,
  saveInterestMetadata: PropTypes.func
}

export default InterestMetadata;
