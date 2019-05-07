import { EMAIL_CHANGED_SIGN_UP, PASSWORD_CHANGED_SIGN_UP, LOADING_SUCCES_CHANGED, LOADING_FAIL_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  email:'',
  password:'',
  loading:false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED_SIGN_UP:
    return { ...state, email:action.payload };
    case PASSWORD_CHANGED_SIGN_UP:
    return { ...state, password:action.payload };
    case LOADING_SUCCES_CHANGED:
    return { ...state, loading:true };
    case LOADING_FAIL_CHANGED:
    return { ...state, loading:false };
    default:
    return state;
  }
}
