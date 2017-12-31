import { combineReducers } from 'redux';

import apps from './apps/index';
import user from './user';

export default combineReducers({
  apps,
  user,
});
