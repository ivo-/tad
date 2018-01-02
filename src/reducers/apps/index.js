import {
  TODO_APP,
  ROUTINE_APP,
} from '../../constants';

import todo from './todo';
import routine from './routine';

export default function apps(state = [], action) {
  return state.map(app => {
    switch(app.app) {
      case TODO_APP: return todo(app, action);
      case ROUTINE_APP: return routine(app, action);
      default: throw new Error(`Unknown app type: ${app.type}`);
    }
  });
}
