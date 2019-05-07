import { EARNGCA_USER_CHANGED,EARNGCA_LOADING_CHANGED } from './types';

export const earnGCAUserChanged = (userInfo) => {
  return (dispatch) => {
    dispatch({
      type: EARNGCA_USER_CHANGED,
      payload: userInfo
    });
  };
};

export const earnGCALoadingChanged = (loading) => {
  return (dispatch) => {
    dispatch({
      type: EARNGCA_LOADING_CHANGED,
      payload: loading
    });
  };
};
