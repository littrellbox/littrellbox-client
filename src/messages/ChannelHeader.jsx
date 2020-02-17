import React from 'react'
import './css/ChannelHeader.css'

class ChannelHeader extends React.Component {
  render() {
    return (
      <div className="ChannelHeader">
        <div className="ChannelHeader-text">
          <div className="ChannelHeader-name">{this.props.channel.name}</div>
          <div className="ChannelHeader-topic">(no topic)</div>
        </div>
      </div>
    )
  }
}

export default ChannelHeader