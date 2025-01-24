/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Amplify} from 'aws-amplify';
// import awsconfig from './aws-exports'; // Path to auto-generated config  file

Amplify.configure({
  aws_project_region: 'ap-south-1',
});
AppRegistry.registerComponent(appName, () => App);
