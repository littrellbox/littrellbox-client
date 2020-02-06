import React, { useImperativeHandle } from 'react';
import socketClient from 'socket.io-client';
import SocketContext from './contexts/socketContext';
import AuthContext from './contexts/authContext'
import './css/App.css';

import AppLoading from './misc/AppLoading'
import Login from './login/Login'

const uri = 'http://localhost:3001'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isConnected: false, 
      hasLoggedIn: false
    }

    this.user = {}

    //create the socket
    this.socket = socketClient(uri)

    this.onConnect = this.onConnect.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    this.authentication = this.authentication.bind(this)
  }

  componentDidMount() {
    //hook up connection functions
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);
    
    this.socket.on("authentication", this.authentication);

    if(window.localStorage.getItem('token')) {
      this.socket.emit("authenticate", window.localStorage.getItem("token"))
    }
  }

  authentication(user) {
    this.user = user;
    this.setState({
      hasLoggedIn: true
    })
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
        <AuthContext.Provider value={this.user}>
          <div className="App">
            {this.state.isConnected && !this.state.hasLoggedIn && <Login/>}
            {!this.state.isConnected && <AppLoading/>}
          </div>
        </AuthContext.Provider>
      </SocketContext.Provider>
    )
  }
}

export default App;
