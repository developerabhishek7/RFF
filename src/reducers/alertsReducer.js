import {
  RESET_NOTIFICATION_FLAG,
  RESET_CANCEL_ALERT,
  GET_ALERT_SUCCESS,
  GET_ALERT_ERROR,
  ALERT_CANCEL_ERROR,
  ALERT_CANCEL_SUCCESS,
  DISBALE_DEVICE_SUCCESS,
  DISBALE_DEVICE_ERROR,
  EDIT_ALERT_SUCCESS,
  EDIT_ALERT_ERROR,
  RESET_UPADTE_ALERT
} from "../constants/ActionConst";

const initialState = {
  getAlertError: "",
  alertsArray: null,

  alertCancelSuccess: false,
  alertCancelError: "",

  deviceDisabledSuccess: false,
  deviceDisabledError: "",

  addDeviceSuccess: false,
  addDeviceError: "",

  deviceId: null,
  editAlertSuccess: null,

  editAlertError:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_UPADTE_ALERT:
      return {
        ...state,
        editAlertSuccess: null,
      };
    case GET_ALERT_SUCCESS:
      return {
        ...state,
        alertsArray: action.payload.alertData,
      };
    case GET_ALERT_ERROR:
      return {
        ...state,
        getAlertError: action.payload.loginError,
      };
    case ALERT_CANCEL_SUCCESS:
      return {
        ...state,
        alertCancelSuccess: true,
      };
    case ALERT_CANCEL_ERROR:
      return {
        ...state,
        alertCancelError: action.payload.alertCancelError,
      };

    case DISBALE_DEVICE_SUCCESS:
      return {
        ...state,
        deviceDisabledSuccess: true,
        deviceId: null,
      };
    case DISBALE_DEVICE_ERROR:
      return {
        ...state,
        deviceDisabledError: action.payload.deviceDisabledError,
      };
    case RESET_CANCEL_ALERT:
      return {
        ...state,
        alertCancelSuccess: false,
      };
    case RESET_NOTIFICATION_FLAG:
      return {
        ...state,
        deviceDisabledSuccess: false,
      };
    case EDIT_ALERT_SUCCESS:
      return {
        ...state,
        editAlertSuccess: true,
      };
    case EDIT_ALERT_ERROR:
      return {
        ...state,
        editAlertSuccess: false,
        editAlertError: action.payload
      };
    default:
      return state;
  }
}
