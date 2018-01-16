import './index.css';
import { createStore, } from 'redux';
import { Provider, } from 'react-redux';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './reducers/auth';

const store = createStore(
  authReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
