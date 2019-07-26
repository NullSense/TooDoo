import React, { Component } from 'react';
import TodoList from './TodoList';
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
      reroute: false // whether to reroute to root
    };
  }

  /**
   * Call when login form is submitted
   * Sends user credentials
   */
  async handleSubmit(e) {
    e.preventDefault(); // prevent load refresh
    await axios
      .post('/login/', {
        username: this.state.username, // submit userdata
        password: this.state.password
      })
      // if user authenticated, reroute
      .then(response => (response.status === 200 ? this.setState({ reroute: true }) : null))
      .catch(err => {
        console.log('error:' + err); // TODO: popup showing unsuccessfull login
      });
  }

  /**
   * If authentication in backend successful, reroute to root
   */
  handleRedirect() {
    if (this.state.reroute === true) {
      return <Redirect to="/" />;
    } else {
      return null;
    }
  }

  render() {
    // temp
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
      <form onSubmit={this.handleSubmit.bind(this)} style={style}>
        {this.handleRedirect()}
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
        <button type="submit" style={{ marginTop: '10px' }}>
          login
        </button>
      </form>
    );
  }
}

export default LoginPage;
