import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './css/MessageTextboxAttachments.css';

class MessageTextboxAttachments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateIncrement: 0 //we have to trick the component into rendering
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.props !== nextProps) {
      return true;
    }
    if(this.state !== nextState) {
      return true;
    }
  }

  componentDidMount() {
    this.props.attachmentManager.newAttachmentFunctions.push(() => {this.setState({stateIncrement: this.state.stateIncrement + 1});});
    this.props.attachmentManager.clearAttachmentFunctions.push(() => {this.setState({stateIncrement: this.state.stateIncrement + 1});});
  }

  render() {
    return (
      <div className="MessageTextboxAttachments">
        {this.props.attachmentManager.attachments.map((value, index) => (
          <div className="MessageTextboxAttachments-attachment">
            <div className="MessageTextboxAttachments-icon"><FontAwesomeIcon icon={this.props.attachmentManager.attachmentTypes[value.type].icon}/></div>
            <div className="MessageTextboxAttachments-name">{value.name}</div>
            <div className="MessageTextboxAttachments-remove" onClick={() => {this.props.attachmentManager.removeAttachment(index);}}><FontAwesomeIcon icon={faTimesCircle}/></div>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageTextboxAttachments;