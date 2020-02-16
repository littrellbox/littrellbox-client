import React from 'react';
import axios from 'axios';
import SocketContext from '../contexts/socketContext'
import './css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isRegistering: false,
      username: "",
      password: "",
      email: "",
      inviteCode: "",
      error: "",
    }

    this.switchMode = this.switchMode.bind(this)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changeCode = this.changeCode.bind(this)
  }

  switchMode() {
    this.setState({
      error: "",
      isRegistering: !this.state.isRegistering
    })
  }

  register() {
    if(this.state.username === "") {
      this.setState({
        error: "Username required."
      })
      return;
    } 
    if(this.state.email === "") {
      this.setState({
        error: "Email required."
      })
      return;
    } 
    if(this.state.password === "") {
      this.setState({
        error: "Password required."
      })
      return;
    }

    let registrationObject = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    if(this.props.needsInvite) {
      registrationObject.inviteCode = this.state.inviteCode
    }

    axios.post(`http://localhost:3001/auth/register`, registrationObject).then((response) => {
      window.localStorage.setItem('token', response.data.user.token);
      this.context.emit('authenticate', response.data.user.token);
    }).catch((response) => {
      if(response.toString().indexOf("401") !== -1) {
        this.setState({
          error: "That username is taken."
        })
      } else if (response.toString().indexOf("422") !== -1) {
        this.setState({
          error: "That email is already being used."
        })
      } else if (response.toString().indexOf("403") !== -1) {
        this.setState({
          error: "Invalid invite code."
        })
      } else {
        this.setState({
          error: "An error occured creating your account.\nPlease try again later."
        })
      }
    })
  }

  login() {
    if(this.state.username === "") {
      this.setState({
        error: "Username required."
      })
      return;
    } 
    if(this.state.password === "") {
      this.setState({
        error: "Password required."
      })
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
        this.setState({
          error: "Incorrect username or password."
        })
      } else {
        this.setState({
          error: "An error occured logging into your account.\nPlease try again later."
        })
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

  changeCode(e) {
    this.setState({
      inviteCode: e.target.value
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
        {this.state.error !== "" && <div className="Login-error">{this.state.error}</div>}
        <input type="text" className="Login-textbox" placeholder="Username" value={this.state.username} onChange={this.changeUsername}/>
        {this.state.isRegistering && <input type="text" className="Login-textbox" placeholder="Email" value={this.state.email} onChange={this.changeEmail}/>}
        {this.state.isRegistering && this.props.needsInvite && <input type="text" className="Login-textbox" placeholder="Invite Code" value={this.state.inviteCode} onChange={this.changeCode}/>}
        <input type="password" className="Login-textbox" placeholder="Password" value={this.state.password} onChange={this.changePassword}/>
        <div className="Login-buttons">
          {this.state.isRegistering ? <div className="button inline" onClick={this.register}>
            Register
          </div> : <div className="button inline" onClick={this.login}>
            Login

          </div>}
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