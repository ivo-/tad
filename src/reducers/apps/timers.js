import {
  TIMERS_ADD_TIMER,
  TIMERS_DELETE_TIMER,
  TIMERS_UPDATE_TIMER,
  TIMERS_ADD_HISTORY,
} from '../../actions';

import { getUID } from '../../util';

export default function timers(state, action) {
  switch (action.type) {
    case TIMERS_ADD_TIMER:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: [
          {
            id: getUID(),
            title: action.title,
            date: new Date(),
            history: [],
          },
          ...state.items,
        ],
      };

    case TIMERS_DELETE_TIMER:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.timerId),
      };

    case TIMERS_UPDATE_TIMER:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.timerId) return item;
          return { ...item, title: action.title };
        }),
      };

    case TIMERS_ADD_HISTORY:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.timerId) return item;
          return {
            ...item,
            history: [
              ...item.history, {
                start: action.start,
                end: action.end,
              },
            ],
          };
        }),
      };

    default: return state;
  }
}
