import { connect, bundle, comp } from 'bund';

import Streaks from './Streaks';
import { Streaks as StreaksBundle } from '../../bundles';
import { editable, addForm } from '../../bundles/localState';

export default comp(
  connect(StreaksBundle, {
    select: state => ({ ...state }),

    selectOnce: (_, { add, remove, update, toggleHistoryItem }) => ({
      onAddStreak: add,
      onDeleteStreak: remove,
      onUpdateStreak: update,
      onToggleStreakHistory: toggleHistoryItem,
    }),
  }),
  connect(bundle(addForm), { selectAll: true }),
  connect(bundle(editable), { selectAll: true })
)(Streaks);
