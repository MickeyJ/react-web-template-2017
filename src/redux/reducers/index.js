import { combineReducers } from 'redux'
import { DESTROY_ALL } from '../actions/types'

import loading from './loading_reducer'
import windowSize from './window_size_reducer'

const appReducer =  combineReducers({
  loading,
  windowSize,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_ALL) {
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer
