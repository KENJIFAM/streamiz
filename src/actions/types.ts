import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Stream } from '../model/Stream';

export enum ActionTypes {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  CREATE_STREAM = 'CREATE_STREAM',
  FETCH_STREAMS = 'FETCH_STREAMS',
  FETCH_STREAM = 'FETCH_STREAM',
  DELETE_STREAM = 'DELETE_STREAM',
  EDIT_STREAM = 'EDIT_STREAM'
}

export interface SignInAction {
  type: ActionTypes.SIGN_IN;
  payload: string;
}

export interface SignOutAction {
  type: ActionTypes.SIGN_OUT;
}

export interface CreateStreamAction {
  type: ActionTypes.CREATE_STREAM;
  payload: Stream;
}

export interface FetchStreamsAction {
  type: ActionTypes.FETCH_STREAMS;
  payload: Stream[];
}

export interface FetchStreamAction {
  type: ActionTypes.FETCH_STREAM;
  payload: Stream;
}

export interface DeleteStreamAction {
  type: ActionTypes.DELETE_STREAM;
  payload: string;
}

export interface EditStreamAction {
  type: ActionTypes.EDIT_STREAM;
  payload: Stream;
}

export type StreamThunkAction<T extends AnyAction> = ThunkAction<Promise<void>, {}, {}, T>;

export type AuthAction = SignInAction | SignOutAction;

export type StreamAction = CreateStreamAction | FetchStreamAction |
  FetchStreamsAction | EditStreamAction | DeleteStreamAction;