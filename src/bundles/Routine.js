import {
  addItem,
  updateItem,
  removeItem,
  addHistory,
} from './shared';
import { ROUTINE_APP } from '../constants';
import { getUID, now } from '../util';

// =============================================================================
// Initial state

const initialState = {
  id: 11,
  app: ROUTINE_APP,
  title: 'Morning routine',
  items: [],
  history: [],
};

// =============================================================================
// Actions

export function add(state, data) {
  return addItem(state, {
    id: getUID(),
    title: data.title,
    duration: data.duration,
    description: data.description || '',
    date: now(),
  });
}

// =============================================================================
// Bundle

export default {
  key: 'routine',
  initialState,
  actions: {
    add,
    update: updateItem,
    remove: removeItem,
    addHistory,
  },
};
