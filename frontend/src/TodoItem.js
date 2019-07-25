import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';
import InputLabel from './InputLabel';

class TodoItem extends Component {
  constructor() {
    super();

    // create reference to delete-button (for disabling it on click)
    this.btn = React.createRef();

    this.state = {
      isColorPickerOpen: false
    };
  }

  /**
   * Takes care of performance issues, compares the current props with next props (excluding passed on functions.
   * If equal, don't rerender.
   * @param {object} nextProps the 'future' props of this component
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props) === JSON.stringify(nextProps) && this.state === nextState) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * A middleman function for disabling the delete button on click. This is needed, since the passed on
   * deleteItem() function is an async api call, which makes the delete button susceptible for multiple activations
   */
  deleteItem() {
    this.btn.current.setAttribute('disabled', '');
    this.props.deleteItem();
  }

  /**
   * show/hide colorpicker
   *
   */
  toggleColorPicker() {
    this.setState(prev => {
      return {
        isColorPickerOpen: !prev.isColorPickerOpen
      };
    });
  }

  render() {
    // determine if the item is checked
    let color;
    if (this.props.done) {
      color = 'checked';
    } else {
      color = this.props.color;
    }

    // determine if colorpicker is open
    const colorPickerState =
      this.state.isColorPickerOpen === true ? ' open' : this.state.isColorPickerOpen === false ? ' closed' : '';

    // define the color and style of the item
    let style;
    switch (color) {
      case '#ff6b77':
        style = { color: '#36454f', backgroundColor: 'hsl(355,100%,77%)', borderColor: 'hsl(355,100%,67%)' };
        break;
      case '#ffa8a3':
        style = { color: '#36454f', backgroundColor: 'hsl(3,100%,82%)', borderColor: 'hsl(3,100%,72%)' };
        break;
      case '#ffd4b8':
        style = { color: '#36454f', backgroundColor: 'hsl(24,100%,86%)', borderColor: 'hsl(24,100%,76%)' };
        break;
      case '#dbedc0':
        style = { color: '#36454f', backgroundColor: 'hsl(83,55%,84%)', borderColor: 'hsl(83,55%,74%)' };
        break;
      case '#a8e6cf':
        style = { color: '#36454f', backgroundColor: 'hsl(158,55%,78%)', borderColor: 'hsl(158,55%,68%)' };
        break;
      case 'checked':
        style = { color: '#c0c2ce', backgroundColor: '#e5e6eb' };
        break;
      default:
        style = { color: '#36454f', backgroundColor: '#f8f8fa' };
        break;
    }

    return (
      <li style={style} className="todoitem">
        <button ref={this.btn} className="delete" onClick={this.deleteItem.bind(this)}>
          x
        </button>
        <div>
          <input
            type="checkbox"
            className="checkitem"
            onClick={this.props.checkItem}
            defaultChecked={this.props.done ? 'done' : ''}
          />
        </div>
        <InputLabel value={this.props.entry} view="label" editEntry={this.props.editEntry} done={this.props.done} />
        <br />
        <hr style={style} />
        <button className="colorpicker-button button" onClick={this.toggleColorPicker.bind(this)} style={style}>
          <TwitterPicker
            className={colorPickerState}
            color={style.color}
            colors={['#FF6B77', '#FFA8A3', '#FFD4B8', '#DBEDC0', '#A8E6CF', '#F9F9FB']}
            onChangeComplete={this.props.changeColor}
            triangle={'top-right'}
          />
        </button>
        <footer className="itemfooter">{this.props.dateTime}</footer>
      </li>
    );
  }
}

/**
 * prop type validation
 */
TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  entry: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  dateTime: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
  checkItem: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired
};

export default TodoItem;
