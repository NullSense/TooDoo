/* eslint-disable */
/* istanbul ignore file */

import React from 'react';
import logo from './logo.svg';
import './App.css';

class TODOList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      currID: 0
    };
    this.addEntry = this.addEntry.bind(this);
  }

  addEntry() {
    this.setState(state => {
      return {
        entries: [...state.entries, <Entry id={this.state.currID} />],
        currID: this.state.currID + 1
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addEntry();
  }

  render() {
    return (
      <div className="TODOList">
        {this.state.entries}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <button className="NewEntry" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}

class Entry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: '',
      tickable: false,
      id: this.props.id,
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
        <li key={this.state.id} className="Entry" onClick={this.handleKeyPressed}>
          {this.state.entry}
        </li>
      );
    } else {
      return (
        <form className="EntryForm">
          <li>
            <input
              className="Entry"
              value={this.state.entry}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyPressed}
            />
          </li>
        </form>
      );
    }
  }
}

function App() {
  return (
    <div className="App">
      {/* this is a test comment */}
      <header className="App-header">
        <TODOList />
      </header>
    </div>
  );
}

export default App;
