import React from 'react';
import socketClient from 'socket.io-client';
import SocketContext from './contexts/socketContext';
import AuthContext from './contexts/authContext';
import ChatContext from './contexts/chatContext';
import './css/App.css';

import AppLoading from './misc/AppLoading';
import Login from './login/Login';
import Invite from './misc/Invite';
import PlanetSidebar from './sidebars/planetsidebar/PlanetSidebar';
import ChannelSidebar from './sidebars/channelsidebar/ChannelSidebar';
import MessageArea from './messages/MessageArea';
import InfoContext from './contexts/infoContext';
import MOTD from './misc/MOTD';
import AttachmentManager from "./managers/AttachmentManager";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false, 
      hasLoggedIn: false,
      user: {},
      chat: {
        planet: {},
        channel: {},
        attachmentManager: new AttachmentManager(),
        logout: this.logout.bind(this)
      },
      info: {},
      inviteId: "",
      allowPlanets: false,
      allowChannels: false,
      allowMessages: false,
    };

    //create the socket
    this.socket = socketClient(window.serverURL);

    this.logout = this.logout.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.forceDeauthentication = this.forceDeauthentication.bind(this);
    this.authentication = this.authentication.bind(this);
    this.logout = this.logout.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setPlanet = this.setPlanet.bind(this);
    this.setChannel = this.setChannel.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.closeInvite = this.closeInvite.bind(this);
    this.allowMessages = this.allowMessages.bind(this);
    this.allowChannels = this.allowChannels.bind(this);
    this.allowPlanets = this.allowPlanets.bind(this);
  }

  componentDidMount() {
    //hook up connection functions
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);

    this.socket.on("authentication", this.authentication);
    this.socket.on("forcefullydeauth", this.forceDeauthentication);
    this.socket.on("setuser", this.setUser);
    this.socket.on("setplanet", this.setPlanet);
    this.socket.on("setchannel", this.setChannel);
    this.socket.on("setinfo", this.setInfo);

    this.socket.on("acceptingPlanets", this.allowPlanets);
    this.socket.on("acceptingChannels", this.allowChannels);
    this.socket.on("acceptingMessages", this.allowMessages);

    //check if we've got an invite
    if(window.location.toString().indexOf("invite") !== -1) {
      let splitLocation = window.location.toString().split("/");
      this.setState({
        inviteId: splitLocation[splitLocation.length - 1]
      });
    }
  }

  setInfo(info) {
    info.clientVersion = "0.0.3a-preview";
    this.setState({
      info: info
    });
  }

  setChannel(document) {
    let chat = this.state.chat;
    chat.channel = document;
    this.setState({
      chat: chat
    });
  }

  setPlanet(document) {
    let chat = this.state.chat;
    chat.planet = document;
    chat.channel = {};
    this.setState({
      chat: chat
    });
  }

  setUser(document) {
    this.setState({
      user: document
    });
  }

  forceDeauthentication() {
    this.user = null;
    this.setState({
      hasLoggedIn: false
    });
  }

  authentication(user) {
    this.user = user;
    this.setState({
      hasLoggedIn: true
    });
  }

  onConnect() {
    this.setState({
      isConnected: true
    });
    this.socket.emit("getinfo");
    if(window.localStorage.getItem('token')) {
      this.socket.emit("authenticate", window.localStorage.getItem("token"));
    }
  }

  onDisconnect() {
    this.setState({
      hasLoggedIn: false,
      isConnected: false,
      allowPlanets: false,
      allowChannels: false,
      allowMessages: false,
      chat: {
        planet: {},
        channel: {},
        attachmentManager: new AttachmentManager(),
        logout: this.logout.bind(this)
      }
    });
    if(this.socket.io.connecting.indexOf(this.socket) === -1){
      //you should renew token or do another important things before reconnecting
      this.socket.connect();
    }
  }

  logout() {
    this.setState({
      hasLoggedIn: false,
      allowPlanets: false,
      allowChannels: false,
      allowMessages: false
    });
    this.user = null;
    this.socket.emit("logout");
    window.localStorage.removeItem("token");
  }

  closeInvite() {
    this.setState({
      inviteId: ""
    });
  }

  allowPlanets() {
    this.setState({
      allowPlanets: true
    });
    this.socket.emit("getmotd");
  }

  allowChannels() {
    this.setState({
      allowChannels: true
    });
  }

  allowMessages() {
    this.setState({
      allowMessages: true
    });
  }

  render() {
    return (
      <SocketContext.Provider value={this.socket}> {/* We need this to pass the socket down to child components */}
        <AuthContext.Provider value={this.state.user}>
          <ChatContext.Provider value={this.state.chat}>
            <InfoContext.Provider value={this.state.info}>
              <div className="App">
                {this.state.isConnected && !this.state.hasLoggedIn && <Login needsInvite={this.state.info.inviteCodeReq}/>}
                {!this.state.isConnected && <AppLoading/>}
                {this.state.isConnected && this.state.hasLoggedIn && <div className="App-app">
                  <PlanetSidebar allowPlanets={this.state.allowPlanets}/>
                  {this.state.inviteId === "" && <MOTD/>}
                  {this.state.inviteId !== "" && this.state.allowPlanets && <Invite id={this.state.inviteId} close={this.closeInvite}/>} 
                  {this.state.chat.planet._id && <ChannelSidebar allowChannels={this.state.allowChannels} planetId={this.state.chat.planet._id}/>}
                  <MessageArea allowMessages={this.state.allowMessages}/>  
                </div>}
              </div>
            </InfoContext.Provider>
          </ChatContext.Provider>
        </AuthContext.Provider>
      </SocketContext.Provider>
    );
  }
}

export default App;
