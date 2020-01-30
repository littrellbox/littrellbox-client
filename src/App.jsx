import React from 'react';
import socketClient from 'socket.io-client'
import SocketContext from './contexts/socketContext'

import './css/App.css';

import AppLoading from './misc/AppLoading'
import Login from './login/Login'

const uri = 'http://localhost:3001'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isConnected: false,
    }

    //create the socket
    this.socket = socketClient(uri)

    this.onConnect = this.onConnect.bind(this)
    this.onDisconnect = this.onConnect.bind(this)
  }

  componentDidMount() {
    //hook up connection functions
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);
  }

  onConnect() {
    this.setState({
      isConnected: true
    })
  }

  onDisconnect() {
    this.setState({
      isConnected: false
    })
  }

  render() {
    return (
      <SocketContext.Provider value={this.socket}> {/* We need this to pass the socket down to child components */}
        <div className="App">
          <Login/>
          {!this.state.isConnected && <AppLoading/>}
        </div>
      </SocketContext.Provider>
    )
  }
}

export default App;
