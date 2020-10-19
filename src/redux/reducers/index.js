import {combineReducers} from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
export default combineReducers({
    auth: authReducer,
    users: userReducer,
    tasks: taskReducer
})