import { EMAIL_CHANGED_SIGN_UP, PASSWORD_CHANGED_SIGN_UP, LOADING_FAIL_CHANGED, LOADING_SUCCES_CHANGED } from './types';

export const emailChangedSignUp = (email) => {
  return (dispatch) => {
    dispatch({
      type: EMAIL_CHANGED_SIGN_UP,
      payload: email
    });
  };
};

export const passwordChangedSignUp = (password) => {
  return (dispatch) => {
    dispatch({
      type: PASSWORD_CHANGED_SIGN_UP,
      payload: password
    });
  };
};

export const loadingSuccesChanged = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SUCCES_CHANGED,
    });
  };
};

export const loadingFailChanged = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_FAIL_CHANGED,
    });
  };
};
