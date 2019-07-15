import { configure, mount, shallow, render } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import TODOList from './TODOList.js';

configure({ adapter: new Adapter() });

describe('TODOList', () => {
  // always setup a component with empty props
  let component;
  beforeEach(() => {
    component = mount(<TODOList />);
  });

  // unmount after each test
  afterEach(() => {
    component.unmount();
  });

  // there should be only one TODOList
  it('should have exactly one TODOList', () => {
    const wrapper = component.find('.TODOList');
    expect(wrapper.length).toBe(1);
  });
});
