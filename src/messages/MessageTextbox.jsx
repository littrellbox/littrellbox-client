import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './css/MessageTextbox.css'
import ChatContext from '../contexts/chatContext';
import SocketContext from '../contexts/socketContext';

class MessageTextbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textboxText: "",
      shiftKeyDown: false,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleKeyPress(e, channel) {
    if (e.key === 'Enter' && !this.state.shiftKeyDown)
      e.preventDefault();
    if (e.key === 'Enter' && !this.state.shiftKeyDown && this.state.textboxText !== "") {
      this.context.emit("sendmessage", this.state.textboxText, channel)
      this.setState({textboxText: ""})
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Shift') {
      this.setState({shiftKeyDown: true})
    }
  }

  handleKeyUp(e) {
    if (e.key === 'Shift') {
      this.setState({shiftKeyDown: false})
    }
  }

  onChange(e) {
    this.setState({textboxText: e.target.value});
  }

  render() {
    return (
      <ChatContext.Consumer>
        {({channel}) => {
          return (
            <div className="MessageTextbox">
              <TextareaAutosize 
                className="MessageTextbox-textbox" 
                rows="1" 
                tabIndex="1" 
                placeholder={"Message #" + channel.name} 
                value={this.state.textboxText} 
                onChange={this.onChange}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onKeyPress={(e) => this.handleKeyPress(e, channel._id)}
              />
            </div>
          )
        }}
      </ChatContext.Consumer>
    ) 
  }
}

MessageTextbox.contextType = SocketContext;

export default MessageTextbox