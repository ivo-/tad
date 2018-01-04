import { connect } from 'react-redux'
import Streaks from './Streaks';

import {
  addStreak,
  deleteStreak,
  updateStreak,
  addStreakHistory,
} from '../../actions'

export default connect((state, { id }) => {
  return state.apps.find(app => app.id === id);
}, {
  onAddStreak: addStreak,
  onDeleteStreak: deleteStreak,
  onUpdateStreak: updateStreak,
  onAddStreakHistory: addStreakHistory,
})(Streaks);
