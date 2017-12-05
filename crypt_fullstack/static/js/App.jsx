import React from 'react';
//import React, { Component } from 'react';
import Translate from './Translate';
import Login from './Login';
import SignUp from './Signup';
import Modal from 'react-responsive-modal';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openLoginModal: false,
      openSigninModal: false,
    }
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.handleCloseSigninModal = this.handleCloseSigninModal.bind(this);
  }

  handleCloseLoginModal() {
    this.setState({openLoginModal: !this.state.openLoginModal})
  }
  handleCloseSigninModal() {
    this.setState({openSigninModal: !this.state.openSigninModal})
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CryptWalk!</h1>
      </header>
      <nav className='navbar navbar-inverse'>
        <ul className="nav navbar-nav">
          <li className="active"><a data-toggle="tab" href="#translate">Encryption/Decryption</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a onClick={this.handleCloseSigninModal}><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a onClick={this.handleCloseLoginModal}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
      </nav>

      <div className="tab-content container">
        <div id="translate" className="tab-pane fade in active">
          <Translate/>
        </div>
      </div>
      <Modal open={this.state.openLoginModal} onClose={this.handleCloseLoginModal} closeOnEsc={false} little>
          <Login />
      </Modal>
      <Modal open={this.state.openSigninModal} onClose={this.handleCloseSigninModal} closeOnEsc={false} little>
          <SignUp />
      </Modal>
    </div>
    )
  }

}
