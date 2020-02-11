import React from 'react';
import SocketContext from '../../contexts/socketContext';
import AuthContext from '../../contexts/authContext';
import ChatContext from '../../contexts/chatContext';

import './css/ChannelSidebar.css'

class ChannelSidebar extends React.Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(user) => (<ChatContext.Consumer>
          {({planet}) => (
            <div className="ChannelSidebar">
              <div className="ChannelSidebar-header">
                <div className="ChannelSidebar-header-planet">{planet.name}</div>
                <div className="ChannelSidebar-header-user">{user.username}</div>
              </div>
              <div className="ChannelSidebar-header-decoration">
                <div className="ChannelSidebar-header-rounder"/>
              </div>
            </div>
          )}
        </ChatContext.Consumer>)}
      </AuthContext.Consumer>
    )
  }
}

ChannelSidebar.contextType = SocketContext;

export default ChannelSidebar;