import { connect } from 'react-redux'
import Todo from './Todo';

import {
  addTodoTask,
  deleteTodoTask,
  updateTodoTask,
  toggleArchiveTodoTask,
  toggleCompleteTodoTask,
} from '../../actions'

export default connect((state, { id }) => {
  return state.apps.find(app => app.id === id);
}, {
  onAddTodoTask: addTodoTask,
  onDeleteTodoTask: deleteTodoTask,
  onUpdateTodoTask: updateTodoTask,
  onToggleArchiveTodoTask: toggleArchiveTodoTask,
  onToggleCompleteTodoTask: toggleCompleteTodoTask,
})(Todo);
