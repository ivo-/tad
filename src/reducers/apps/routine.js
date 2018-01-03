import {
  ROUTINE_ADD_TASK,
  ROUTINE_DELETE_TASK,
  ROUTINE_UPDATE_TASK,
  ROUTINE_ADD_HISTORY
} from '../../actions';

import { getUID } from '../../util';

export default function todo(state, action) {
  switch (action.type) {
    case ROUTINE_ADD_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: [
          {
            id: getUID(),
            title: action.title,
            duration: action.duration,
            description: action.description || '',
            date: new Date(),
          },
          ...state.items,
        ],
      };

    case ROUTINE_DELETE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.taskId),
      };

    case ROUTINE_UPDATE_TASK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.taskId) return item;

          return { ...item, ...action.fields };
        }),
      };

    case ROUTINE_ADD_HISTORY:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        history: [...state.history, {
          start: action.start,
          end: action.end,
        }]
      };

    default: return state;
  }
}
