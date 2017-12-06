import React, { Component } from 'react';
var $ = require('jquery');

class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }

  handleUserChange(event) {
    this.setState({user: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleLogin() {
    const url = window.location.href + 'login';
    $.get(url, {arg1: this.state.user, arg2: this.state.password}, (data) => {
      console.log(data);
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <form onSubmit={this.handleLogin}>
            <div className="form-group">
              <label>User</label>
              <input className="form-control" placeholder="User" value={this.state.user} onChange={this.handleUserChange}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
