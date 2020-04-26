import React from 'react';
import ChatContext from '../contexts/chatContext';

import './css/MessageArea.css';
import ChannelHeader from './ChannelHeader';
import MessageTextbox from './MessageTextbox';
import MessageList from './MessageList';
import SocketContext from "../contexts/socketContext";

class MessageArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      predictions: []
    };

    this.addPrediction = this.addPrediction.bind(this);
    this.removePrediction = this.removePrediction.bind(this);
  }

  componentDidMount() {
    this.context.on("msgpredictionsuccess", this.removePrediction);
  };

  addPrediction(id, text, attachments) {
    let updateObject = this.state.predictions;
    updateObject[id] = {
      _id: id,
      content: text,
      attachments: attachments
    };
    console.log(attachments);
    this.setState({
      predictions: updateObject
    });
  }

  removePrediction(id, messageId) {
    let updateObject = this.state.predictions;
    console.log(updateObject[id]);
    if(updateObject[id]) {
      this.props.attachmentManager.submitAttachments(updateObject[id].attachments, messageId);
      delete updateObject[id];
      this.setState({
        predictions: updateObject
      });
    }
  }

  render() {
    return (
      <div className="MessageArea">
        <ChatContext.Consumer>
          {({channel, logout, attachmentManager}) => (<div className="MessageArea">
            {channel._id ? (
              <div className="MessageArea-channel">
                <ChannelHeader channel={channel}/>
                <MessageList
                  channelId={channel._id}
                  attachmentManager={attachmentManager}
                  allowMessages={this.props.allowMessages}
                  predictions={this.state.predictions}
                />
                <MessageTextbox channel={channel} addPrediction={this.addPrediction}/>
              </div>
            ) : (
              <div>
                no channel
                <div onClick={logout}>Logout (temp button)</div>
              </div>
            )}
          </div>)}
        </ChatContext.Consumer>
      </div>
    );
  }
}

MessageArea.contextType = SocketContext;

export default MessageArea;