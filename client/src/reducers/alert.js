import { ADD_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((item) => item.id !== payload.id);
    default:
      return state;
  }
};
