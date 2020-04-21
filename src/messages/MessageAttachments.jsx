import React from 'react';
import './css/MessageAttachments.css';
import ChatContext from "../contexts/chatContext";

class MessageAttachments extends React.Component {
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
                  <AttachmentComponent attachment={value}/>
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