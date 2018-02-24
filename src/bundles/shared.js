/**
 * Generic data transformations.
 */

import { setval, transform, EACH, AFTER_ELEM } from 'navx';

// =============================================================================
// Items
//
//   Generic data transformation functions for data that works with items.
//
//   Expected structure: { items: [{ id: 1, ...}] }
//
//

export function addItem(state, item) {
  return setval(['items', AFTER_ELEM], item, state);
}

export function toggleItemProp(prop, state, id) {
  return transform(
    ['items', EACH, item => item.id === id, prop],
    v => !v,
    state
  );
}

export function updateItem(state, id, fields) {
  return transform(
    ['items', EACH, item => item.id === id],
    v => ({ ...v, ...fields }),
    state
  );
}

export function removeItem(state, id) {
  return transform(['items'], v => v.filter(item => item.id !== id), state);
}

// =============================================================================
// History
//
//   Generic data transformation functions for data that works with history.
//
//   Expected structure: { history: [{ start: Date, end: Date }] }
//

export function addHistory(state, { start, end }) {
  return setval(['history', AFTER_ELEM], { start, end }, state);
}
