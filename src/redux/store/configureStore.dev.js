import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import apiMiddleware from '../middleware/api_middleware'
import rootReducer from '../reducers';

import DevTools from '../../components/DevTools';

export const history = createHistory();

let enhancer;

if(window.checkMobile()){
  enhancer = compose(
    applyMiddleware(apiMiddleware)
  );
} else {
  enhancer = compose(
    applyMiddleware(apiMiddleware),
    DevTools.instrument()
  );
}

export function configureStore(initialState) {

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  if (module.hot) {
    module.hot.accept(rootReducer, () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store
}