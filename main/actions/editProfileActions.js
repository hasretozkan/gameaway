import { EDITPROFILE_USER_CHANGED, EDITPROFILE_LOADING_CHANGED,EDITPROFILE_NAME_CHANGED,EDITPROFILE_USERNAME_CHANGED } from './types';

export const editProfileUserChanged = (userInfo) => {
  return (dispatch) => {
    dispatch({
      type: EDITPROFILE_USER_CHANGED,
      payload: userInfo
    });
  };
};

export const editProfileLoadingChanged = (loading) => {
  return (dispatch) => {
    dispatch({
      type: EDITPROFILE_LOADING_CHANGED,
      payload: loading
    });
  };
};

export const editProfileNameChanged = (first_name) => {
  return (dispatch) => {
    dispatch({
      type: EDITPROFILE_NAME_CHANGED,
      payload: first_name
    });
  };
};

export const editProfileUsernameChanged = (username) => {
  return (dispatch) => {
    dispatch({
      type: EDITPROFILE_USERNAME_CHANGED,
      payload: username
    });
  };
};
