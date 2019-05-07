import { EMAIL_CHANGED,PASSWORD_CHANGED,LOADING_CHANGED,LOGIN_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  email:'',
  password:'',
  loading:true,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
    return { ...state, email:action.payload };
    case PASSWORD_CHANGED:
    return { ...state, password:action.payload };
    case LOADING_CHANGED:
    return { ...state, loading:false };
    case LOGIN_CHANGED:
    return { ...state, loading:true };
    default:
    return state;
  }
}
