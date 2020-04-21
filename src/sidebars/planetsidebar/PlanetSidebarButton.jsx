import React from 'react';
import './css/PlanetSidebarButton.css';
import SocketContext from '../../contexts/socketContext';

class PlanetSidebarButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.context.emit("openplanet", this.props.planet._id);
  }

  render() {
    return (
      <div className="PlanetSidebarButton" onClick={this.onClick}>
        <div className="PlanetSidebarButton-text">{this.props.planet.name}</div>
      </div>
    );
  }
}

PlanetSidebarButton.contextType = SocketContext;

export default PlanetSidebarButton;