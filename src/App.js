/* eslint-disable */
/* istanbul ignore file */

'use strict';
import React from 'react';
import './App.css';

class TODOList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [{ id: 0 }, { id: 1 }, { id: 2 }]
    };

    this.addEntry = this.addEntry.bind(this);
    this.delEntry = this.delEntry.bind(this);
  }

  addEntry() {
    this.setState(state => {
      return {
        entries: [...state.entries, { id: Date.now() }]
      };
    });
    event.preventDefault();
  }

  delEntry(id) {
    this.setState(prev => {
      return { entries: prev.entries.filter(entry => entry.id !== id) };
    });
  }

  render() {
    return (
      <div className="TODOList">
        {this.state.entries.map(entry => (
          <Entry id={entry.id} del={this.delEntry} />
        ))}
        <form onSubmit={this.addEntry.bind(this)}>
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
      tickable: false
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

  handleDelete(event) {
    event.preventDefault();
    this.props.del(this.props.id);
  }

  render() {
    if (this.state.tickable) {
      return (
        <form onSubmit={this.handleDelete.bind(this)}>
          <div className="EntryWrapper">
            <p key={this.props.id} className="Entry" onClick={this.handleKeyPressed}>
              {this.state.entry}
            </p>
            <button className="DelEntry" type="submit">
              <img
                style={{ filter: 'opacity(50%)', maxWidth: '50%', height: 'auto' }}
                src="https://img.icons8.com/metro/26/000000/trash.png"
                alt="-"
              />
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <form className="EntryForm">
          <li>
            <textarea
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
      <header className="App-header">
        <TODOList />
      </header>
    </div>
  );
}

export default App;
