import React from 'react';
//import React, { Component } from 'react';
import Translate from './Translate';
//import Email from './Email';

export default class App extends React.Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <h1>Welcome to CryptWalk!</h1>
      </header>
      <nav className='navbar navbar-inverse'>
        <ul className="nav navbar-nav">
          <li className="active"><a data-toggle="tab" href="#translate">Encryption/Decryption</a></li>
        </ul>
      </nav>

      <div className="tab-content container">
        <div id="translate" className="tab-pane fade in active">
          <Translate/>
        </div>
      </div>
    </div>)
  }
}
