import { ActionTypes } from "./types";
import streams from '../apis/streams';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export interface SignInAction {
  type: ActionTypes.SIGN_IN,
  payload: string
}

export interface SignOutAction {
  type: ActionTypes.SIGN_OUT
}

export type CreateStreamAction = ThunkAction<Promise<void>, {}, {}, AnyAction>;

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

export const createStream = (formValues: FormData): CreateStreamAction => 
async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  const response = await streams.post('/streams', formValues);
  dispatch({
    type: ActionTypes.CREATE_STREAM,
    payload: response.data
  });
};

export type Action = SignInAction | SignOutAction;