import React from 'react';
import PropTypes from 'prop-types';

const InputBar = props => {
  return (
    <div className="inputwrapper">
      <input
        type="text"
        className="newtodo"
        value={props.value}
        onChange={props.handleChange}
        placeholder="I need to ..."
      />
    </div>
  );
};

/**
 * prop type validaton
 */
InputBar.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default InputBar;
