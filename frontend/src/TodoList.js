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
      <section className="mainpane">
        <InputBar value={this.state.input} handleChange={this.handleChange.bind(this)} />
        <OptionPane />
        <section className="itempane"></section>
      </section>
    );
  }
}

export default TodoList;
