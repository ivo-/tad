import { connect, bundle, comp } from 'bund';

import Routine from './Routine';
import { Routine as RoutineBundle } from '../../bundles';
import { editable, addForm } from '../../bundles/localState';

export default comp(
  connect(RoutineBundle, {
    select: state => ({ ...state }),

    selectOnce: (_, { add, remove, update, addHistory }) => ({
      onAddTask: add,
      onDeleteTask: remove,
      onUpdateTask: update,
      onAddHistory: addHistory,
    }),
  }),
  connect(bundle(addForm), { selectAll: true }),
  connect(bundle(editable), { selectAll: true })
)(Routine);
