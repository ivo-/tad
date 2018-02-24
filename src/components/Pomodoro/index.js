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
        remove,
        update,
        toggleArchived,
        addTask,
        removeTask,
        toggleTask,
        updateTask,
      }
    ) => ({
      onAddPomodoro: add,
      onRemovePomodoro: remove,
      onUpdatePomodoro: update,
      onToggleArchivePomodoro: toggleArchived,

      onAddPomodoroTask: addTask,
      onEditPomodoroTask: updateTask,
      onDeletePomodoroTask: removeTask,
      onTogglePomodoroTask: toggleTask,
    }),
  }),
  connect(bundle(addForm), { selectAll: true }),
  connect(bundle(editable), { selectAll: true })
)(Pomodoro);
