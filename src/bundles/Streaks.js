import {
  multi,
  setval,
  transform,
  selectOne,
  EACH,
  AFTER_ELEM,
} from 'navx';

import { STREAKS_APP } from '../constants';
import { getUID, now } from '../util';
import {
  addItem,
  updateItem,
  removeItem,
} from './shared';

// =============================================================================
// Initial state

const initialState = {
  id: 31,
  app: STREAKS_APP,
  title: 'My Streaks',
  items: [],
};

// =============================================================================
// Actions

export function add(state, title) {
  return addItem(state, {
    id: getUID(),
    title: title,
    date: now(),
    history: [],
  });
}

export function toggleHistoryItem(state, id, date) {
  const historyRoute = ['items', EACH, item => item.id === id, 'history'];

  if (selectOne([...historyRoute, EACH, d => d === date], state)) {
    return transform(historyRoute, v => v.filter(d => d !== date), state);
  }

  return multi(
    setval([...historyRoute, AFTER_ELEM], date),
    transform(historyRoute, v => v.slice().sort()),

    state
  );
}

// =============================================================================
// Bundle

export default {
  key: 'streaks',
  initialState,
  actions: {
    add,
    update: updateItem,
    remove: removeItem,
    toggleHistoryItem,
  },
};
