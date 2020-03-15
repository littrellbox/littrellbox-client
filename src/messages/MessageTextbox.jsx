import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './css/MessageTextbox.css';
import 'emoji-mart/css/emoji-mart.css';
import ChatContext from '../contexts/chatContext';
import SocketContext from '../contexts/socketContext';
import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPaperclip } from '@fortawesome/free-solid-svg-icons';

class MessageTextbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textboxText: "",
      shiftKeyDown: false,
      showPicker: false
    };

    this.fileDialog = React.createRef();
   
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.showPicker = this.showPicker.bind(this);
    this.openFileDialog = this.openFileDialog.bind(this);
    this.fileDialogOnChange = this.fileDialogOnChange.bind(this);
  }

  handleKeyPress(e, channel) {
    if (e.key === 'Enter' && !this.state.shiftKeyDown) {e.preventDefault();}
    if (e.key === 'Enter' && !this.state.shiftKeyDown && this.state.textboxText !== "") {
      this.context.emit("sendmessage", this.state.textboxText, channel);
      this.setState({textboxText: ""});
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Shift') {
      this.setState({shiftKeyDown: true});
    }
  }

  handleKeyUp(e) {
    if (e.key === 'Shift') {
      this.setState({shiftKeyDown: false});
    }
  }

  onChange(e) {
    this.setState({textboxText: e.target.value});
  }

  onSelect(emoji) {
    console.log(emoji.id);
    this.setState({
      textboxText: this.state.textboxText + " :" + emoji.id + ":"
    });
  }

  showPicker() {
    this.setState({
      showPicker: !this.state.showPicker
    });
  }

  openFileDialog() {
    this.fileDialog.current.click();
  }

  fileDialogOnChange(e) {

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
              {this.state.showPicker && <div className="fullscreen-close" onClick={this.showPicker}/>}
              <input type="file" onClick={this.fileDialogOnChange} ref={this.fileDialog} style={{display: "none"}}/>
              <div className="MessageTextbox-picker-button" onClick={this.showPicker}><FontAwesomeIcon className="MessageTextbox-picker-button" icon={faSmile}/></div>
              <div className="MessageTextbox-attachment-button" onClick={this.openFileDialog}><FontAwesomeIcon className="MessageTextbox-attachment-button-icon" icon={faPaperclip}/></div>
              {this.state.showPicker && <Picker
                style={{
                  position: "absolute",
                  top: '-23rem',
                  right: '0rem',
                  zIndex: 10
                }}
                set="twitter"
                showPreview={false}
                onSelect={this.onSelect}
              />}
            </div>
          );
        }}
      </ChatContext.Consumer>
    ); 
  }
}

MessageTextbox.contextType = SocketContext;

export default MessageTextbox;
