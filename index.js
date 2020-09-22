import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginScreen from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { Store } from './store';
ReactDOM.render(
  <Provider store={Store}>
    <LoginScreen />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();