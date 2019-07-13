/* istanbul ignore file */

import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

/**
 * TODOList has top level state in which all TODOItems are stored
 * @version 0.1
 * @author salsa20
 * @extends React.Component
 */
class TODOList extends React.Component {
  constructor() {
    super();

    // 'global' state
    this.state = {
      entries: [{ id: 0 }]
    };

    // bind functions with scope
    this.addItem = this.addItem.bind(this);
    this.delItem = this.delItem.bind(this);
  }

  /**
   * add an item to global state
   */
  addItem(event) {
    this.setState(prev => {
      return {
        entries: [...prev.entries, { id: Date.now() }]
      };
    });

    // prevent reloading of page
    event.preventDefault();
  }

  /**
   * delete an item from global state
   */
  delItem(id) {
    this.setState(prev => {
      return { entries: prev.entries.filter(entry => entry.id !== id) };
    });
  }

  render() {
    return (
      <div className="TODOList">
        {/* map id to TODOItem */}
        {this.state.entries.map(entry => (
          <TODOItem key={entry.id} id={entry.id} del={this.delItem} />
        ))}
        {/* on submit add new TODOItem */}
        <form onSubmit={this.addItem.bind(this)}>
          <button className="NewEntry" type="submit">
            {' '}
            +{' '}
          </button>
        </form>
      </div>
    );
  }
}

/**
 * This component represents a TODOItem
 * @version 0.1
 * @author salsa20
 * @extends React.Component
 * @param {} props pass on parent data
 */
class TODOItem extends React.Component {
  constructor(props) {
    super(props);

    // local item state
    this.state = {
      entry: '',
      modifiable: false
    };

    // bind context
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  /**
   * on input update local entry
   * @param {} event pass on input event
   */
  handleChange(event) {
    this.setState({
      entry: event.target.value
    });
  }

  /**
   * call top level delete function passed on as prop
   * @param {} event pass on input event
   */
  handleDelete(event) {
    event.preventDefault();
    this.props.del(this.props.id);
  }

  /**
   * on enter disallow input
   * @param {} event pass on input event
   */
  handleKeyPressed(event) {
    // if enter was pressed
    if (event.keyCode === 13) {
      // render differently, send to server
      this.setState({
        modifiable: true
      });
    } else if (event.button === 0) {
      this.setState({
        modifiable: false
      });
    }
  }

  render() {
    // if modfiable render input field, else display list item with delete button
    if (this.state.modifiable) {
      return (
        <form onSubmit={this.handleDelete.bind(this)}>
          <div className="EntryWrapper">
            <li className="TODOItem" onClick={this.handleKeyPressed}>
              {this.state.entry}
            </li>
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

// define prop types for TODOItem
TODOItem.propTypes = {
  del: PropTypes.func,
  id: PropTypes.number
};

/**
 * return and export this app
 */
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
