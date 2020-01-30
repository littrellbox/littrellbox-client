import React from 'react';
import axios from 'axios';
import './css/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isRegistering: false,
      username: "",
      password: "",
      email: ""
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
    if(this.state.username === "" || this.state.password === "") {
      return //TODO: make warnings
    } 
    axios.post(`http://localhost:3001/auth/register`, {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then((response) => {
      console.log(response)
    })
  }

  login() {
    if(this.state.username === "" || this.state.password === "") {
      return //TODO: make warnings
    } 
    axios.post(`http://localhost:3001/auth/login`, {
      username: this.state.username,
      password: this.state.password
    }).then((response) => {
      console.log(response)
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
        <input type="text" className="Login-textbox" placeholder="Username" value={this.state.username} onChange={this.changeUsername}/>
        {this.state.isRegistering && <input type="text" className="Login-textbox" placeholder="Email" value={this.state.email} onChange={this.changeEmail}/>}
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

export default Login;