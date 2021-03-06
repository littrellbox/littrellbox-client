import React from 'react';
import './css/ChannelSidebarButton.css';
import SocketContext from '../../contexts/socketContext';

class ChannelSidebarButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() { 
    this.context.emit('unsubscribefromallusers');
    this.context.emit("openchannel", this.props.channel._id);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.props !== nextProps) {
      return true;
    }
  }

  render() {
    return (
      <div className="ChannelSidebarButton" onClick={this.onClick}>
        {this.props.channel.name}
      </div>
    );
  }
}

ChannelSidebarButton.contextType = SocketContext;

export default ChannelSidebarButton;