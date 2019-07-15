/* istanbul ignore file */

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
      entries: [{ id: Date.now() }]
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

export default TODOList;
