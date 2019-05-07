import { GIVEAWAY_CHANGED, GIVEAWAY_LOADING_CHANGED, GIVEAWAY_USER_INFO_CHANGED } from './types';

export const giveawayChanged = (giveaway) => {
  return (dispatch) => {
    dispatch({
      type: GIVEAWAY_CHANGED,
      payload: giveaway
    });
  };
};

export const giveawayLoadingChanged = (loading) => {
  return (dispatch) => {
    dispatch({
      type: GIVEAWAY_LOADING_CHANGED,
      payload: loading
    });
  };
};

export const giveawayUserInfoChanged = (userInfo) => {
  return (dispatch) => {
    dispatch({
      type: GIVEAWAY_USER_INFO_CHANGED,
      payload: userInfo
    });
  };
};
