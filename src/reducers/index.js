import { combineReducers } from "redux";
import logIn from "./loginReducer";
import signUp from "./signUpReducer";
import alerts from "./alertsReducer";
import userInfo from "./userReducer";
import common from "./commonReducer";
import notification from "./notificationReducer";
import calendar from "./calendarReducer";
import findFlight from "./findFlightReducer";
import mapSearch from "./mapSearchReducer";
import manageContactDetails from "./manageContactReducer";
import subscription from "./subscriptionReducer";
import mapKeyReducer from "./mapKeyReducer";
export default combineReducers({
  logIn,
  signUp,
  alerts,
  common,
  notification,
  userInfo,
  calendar,
  findFlight,
  mapSearch,
  manageContactDetails,
  subscription,
  mapKeyReducer,
});
