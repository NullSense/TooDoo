/* istanbul ignore file */

import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import TODOItem from './TODOItem.js';

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

  // pass on an id and match
  it('should have correct id', () => {
    component = setUp({ id: 1, entry: 'abc' });
    expect(component.props().id).toEqual(1);
  });

  // on mount the component shouldn't have an entry
  it('should have an empty entry on mount', () => {
    expect(component.state().entry).toEqual('');
  });
});
