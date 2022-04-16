import { combineReducers } from 'redux';
import adminReducer from './admin';
import userReducer from './user';

export default combineReducers({
    admin: adminReducer,
    user: userReducer
})