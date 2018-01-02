import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { TODO_APP, ROUTINE_APP } from '../constants';

import TodoContainer from './Todo/TodoContainer';
import RoutineContainer from './Routine/RoutineContainer';
import Header from './Header';
import Detached from './Detached';

const appTypeToComponent = {
  [TODO_APP]: TodoContainer,
  [ROUTINE_APP]: RoutineContainer,
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
