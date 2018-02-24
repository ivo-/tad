import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import './css/index.css';

export default function init() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

init();
