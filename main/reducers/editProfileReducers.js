import { EDITPROFILE_USER_CHANGED, EDITPROFILE_LOADING_CHANGED,EDITPROFILE_NAME_CHANGED,EDITPROFILE_USERNAME_CHANGED  } from '../actions/types';

const INITIAL_STATE = {
  userInfo:{},
  loading:true,
  first_name:'',
  username:''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDITPROFILE_USER_CHANGED:
    return { ...state, userInfo:action.payload };
    case EDITPROFILE_LOADING_CHANGED:
    return { ...state, loading:action.payload };
    case EDITPROFILE_NAME_CHANGED:
    return { ...state, first_name:action.payload };
    case EDITPROFILE_USERNAME_CHANGED:
    return { ...state, username:action.payload };
    default:
    return state;
  }
}
