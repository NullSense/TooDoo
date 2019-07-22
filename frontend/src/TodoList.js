import React, { Component } from 'react';
import uuid from 'uuid';
import InputBar from './InputBar.js';
import OptionPane from './OptionPane.js';
import TodoItem from './TodoItem.js';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      entries: [],
      hide: false
    };
  }

  hideFinished() {
    this.setState(prev => {
      return {
        hide: !prev.hide
      };
    });
  }

  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  addItem(event) {
    if (this.state.input !== '') {
      this.setState(prev => {
        return {
          input: '',
          entries: [
            ...prev.entries,
            {
              id: uuid.v1(),
              entry: prev.input,
              dateTime: new Date(Date.now()).toLocaleString(),
              done: false,
              color: 'magenta'
            }
          ]
        };
      });
    }
    event.preventDefault();
  }

  deleteItem(id) {
    this.setState(prev => {
      return {
        entries: prev.entries.filter(entry => entry.id !== id)
      };
    });
  }

  checkItem(id) {
    this.setState(prev => {
      return {
        entries: prev.entries.map(entry => (entry.id === id ? { ...entry, done: !entry.done } : entry))
      };
    });
  }

  /**
   * load Items on mount
   */
  async componentDidMount() {
    const response = await fetch(process.env.REACT_APP_API_URL);
    const json = await response.json();

    // first filter items and check if their id is already contained in state,
    // then map them to valid entries (temp)
    const results = json
      .filter(entry => this.state.entries.findIndex(state_entry => entry.id === state_entry.id) === -1)
      .map(entry => {
        return { id: entry.id, entry: entry.entry, dateTime: entry.dateTime, done: entry.entry, color: entry.color };
      });

    // set state
    this.setState(prev => {
      return {
        entries: [...prev.entries, ...results]
      };
    });
  }

  render() {
    let currEntries = this.state.entries;
    if (this.state.hide) {
      currEntries = currEntries.filter(entry => !entry.done);
    }
    // specify itempane, which does not get rendered if there are no items
    const itempane =
      this.state.entries.length !== 0 ? (
        <ul className="itempane">
          {currEntries
            .map(entry => (
              <TodoItem
                key={entry.id}
                id={entry.id}
                entry={entry.entry}
                dateTime={entry.dateTime}
                done={entry.done}
                color={entry.color}
                delete={this.deleteItem.bind(this, entry.id)}
                check={this.checkItem.bind(this, entry.id)}
              />
            ))
            .reverse()}
        </ul>
      ) : null;

    return (
      <div>
        <header>
          <h1>TooDoo.ml</h1>
        </header>
        <section className="mainpane">
          <InputBar
            entry={this.state.input}
            handleChange={this.handleChange.bind(this)}
            addItem={this.addItem.bind(this)}
          />
          <OptionPane hideFinished={this.hideFinished.bind(this)} hiding={this.state.hide} />
          {itempane}
        </section>
        <footer className="mainfooter">
          <p>toodoo.ml by salsa20 & aerial</p>
        </footer>
      </div>
    );
  }
}

export default TodoList;
