// reducers.js
import { combineReducers } from 'redux';
import userStatusReducer from './userStatusReducer'; // Import userStatusReducer if it's in a separate file
import userReducer from './userReducer'; // Import userReducer

const rootReducer = combineReducers({
  userStatus: userStatusReducer,
  user: userReducer, 
});

export default rootReducer;
