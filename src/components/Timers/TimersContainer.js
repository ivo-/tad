import { connect } from 'react-redux'
import Timers from './Timers';

import {
  addTimer,
  deleteTimer,
  updateTimer,
  addTimerHistory,
} from '../../actions'

export default connect((state, { id }) => {
  return state.apps.find(app => app.id === id);
}, {
  onAddTimer: addTimer,
  onDeleteTimer: deleteTimer,
  onUpdateTimer: updateTimer,
  onAddTimerHistory: addTimerHistory,
})(Timers);
