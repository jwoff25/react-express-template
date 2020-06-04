import { combineReducers } from "redux";
// Import reducers
import auth from "./auth";
import alert from "./alert";

// Export all reducers in one fell swoop
export default combineReducers({
  auth,
  alert,
});
