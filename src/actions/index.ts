import streams from '../apis/streams';
import { ThunkDispatch } from "redux-thunk";
import { Stream } from 'stream';
import { 
  ActionTypes, 
  SignInAction, 
  SignOutAction, 
  StreamThunkAction, 
  CreateStreamAction, 
  FetchStreamsAction, 
  FetchStreamAction,
  EditStreamAction,
  DeleteStreamAction
} from "./types";
import { AppState } from '../reducers';

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

export const createStream = (formValues: FormData): StreamThunkAction<CreateStreamAction> =>
async (dispatch: ThunkDispatch<{}, {}, CreateStreamAction>, getState: () => AppState): Promise<void> => {
  const { userId }: { userId: string } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });
  dispatch({
    type: ActionTypes.CREATE_STREAM,
    payload: response.data
  });
};

export const fetchStreams = (): StreamThunkAction<FetchStreamsAction> =>
async (dispatch: ThunkDispatch<{}, {}, FetchStreamsAction>): Promise<void> => {
  const response = await streams.get('/streams');
  dispatch({
    type: ActionTypes.FETCH_STREAMS,
    payload: response.data
  });
};

export const fetchStream = (id: number): StreamThunkAction<FetchStreamAction> =>
async (dispatch: ThunkDispatch<{}, {}, FetchStreamAction>): Promise<void> => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: ActionTypes.FETCH_STREAM,
    payload: response.data
  });
};

export const editStream = (id: number, formValues: Stream): StreamThunkAction<EditStreamAction> =>
async (dispatch: ThunkDispatch<{}, {}, EditStreamAction>): Promise<void> => {
  const response = await streams.put(`/streams/${id}`, formValues);
  dispatch({
    type: ActionTypes.EDIT_STREAM,
    payload: response.data
  });
};

export const deleteStream = (id: number): StreamThunkAction<DeleteStreamAction> =>
async (dispatch: ThunkDispatch<{}, {}, DeleteStreamAction>): Promise<void> => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: ActionTypes.DELETE_STREAM,
    payload: id
  });
};