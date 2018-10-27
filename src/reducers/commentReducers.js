import { NEW_COMMENT, VOTE_COMMENT } from "../actions/types";

const initialState = {
  items: [
    {
      id: 1,
      postId: 1,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
      submittedOn: "2018-10-26T22:48:58+03:00",
      votesUp: ["Alex", "John", "Shon"],
      votesDown: ["Jake", "Andrew"],
      author: "John",
      childComments: 3,
      children: [
        {
          id: 2,
          postId: 1,
          text:
            "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
          submittedOn: "2018-10-26T23:48:58+03:00",
          votesUp: ["Alex", "John", "Shon"],
          votesDown: ["Jake", "Andrew"],
          author: "Alex",
          childComments: 0,
          children: []
        },
        {
          id: 3,
          postId: 1,
          text:
            "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
          submittedOn: "2018-10-26T23:48:58+03:00",
          votesUp: ["Alex", "John", "Shon"],
          votesDown: ["Jake", "Andrew"],
          author: "Shon",
          childComments: 1,
          children: [
            {
              id: 4,
              postId: 1,
              text:
                "Ing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
              submittedOn: "2018-10-26T23:48:58+03:00",
              votesUp: ["Alex", "John", "Shon"],
              votesDown: ["Jake", "Andrew"],
              author: "Andrew",
              childComments: 0,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 7,
      postId: 2,
      text:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
      submittedOn: "2018-10-26T22:48:58+03:00",
      votesUp: ["Alex", "John", "Shon"],
      votesDown: ["Jake", "Andrew"],
      author: "Shon",
      childComments: 0,
      children: []
    },
    {
      id: 5,
      postId: 1,
      text:
        "Ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
      submittedOn: "2018-10-26T22:48:58+03:00",
      votesUp: ["Alex", "John", "Shon"],
      votesDown: ["Jake", "Andrew"],
      author: "Shon",
      childComments: 1,
      children: [
        {
          id: 6,
          postId: 1,
          text:
            "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
          submittedOn: "2018-10-26T23:48:58+03:00",
          votesUp: ["Alex", "John", "Shon"],
          votesDown: ["Jake", "Andrew"],
          author: "Alex",
          childComments: 0,
          children: []
        }
      ]
    }
  ],
  commentsIdCounter: 7
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_COMMENT:
      const commentsIdCounter = state.commentsIdCounter + 1;
      const postId = action.payload[0].postId;
      const spliced = state.items.filter(c => c.postId !== postId);
      return {
        ...state,
        items: [...spliced, ...action.payload],
        commentsIdCounter: commentsIdCounter
      };
    case VOTE_COMMENT:
      let commentIndex = state.items.findIndex(p => p.id === action.payload.id);
      state.items[commentIndex] = {
        ...state.items[commentIndex],
        ...action.payload
      };
      return {
        ...state,
        items: [...state.items]
      };
    default:
      return {
        ...state
      };
  }
}
