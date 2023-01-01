import React from 'react';
import Navigator from './Navigator';
// import {Provider} from 'react-redux';
// import store from '../redux/store';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    // <Provider store={store}>
    <Navigator />
    // </Provider>
  );
};

export default App;
