import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => {
  return <div>{props.value}</div>;
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
