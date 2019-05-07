import { GIVEAWAYS_CHANGED,HOME_LOADING_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  giveaways:[],
  loading:true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GIVEAWAYS_CHANGED:
    return { ...state, giveaways:action.payload };
    case HOME_LOADING_CHANGED:
    return { ...state, loading:false };
    default:
    return state;
  }
}
