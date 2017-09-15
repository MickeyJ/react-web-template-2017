import {
  SET_WINDOW_SIZE,
} from '../actions/types'

const WINDOW_SIZE = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const INITIAL_ACTION = { type: '' };

export default function(state=WINDOW_SIZE(), action=INITIAL_ACTION) {

  switch(action.type){

    case SET_WINDOW_SIZE:
      return WINDOW_SIZE();

    default:
      return state
  }

}
