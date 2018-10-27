import { SIGN_IN, CHECK_AUTH } from "./types";

export const signIn = user => {
  return function(dispatch) {
    dispatch({
      type: SIGN_IN,
      payload: user
    });
  };
};

export const checkAuth = () => {
  return function(dispatch) {
    dispatch({
      type: CHECK_AUTH
    });
  };
};
