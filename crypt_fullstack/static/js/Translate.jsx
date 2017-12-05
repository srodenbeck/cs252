import React, { Component } from 'react';

var $ = require('jquery');

class Translate extends Component {

  constructor(props) {
        super(props)
        this.state = {
          initialValue: '',
          resultValue: '',
          cypher: 'caesar',
          option: 'encrypt',
          key: '1',
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCypherChange = this.handleCypherChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        // this.handleCryption = this.handleCryption.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleEncrypt = this.handleEncrypt.bind(this);
        this.handleDecrypt = this.handleDecrypt.bind(this);
        this.cypherToMode = this.cypherToMode.bind(this);
  }

  handleTextChange(event) {
    this.setState({initialValue: event.target.value});
  }
  handleCypherChange(event) {
    this.setState({cypher: event.target.value});
  }
  handleOptionChange(event) {
    this.setState({option: event.target.value});
  }
  handleKeyChange(event) {
    this.setState({key: event.target.value});
  }

  handleEncrypt() {
    const mode = this.cypherToMode()
    const url = window.location.href + 'encrypt';
    const value = this.state.initialValue;
    const key = parseInt(this.state.key, 10)
    $.get(url, {arg1: value, arg2: mode, arg3: key},(data) => {
            this.setState({resultValue: data})
            console.log(data);
        });
  }

  handleDecrypt() {
    const mode = this.cypherToMode()
    const url = window.location.href + 'decrypt';
    const value = this.state.initialValue;
    const key = parseInt(this.state.key, 10)
    $.get(url, {arg1: value, arg2: mode, arg3: key},(data) => {
            this.setState({resultValue: data})
            console.log(data);
        });
  }

  // handleCryption() {
  //    const mode = this.cypherToMode()
  //    const url = window.location.href + this.state.option;
  //    const value = this.state.initialValue;
  //    const key = this.state.key
  //    $.get(url, {arg1: value, arg2: mode, arg3: key},(data) => {
  //            this.setState({resultValue: data})
  //            console.log(data);
  //        });
  // }

  cypherToMode() {
    switch (this.state.cypher) {
      case 'caesar':
        return 1;
      case 'rot1':
        return 2;
      case 'swap':
        return 3;
      case 'reverse':
        return 4;
    }
    return 0;
  }

  renderSelectKey() {
    let options = [];
    for(var i = 1; i <= 15; i++) {
      options.push(<option value={i} key={i}>{i}</option>)
    }
    return options;
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='form-group col-md-4'>
            <label>Encryption/Decryption</label>
            <select className="form-control" onChange={this.handleOptionChange} value={this.state.option}>
              <option value='encrypt'>Encryption</option>
              <option value='decrypt'>Decryption</option>
            </select>
          </div>
          <div className='form-group col-md-4 col-md-offset-4'>
            <label>Cypher Selection</label>
            <select className="form-control" onChange={this.handleCypherChange} value={this.state.cypher}>
              <option value='caesar'>Caesar</option>
              <option value='rot1'>ROT1</option>
              <option value='swap'>Swap</option>
              <option value='reverse'>Reverse</option>
            </select>
          </div>
          {(this.state.cypher === 'swap' || this.state.cypher === 'caesar') &&
          <div className='form-group col-md-4 col-md-offset-4'>
            <label>Key Selection</label>
            <select className="form-control" onChange={this.handleKeyChange} value={this.state.key}>
              {/* {this.renderSelectKey()} */}
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </select>
          </div>}
        </div>
        <div className='  row'>
          <div className="form-group col-md-5 text-left">
            <label >Input:</label>
            <textarea className="form-control" rows="5" id="comment" value={this.state.initialValue} onChange={this.handleTextChange}></textarea>
          </div>
          {this.state.option === 'encrypt' &&
          <div className="btn-group col-md-1" role="group">
            <button type="button" className="btn btn-primary" onClick={this.handleEncrypt}>Encrypt</button>
          </div>
          }
          {this.state.option === 'decrypt' &&
          <div className="btn-group col-md-1" role="group">
            <button type="button" className="btn btn-primary" onClick={this.handleDecrypt}>Decrypt</button>
          </div>}
          <div className="form-group  col-md-5 text-left">
            <label className='text-left'>Output:</label>
            <textarea className="form-control" rows="5" id="comment" disabled value={this.state.resultValue}></textarea>
          </div>
        </div>
      </div>
    )
  }
}

export default Translate;
