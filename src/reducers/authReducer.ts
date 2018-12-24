import { ActionTypes, AuthAction } from "../actions/types";

interface AuthState {
  isSignedIn: boolean,
  userId: string
}

const INITIAL_STATE: AuthState = {
  isSignedIn: null,
  userId: null
};

export default (state: AuthState = INITIAL_STATE, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {...state, isSignedIn: true, userId: action.payload};
    case ActionTypes.SIGN_OUT:
      return {...state, isSignedIn: false, userId: null};
    default:
      return state;
  }
};