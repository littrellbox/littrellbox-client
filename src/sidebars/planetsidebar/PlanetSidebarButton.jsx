import React from 'react'
import './css/PlanetSidebarButton.css'
import SocketContext from '../../contexts/socketContext'
import { Avatar } from 'antd';

class PlanetSidebarButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.context.emit("openplanet", this.props.planet._id)
  }

  render() {
    return (
      <Avatar shape="square" className="PlanetSidebarButton" onClick={this.onClick}>
        {this.props.planet.name}
      </Avatar>
    )
  }
}

PlanetSidebarButton.contextType = SocketContext

export default PlanetSidebarButton