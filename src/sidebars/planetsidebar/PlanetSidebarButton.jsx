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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(this.props !== nextProps) {
      return true;
    }
  }

  render() {
    let text = "";
    if(this.props.planet) {
      let textsplit = this.props.planet.name.split(" ");
      textsplit.forEach(element => {
        text = text + element.substring(0,1);
      });
    }

    return (
      <div className="PlanetSidebarButton" onClick={this.onClick}>
        <div className="PlanetSidebarButton-text">{text}</div>
      </div>
    );
  }
}

PlanetSidebarButton.contextType = SocketContext;

export default PlanetSidebarButton;