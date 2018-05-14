import React, { Component } from 'react';

import Header from './Header';

import Todo from './Todo';
import Image from './Image';
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
        <Image />
        <Timers />
        <Streaks />
        <Routine />
        <Pomodoro />
      </div>
    );
  }
}

export default App;
