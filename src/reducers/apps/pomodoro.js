import {
  POMODORO_ADD,
  POMODORO_REMOVE,
  POMODORO_UPDATE,
  POMODORO_TOGGLE_ACHIEVE,

  POMODORO_ADD_TASK,
  POMODORO_EDIT_TASK,
  POMODORO_DELETE_TASK,
  POMODORO_TOGGLE_TASK,
} from '../../actions';

import { getUID, now } from '../../util';

export default function pomodoro(state, action) {
  switch (action.type) {
    case POMODORO_ADD:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: [
          {
            id: getUID(),
            title: action.title,
            description: action.description || '',
            duration: 1000 * 60 * 45,
            tasks: [],
            date: now(),
            started: null,
            stopped: null,
            ended: null,
            archived: false,
          },
          ...state.items,
        ],
      };

    case POMODORO_UPDATE:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.pomodoroId) return item;
          return { ...item, ...action.fields };
        }),
      };

    case POMODORO_REMOVE:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.pomodoroId),
      };

    case POMODORO_TOGGLE_ACHIEVE:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.pomodoroId) return item;
          return { ...item, archived: !item.archived };
        }),
      };

    case POMODORO_ADD_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.pomodoroId) return item;
          return {
            ...item,
            tasks: [
              ...item.tasks,
              {
                id: getUID(),
                title: action.title,
                date: now(),
                done: false,
              }
            ]
          };
        }),
      };

    case POMODORO_DELETE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.pomodoroId) return item;
          return {
            ...item,
            tasks: item.tasks.filter(t => t.id !== action.taskId)
          };
        }),
      };

    case POMODORO_TOGGLE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.pomodoroId) return item;
          return {
            ...item,
            tasks: item.tasks.map(t => {
              if(t.id !== action.taskId) return t;

              return {
                ...t,
                done: !t.done,
              }
            })
          };
        }),
      };

    case POMODORO_EDIT_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.pomodoroId) return item;
          return {
            ...item,
            tasks: item.tasks.map(t => {
              if(t.id !== action.taskId) return t;

              return {
                ...t,
                title: action.title,
              }
            })
          };
        }),
      };

    default: return state;
  }
}
