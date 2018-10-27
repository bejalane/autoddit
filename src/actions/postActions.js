import { NEW_POST, UPDATE_POST_COMMENTS_NUMBER, VOTE_POST } from "./types";

export const createPost = post => {
  return function(dispatch) {
    dispatch({
      type: NEW_POST,
      payload: post
    });
  };
};

export const updatePostCommentsNumber = postData => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_POST_COMMENTS_NUMBER,
      payload: postData
    });
  };
};

export const vote = postData => {
  return function(dispatch) {
    dispatch({
      type: VOTE_POST,
      payload: postData
    });
  };
};
