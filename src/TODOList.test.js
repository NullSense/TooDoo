/* istanbul ignore file */

import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TODOList from './TODOList.js';

configure({ adapter: new Adapter() });
