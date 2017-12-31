import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger'

import App from './components/App';
import rootReducer from './reducers';
import { defaultState } from './constants';

import './css/index.css';

export default function init() {
  const middlewares = [
    thunkMiddleware,
    loggerMiddleware,
  ];

  const store = createStore(
    rootReducer,
    defaultState,
    compose(applyMiddleware(...middlewares))
  );

  window.Store = store;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

init();
