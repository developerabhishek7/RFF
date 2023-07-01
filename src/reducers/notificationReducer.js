import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  MARK_NOTIFICATION_AS_READ_ERROR,
  UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
  UPDATE_NOTIFICATIONS_SETTINGS_ERROR,
  RESET_NOTIF_DATA,
  SET_BADGE_COUNT,
  RESET_BADGE_COUNT,
  GET_ALERT_NOTIFICATIONS_SUCCESS,
  GET_ALERT_NOTIFICATIONS_ERROR,
  GET_NOTIFICATIONS_DETAILS_SUCCESS,
  GET_NOTIFICATIONS_DETAILS_ERROR,
  RESET_NOTIFICATIONS_DETAILS
} from "../constants/ActionConst";

const initialState = {
  getNotifError: null,
  notificationData: null,
  notiifcationSettingsData: null,
  notiifcationSettingsError: "",
  getAlertNotifError: null,
  alertNotificationData: null,
  notificationDetails: null,
  notificationDetailsError: "",
  totalPages: 1,
  alertNotifTotalPages: 1,
  badgeCount: 0,
};

export default function(state = initialState, action) {
  // console.log("yes check here notification stare - - - - - -",action.payload.notificationData)
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        // notificationData:action.payload.notifData,
        notificationData: !state.notificationData
          ? action.payload.notifData
          : [...state.notificationData, ...action.payload.notifData],
        totalPages: action.payload.TotalRecords,
      };
    }
    case GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        getNotifError: action.payload.getNotifError,
      };
    case MARK_NOTIFICATION_AS_READ_SUCCESS:
      return {
        ...state,
        notificationData: action.payload,
      };
    case MARK_NOTIFICATION_AS_READ_ERROR:
      return {
        ...state,
        getNotifError: action.payload.getNotifError,
      };
    case UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS: {
      return {
        ...state,
        notiifcationSettingsData: action.payload.notificationsSettingsData,
      };
    }
    case UPDATE_NOTIFICATIONS_SETTINGS_ERROR:
      return {
        ...state,
        notiifcationSettingsError: action.payload.notiifcationSettingsError,
      };
    case RESET_NOTIF_DATA: {
      return {
        ...state,
        totalPages: 1,
        notificationData: null,
        alertNotifTotalPages: 1,
        alertNotificationData: null,
      };
    }
    case SET_BADGE_COUNT: {
      return {
        ...state,
        badgeCount: parseInt(action.badgeCount),
      };
    }
    case RESET_BADGE_COUNT: {
      return {
        ...state,
        badgeCount: 0,
      };
    }
    case GET_ALERT_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        alertNotificationData: !state.alertNotificationData
          ? action.payload.alertnotifData
          : [...state.alertNotificationData, ...action.payload.alertnotifData],
        activeNotifTotalPages: action.payload.metaData.total_pages,
      };
    }
    case GET_ALERT_NOTIFICATIONS_ERROR:
      return {
        ...state,
        getAlertNotifError: action.payload.getAlertNotifError,
      };

      case GET_NOTIFICATIONS_DETAILS_SUCCESS: {
        return {
          ...state,
          notificationDetails: action.payload.notificationDetails,
          notificationDetailsError:""
        };
      }
      case GET_NOTIFICATIONS_DETAILS_ERROR:
        return {
          ...state,
          notificationDetailsError: action.payload.notificationDetailsError,
          notificationDetails: null
        };
      case RESET_NOTIFICATIONS_DETAILS: {
        return {
          ...state,
          notificationDetails: null,
          notificationDetailsError: "",
        };
      }
    default:
      return state;
  }
}