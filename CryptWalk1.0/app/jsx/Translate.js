import React, { Component } from 'react';
import req from 'superagent'

class Translate extends Component {

  // state = {
  //   initialValue: '',
  //   resultValue: '',
  //   input: 'Encrypt',
  //   result: 'Decrypt'
  // }

  constructor(props) {
        super(props)
        // this.state = {
        //   initialValue: '',
        //   resultValue: '',
        //   input: 'Encrypt',
        //   result: 'Decrypt'
        // };
        // //this.handleChange = this.handleChange.bind(this);
        // this.handleEncrypt = this.handleEncrypt.bind(this);
  }

  handleChange(event) {
    this.setState({initialValue: event.target.value});
  }

  handleEncrypt() {
    const obj = {
      value: this.refs.value,
      mode: 1,
      amount: 5
    }
    const url = '/encrypt';
    let r = type=='POST' ? req.post(url) : req.get(url);
    r
    .type('json')
    .send(JSON.stringify(obj))
    .end((err, res) => {
      if (err) {
        console.error(url, err.toString());
        // return errorHandler ? errorHandler(err) : 0;
        console.log(errorHandler ? errorHandler(err) : 0);
      }
      else {
        // return handler(JSON.parse(res.text));
        console.log(res.text);
      }})
  }

  render() {
    return (
      <div>
        {/* <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary">Encrypt</button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary">Decrypt</button>
          </div>
        </div> */}
        <div className='col-md-offset-2 container row'>
          <div className="form-group col-md-3 text-left">
            <label >Input:</label>
            {/* <textarea className="form-control" rows="5" id="comment" value={this.intialValue} onChange={this.handleChange.bind(this)}> */}
            <input type="text" placeholder="Encrypt code here..." ref="value" />
            {/* </textarea> */}
          </div>
          <div className="btn-group btn-group-vertical col-md-2" role="group" aria-label="...">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-primary" onClick={this.handleEncrypt.bind(this)}>Encrypt</button>
            </div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-primary">Decrypt</button>
            </div>
          </div>
          <div className="form-group  col-md-3 text-left">
            <label className='text-left'>Output:</label>
            <textarea className="form-control" rows="5" id="comment" disabled value={this.state.decryptValue}></textarea>
          </div>
        </div>
      </div>
    )
  }
}

export default Translate;
