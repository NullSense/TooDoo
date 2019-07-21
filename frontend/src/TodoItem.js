import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = props => {
  let color;
  if (props.checked) {
    color = 'checked';
  } else {
    color = props.color;
  }

  let style;
  let crossedOut = null;
  switch (color) {
    case 'default':
      style = { color: '#36454f', backgroundColor: '#f8f8fa' };
      break;
    case 'red':
      style = { color: '#36454f', backgroundColor: '#ff8b94' };
      break;
    case 'magenta':
      style = { color: '#36454f', backgroundColor: '#ffaaa5' };
      break;
    case 'orange':
      style = { color: '#36454f', backgroundColor: '#ffd3b6' };
      break;
    case 'green':
      style = { color: '#36454f', backgroundColor: '#dcedc1' };
      break;
    case 'blue':
      style = { color: '#36454f', backgroundColor: '#a8e6cf' };
      break;
    case 'checked':
      style = { color: '#d2d4dc', backgroundColor: '#f8f8fa' };
      crossedOut = { textDecoration: 'line-through' };
      break;
  }

  return (
    <li style={style} className="todoitem">
      <input type="checkbox" className="checkitem" onClick={props.check} />
      <button className="delete" onClick={props.delete}>
        x
      </button>
      <label style={crossedOut}>{props.value}</label>
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
