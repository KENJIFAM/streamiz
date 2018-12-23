import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer, FormStateMap } from 'redux-form';

export interface AppState {
  auth: {
    isSignedIn: boolean,
    userId: string
  },
  form: FormStateMap
}

export default combineReducers<AppState>({
  auth: authReducer,
  form: formReducer
});