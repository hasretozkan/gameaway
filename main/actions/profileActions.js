import { PROFILE_USER_CHANGED,PROFILE_LOADING_CHANGED,PROFILE_GIVEAWAYS_CHANGED } from './types';

export const profileUserChanged = (userDetail) => {
  return (dispatch) => {
    dispatch({
      type: PROFILE_USER_CHANGED,
      payload: userDetail
    });
  };
};

export const profileLoadingChanged = (loading) => {
  return (dispatch) => {
    dispatch({
      type: PROFILE_LOADING_CHANGED,
      payload: loading
    });
  };
};

export const profileGiveawaysChanged = (giveaways) => {
  return (dispatch) => {
    dispatch({
      type: PROFILE_GIVEAWAYS_CHANGED,
      payload: giveaways
    });
  };
};
