import {
  TODO_ADD_TASK,
  TODO_DELETE_TASK,
  TODO_UPDATE_TASK,
  TODO_TOGGLE_ARCHIVE_TASK,
  TODO_TOGGLE_COMPLETE_TASK,
} from '../../actions';

import { getUID, now } from '../../util';

export default function todo(state, action) {
  switch (action.type) {
    case TODO_ADD_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: [
          {
            id: getUID(),
            title: action.title,
            description: action.description || '',
            date: now(),
            done: false,
            today: action.today || false,
            archived: false,
            repeated: action.repeated || false,
          },
          ...state.items,
        ],
      };

    case TODO_TOGGLE_ARCHIVE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.taskId) return item;

          return { ...item, archived: !item.archived };
        }),
      };

    case TODO_UPDATE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.taskId) return item;
          return { ...item, ...action.fields };
        }),
      };

    case TODO_TOGGLE_COMPLETE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.taskId) return item;
          return { ...item, done: !item.done };
        }),
      };

    case TODO_DELETE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.taskId),
      };

    default: return state;
  }
}
