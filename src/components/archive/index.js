import React, { Component, PropTypes } from "react"
import './style.css';
import firebase from "firebase"
import {InterestStages, ItemTypes} from "../../Constants"
import ArchiveInterest from "../archive-interest"

class Archive extends Component {


  renderArchiveInterests() {
    return this.props.userInterests.filter((interest) => interest.stage === InterestStages.ARCHIVE).map((archiveInterest, i) => {
      return <ArchiveInterest key={"archive-interest-" + i} data={archiveInterest} />
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
  userInterests: PropTypes.array
}

export default Archive
