import { connect } from 'react-redux'
import Counter from './Counter';

import {
  addCounterItem,
  removeCounterItem,
  incrementCounterItem
} from '../../actions';

export default connect((state, { id }) => {
  return state.apps.find(app => app.id === id);
}, {
  addCounterItem,
  removeCounterItem,
  incrementCounterItem,
})(Counter);
