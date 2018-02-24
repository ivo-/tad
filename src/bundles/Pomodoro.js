import {
  setval,
  transform,
  EACH,
  AFTER_ELEM,
} from 'navx';
import { partial } from 'bund';

import { POMODORO_APP } from '../constants';
import { getUID, now } from '../util';
import {
  addItem,
  updateItem,
  removeItem,
  toggleItemProp,
} from './shared';

// =============================================================================
// Initial state

const initialState = {
  id: 41,
  app: POMODORO_APP,
  title: 'Work pomodoro shit',
  break: 1000 * 60 * 15,
  duration: 1000 * 60 * 45,
  items: [],
};

// =============================================================================
// Actions

export function add(state, data) {
  return addItem(state, {
    id: getUID(),
    title: data.title,
    description: data.description || '',
    duration: 1000 * 60 * 45,
    tasks: [],
    date: now(),
    started: null,
    stpopped: null,
    ended: null,
    archived: false,
  });
}

const itemRoute = id =>
  ['items', EACH, item => item.id === id];

const tasksRoute = id =>
  [...itemRoute(id), 'tasks'];

const taskRoute = (id, taskId) =>
  [...tasksRoute(id), item => item.id !== taskId];

export function addTask(state, id, title) {
  return setval([...tasksRoute(id), AFTER_ELEM], {
    id: getUID(),
    title: title,
    date: now(),
    done: false,
  }, state);
}

export function removeTask(state, id, taskId) {
  return transform(
    tasksRoute(id),
    v => v.filter(item => item.id !== taskId),
    state
  );
}

export function toggleTask(state, id, taskId) {
  return transform(
    [taskRoute(id, taskId), 'done'],
    v => !v,
    state
  );
}

export function updateTask(state, id, taskId, title) {
  return transform(
    taskRoute(id, taskId),
    v => ({ ...v, title }),
    state
  );
}

// =============================================================================
// Bundle

export default {
  key: 'pomodoro',
  initialState,
  actions: {
    add,
    update: updateItem,
    remove: removeItem,
    toggleArchived: partial(toggleItemProp, 'archived'),
    addTask,
    removeTask,
    toggleTask,
    updateTask,
  },
};
