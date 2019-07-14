/* istanbul ignore file */

import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TODOItem from './TODOItem.js';

configure({ adapter: new Adapter() });
