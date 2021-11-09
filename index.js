/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import ButtomComponent from './src/Components/ButtomComponent';
import Tabs from './src/Components/Tabs';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Tabs);