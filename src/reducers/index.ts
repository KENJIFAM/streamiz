import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import streamReducer, { StreamState } from './streamReducer';

export interface AppState {
  auth: AuthState,
  form: FormStateMap,
  streams: StreamState
}

export default combineReducers<AppState>({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer
});