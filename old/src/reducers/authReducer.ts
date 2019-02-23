import { ActionTypes, AuthAction } from '../actions/types';
import { User } from '../model/User';

export interface AuthState {
  isSignedIn: boolean;
  user: User;
}

const INITIAL_STATE: AuthState = {
  isSignedIn: undefined,
  user: undefined
};

export default (state: AuthState = INITIAL_STATE, action: AuthAction): AuthState => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {...state, isSignedIn: true, user: action.payload};
    case ActionTypes.SIGN_OUT:
      return {...state, isSignedIn: false, user: undefined};
    default:
      return state;
  }
};