import { combineReducers } from "redux";
import postReducer from "./postReducers";
import commentReducers from "./commentReducers";
import userReducers from "./userReducers";
import modalReducers from "./modalReducers";

export default combineReducers({
  posts: postReducer,
  comments: commentReducers,
  users: userReducers,
  modal: modalReducers
});
