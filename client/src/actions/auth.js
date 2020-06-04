import { AUTH_FAILED, AUTH_SUCCEDED, USER_LOADED, USER_REMOVED } from "./types";
import axios from "axios";
import store from "../store";
import { showAlert } from "./alert";

export const registerUser = async (payload) => {
  const { username, email, password, confirmPassword } = payload;
  try {
    // Set up headers
    const config = { headers: { "Content-Type": "application/json" } };
    // Set up body
    const body = JSON.stringify({ username, email, password, confirmPassword });
    try {
      // Send request
      let user = await axios.post("/api/register", body, config);
      // Add to browser storage
      sessionStorage.setItem("token", user.data.token);
      store.dispatch({ type: AUTH_SUCCEDED });
      showAlert(
        "success",
        "Successfully registered! Please fill in your profile."
      );
    } catch (error) {
      showAlert("error", "Failed to register user.");
    }
  } catch (error) {
    showAlert("error", error);
    store.dispatch({ type: AUTH_FAILED });
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  try {
    // Set up headers
    const config = { headers: { "Content-Type": "application/json" } };
    // Set up body
    const body = JSON.stringify({ email, password });
    // Send request
    try {
      let user = await axios.post("/api/login", body, config);
      // Add to browser storage
      sessionStorage.setItem("token", user.data.token);
      store.dispatch({ type: AUTH_SUCCEDED });
      showAlert("success", "Logged in!");
    } catch (error) {
      showAlert("error", "Failed to log in.");
    }
  } catch (error) {
    console.log(error);
    store.dispatch({ type: AUTH_FAILED });
  }
};

export const logoutUser = () => {
  try {
    sessionStorage.setItem("token", "");
    store.dispatch({ type: USER_REMOVED });
  } catch (error) {
    console.log(error);
  }
};

export const loadUser = async () => {
  try {
    var token = sessionStorage.getItem("token");
  } catch (error) {}
  if (token) {
    try {
      let res = await axios.get("/api/user");
      store.dispatch({ type: USER_LOADED, payload: { user: res.data.user } });
    } catch (error) {}
  }
};
