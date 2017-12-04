import React, { Component } from 'react';

class Translate extends Component {

  // state = {
  //   initialValue: '',
  //   resultValue: '',
  //   input: 'Encrypt',
  //   result: 'Decrypt'
  // }

  constructor(props) {
        super(props)
        this.state = {
          initialValue: '',
          resultValue: '',
          input: 'Encrypt',
          result: 'Decrypt'
        };
        this.handleChange = this.handleChange.bind(this);
        //this.handleEncrypt = this.handleEncrypt.bind(this);
  }

  handleChange(event) {
    this.setState({initialValue: event.target.value});
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
            <textarea className="form-control" rows="5" id="comment" value={this.state.initialValue} onChange={this.handleChange}></textarea>
          </div>
          <div className="btn-group btn-group-vertical col-md-2" role="group" aria-label="...">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-primary">Encrypt</button>
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
