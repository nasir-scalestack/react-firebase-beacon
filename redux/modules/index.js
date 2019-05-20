import { combineReducers } from 'redux';

import auth from './auth';
import beacons from './beacons';

const rootReducer = combineReducers({
    auth,
    beacons
});

export default rootReducer;