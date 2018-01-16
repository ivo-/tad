import { connect } from 'react-redux'
import Pomodoro from './Pomodoro';

import {
  addPomodoro,
  removePomodoro,
  updatePomodoro,
  toggleArchivePomodoro,

  addPomodoroTask,
  editPomodoroTask,
  deletePomodoroTask,
  togglePomodoroTask,
} from '../../actions'

export default connect((state, { id }) => {
  return state.apps.find(app => app.id === id);
}, {
  onAddPomodoro: addPomodoro,
  onRemovePomodoro: removePomodoro,
  onUpdatePomodoro: updatePomodoro,
  onToggleArchivePomodoro: toggleArchivePomodoro,

  onAddPomodoroTask: addPomodoroTask,
  onEditPomodoroTask: editPomodoroTask,
  onDeletePomodoroTask: deletePomodoroTask,
  onTogglePomodoroTask: togglePomodoroTask,
})(Pomodoro);
