import { now } from './util';

// =============================================================================
// Applications

export const TODO_APP = 'TODO_APP';
export const TIMERS_APP = 'TIMERS_APP';
export const ROUTINE_APP = 'ROUTINE_APP';
export const STREAKS_APP = 'STREAKS_APP';

// =============================================================================
// Templates

export const TODO_LIST_ITEM_TEMPLATE = {
  id: 'number',
  title: 'string',
  description: 'string',
  date: 'number',
  done: 'boolean',
};

export const TODO_LIST_TEMPLATE = {
  id: 'number',
  title: 'string',
};

export const STREAK_TEMPLATE = {
  id: 'number',
  title: 'string',
  description: 'string',
  date: 'number',
  history: 'object', // date => 0, 1, 2
};

export const ROUTINE_TEMPLATE = {
  id: 'number',
  title: 'string',
  description: 'string',
  date: 'number',
  todos: {
    id: 'number',
    title: 'string',
    description: 'string',
    date: 'number',
    done: 'boolean',
    duration: 'number', // in seconds
  },
};

// =============================================================================
// TODO

export const TODAY_LIST = 'TODAY_LIST';
export const SOMEDAY_LIST = 'SOMEDAY_LIST';
export const ARCHIVE_LIST = 'ARCHIVE_LIST';
export const REPEATED_LIST = 'REPEATED_LIST';

// =============================================================================
// Streaks

export const STREAK_DONE = 0;
export const STREAK_SKIP = 2;
export const STREAK_NOT_DONE = 1;

// =============================================================================
// Default state

export const defaultState = {
  user: {
    id: null,
    name: null,
    settings: {},
  },

  apps: [{
    id: 1,
    app: TODO_APP,
    title: 'Tasks list',
    items: [{
      id: 2,
      title: 'Clean up',
      description: '---',
      date: now(),
      done: false,
      archived: false,
      today: true,
      repeated: false,
    }, {
      id: 3,
      title: 'Clean up done',
      description: '---|||',
      date: now(),
      done: true,
      archived: false,
      today: true,
      repeated: false,
    }, {
      id: 4,
      title: 'Clean up someday',
      description: '---|||---',
      date: now(),
      done: false,
      archived: false,
      today: true,
      repeated: false,
    }, {
      id: 5,
      title: 'Repeated daily',
      description: '---|||---',
      date: now(),
      done: false,
      archived: false,
      today: true,
      repeated: true,
    }],
  }, {
    id: 11,
    app: ROUTINE_APP,
    title: 'Morning routine',
    items: [{
      id: 12,
      title: 'Wash your face and teeth',
      description: '---',
      duration: 1000 * 60 * 5,
      date: now(),
    }, {
      id: 13,
      title: 'Cleanup your room',
      description: '---',
      duration: 1000 * 60 * 5,
      date: now(),
    }, {
      id: 14,
      title: 'Meditate',
      description: '---',
      duration: 1000 * 60 * 10,
      date: now(),
    }, {
      id: 15,
      title: 'Dress up and get ready to go out',
      description: '---',
      duration: 1000 * 60 * 10,
      date: now(),
    }, {
      id: 16,
      title: 'Make breakfast',
      description: '---',
      duration: 1000 * 60 * 20,
      date: now(),
    }],
    history: [{
      start: now(),
      end: now(),
    }],
  }, {
    id: 21,
    app: TIMERS_APP,
    title: 'Continuous Activities',
    items: [{
      id: 22,
      title: 'Meditation',
      date: now(),
      history: [{
        start: now() - 1000 * 60 * 10,
        end: now(),
      }],
    }],
  }, {
    id: 31,
    app: STREAKS_APP,
    title: 'My Streaks',
    items: [{
      id: 32,
      title: 'Meditation',
      date: now(),
      history: [],
    }],
  }
],
}
