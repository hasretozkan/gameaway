import { EARNGCA_USER_CHANGED,EARNGCA_LOADING_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  userInfo:{},
  loading:true,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EARNGCA_USER_CHANGED:
    return { ...state, userInfo:action.payload };
    case EARNGCA_LOADING_CHANGED:
    return { ...state, loading:action.payload };
    default:
    return state;
  }
}
