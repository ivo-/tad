import {
  TODO_APP,
  TIMERS_APP,
  ROUTINE_APP,
  STREAKS_APP,
  COUNTER_APP,
} from '../../constants';

import todo from './todo';
import timers from './timers';
import routine from './routine';
import streaks from './streaks';
import counters from './counters';

export default function apps(state = [], action) {
  return state.map(app => {
    switch(app.app) {
      case TODO_APP: return todo(app, action);
      case TIMERS_APP: return timers(app, action);
      case ROUTINE_APP: return routine(app, action);
      case STREAKS_APP: return streaks(app, action);
      case COUNTER_APP: return counters(app, action);
      default: throw new Error(`Unknown app type: ${app.type}`);
    }
  });
}
