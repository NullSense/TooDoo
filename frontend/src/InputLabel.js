import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: '',
      value: ''
    };

    this.setView = this.setView.bind(this);
  }

  componentWillMount() {
    this.setState({
      view: this.props.view,
      value: this.props.value
    });
  }

  componentDidUpdate() {
    if (this.state.view === 'input') {
      this.input.focus();
    }
  }

  setView(view) {
    this.setState({
      view
    });
  }

  editEntry(event) {
    if (event.key === 'Enter') {
      this.props.editEntry(event.currentTarget.textContent);
      this.setView('label');
    }
  }

  renderInput() {
    return (
      <div
        contentEditable="true"
        className="itemlabel"
        ref={input => (this.input = input)}
        onKeyPress={e => this.editEntry(e)}
      >
        {this.state.value}
      </div>
    );
  }

  renderLabel() {
    return (
      <div
        style={this.props.done ? { textDecoration: 'line-through' } : null}
        className="itemlabel"
        onClick={() => this.setView('input')}
      >
        {this.state.value}
      </div>
    );
  }

  render() {
    if (this.state.view === 'input') {
      return this.renderInput();
    } else {
      return this.renderLabel();
    }
  }
}

InputLabel.propTypes = {
  editEntry: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  done: PropTypes.bool
};
