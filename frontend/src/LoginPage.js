import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

class LoginPage extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      reroute: false
    };
  }

  async submitData() {
    await axios
      .post('/login/', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.setState({ reroute: true });
      })
      .catch(err => {
        console.log('error:' + err);
      });

    // this.setState({ username: '', password: '' });
  }

  redirect() {
    if (this.state.reroute === true) {
      return (
        <div>
          <Redirect to="/" />;
        </div>
      );
    } else {
      return null;
    }
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
        {this.redirect()}
        <input
          value={this.state.username}
          type="test"
          placeholder="username"
          onChange={e => this.setState({ username: e.target.value })}
          required
        />
        <input
          value={this.state.password}
          type="test"
          placeholder="login"
          onChange={e => this.setState({ password: e.target.value })}
          required
        />
        <button style={{ marginTop: '10px' }} onClick={this.submitData.bind(this)}>
          login
        </button>
      </div>
    );
  }
}

export default LoginPage;
