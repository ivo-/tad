import { setval, EACH, AFTER_ELEM } from 'navx';
import { addItem, updateItem, removeItem } from './shared';
import { getUID, now } from '../util';
import { TIMERS_APP } from '../constants';

// =============================================================================
// Initial state

const initialState = {
  id: 21,
  app: TIMERS_APP,
  title: 'Continuous Activities',
  items: [],
};

// =============================================================================
// Actions

export function add(state, title) {
  return addItem(state, {
    id: getUID(),
    title,
    date: now,
    history: [],
  });
}

export function addHistory(state, id, { start, end }) {
  return setval(
    ['items', EACH, item => item.id === id, 'history', AFTER_ELEM],
    { start, end },
    state
  );
}

// =============================================================================
// Bundle

export default {
  key: 'timers',
  initialState,
  actions: {
    add,
    update: updateItem,
    remove: removeItem,
    addHistory,
  },
};
