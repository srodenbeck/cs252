import React, { Component } from 'react';

class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserChange(event) {
    this.setState({user: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <form>
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
