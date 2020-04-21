import React from 'react';
import './css/MessageAttachments.css';
import ChatContext from "../contexts/chatContext";

class MessageAttachments extends React.Component {
  constructor(props) {
    super(props);

    this.onLoad = this.onLoad.bind(this);
  }

  //this shouldn't rerender anything
  infiniteLoopPreventionArray = [];

  onLoad(attachmentId, shouldWait) {
    //this sucks, and i really wish there was a way to fix this properly
    //without moving the entire state of every object up
    if(!this.infiniteLoopPreventionArray.includes(attachmentId)) {
      if(!shouldWait) {
        this.props.scrollWorkaround();
      } else {
        setTimeout(this.props.scrollWorkaround, 200);
      }
      this.infiniteLoopPreventionArray.push(attachmentId);
    }
  }

  render() {
    return (
      <ChatContext.Consumer>
        {({attachmentManager}) => (
          <div className="MessageAttachments">
            {this.props.attachments.map((value) => {
              console.log(attachmentManager);
              console.log(value);
              const AttachmentComponent = attachmentManager.attachmentTypes[value.type].component;
              return (
                <div className="MessageAttachments-container">
                  <AttachmentComponent onLoad={(shouldWait) => {this.onLoad(value._id, shouldWait);}} attachment={value}/>
                </div>
              );
            })}
          </div>
        )}
      </ChatContext.Consumer>
    );
  }
}

export default MessageAttachments;