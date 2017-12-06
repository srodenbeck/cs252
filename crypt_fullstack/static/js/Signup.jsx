import React, { Component } from 'react';
var $ = require('jquery');

class Signup extends Component{

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      fName: '',
      lName: '',
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFNameChange = this.handleFNameChange.bind(this);
    this.handleLNameChange = this.handleLNameChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleUserChange(event) {
    this.setState({user: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleFNameChange(event) {
    this.setState({fname: event.target.value});
  }
  handleLNameChange(event) {
    this.setState({lname: event.target.value});
  }

  handleSignup() {
    const url = window.location.href + 'signup';
    $.post(url, {arg1: this.state.user, arg2: this.state.password}, (data) => {
      console.log(data);
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <form onSubmit={this.handleSignup}>
            <div className="form-group">
              <label>User</label>
              <input className="form-control" placeholder="User" value={this.state.user} onChange={this.handleUserChange}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup;
