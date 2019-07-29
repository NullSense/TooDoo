import React, { Component } from 'react';
import InputBar from './InputBar.js';
import OptionPane from './OptionPane.js';
import TodoItem from './TodoItem.js';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

class TodoList extends Component {
  constructor(props) {
    super(props);

    // the one and only state!
    this.state = {
      input: '', // the current input of the inputfield
      entries: [], // the list of entries, which is used a quasi-cache
      areHidden: false // boolean which determines if checked items are shown
    };
  }

  /**
   * Handles hiding items when option selected
   */
  hideCompletedItems() {
    this.setState(prev => {
      return {
        areHidden: !prev.areHidden
      };
    });
  }

  /**
   * handles the state of the input (controlled input)
   */
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }

  /**
   * callback for custom input element to access global state
   */
  async editEntry(id, value) {
    axios.patch('/api/todos/' + id + '/', {
      entry: value
    });
    this.setState(prev => {
      return {
        entries: prev.entries.map(entry => (entry.id === id ? { ...entry, entry: value } : entry))
      };
    });
  }

  /**
   * Add item if input isn't empty and do post api call
   */
  async addItem(event) {
    event.preventDefault();
    if (this.state.input !== '') {
      const newEntry = await axios.post('/api/todos/', { entry: this.state.input });
      this.setState(prev => {
        return {
          input: '',
          entries: [...prev.entries, newEntry.data]
        };
      });
    }
  }

  /**
   * Delete item and do delete api call
   */
  async deleteItem(id) {
    await axios.delete('/api/todos/' + id);
    this.setState(prev => {
      return {
        entries: prev.entries.filter(entry => entry.id !== id)
      };
    });
  }

  /**
   * Delete all ites
   */
  async deleteAll() {
    for (let entry of this.state.entries) {
      this.deleteItem(entry.id);
    }
    this.setState(prev => {
      return {
        entries: []
      };
    });
  }

  /**
   * Mark Item as checked and do put api call
   */
  async checkItem(id) {
    const requestedEntry = await axios.get('/api/todos/' + id + '/');
    axios.put('/api/todos/' + id + '/', {
      entry: requestedEntry.data.entry, // TODO: make api call work without entry
      done: !requestedEntry.data.done
    });
    this.setState(prev => {
      return {
        entries: prev.entries.map(entry => (entry.id === id ? { ...entry, done: !entry.done } : entry))
      };
    });
  }

  async changeColor(id, color) {
    axios.patch(process.env.REACT_APP_API_URL + id + '/', {
      color: color.hex
    });
    this.setState(prev => {
      return {
        entries: prev.entries.map(entry => (entry.id === id ? { ...entry, color: color.hex } : entry))
      };
    });
  }

  /**
   * load Items on mount
   */
  async componentDidMount() {
    const response = await axios.get('/api/todos/');

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

  /**
   * Format dateTime for better readability
   * @param {string} dateTime the timestamp of the item
   */
  parseDateTime(dateTime) {
    let time = new Date(dateTime);
    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    let suffix = 'AM';
    if (hours >= 12) {
      suffix = 'PM';
      hours = hours - 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    return time.toDateString() + ' - ' + hours + ':' + minutes + ' ' + suffix;
  }

  render() {
    // If hiding completed items is true, prune those items
    const currEntries = this.state.areHidden ? this.state.entries.filter(entry => !entry.done) : this.state.entries;

    // specify itempane, which does not get rendered if there are no items
    const itempane =
      this.state.entries.length !== 4 ? (
        <ul className="itempane">
          {currEntries
            .map(entry => (
              <TodoItem
                key={entry.id}
                id={entry.id}
                entry={entry.entry}
                dateTime={this.parseDateTime(entry.dateTime)}
                done={entry.done}
                color={entry.color}
                deleteItem={this.deleteItem.bind(this, entry.id)}
                checkItem={this.checkItem.bind(this, entry.id)}
                changeColor={this.changeColor.bind(this, entry.id)}
                editEntry={this.editEntry.bind(this, entry.id)}
              />
            ))
            .reverse()}
        </ul>
      ) : null;

    return (
      <div>
        <AccountBar />
        <header>
          <h1>TooDoo.ml</h1>
        </header>
        <section className="mainpane">
          <InputBar
            input={this.state.input}
            handleChange={this.handleChange.bind(this)}
            addItem={this.addItem.bind(this)}
          />
          <OptionPane
            hideCompletedItems={this.hideCompletedItems.bind(this)}
            areHidden={this.state.areHidden}
            deleteAll={this.deleteAll.bind(this)}
          />
          {itempane}
        </section>
        <footer className="mainfooter">
          <p>toodoo.ml by Salsa20 &amp; Aerial</p>
        </footer>
      </div>
    );
  }
}

const AccountBar = props => {
  return (
    <div className="account-bar">
      <button className="account-button button">
        <a href="/accounts/logout/">logout</a>
      </button>
      <button className="account-button button">
        <a href="/accounts/login/">login</a>
      </button>
      <button className="account-button button">
        <a href="/accounts/register/">register</a>
      </button>
    </div>
  );
};

export default TodoList;
