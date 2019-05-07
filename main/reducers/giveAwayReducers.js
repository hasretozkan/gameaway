import { GIVEAWAY_CHANGED, GIVEAWAY_LOADING_CHANGED, GIVEAWAY_USER_INFO_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  giveaway:{},
  loading:true,
  userInfo:{}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GIVEAWAY_CHANGED:
    return { ...state, giveaway:action.payload };
    case GIVEAWAY_LOADING_CHANGED:
    return { ...state, loading:action.payload };
    case GIVEAWAY_USER_INFO_CHANGED:
    return { ...state, userInfo:action.payload };
    default:
    return state;
  }
}
