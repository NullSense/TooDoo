import React, { Component } from 'react';

// const OptionPane = props => {
//   return (
//     <div>
//       <input type="checkbox" className="optionopen" />
//     </div>
//   );
// };

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
    return (
      <div
        className={this.state.open === true ? 'options open' : this.state.open === false ? 'options closed' : 'options'}
      >
        <input className="optionopener" type="checkbox" onClick={this.togglePane.bind(this)} />
      </div>
    );
  }
}

export default OptionPane;
