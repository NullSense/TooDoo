import React, { Component } from 'react';

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
          <button className={'options-button' + panestate} type="submit">
            show
          </button>
        </div>
      </div>
    );
  }
}

export default OptionPane;
