import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './css/index.css';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

export default function init() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

init();
