import React from 'react';
import SocketContext from '../../contexts/socketContext';
import AuthContext from '../../contexts/authContext';
import ChatContext from '../../contexts/chatContext';

import './css/ChannelSidebar.css'

class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showingTextbox: false,
      textboxText: ""
    }

    this.onKeyDown = this.onKeyDown.bind(this);
    this.setTextboxValue = this.setTextboxValue.bind(this);
    this.showTextbox = this.showTextbox.bind(this);
  }

  onKeyDown(e, planet) {
    if(e.key === "Enter") {
      this.context.emit('createchannel', planet, this.state.textboxText);
      this.setState({
        textboxText: "",
        showingTextbox: false,
      })
    }
    if(e.key === "Escape") {
      this.setState({
        textboxText: "",
        showingTextbox: false,
      })
    }
  }

  setTextboxValue(e) {
    this.setState({
      textboxText: e.target.value
    })
  }

  showTextbox() {
    this.setState({
      showingTextbox: !this.state.showingTextbox
    })
  }

  render() {
    return (
      <AuthContext.Consumer>
        {(user) => (<ChatContext.Consumer>
          {({planet}) => (
            <div className="ChannelSidebar">
              <div className="ChannelSidebar-header">
                <div className="ChannelSidebar-header-planet">{planet._id ? planet.name : "What?"}</div>
                <div className="ChannelSidebar-header-user">{planet._id ? user.username : "No planet selected"}</div>
              </div>
              <div className="ChannelSidebar-header-decoration">
                <div className="ChannelSidebar-header-rounder"/>
              </div>
              <div className="ChannelSidebar-channels">
                <div className="ChannelSidebar-channels-header">
                  {this.state.showingTextbox && <div className="fullscreen-close" onClick={this.showTextbox}/>}
                  <input type="text" className={this.state.showingTextbox ? "ChannelSidebar-channels-header-textbox" : "ChannelSidebar-channels-header-textbox-ia"} value={this.state.textboxText} onKeyDown={this.onKeyDown} onChange={this.setTextboxValue}/>
                  <span>channels</span>
                  <span className="ChannelSidebar-channels-header-new" onClick={this.showTextbox}>new</span>
                </div>
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