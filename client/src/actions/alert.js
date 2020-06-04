import { ADD_ALERT, REMOVE_ALERT } from "./types";
import store from "../store";
import { v4 as uuid } from "uuid";

export const showAlert = (type, message) => {
  const id = uuid();
  store.dispatch({
    type: ADD_ALERT,
    payload: { id, type, message },
  });

  setTimeout(
    () =>
      store.dispatch({
        type: REMOVE_ALERT,
        payload: { id },
      }),
    100
  );
};
