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
      entries: []
    };
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
              value: prev.input,
              created: new Date(Date.now()).toLocaleString(),
              checked: false,
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
        entries: prev.entries.map(entry => (entry.id === id ? { ...entry, checked: !entry.checked } : entry))
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
        return { id: entry.id, value: entry.value, created: entry.created, checked: entry.value, color: entry.color };
      });

    // set state
    this.setState(prev => {
      return {
        entries: [...prev.entries, ...results]
      };
    });
  }

  render() {
    // specify itempane, which does not get rendered if there are no items
    const itempane =
      this.state.entries.length !== 0 ? (
        <ul className="itempane">
          {this.state.entries.map(entry => (
            <TodoItem
              key={entry.id}
              id={entry.id}
              value={entry.value}
              created={entry.created}
              checked={entry.checked}
              color={entry.color}
              delete={this.deleteItem.bind(this, entry.id)}
              check={this.checkItem.bind(this, entry.id)}
            />
          ))}
        </ul>
      ) : null;

    return (
      <div>
        <header>
          <h1>TooDoo.ml</h1>
        </header>
        <section className="mainpane">
          <InputBar
            value={this.state.input}
            handleChange={this.handleChange.bind(this)}
            addItem={this.addItem.bind(this)}
          />
          <OptionPane />
          {itempane}
        </section>
        <footer>
          <p>toodoo.ml by salsa20 & aerial</p>
        </footer>
      </div>
    );
  }
}

export default TodoList;
