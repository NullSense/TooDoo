import React, { Component } from 'react';
import InputBar from './InputBar.js';
import OptionPane from './OptionPane.js';
import TodoItem from './TodoItem.js';
import axios from 'axios';

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

  async addItem(event) {
    event.preventDefault();
    if (this.state.input !== '') {
      const newEntry = await axios.post(process.env.REACT_APP_API_URL, { entry: this.state.input });
      this.setState(prev => {
        return {
          input: '',
          entries: [...prev.entries, newEntry.data]
        };
      });
    }
  }

  async deleteItem(id) {
    await axios.delete(process.env.REACT_APP_API_URL + id);
    this.setState(prev => {
      return {
        entries: prev.entries.filter(entry => entry.id !== id)
      };
    });
  }

  async checkItem(id) {
    const requestedEntry = await axios.get(process.env.REACT_APP_API_URL + id + '/');
    axios.put(process.env.REACT_APP_API_URL + id + '/', {
      entry: requestedEntry.data.entry,
      done: !requestedEntry.data.done
    });
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
    const response = await axios.get(process.env.REACT_APP_API_URL);

    // first filter items and check if their id is already contained in state,
    // then map them to valid entries (temp)
    const results = response.data;

    // set state
    this.setState(prev => {
      return {
        entries: results
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
            input={this.state.input}
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
