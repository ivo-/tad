import { connect, bundle, comp } from 'bund';

import Timers from './Timers';
import { Timers as TimersBundle } from '../../bundles';
import { editable, addForm } from '../../bundles/localState';

export default comp(
  connect(TimersBundle, {
    select: state => ({ ...state }),

    selectOnce: (_, { add, remove, update, addHistory }) => ({
      onAddTimer: add,
      onDeleteTimer: remove,
      onUpdateTimer: update,
      onAddTimerHistory: addHistory,
    })
  }),
  connect(bundle(addForm), { selectAll: true }),
  connect(bundle(editable), { selectAll: true})
)(Timers);
