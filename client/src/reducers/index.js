import { combineReducers } from "redux";
// Import reducers
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";

// Export all reducers in one fell swoop
export default combineReducers({
    alert,
    auth,
    profile
});
