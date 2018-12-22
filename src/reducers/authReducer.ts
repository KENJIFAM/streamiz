import { Action } from "../actions";
import { ActionTypes } from "../actions/types";

interface State {
  isSignedIn: boolean,
  userId: string
}

const INITIAL_STATE: State = {
  isSignedIn: null,
  userId: null
}

export default (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {...state, isSignedIn: true, userId: action.payload};
    case ActionTypes.SIGN_OUT:
      return {...state, isSignedIn: false, userId: null};
    default:
      return state;
  }
}