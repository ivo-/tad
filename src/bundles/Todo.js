import { partial } from 'bund';
import { TODO_APP } from '../constants';
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
  id: 1,
  app: TODO_APP,
  title: 'Tasks list',
  items: [],
};

// =============================================================================
// Actions

export function add(state, data) {
  return addItem(state, {
    id: getUID(),
    title: data.title,
    description: data.description || '',
    date: now(),
    done: false,
    today: data.today || false,
    archived: false,
    repeated: data.repeated || false,
  });
}

// =============================================================================
// Bundle

export default {
  key: 'todo',
  initialState,
  actions: {
    add,
    update: updateItem,
    remove: removeItem,
    toggleComplete: partial(toggleItemProp, 'done'),
    toggleArchived: partial(toggleItemProp, 'archived'),
  },
};
