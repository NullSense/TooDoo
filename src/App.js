/* istanbul ignore file */
/*eslint valid-jsdoc: "error"*/
/* eslint-ev es6 */

'use strict';
import React from 'react';
import './App.css';

/**
 * TODOList: has top level state in which all TODOItems are stored
 * @version 0.1
 *
 */
class TODOList extends React.Component {
  /**
   * @param {props} input
   *
   */
  constructor(props) {
    super(props);

    // global state
    this.state = {
      entries: [{ id: 0 }]
    };

    this.addEntry = this.addEntry.bind(this);
    this.delEntry = this.delEntry.bind(this);
  }

  /**
   * description
   *
   */
  addEntry() {
    this.setState(prev => {
      return {
        entries: [...prev.entries, { id: Date.now(), entry: '' }]
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
          <TODOItem key={entry.id} id={entry.id} del={this.delEntry} />
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

class TODOItem extends React.Component {
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
            <p key={this.props.id} className="TODOItem" onClick={this.handleKeyPressed}>
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
              className="TODOItem"
              value={this.state.entry}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyPressed}
              placeholder="type a note..."
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
