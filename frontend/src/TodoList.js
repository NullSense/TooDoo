import React, { Component } from 'react';
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

  render() {
    return (
      <div>
        <header>
          <h1>TooDoo.ml</h1>
        </header>
        <section className="mainpane">
          <InputBar value={this.state.input} handleChange={this.handleChange.bind(this)} />
          <OptionPane />
          <section className="itempane">
            <TodoItem key={0} id={0} value={''} color={''} completed={false} created={Date.now().toString()} />
          </section>
        </section>
        <footer>
          <p>toodoo.ml by salsa20 & aerial</p>
        </footer>
      </div>
    );
  }
}

export default TodoList;
