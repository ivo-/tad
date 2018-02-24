import React, { Component } from 'react';

import Header from './Header';

import Todo from './Todo';
import Timers from './Timers';
import Streaks from './Streaks';
import Routine from './Routine';
import Pomodoro from './Pomodoro';

class App extends Component {
  render() {
    return (
      <div className="tad">
        <Header />
        <Todo />
        <Timers />
        <Streaks />
        <Routine />
        <Pomodoro />
      </div>
    );
  }
}

export default App;
