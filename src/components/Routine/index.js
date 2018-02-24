import { connect, bundle, comp } from 'bund';

import Routine from './Routine';
import { Routine as RoutineBundle } from '../../bundles';
import { editable, addForm } from '../../bundles/localState';

export default comp(
  connect(RoutineBundle, {
    select: state => ({ ...state }),

    selectOnce: (_, { add, remove, update, addHistory }) => ({
      onAddRoutineTask: add,
      onDeleteRoutineTask: remove,
      onUpdateRoutineTask: update,
      onAddRoutineHistory: addHistory,
    }),
  }),
  connect(bundle(addForm), { selectAll: true }),
  connect(bundle(editable), { selectAll: true })
)(Routine);
