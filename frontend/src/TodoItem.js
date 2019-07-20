import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => {
  return (
    <li className="todoitem">
      <input type="checkbox" className="checkitem" />
      <button className="delete">x</button>
      <label>{props.value}</label>
      <hr />
      <footer>{props.created}</footer>
    </li>
  );
};

/**
 * prop type validation
 */
TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  created: PropTypes.string.isRequired
};

export default TodoItem;
