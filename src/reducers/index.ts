import { combineReducers } from 'redux';
import authReducer from './authReducer';

export interface State {
  auth: {
    isSignedIn: boolean
  }
}

export default combineReducers({
  auth: authReducer
});