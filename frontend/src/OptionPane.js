import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OptionPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: undefined
    };
  }

  togglePane() {
    if (this.state.open === undefined) {
      this.setState({ open: true });
      return;
    }
    this.setState(prev => {
      return { open: !prev.open };
    });
  }

  render() {
    const panestate = this.state.open === true ? ' open' : this.state.open === false ? ' closed' : '';
    return (
      <div className={'options' + panestate}>
        <input className={'options-toggle' + panestate} type="checkbox" onClick={this.togglePane.bind(this)} />
        <div className={'options-selection' + panestate}>
          <button className={'options-button' + panestate} type="submit" onClick={this.props.hideFinished}>
            {this.props.hiding ? 'show finished' : 'hide finished'}
          </button>
        </div>
      </div>
    );
  }
}

// define prop types for OptionPane
OptionPane.propTypes = {
  hideFinished: PropTypes.func.isRequired,
  hiding: PropTypes.bool.isRequired
};

export default OptionPane;
