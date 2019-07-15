import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import TODOItem from './TODOItem.js';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

// call this to mount the component by passing on props
const setUp = props => {
  const component = mount(<TODOItem {...props} />);
  return component;
};

describe('TODOItem', () => {
  // always setup a component with empty props
  let component;
  beforeEach(() => {
    component = mount(<TODOItem />);
  });

  // unmount after each test
  afterEach(() => {
    component.unmount();
  });

  /*
   * snapshot testing
   */
  it('renders correctly', () => {
    const snapshot = renderer.create(<TODOItem />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const snapshot = renderer.create(<TODOItem key={Date.now()} id={Date.now()} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  // Simulate keyboard input
  it('changes state correctly after hitting enter', () => {
    // simulate hitting enter on a new item
    component.find('textarea').simulate('keydown', { keyCode: 13 });
    expect(component.state().modifiable).toBeFalsy();
    expect(component.state().modifiable).toEqual(false);

    // simulate then clicking on the item again
    component.find('.TODOItem').simulate('click', { button: 0 });
    expect(component.state().modifiable).toBeTruthy();
    expect(component.state().modifiable).toEqual(true);
  });

  // pass on an id and match
  it('should have correct id', () => {
    component = setUp({ id: 1, entry: 'abc' });
    expect(component.props().id).toEqual(1);
  });

  // test for initial modifiability
  it('should be modifiable on mount', () => {
    component = setUp({ id: 1, entry: 'abc' });
    expect(component.state().modifiable).toBeTruthy();
    expect(component.state().modifiable).toBe(true);
  });

  // on mount the component shouldn't have an entry
  it('should have an empty entry on mount', () => {
    expect(component.state().entry).toEqual('');
  });

  // check if delete function would get called
  it('should run the passed on delete function', () => {
    const mockDel = jest.fn();
    component = setUp({ del: mockDel });
    component.instance().handleDelete({ preventDefault() {} });
    expect(mockDel).toBeCalled();
  });
});
