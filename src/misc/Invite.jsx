import React from 'react';
import './css/Invite.css';
import SocketContext from '../contexts/socketContext';

class Invite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      planet: null
    };

    this.setInvitePlanet = this.setInvitePlanet.bind(this);
    this.joinPlanet = this.joinPlanet.bind(this);
  }

  componentDidMount() {
    this.context.on("setinviteplanet", this.setInvitePlanet);

    this.context.emit("getinviteplanet", this.props.id);
  }

  setInvitePlanet(planet) {
    if(planet) {
      this.setState({
        planet: planet[0]
      });
    } else {
      this.props.close();
    }
  }

  joinPlanet() {
    this.context.emit("joinplanet", this.state.planet._id, this.props.id);
    this.props.close();
  }

  render() {
    return (
      <div>
        <div className="fullscreen-close-semi" onClick={this.props.close}/>
        <div className="Invite">
          {this.state.planet && <div>
            <div className="Invite-header">You've been invited to</div>
            <div className="Invite-planet">{this.state.planet.name}</div>
            <div className="Invite-join button" onClick={this.joinPlanet}>Join</div>
          </div>}
        </div>
      </div>
    );
  }
}

Invite.contextType = SocketContext;

export default Invite;