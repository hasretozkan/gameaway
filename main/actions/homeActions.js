import { GIVEAWAYS_CHANGED, HOME_LOADING_CHANGED } from './types';

export const giveawaysChanged = (giveaways) => {
  return (dispatch) => {
    dispatch({
      type: GIVEAWAYS_CHANGED,
      payload: giveaways
    });
  };
};

export const homeLoadingChanged = () => {
  return (dispatch) => {
    dispatch({
      type: HOME_LOADING_CHANGED,
    });
  };
};
