import React from 'react';
import ChatContext from '../contexts/chatContext';

import './css/MessageArea.css';
import ChannelHeader from './ChannelHeader';
import MessageTextbox from './MessageTextbox';
import MessageList from './MessageList';

class MessageArea extends React.Component {
  render() {
    console.log("did render");
    return (
      <div className="MessageArea">
        <ChatContext.Consumer>
          {({channel, logout, attachmentManager}) => (<div className="MessageArea">
            {channel._id ? (
              <div className="MessageArea-channel">
                <ChannelHeader channel={channel}/>
                <MessageList channelId={channel._id} attachmentManager={attachmentManager} allowMessages={this.props.allowMessages}/>
                <MessageTextbox/>
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

export default MessageArea;