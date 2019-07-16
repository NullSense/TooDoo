import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import TODOItem from './TODOItem.js';

configure({ adapter: new Adapter() });

// call this to mount the wrapper by passing on props
const setUp = props => {
  const wrapper = mount(<TODOItem {...props} />);
  return wrapper;
};

describe('TODOItem', () => {
  // always setup a wrapper with empty props
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TODOItem />);
  });

  // unmount after each test
  afterEach(() => {
    wrapper.unmount();
  });

  /*
   * snapshot testing
   */
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly', () => {
    wrapper = setUp({ id: 1, mod: false });
    expect(wrapper).toMatchSnapshot();
  });

  // Simulate keyboard input
  it('changes state correctly after hitting enter', () => {
    // simulate hitting enter on a new item
    wrapper.find('textarea').simulate('keydown', { keyCode: 13 });
    expect(wrapper.state().modifiable).toBeFalsy();
    expect(wrapper.state().modifiable).toEqual(false);

    // simulate then clicking on the item again
    wrapper.find('.TODOItem').simulate('click', { button: 0 });
    expect(wrapper.state().modifiable).toBeTruthy();
    expect(wrapper.state().modifiable).toEqual(true);
  });

  // pass on an id and match
  it('should have correct id', () => {
    wrapper = setUp({ id: 1, entry: 'abc' });
    expect(wrapper.prop('id')).toEqual(1);
  });

  // test for initial modifiability
  it('should be modifiable on mount', () => {
    wrapper = setUp({ id: 1, entry: 'abc' });
    expect(wrapper.state().modifiable).toBeTruthy();
    expect(wrapper.state().modifiable).toBe(true);
  });

  // on mount the wrapper shouldn't have an entry
  it('should have an empty entry on mount', () => {
    expect(wrapper.state().entry).toEqual('');
  });

  // check if delete function would get called
  it('should run the passed on delete function', () => {
    const mockDel = jest.fn();
    wrapper = setUp({ del: mockDel });
    wrapper.instance().handleDelete({ preventDefault() {} });
    expect(mockDel).toBeCalled();
  });
});
