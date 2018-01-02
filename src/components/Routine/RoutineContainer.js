import { connect } from 'react-redux'
import Routine from './Routine';

import {
  addRoutineTask,
  deleteRoutineTask,
  updateRoutineTask,
} from '../../actions'

export default connect((state, { id }) => {
  return state.apps.find(app => app.id === id);
}, {
  onAddRoutineTask: addRoutineTask,
  onDeleteRoutineTask: deleteRoutineTask,
  onUpdateRoutineTask: updateRoutineTask,
})(Routine);
