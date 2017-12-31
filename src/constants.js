// =============================================================================
// Applications

export const TODO_APP = 'TODO_APP';

// =============================================================================
// Templates

export const TODO_LIST_ITEM_TEMPLATE = {
  id: 'number',
  listId: 'number',
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

export const POMODORO_LIST = 'POMODORO_LIST';
export const REPEATED_LIST = 'REPEATED_LIST';

// =============================================================================
// Streaks

export const STREAK_DONE = 0;
export const STREAK_NOT_DONE = 1;
export const STREAK_SKIP = 2;

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
    items: [{
      id: 2,
      listId: 5,
      title: 'Clean up',
      description: '---',
      date: new Date(),
      done: false,
      archived: false,
    }, {
      id: 3,
      listId: 5,
      title: 'Clean up done',
      description: '---|||',
      date: new Date(),
      done: true,
      archived: false,
    }, {
      id: 4,
      listId: 5,
      title: 'Clean up someday',
      description: '---|||---',
      date: new Date(),
      done: false,
      archived: false,
    }],
    lists: [{
      id: 5,
      title: 'Today',
    }, {
      id: 6,
      title: 'Someday',
    }],
    itemsArchive: [],
    listsArchive: [],

    // =======================================================================
    // TODO:
    //
    //   - [ ] repeating tasks weekly and select list to add the task
    //
    repeated: [],

    // =======================================================================
    // TODO:
    //
    //   - [ ] Stats - pomodors per day, descriptions after pomodoro
    //
    // pomodoro: {
    //   current: null,
    //   archive: [],
    // },
  }]

  // apps: {
    // streak: {
    //   items: [],
    //   archive: [],
    // },

    // TODO:
    //
    //  - [ ] Routine streak view
    //  - [ ] Morning routine
    //  - [ ] Other routine as todo item
    //
    // routine: {
    //   items: [],
    //   archive: [],

    //   // =======================================================================
    //   play: {
    //     routineId: 1,
    //     time: 0,

    //   }
    // }
  // }
}
