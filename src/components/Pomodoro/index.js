import { connect, bundle, comp } from 'bund';

import Pomodoro from './Pomodoro';
import { Pomodoro as PomodoroBundle } from '../../bundles';
import { editable, addForm } from '../../bundles/localState';

export default comp(
  connect(PomodoroBundle, {
    select: state => ({ ...state }),

    selectOnce: (
      _,
      {
        add,
        update,
      }
    ) => ({
      onAdd: add,
      onUpdate: update,
    }),
  }),
  connect(bundle(addForm), { selectAll: true }),
  connect(bundle(editable), { selectAll: true })
)(Pomodoro);
