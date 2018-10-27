import {
  NEW_POST,
  UPDATE_POST_COMMENTS_NUMBER,
  VOTE_POST
} from "../actions/types";

const initialState = {
  posts: [
    {
      id: 1,
      title: "The colors of autumn",
      image: "https://cdn130.picsart.com/277374689017201.jpg?c256x256",
      submittedOn: "2018-10-26T22:48:58+03:00",
      author: "Alex",
      commentsCount: 6,
      votesUp: ["Alex", "John", "Shon"],
      votesDown: ["Jake"]
    },
    {
      id: 2,
      title: "Road in the forest",
      image: "https://cdn131.picsart.com/275118630000201.jpg?c256x256",
      submittedOn: "2018-10-26T22:48:58+03:00",
      author: "John",
      commentsCount: 1,
      votesUp: ["Alex", "John", "Shon"],
      votesDown: ["Jake"]
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_POST:
      action.payload.id = state.posts.length + 1;
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case UPDATE_POST_COMMENTS_NUMBER:
      let index = state.posts.findIndex(p => p.id === action.payload.postId);
      state.posts[index] = {
        ...state.posts[index],
        commentsCount: action.payload.increment
          ? state.posts[index].commentsCount + 1
          : state.posts[index].commentsCount - 1
      };
      return {
        ...state,
        posts: [...state.posts]
      };

    case VOTE_POST:
      let postIndex = state.posts.findIndex(p => p.id === action.payload.id);
      state.posts[postIndex] = {
        ...state.posts[postIndex],
        ...action.payload
      };
      return {
        ...state,
        posts: [...state.posts]
      };

    default:
      return state;
  }
}
