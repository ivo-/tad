import {
  COUNTER_ADD_ITEM,
  COUNTER_REMOVE_ITEM,
  COUNTER_INCREMENT_ITEM,
} from '../../actions';

import { getUID } from '../../util';

export default function counters(state, action) {
  switch (action.type) {
    case COUNTER_ADD_ITEM:
      console.log(action);
      return {
        ...state,
        items: [
          {
            id: getUID(),
            title: action.title,
            value: 0,
            limit: action.limit,
          },
          ...state.items,
        ],
      };

    case COUNTER_REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
      };

    case COUNTER_INCREMENT_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.itemId) return item;
          return { ...item, value: item.value + 1 };
        }),
      };

    default: return state;
  }
}
