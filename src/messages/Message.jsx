import React from 'react';
import './css/Message.css';
import MessageText from './MessageText';
import SocketContext from '../contexts/socketContext';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.context.on("updateuser", this.updateUser);

    this.context.emit("subscribetouser", this.props.messages.messages[0].userId);
  }

  updateUser(user) {
    if(user._id === this.props.messages.userId) {
      this.setState({
        user
      });
    }
  }

  render() {
    let timeOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric'};

    return (
      <div className="Message">
        {this.state.user._id && <div className="Message-pfp"/>}
        {this.state.user._id && this.state.user.sessionServers.length >= 1 && <div className="Message-online"/>}
        {this.state.user._id && this.state.user.sessionServers.length === 0 && <div className="Message-offline"/>}
        <div className="Message-container">
          <div className="Message-info-container">
            {this.state.user.username && <div className="Message-username">{this.props.messages.messages[0].username}</div>}
            <div className="Message-date">{new Date(this.props.messages.messages[this.props.messages.messages.length - 1].date).toLocaleDateString(navigator.language, timeOptions)}</div>
          </div>
          {this.props.messages.messages.map((message) => (<MessageText key={message._id} message={message}/>))}
        </div>
      </div>
    );
  }
}

Message.contextType = SocketContext;

export default Message;