import {
  TODO_APP,
} from '../../constants';

import todo from './todo';

export default function apps(state = [], action) {
  return state.map(app => {
    switch(app.app) {
      case TODO_APP: return todo(app, action);
      default: throw new Error(`Unknown app type: ${app.type}`);
    }
  });
}
