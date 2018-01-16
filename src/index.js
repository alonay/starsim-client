import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, } from 'react-redux';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import store from './store/index.js';

const Root = ({ store }) => {
  return (
    <Router>
      <Provider store={store}>
        <Route path="/" component={App}/>
      </Provider>
    </Router>
  );
};

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);

registerServiceWorker();
