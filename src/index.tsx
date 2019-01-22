import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, Action, Store } from 'redux';
import thunk from 'redux-thunk';
import './styles/index.css';

import App from './components/App';
import reducers, { AppState } from './reducers';

// @ts-ignore: Property does not exist on type 'Window'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<AppState, Action> = createStore<AppState, Action, {}, {}>(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);