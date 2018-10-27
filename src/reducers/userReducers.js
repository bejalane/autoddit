import { SIGN_IN, CHECK_AUTH } from "../actions/types";

const initialState = {
  users: [
    {
      id: 1,
      userName: "Alex"
    },
    {
      id: 2,
      userName: "John"
    },
    {
      id: 3,
      userName: "Shon"
    },
    {
      id: 4,
      userName: "Andrew"
    },
    {
      id: 5,
      userName: "Jake"
    }
  ],
  currentUser: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      const check = state.users.find(
        user => user.userName === action.payload.userName
      );
      let res;
      if (!check) {
        action.payload.id = state.users.length + 1;
        res = {
          ...state,
          users: [action.payload, ...state.users],
          currentUser: action.payload.userName
        };
      } else {
        res = {
          ...state,
          currentUser: action.payload.userName
        };
      }
      return res;
    case CHECK_AUTH:
      console.log(state);
      return {
        ...state,
        currentUser: state.currentUser
      };
    default:
      return state;
  }
}
