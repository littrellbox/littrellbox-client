import React from 'react';
import SocketContext from '../../contexts/socketContext';
import AuthContext from '../../contexts/authContext';
import ChatContext from '../../contexts/chatContext';

import {Menu, Layout, Popover, Input, Icon} from 'antd';

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

  onClick(item) {
    this.context.emit("openchannel", item.key)
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
            <Layout className="ChannelSidebar">
              <Layout.Header className="ChannelSidebar-header">
                <div className="ChannelSidebar-header-planet">{planet._id ? planet.name : "What?"}</div>
              </Layout.Header>
              <Layout.Content>
                <Menu onClick={(item) => this.onClick(item) } className="ChannelSidebar-channels-list">
                  <Menu.Item key="channels" className="ChannelSidebar-channels-header" disabled={true}>
                    <span>CHANNELS</span>
                    <Popover placement="right" title="Create Planet" content={
                      <Input value={this.state.textboxText} onClick={this.onClick} onKeyDown={this.onKeyDown} onChange={this.setTextboxValue}/>
                    } trigger="click">
                      <span className="ChannelSidebar-channels-header-new" onClick={this.showTextbox}>new</span>
                    </Popover>
                  </Menu.Item>
                  {Object.entries(this.state.channels).map((channel) => (<Menu.Item key={channel[0]}>
                    <span>{channel[1].name}</span>
                  </Menu.Item>))}
                </Menu>
              </Layout.Content>
            </Layout>
          )}
        </ChatContext.Consumer>)}
      </AuthContext.Consumer>
    )
  }
}

ChannelSidebar.contextType = SocketContext;

export default ChannelSidebar;