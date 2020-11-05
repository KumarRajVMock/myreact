import {combineReducers} from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
import noteReducer from './noteReducer';
export default combineReducers({
    auth: authReducer,
    users: userReducer,
    tasks: taskReducer,
    notes: noteReducer
})