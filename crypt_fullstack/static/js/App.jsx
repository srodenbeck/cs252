import React from 'react';
//import React, { Component } from 'react';
import Translate from './Translate';
//import Email from './Email';

export default class App extends React.Component {
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
        <ul class="nav navbar-nav navbar-right">
          <li><a data-toggle="modal" data-target="#signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          {/* <li><a href="#login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li> */}
        </ul>
      </nav>

      <div className="tab-content container">
        <div id="translate" className="tab-pane fade in active">
          <Translate/>
        </div>
      </div>

      {/* <div className="modal fade" id="signup" role="dialog">
        <div className="modal-dialog">


          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Modal Header</h4>
            </div>
            <div className="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> */}

    </div>)
  }
}
