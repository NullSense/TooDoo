import React from 'react';
import TODOItem from './TODOItem.js';

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
      items: [{ id: Date.now(), entry: '' }]
    };
  }

  /**
   * add an item to global state
   */
  addItem() {
    this.setState(prev => {
      return { items: [...prev.items, { id: Date.now() }] };
    });
  }

  /**
   * delete an item from global state
   */
  delItem(id) {
    this.setState(prev => {
      return { items: prev.items.filter(entry => entry.id !== id) };
    });
  }

  /**
   * load Item through API call
   */
  async loadItems() {
    let response = await fetch('http://127.0.0.1:8000/api/todos/'); // use mock api for now
    let json = await response.json();

    // first filter items and check if their id is already contained in state,
    // then map them to valid entries (temp)
    const results = json.results
      .filter(item => this.state.items.findIndex(state_item => item.id === state_item.id) === -1)
      .map(item => {
        return { id: item.id, entry: item.entry };
      });

    // set state
    this.setState({ items: [...this.state.items, ...results] });
  }

  render() {
    return (
      <div className="TODOList">
        {this.state.items.map(item => (
          <TODOItem key={item.id} id={item.id} entry={item.entry} del={this.delItem.bind(this)} mod={true} />
        ))}
        <div className="container">
          <button className="Button" type="button" onClick={this.addItem.bind(this)}>
            +
          </button>
          <button style={{ width: '200px' }} className="Button" type="button" onClick={this.loadItems.bind(this)}>
            Load
          </button>
        </div>
      </div>
    );
  }
}

export default TODOList;
