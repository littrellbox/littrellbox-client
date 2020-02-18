import React from 'react';
import './css/MessageList.css'
import SocketContext from '../contexts/socketContext';
import Message from './Message';
import ScrollableFeed from 'react-scrollable-feed'

class MessageList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      messageCount: 0
    }
    
    this.recvBatchMessages = this.recvBatchMessages.bind(this);
    this.recvMessage = this.recvMessage.bind(this);
  }
  
  componentDidMount() {
    this.context.on("recvbatchmessage", this.recvBatchMessages)
    this.context.on("updatemessage", this.recvMessage)
    this.context.emit("getmessages", this.props.channelId);
  }

  componentDidUpdate(prevProps) {
    if(this.props.channelId !== prevProps.channelId) {
      this.setState({
        messages: {}
      })
      this.context.emit("getmessages", this.props.channelId);
    }
  }

  recvBatchMessages(messages) {
    let messagesArray = this.state.messages
    let messageCount = this.state.messageCount
    messages.forEach(message => {
      if(messagesArray[0] && messagesArray[messagesArray.length - 1].userId == message.userId) {
        messagesArray[messagesArray.length - 1].messages.push(message)
      } else {
        //create new message object
        messagesArray.push({
          key: Math.round(Math.random() * 1000000000).toString(),
          userId: message.userId,
          messages: [message]
        })
      }
      messageCount++
      if(messageCount > 50) {
        messagesArray[0].messages.shift()
        if(messagesArray[0].messages.length === 0) {
          messagesArray.shift()
        } 
        messageCount--
      }
    });
    this.setState({
      messages: messagesArray,
      messageCount
    })
  }

  recvMessage(messageId, message) {
    let messagesArray = this.state.messages
    let messageCount = this.state.messageCount
    if(messagesArray[0] && messagesArray[messagesArray.length - 1].userId == message.userId) {
      messagesArray[messagesArray.length - 1].messages.push(message)
    } else {
      //create new message object
      messagesArray.push({
        key: Math.round(Math.random() * 1000000000).toString(),
        userId: message.userId,
        messages: [message]
      })
    }
    messageCount++
    if(messageCount > 50) {
      messagesArray[0].messages.shift()
      if(messagesArray[0].messages.length === 0) {
        messagesArray.shift()
      } 
      messageCount--
    }
    this.setState({
      messages: messagesArray,
      messageCount
    })
  }

  render() {
    return (
      <ScrollableFeed className="MessageList">
          {this.state.messages.map((messages) => (<Message key={messages.key} messages={messages}/>))}
          {/*<div className="MessageList">
            {Object.entries(this.state.messages).map((message) => (<Message key={message[0]} message={message[1]}/>))}
          </div>*/}
        </ScrollableFeed>
    )
  }
}

MessageList.contextType = SocketContext;

export default MessageList