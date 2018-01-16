import {
  TODO_APP,
  TIMERS_APP,
  ROUTINE_APP,
  STREAKS_APP,
  POMODORO_APP,
} from '../../constants';

import todo from './todo';
import timers from './timers';
import routine from './routine';
import streaks from './streaks';
import pomodoro from './pomodoro';

export default function apps(state = [], action) {
  return state.map(app => {
    switch(app.app) {
      case TODO_APP: return todo(app, action);
      case TIMERS_APP: return timers(app, action);
      case ROUTINE_APP: return routine(app, action);
      case STREAKS_APP: return streaks(app, action);
      case POMODORO_APP: return pomodoro(app, action);
      default: throw new Error(`Unknown app type: ${app.type}`);
    }
  });
}
