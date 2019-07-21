import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => {
  return (
    <li className="todoitem">
      <input type="checkbox" className="checkitem" onClick={props.check} />
      <button className="delete" onClick={props.delete}>
        x
      </button>
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
  checked: PropTypes.bool.isRequired,
  created: PropTypes.string.isRequired,
  delete: PropTypes.func.isRequired,
  check: PropTypes.func.isRequired
};

export default TodoItem;
