import React from 'react';

import './css/Message.css'

class Message extends React.Component {
  render() {
    let timeOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric'};

    return (
      <div className="Message">
        <div className="Message-pfp"/>
        <div className="Message-container">
          <div className="Message-info-container">
            <div className="Message-username">{this.props.message.username}</div>
            <div className="Message-date">{new Date(this.props.message.date).toLocaleDateString(navigator.language, timeOptions)}</div>
          </div>
          <div className="Message-content">{this.props.message.content}</div>
        </div>
      </div>
    )
  }
}

export default Message