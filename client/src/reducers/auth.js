import {
  AUTH_SUCCEDED,
  AUTH_FAILED,
  USER_LOADED,
  USER_REMOVED,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCEDED:
      return { ...state, isAuthenticated: true };
    case AUTH_FAILED:
      return { ...state, isAuthenticated: false };
    case USER_LOADED:
      return { ...state, isAuthenticated: true, user: payload.user };
    case USER_REMOVED:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
