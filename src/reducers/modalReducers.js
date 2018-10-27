import { SHOW_MODAL, HIDE_MODAL } from "../actions/types";

const initialState = {
  settings: {},
  showModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        settings: action.payload,
        showModal: true
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
}
