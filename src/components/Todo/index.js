import { connect, bundle, comp } from 'bund';

import Todo from './Todo';
import { Todo as TodoBundle } from '../../bundles';
import { addForm } from '../../bundles/localState';

export default comp(
  connect(TodoBundle, {
    select: state => ({ ...state }),

    selectOnce: (
      _,
      { add, remove, update, toggleArchived, toggleComplete }
    ) => ({
      onAdd: add,
      onDelete: remove,
      onUpdate: update,
      onToggleArchive: toggleArchived,
      onToggleComplete: toggleComplete,
    }),
  }),
  connect(bundle(addForm), { selectAll: true }),
)(Todo);
