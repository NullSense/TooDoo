import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import TODOList from './TODOList.js';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

describe('TODOList', () => {
  // always setup a component with empty props
  let component;
  beforeEach(() => {
    component = shallow(<TODOList />);
  });

  // unmount after each test
  // afterEach(() => {
  //   component.unmount();
  // });

  /*
   * snapshot testing
   */
  it('Should render correctly', () => {
    const snapshot = renderer.create(<TODOList />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  // there should be only one TODOList
  it('should have exactly one TODOList', () => {
    const wrapper = component.find('.TODOList');
    expect(wrapper.length).toEqual(1);
  });

  // there should be only one TODOList
  it('should initially hold one item', () => {
    expect(component.state().items.length).toEqual(1);
  });

  // delItem should work as expected on call
  it('should delete item from global state', () => {
    component.setState({
      items: [{ id: 0 }]
    });
    expect(component.state().items.length).toEqual(1);
    component.instance().delItem(0);
    expect(component.state().items.length).toEqual(0);
  });

  // addItem should work as expected on call
  it('should add item to global state', () => {
    component.setState({
      items: []
    });
    expect(component.state().items.length).toEqual(0);
    component.instance().addItem({ preventDefault() {}, value: '' });
    expect(component.state().items.length).toEqual(1);
    expect(component.state().items[0].id).toBeLessThanOrEqual(Date.now());
  });

  // addItem should work as expected on submit
  it('should add item on submit', () => {
    const prevLength = component.state().items.length;
    component
      .find('button')
      .at(0)
      .simulate('click', { preventDefault() {} });
    expect(component.state().items.length).toEqual(prevLength + 1);
  });

  // loadItem should correctly make an api call
  // TODO: mock api call
  it('should make a proper api call', async () => {
    component.setState({
      items: []
    });
    expect(component.state().items.length).toEqual(0);
    await component.instance().loadItems();
    expect(component.state().items.length).toEqual(1);
    expect(component.state().items[0]).toEqual({ id: 1, entry: 'delectus aut autem' });
  });
  // it('should make an api call on button click', async () => {
  //   component.setState({
  //     items: []
  //   });
  //   expect(component.state().items.length).toEqual(0);
  //   component
  //     .find('button')
  //     .at(1)
  //     .simulate('click');
  //   expect(component.state().items.length).toEqual(1); // this is called before the async returns....
  //   expect(component.state().items[0]).toEqual({ id: 1, entry: 'delectus aut autem' });
  // });
});
