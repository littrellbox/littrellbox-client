import React from 'react';
import axios from 'axios';
import SocketContext from '../contexts/socketContext'
import './css/Login.css';

import { message, Button, Input } from 'antd';

class Login extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isRegistering: false,
      username: "",
      password: "",
      email: "",
    }

    this.switchMode = this.switchMode.bind(this)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
  }

  switchMode() {
    this.setState({
      isRegistering: !this.state.isRegistering
    })
  }

  register() {
    if(this.state.username === "") {
      message.error("Username required.")
      return;
    } 
    if(this.state.email === "") {
      message.error("Email required.")
      return;
    } 
    if(this.state.password === "") {
      message.error("Password required.")
      return;
    }
    axios.post(`http://localhost:3001/auth/register`, {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      window.localStorage.setItem('token', response.data.user.token);
      this.context.emit('authenticate', response.data.user.token);
    }).catch((response) => {
      if(response.toString().indexOf("400") !== -1) {
        message.error("That username is taken.")
      } else if (response.toString().indexOf("422") !== -1) {
        message.error("That email is already being used.")
      } else {
        message.error("An error occured creating your account.\nPlease try again later.")
      }
    })
  }

  login() {
    if(this.state.username === "") {
      message.error("Username required.")
      return;
    } 
    if(this.state.password === "") {
      message.error("Password required.")
      return;
    } 
    axios.post(`http://localhost:3001/auth/login`, {
      username: this.state.username,
      password: this.state.password
    }).then((response) => {
      window.localStorage.setItem('token', response.data.user.token);
      this.context.emit('authenticate', response.data.user.token)
    }).catch((response) => {
      if(response.toString().indexOf("400") !== -1) {
        message.error("Incorrect username or password.")
      } else {
        message.error("An error occured logging into your account.\nPlease try again later.")
      }
    })
  }

  changeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  changeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  changePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div className="Login">
        <Input type="text" size="large" className="Login-textbox" placeholder="Username" value={this.state.username} onChange={this.changeUsername}/>
        {this.state.isRegistering && <Input type="text"  size="large" className="Login-textbox" placeholder="Email" value={this.state.email} onChange={this.changeEmail}/>}
        <Input type="password" size="large" className="Login-textbox" placeholder="Password" value={this.state.password} onChange={this.changePassword}/>
        <div className="Login-buttons">
          {this.state.isRegistering ? <Button type="primary" onClick={this.register}>Register</Button> : <Button type="primary" onClick={this.login}>Login</Button>}
          <div className="inline Login-signup-text">
            {this.state.isRegistering ? "Have an account? " : "No account? "}
            <span className="Login-signup-text-span" onClick={this.switchMode}>{this.state.isRegistering ? "Log in!" : "Sign up!"}</span>
          </div>
        </div>
      </div>
    )
  }
}

Login.contextType = SocketContext

export default Login;