import React from 'react';
import socketClient from 'socket.io-client';
import SocketContext from './contexts/socketContext';
import AuthContext from './contexts/authContext';
import ChatContext from './contexts/chatContext';
import './css/App.css';

import AppLoading from './misc/AppLoading'
import Login from './login/Login'
import PlanetSidebar from './sidebars/planetsidebar/PlanetSidebar';
import ChannelSidebar from './sidebars/channelsidebar/ChannelSidebar';

const uri = 'http://localhost:3001'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isConnected: false, 
      hasLoggedIn: false,
      user: {},
      chat: {
        planet: {},
        channel: {},
      }
    }

    //create the socket
    this.socket = socketClient(uri)

    this.logout = this.logout.bind(this)
    this.onConnect = this.onConnect.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    this.forceDeauthentication = this.forceDeauthentication.bind(this)
    this.authentication = this.authentication.bind(this)
    this.setUser = this.setUser.bind(this)
    this.setPlanet = this.setPlanet.bind(this)
  }

  componentDidMount() {
    //hook up connection functions
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);

    this.socket.on("authentication", this.authentication);
    this.socket.on("forcefullydeauth", this.forceDeauthentication);
    this.socket.on("setuser", this.setUser)
    this.socket.on("setplanet", this.setPlanet)
  }

  setPlanet(document) {
    let chat = this.state.chat;
    chat.planet = document;
    this.setState({
      chat: chat
    })
  }

  setUser(document) {
    this.setState({
      user: this.user
    })
  }

  forceDeauthentication() {
    this.user = null;
    this.setState({
      hasLoggedIn: false
    })
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
    if(window.localStorage.getItem('token')) {
      this.socket.emit("authenticate", window.localStorage.getItem("token"))
    }
  }

  onDisconnect() {
    this.setState({
      hasLoggedIn: false,
      isConnected: false
    })
  }

  logout() {
    this.setState({
      hasLoggedIn: false
    })
    this.user = null;
    this.socket.emit("logout")
    window.localStorage.removeItem("token");
  }

  render() {
    return (
      <SocketContext.Provider value={this.socket}> {/* We need this to pass the socket down to child components */}
        <AuthContext.Provider value={this.state.user}>
          <ChatContext.Provider value={this.state.chat}>
            <div className="App">
              {this.state.isConnected && !this.state.hasLoggedIn && <Login/>}
              {!this.state.isConnected && <AppLoading/>}
              {this.state.isConnected && this.state.hasLoggedIn && <div className="App-app">
                <PlanetSidebar/>
                {this.state.chat.planet._id && <ChannelSidebar/>}
                <div onClick={this.logout}>Logout (temp button)</div>  
              </div>}
            </div>
          </ChatContext.Provider>
        </AuthContext.Provider>
      </SocketContext.Provider>
    )
  }
}

export default App;
