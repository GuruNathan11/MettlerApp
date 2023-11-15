/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App, {ReduxProvider} from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => ReduxProvider);
