import React, { Component } from 'react';
import axios from 'axios';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    }
  }

  async submitData() {
    // const request = await axios.post(process.env.REACT_APP_API_URL, { username: this.username, password: this.password})
    this.setState({ username: '', password: '' })
  }

  render() {
    const style = {
      position: 'fixed',
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      width: '200px',
      height: '100px',
      background: 'white',
      padding: '30px 30px'
    };

    return (
      <div style={style}>
        <input type="test" placeholder="username" onChange={e => this.setState({ username: e.target.value })} required/>
        <input type="test" placeholder="login" onChange={e => this.setState({ password: e.target.value })} required/>
        <button style={{ marginTop: '10px' }} onClick={ this.submitData.bind(this) }>login</button>
      </div>
    );
  }
}

export default LoginPage;
