import { EMAIL_CHANGED,PASSWORD_CHANGED,LOADING_CHANGED,LOGIN_CHANGED } from './types';

export const emailChanged = (email) => {
  return (dispatch) => {
    dispatch({
      type: EMAIL_CHANGED,
      payload: email
    });
  };
};

export const passwordChanged = (password) => {
  return (dispatch) => {
    dispatch({
      type: PASSWORD_CHANGED,
      payload: password
    });
  };
};

export const loadingChanged = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_CHANGED,
    });
  };
};

export const loginChanged = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_CHANGED,
    });
  };
};
