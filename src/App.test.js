/* istanbul ignore file */

import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App.js';

configure({ adapter: new Adapter() });
