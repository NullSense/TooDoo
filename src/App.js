/* eslint-disable */
/* istanbul ignore file */

import React from 'react';
import logo from './logo.svg';
import './App.css';

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>This is a test.</p>;
  }
}

class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div />;
  }
}

class TODOPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div />;
  }
}

class DONEPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div />;
  }
}

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: '',
      tickable: false,
      id: '',
      color: '',
      pos: ''
    };

    // bind context
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  // controlled input
  handleChange(event) {
    this.setState({
      entry: event.target.value
    });
  }

  handleKeyPressed(event) {
    // if enter was pressed
    if (event.keyCode === 13) {
      // render differently, send to server
      this.setState({
        tickable: true
      });
    } else if (event.button === 0) {
      this.setState({
        tickable: false
      });
    }
  }

  render() {
    if (this.state.tickable) {
      return (
        <div>
          <p className="Entry" onClick={this.handleKeyPressed}>
            {this.state.entry}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <form className="EntryForm">
            <input
              className="EntryInput"
              value={this.state.entry}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyPressed}
            />
          </form>
        </div>
      );
    }
  }
}

function App() {
  return (
    <div className="App">
      {/* this is a test comment */}
      <header className="App-header">
        <Entry />
        <Entry />
        <Entry />
      </header>
    </div>
  );
}

export default App;
