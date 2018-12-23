import { ActionTypes } from "./types";

export interface SignInAction {
  type: ActionTypes.SIGN_IN,
  payload: string
}

export interface SignOutAction {
  type: ActionTypes.SIGN_OUT
}

export const signIn = (userId: string): SignInAction => {
  return {
    type: ActionTypes.SIGN_IN,
    payload: userId
  }
};

export const signOut = (): SignOutAction => {
  return {
    type: ActionTypes.SIGN_OUT
  }
};

export type Action = SignInAction | SignOutAction;