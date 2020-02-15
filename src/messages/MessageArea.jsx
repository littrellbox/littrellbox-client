import React from 'react';
import ChatContext from '../contexts/chatContext';

import './css/MessageArea.css'
import ChannelHeader from './ChannelHeader';

class MessageArea extends React.Component {
  render() {
    console.log("did render");
    return (
      <div className="MessageArea">
        <ChatContext.Consumer>
          {({channel, logout}) => (<div className="MessageArea">
            {channel._id ? (
              <div>
                <ChannelHeader channel={channel}/>
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
    )
  }
}

export default MessageArea