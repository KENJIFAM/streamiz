import streams from '../apis/streams';
import { ThunkDispatch } from "redux-thunk";
import { AppState } from '../reducers';
import history from '../history';
import { FormData } from '../components/streams/StreamForm';
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
  history.push('/');
};

export const fetchStreams = (): StreamThunkAction<FetchStreamsAction> =>
async (dispatch: ThunkDispatch<{}, {}, FetchStreamsAction>): Promise<void> => {
  const response = await streams.get('/streams');
  dispatch({
    type: ActionTypes.FETCH_STREAMS,
    payload: response.data
  });
};

export const fetchStream = (id: string): StreamThunkAction<FetchStreamAction> =>
async (dispatch: ThunkDispatch<{}, {}, FetchStreamAction>): Promise<void> => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: ActionTypes.FETCH_STREAM,
    payload: response.data
  });
};

export const editStream = (id: string, formValues: FormData): StreamThunkAction<EditStreamAction> =>
async (dispatch: ThunkDispatch<{}, {}, EditStreamAction>): Promise<void> => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({
    type: ActionTypes.EDIT_STREAM,
    payload: response.data
  });
  history.push('/');
};

export const deleteStream = (id: string): StreamThunkAction<DeleteStreamAction> =>
async (dispatch: ThunkDispatch<{}, {}, DeleteStreamAction>): Promise<void> => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: ActionTypes.DELETE_STREAM,
    payload: id
  });
};