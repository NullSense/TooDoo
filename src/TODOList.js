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
  loadItems() {
    fetch('https://jsonplaceholder.typicode.com/todos/1') // use mock api for now
      .then(response => response.json())
      .then(json => {
        // check if item with this id is already contained
        if (this.state.items.findIndex(item => item.id === json.id) === -1) {
          this.setState({ items: [...this.state.items, { id: json.id, entry: json.title }] });
        }
      });
  }

  render() {
    return (
      <div className="TODOList">
        {this.state.items.map(item => (
          <TODOItem key={item.id} id={item.id} entry={item.entry} del={this.delItem.bind(this)} />
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
