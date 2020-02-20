import React from 'react';
import './css/Message.css';
import MessageText from './MessageText';

class Message extends React.Component {
  render() {
    let timeOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric'};

    return (
      <div className="Message">
        <div className="Message-pfp"/>
        <div className="Message-container">
          <div className="Message-info-container">
            <div className="Message-username">{this.props.messages.messages[0].username}</div>
            <div className="Message-date">{new Date(this.props.messages.messages[this.props.messages.messages.length - 1].date).toLocaleDateString(navigator.language, timeOptions)}</div>
          </div>
          {this.props.messages.messages.map((message) => (<MessageText key={message._id} message={message}/>))}
        </div>
      </div>
    );
  }
}

export default Message;