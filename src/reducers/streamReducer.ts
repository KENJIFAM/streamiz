import { StreamAction, ActionTypes } from '../actions/types';
import { Stream } from '../model/Stream';

export interface StreamState {
  [keys: string]: Stream;
}

export default (state: StreamState = {}, action: StreamAction): StreamState => {
  switch (action.type) {
    case ActionTypes.FETCH_STREAM:
      return { ...state, [action.payload._id]: action.payload};
    case ActionTypes.CREATE_STREAM:
      return { ...state, [action.payload._id]: action.payload};
    case ActionTypes.EDIT_STREAM:
      return { ...state, [action.payload._id]: action.payload};
    case ActionTypes.FETCH_STREAMS:
      return { ...state, ...action.payload.reduce((obj, stream) => (obj[stream._id] = stream, obj), {}) };
    case ActionTypes.DELETE_STREAM:
      const { [action.payload]: undefined, ...newState } = state;
      return newState;
    default:
      return state;
  }
};