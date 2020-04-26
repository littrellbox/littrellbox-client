import React from 'react';
import './css/MOTD.css';
import SocketContext from '../contexts/socketContext';
import ReactMarkdown from 'react-markdown';

class MOTD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      planet: null,
      MOTD: ""
    };

    this.close = this.close.bind(this);
    this.recvMOTD = this.recvMOTD.bind(this);
  }

  componentDidMount() {
    this.context.on("recvmotd", this.recvMOTD);
  }

  recvMOTD(MOTD) {
    this.setState({
      MOTD
    });
  }

  close() {
    this.setState({
      MOTD: ""
    });
  }

  render() {
    return (
      <div>
        {this.state.MOTD !== "" && <div className="fullscreen-close-semi" onClick={this.close}/>}
        {this.state.MOTD !== "" && <div className="MOTD">
          <div>
            <div className="MOTD-header">MESSAGE OF THE DAY</div>
            <ReactMarkdown className="MOTD-markdown" source={this.state.MOTD}/>
            <div className="MOTD-close button" onClick={this.close}>Close</div>
          </div>
        </div>}
      </div>
    );
  }
}

MOTD.contextType = SocketContext;

export default MOTD;