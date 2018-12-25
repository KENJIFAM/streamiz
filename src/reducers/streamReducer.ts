import { StreamAction, ActionTypes } from "../actions/types";
import { Stream } from "../model/Stream";

export interface StreamState {
  [keys: number]: Stream
}

export default (state: StreamState = {}, action: StreamAction): StreamState => {
  switch (action.type) {
    case ActionTypes.FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload};
    case ActionTypes.CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload};
    case ActionTypes.EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload};
    case ActionTypes.FETCH_STREAMS:
      const newState: StreamState = { ...state };
      action.payload.forEach(stream => newState[stream.id] = stream);
      return newState;
    case ActionTypes.DELETE_STREAM:
      return { ...state, [action.payload]: undefined};
    default:
      return state;
  }
};