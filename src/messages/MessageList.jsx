import React from 'react';
import './css/MessageList.css'
import SocketContext from '../contexts/socketContext';
import Message from './Message';
import ScrollableFeed from 'react-scrollable-feed'

class MessageList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: {}
    }
    
    this.updateMessage = this.updateMessage.bind(this);
  }
  
  componentDidMount() {
    this.context.emit("getmessages", this.props.channelId);
    this.context.on("updatemessage", this.updateMessage)
  }

  componentDidUpdate(prevProps) {
    if(this.props.channelId !== prevProps.channelId) {
      this.setState({
        messages: {}
      })
      this.context.emit("getmessages", this.props.channelId);
    }
  }

  updateMessage(messageId, message) {
    let messages = this.state.messages
    messages[messageId] = message
    if(messages.length > 50) {
      delete messages[Object.keys(messages)[0]]
    }
    this.setState({
      messages
    })
  }

  render() {
    return (
      <ScrollableFeed className="MessageList">
          {Object.entries(this.state.messages).map((message) => (<Message key={message[0]} message={message[1]}/>))}
          {/*<div className="MessageList">
            {Object.entries(this.state.messages).map((message) => (<Message key={message[0]} message={message[1]}/>))}
          </div>*/}
        </ScrollableFeed>
    )
  }
}

MessageList.contextType = SocketContext;

export default MessageList