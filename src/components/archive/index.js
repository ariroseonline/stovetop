import React, { Component, PropTypes } from "react"
import './style.css';
import firebase from "firebase"
import {InterestStages, ItemTypes} from "../../Constants"
import DraggableInterest from "../draggable-interest"
import Interest from "../interest";

class Archive extends Component {


  renderArchiveInterests() {
    return this.props.userInterests.filter((interest) => interest.stage === InterestStages.ARCHIVE).map((archiveInterest, i) => {
      return <DraggableInterest key={"archive-interest-" + i} data={archiveInterest} draggableItemType={ItemTypes.ARCHIVE_INTEREST} displayComponent={Interest} showModal={this.props.showModal} saveInterestMetadata={this.props.saveInterestMetadata} />
    })
  }


  render() {
    return (
        <div>
          {this.renderArchiveInterests()}
        </div>
    )
  }
}

Archive.propTypes = {
  children: PropTypes.node,
  userInterests: PropTypes.array,
  showModal: PropTypes.func,
  saveInterestMetadata: PropTypes.func
}

export default Archive
