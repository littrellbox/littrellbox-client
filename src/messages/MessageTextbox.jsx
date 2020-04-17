import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import './css/MessageTextbox.css';
import 'emoji-mart/css/emoji-mart.css';
import ChatContext from '../contexts/chatContext';
import SocketContext from '../contexts/socketContext';
import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import MessageTextboxAttachments from "./MessageTextboxAttachments";

class MessageTextbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textboxText: "",
      shiftKeyDown: false,
      showPicker: false,
      attachments: [],
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

  handleKeyPress(e, channel, attachmentManager) {
    if (e.key === 'Enter' && !this.state.shiftKeyDown) {e.preventDefault();}
    if (e.key === 'Enter' && !this.state.shiftKeyDown && this.state.textboxText !== "") {
      let predictionId = Math.floor(Math.random() * 10000000000);
      this.context.emit("sendmessage", this.state.textboxText, channel, predictionId.toString());
      this.props.addPrediction(predictionId.toString(), this.state.textboxText, attachmentManager.attachments);
      attachmentManager.clearAttachments();
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

  fileDialogOnChange(e, attachmentManager) {
    console.log("a");
    console.log(e.target.files);
    for(let i = 0; i < e.target.files.length; i++) {
      console.log("b");
      let attachmentObject = {
        type: "file",
        name: e.target.files[i].name,
        data: e.target.files[i]
      };
      attachmentManager.addAttachmentToArray(attachmentObject);
    }
  }

  render() {
    return (
      <ChatContext.Consumer>
        {({channel, attachmentManager}) => {
          return (
            <div className="MessageTextbox">
              <div className="MessageTextbox-container">
                <TextareaAutosize
                  className="MessageTextbox-textbox"
                  rows="1"
                  tabIndex="1"
                  placeholder={"Message #" + channel.name}
                  value={this.state.textboxText}
                  onChange={this.onChange}
                  onKeyDown={this.handleKeyDown}
                  onKeyUp={this.handleKeyUp}
                  onKeyPress={(e) => this.handleKeyPress(e, channel._id, attachmentManager)}
                />
                {this.state.showPicker && <div className="fullscreen-close" onClick={this.showPicker}/>}
                <input type="file" onChange={(e) => {this.fileDialogOnChange(e, attachmentManager);}} ref={this.fileDialog} style={{display: "none"}}/>
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
              <div className={"MessageTextbox-attachments"}>
                <MessageTextboxAttachments attachmentManager={attachmentManager}/>
              </div>
            </div>
          );
        }}
      </ChatContext.Consumer>
    ); 
  }
}

MessageTextbox.contextType = SocketContext;

export default MessageTextbox;
