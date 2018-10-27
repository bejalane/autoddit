import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const showModal = settings => {
  return function(dispatch) {
    dispatch({
      type: SHOW_MODAL,
      payload: settings
    });
  };
};

export const hideModal = () => {
  return function(dispatch) {
    dispatch({
      type: HIDE_MODAL
    });
  };
};
