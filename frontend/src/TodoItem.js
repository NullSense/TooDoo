import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => {
  return <li className="todoitem">{props.value}</li>;
};

/**
 * prop type validation
 */
TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  created: PropTypes.string.isRequired
};

export default TodoItem;
