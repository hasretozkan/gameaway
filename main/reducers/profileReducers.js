import { PROFILE_USER_CHANGED,PROFILE_LOADING_CHANGED,PROFILE_GIVEAWAYS_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  userDetail:{},
  loading:true,
  giveaways:[]
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_USER_CHANGED:
    return { ...state, userDetail:action.payload };
    case PROFILE_LOADING_CHANGED:
    return { ...state, loading:action.payload };
    case PROFILE_GIVEAWAYS_CHANGED:
    return { ...state, giveaways:action.payload };
    default:
    return state;
  }
}
