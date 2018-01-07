import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import {
  TODO_APP,
  TIMERS_APP,
  ROUTINE_APP,
  STREAKS_APP,
  COUNTER_APP,
} from '../constants';

import Header from './Header';
import Detached from './Detached';

import TodoContainer from './Todo/TodoContainer';
import TimersContainer from './Timers/TimersContainer';
import RoutineContainer from './Routine/RoutineContainer';
import StreaksContainer from './Streaks/StreaksContainer';
import CounterContainer from './Counter/CounterContainer';

const appTypeToComponent = {
  [TODO_APP]: TodoContainer,
  [TIMERS_APP]: TimersContainer,
  [ROUTINE_APP]: RoutineContainer,
  [STREAKS_APP]: StreaksContainer,
  [COUNTER_APP]: CounterContainer,
};

class App extends Component {

  shouldComponentUpdate(props) {
    // Update only if there is a new/removed app.
    return props.state.apps.map(app => `${app.id}|`) !==
      this.props.state.apps.map(app => `${app.id}|`);
  }

  renderApps() {
    return this.props.state.apps.map(app => (
      <Detached key={app.id}>
        {React.createElement(
          appTypeToComponent[app.app],
          {
            key: app.id,
            id: app.id,
          }
        )}
      </Detached>
    ));
  }

  render() {
    return (
      <div className="tad">
        <Header />
        {this.renderApps()}
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.object.isRequired,
};

export default connect(createStructuredSelector({
  state: (state) => state,
}))(App);
