import { connect } from 'bund';

import PomodoroItem from './PomodoroItem';
import { Pomodoro as PomodoroBundle } from '../../../bundles';

export default connect(
  PomodoroBundle,
  {
    select: ({ items }, __, { id }) => ({ item: items.find(i => i.id === id) }),

    selectOnce: (
      _,
      {
        update,
        remove,
        toggleArchived,
        addTask,
        removeTask,
        toggleTask,
        updateTask,
      },
      { id, onEdit, onStart }
    ) => ({
      onEdit: onEdit.bind(this, id),
      onStart: onStart.bind(this, id),
      onDelete: remove.bind(this, id),
      onAddTask: addTask.bind(this, id),
      onEditTask: updateTask.bind(this, id),
      onDeleteTask: removeTask.bind(this, id),
      onToggleTask: toggleTask.bind(this, id),
      onToggleArchive: toggleArchived.bind(this, id),
    }),
  },
  PomodoroItem
);
