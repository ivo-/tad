import {
  STREAKS_ADD_STREAK,
  STREAKS_DELETE_STREAK,
  STREAKS_UPDATE_STREAK,
  STREAKS_TOGGLE_STREAK_HISTORY,
} from '../../actions';

import { getUID, now } from '../../util';

export default function streaks(state, action) {
  switch (action.type) {
    case STREAKS_ADD_STREAK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: [
          {
            id: getUID(),
            title: action.title,
            date: now(),
            history: [],
          },
          ...state.items,
        ],
      };

    case STREAKS_DELETE_STREAK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.streakId),
      };

    case STREAKS_UPDATE_STREAK:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.streakId) return item;
          return { ...item, title: action.title };
        }),
      };

    case STREAKS_TOGGLE_STREAK_HISTORY:
      if(state.id !== action.appId) return state;

      return {
        ...state,
        items: state.items.map((item) => {
          if(item.id !== action.streakId) return item;

          if(item.history.includes(action.date)) {
            return {
              ...item,
              history: item.history.filter(d => d !== action.date)
            };
          }

          return {
            ...item,
            history: [
              ...item.history, action.date
            ].sort()
          };
        }),
      };

    default: return state;
  }
}
