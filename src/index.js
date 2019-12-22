import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import configureStore from './store/configure';
import {Provider} from 'react-redux';
import * as userActions from './actions/userActions';

const store = configureStore();
store.dispatch(userActions.getUser());

ReactDOM.render((
  <Provider store={store}>
    <Router>
        <App />
    </Router>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
