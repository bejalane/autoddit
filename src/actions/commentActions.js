import { FETCH_COMMENTS, NEW_COMMENT, VOTE_COMMENT } from "./types";

export const fetchComments = postId => dispatch =>
  dispatch({ type: FETCH_COMMENTS, payload: postId });

export const createComment = post => {
  return function(dispatch) {
    dispatch({
      type: NEW_COMMENT,
      payload: post
    });
  };
};

export const vote = commentData => {
  return function(dispatch) {
    dispatch({
      type: VOTE_COMMENT,
      payload: commentData
    });
  };
};
