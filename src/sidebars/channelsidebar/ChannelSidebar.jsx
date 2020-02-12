import React from 'react';
import SocketContext from '../../contexts/socketContext';
import AuthContext from '../../contexts/authContext';
import ChatContext from '../../contexts/chatContext';
import ChannelSidebarButton from './ChannelSidebarButton';

import './css/ChannelSidebar.css'

class ChannelSidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showingTextbox: false,
      textboxText: "",
      channels: {}
    }

    this.onKeyDown = this.onKeyDown.bind(this);
    this.setTextboxValue = this.setTextboxValue.bind(this);
    this.showTextbox = this.showTextbox.bind(this);
    this.updateChannel = this.updateChannel.bind(this);
  }

  componentDidMount() {
    this.context.on('updatechannel', this.updateChannel);
    this.setState({
      channels: {}
    })
    this.context.emit('getallchannels', this.props.planetId)
  }

  componentDidUpdate(prevProps) {
    if(this.props.planetId !== prevProps.planetId) {
      this.setState({
        channels: {}
      })
      this.context.emit('getallchannels', this.props.planetId)
    }
  }

  onKeyDown(e, planet) {
    if(e.key === "Enter") {
      this.context.emit('createchannel', this.state.textboxText, planet._id);
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

  updateChannel(channelId, channel) {
    let channelArray = this.state.channels;
    channelArray[channelId] = channel;
    this.setState({
      channel: channelArray
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
                  <input type="text" className={this.state.showingTextbox ? "ChannelSidebar-channels-header-textbox" : "ChannelSidebar-channels-header-textbox-ia"} value={this.state.textboxText} onKeyDown={(e) => this.onKeyDown(e, planet)} onChange={this.setTextboxValue}/>
                  <span>channels</span>
                  <span className="ChannelSidebar-channels-header-new" onClick={this.showTextbox}>new</span>
                </div>
                <div className="ChannelSidebar-channels-list">
                  {Object.entries(this.state.channels).map((channel) => (<ChannelSidebarButton key={channel[0]} channel={channel[1]}/>))}
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