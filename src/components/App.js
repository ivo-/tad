import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';

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
        <GridLayout
          rows={12}
          cols={4}
          rowHeight={300}
          width={1200}
          className="layout">
          <div key="a" data-grid={{ x: 0, y: 0, w: 1, h: 1 }}>
            <Todo />
          </div>
          <div key="b" data-grid={{ x: 1, y: 0, w: 1, h: 1 }}>
            <Image />
          </div>
          <div key="c" data-grid={{ x: 2, y: 0, w: 1, h: 1 }}>
            <Timers />
          </div>
          <div key="d" data-grid={{ x: 0, y: 1, w: 1, h: 1 }}>
            <Streaks />
          </div>
          <div key="e" data-grid={{ x: 1, y: 1, w: 1, h: 1 }}>
            <Routine />
          </div>
          <div key="f" data-grid={{ x: 2, y: 1, w: 1, h: 1 }}>
            <Pomodoro />
          </div>
        </GridLayout>
      </div>
    );
  }
}

export default App;
