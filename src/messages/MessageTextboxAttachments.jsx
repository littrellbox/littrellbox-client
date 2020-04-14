import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/MessageTextboxAttachments.css';

class MessageTextboxAttachments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateIncrement: 0 //we have to trick the component into rendering
    };
  }

  componentDidMount() {
    this.props.attachmentManager.newAttachmentFunctions.push((attachments) => {this.setState({stateIncrement: this.state.stateIncrement + 1});});
    this.props.attachmentManager.submitAttachmentFunctions.push(() => {this.setState({stateIncrement: this.state.stateIncrement + 1});});
  }

  render() {
    return (
      <div className="MessageTextboxAttachments">
        {this.props.attachmentManager.attachments.map((value) => (
          <div className="MessageTextboxAttachments-attachment">
            <div className="MessageTextboxAttachments-icon"><FontAwesomeIcon icon={this.props.attachmentManager.attachmentTypes[value.type].icon}/></div>
            <div className="MessageTextboxAttachments-name">{value.name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageTextboxAttachments;