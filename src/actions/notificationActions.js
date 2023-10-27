/**
 * Notification Actions
 * All actions that Notification process
 *
 */
 import { secureGet, secureGetForUser, securePut, securePutForUser } from "../services/apiService";
 import * as API_CONST from "../helpers/config";
 import {
   GET_NOTIFICATIONS_SUCCESS,
   GET_NOTIFICATIONS_ERROR,
   MARK_NOTIFICATION_AS_READ_SUCCESS,
   MARK_NOTIFICATION_AS_READ_ERROR,
   UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
   UPDATE_NOTIFICATIONS_SETTINGS_ERROR,
   RESET_NOTIF_DATA,
   SET_BADGE_COUNT,
   SESSION_EXPIRED,
   GET_ALERT_NOTIFICATIONS_SUCCESS,
   GET_ALERT_NOTIFICATIONS_ERROR,
   GET_NOTIFICATIONS_DETAILS_SUCCESS,
   GET_NOTIFICATIONS_DETAILS_ERROR,
   RESET_NOTIFICATIONS_DETAILS, 
 } from "../constants/ActionConst";
 import * as CommonActions from "./commonActions";
 import {getAccessToken, getUserId} from '../constants/DataConst'
 import { SOMETHING_WENT_WRONG} from '../constants/StringConst'
 import { getUserInfo } from "./userActions";
 
 export function SMSNotificationToggle(isEnabled) {


   return async (dispatch, getState) => {
     try {
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       let userData = {};
       userData["access_token"] = accesstoken;
       let userPhoneNumber = {
         sms_enabled: isEnabled,
       };
       userData["email_notifiable"] = isEnabled;
       const res = await securePutForUser(
         `/v1/users/${userId}/user_phone_numbers/toggle_sms`,
         authToken,
         {
           user: userData,
           user_phone_number: userPhoneNumber,
         }
       );
       if(res){
        dispatch(getUserInfo())
       }
 
     } catch (e) {
       console.log(e);
     }
   };
 }
 
 export function emailNotificationToggle(isEnabled) {
   return async (dispatch, getState) => {
     try {
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       let userData = {};
       userData["access_token"] = accesstoken;
       userData["email_notifiable"] = isEnabled;
       const res = await securePutForUser(
         `/v1/users/${userId}/enable_email_notifications`,
         authToken,
         {
           user: userData,
         }
       );
       if(res){
        dispatch(getUserInfo())
       }
     } catch (e) {
       console.log(e);
     }
   };
 }
 
 export function sendFCMToken(fcmToken) {

  // console.log("yes checking the fcm is sending or not - - - - - ",fcmToken)


   return async (dispatch, getState) => {
     try {
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       let userData = {};

       userData["access_token"] = accesstoken;
       const res = await securePutForUser(`/v1/users/${userId}/fcm_tokens`, authToken, {
         user: userData,
         fcm_token: fcmToken,
       });
     } catch (e) {
       console.log("catch error sendFCMToken", e);
       dispatch(CommonActions.stopLoader());
       if (e.status == 401) {
         await dispatch({
           type: SESSION_EXPIRED,
           payload: { sessionExpired: true },
         });
       } else {
         console.log(SOMETHING_WENT_WRONG);
       } // To stop Loader
     }
   };
 }
 
 export function setNotificationSettings(notificationData) {
   return async (dispatch, getState) => {
     try {
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       const res = await securePutForUser(
         `/v1/users/${userId}/notification_settings`,
         authToken,
         {
           user: { access_token: accesstoken },
           notification_setting: notificationData,
         }
       );
       console.log('setNotificationSettings >>> /++ ',res);
       if (res && res.status == 200) {
         await dispatch({
           type: UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
           payload: { notificationsSettingsData: notificationData },
         });
       } else {
         let response = await res.json();
         await dispatch({
           type: UPDATE_NOTIFICATIONS_SETTINGS_ERROR,
           payload: { notificationsSettingsError: response.error },
         });
       }
     } catch (e) {
       console.log("cath error delete Device", e);
       if (e.status == 401) {
         await dispatch({
           type: SESSION_EXPIRED,
           payload: { sessionExpired: true },
         });
       } // To stop Loader
     }
   };
 }
 
 export function getNotificationSettings() {
   return async (dispatch, getState) => {
     try {
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       const res = await secureGetForUser(
         `/v1/users/${userId}/notification_settings?user[access_token]=${accesstoken}`,
         authToken
       );
       if (res) {
         await dispatch({
           type: UPDATE_NOTIFICATIONS_SETTINGS_SUCCESS,
           payload: { notificationsSettingsData: res.data },
         });
       } else {
         await dispatch({
           type: UPDATE_NOTIFICATIONS_SETTINGS_ERROR,
           payload: { notificationsSettingsError: res.error },
         });
       }
     } catch (e) {
       console.log("catch error of notifications+++", e);
       if (e.status == 401) {
         await dispatch({
           type: SESSION_EXPIRED,
           payload: { sessionExpired: true },
         });
       }
     }
   };
 }
 
 export function getNotifications(pageNo, recordsPerPage) {
   return async (dispatch, getState) => {
     try {
       dispatch(CommonActions.startLoader()); // To start Loader
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       const res = await secureGet(
         `/v1/users/${userId}/notifications?user[access_token]=${accesstoken}&page=${pageNo}&per_page=${recordsPerPage}`,
         authToken
       );
        let badgeCount = getState().notification.badgeCount;
       if (res) {
         await dispatch({
           type: GET_NOTIFICATIONS_SUCCESS,
           payload: { notifData: res.data, metaData: res.meta },
         });
         await dispatch({
          type: SET_BADGE_COUNT,
          badgeCount: badgeCount ,
        });
         dispatch(getUserInfo())
         dispatch(CommonActions.stopLoader()); // To stop Loader
       } else {
         await dispatch({
           type: GET_NOTIFICATIONS_ERROR,
           payload: { getNotifError: res.error },
         });
         dispatch(CommonActions.stopLoader()); // To stop Loader
       }
     } catch (e) {
       await dispatch({
         type: GET_NOTIFICATIONS_ERROR,
         payload: { getNotifError: null },
       });
       dispatch(CommonActions.stopLoader()); // To stop Loader
     }
   };
 }
 
 export function markNotificationAsRead(id) {

   return async (dispatch, getState) => {
     try {
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       let userData = {};
 
       userData["access_token"] = accesstoken;
       const res = await securePutForUser(
         `/v1/users/${userId}/notifications/${id}`,
         authToken,
         {
           user: userData,
           unread: true,
         }
       );
       let notificationData = getState().notification.notificationData;
       let badgeCount = getState().notification.badgeCount;
       for (i = 0; i < notificationData.length; i++) {
         if (notificationData[i].id == id) {
           notificationData[i].unread = false;
         }
       }
       
       if (res) {
         await dispatch({
           type: MARK_NOTIFICATION_AS_READ_SUCCESS,
           payload: notificationData,
         });
         await dispatch({
           type: SET_BADGE_COUNT,
           badgeCount: badgeCount - 1,
         });
         dispatch(getUserInfo())
       } else {
         await dispatch({
           type: MARK_NOTIFICATION_AS_READ_ERROR,
         });
       }
     } catch (e) {
       await dispatch({
         type: MARK_NOTIFICATION_AS_READ_ERROR,
         payload: { getNotifError: null },
       });
     }
   };
 }
 
 export function resetNotificationData() {
   return async (dispatch, getState) => {
     try {
       await dispatch({
         type: RESET_NOTIF_DATA,
       });
     } catch (e) {
       console.log("in catch+++", e);
     }
   };
 }
 
 export function getAlertNotifications(alertId,pageNo, recordsPerPage) {
   return async (dispatch, getState) => {
     try {
       dispatch(CommonActions.startLoader()); // To start Loader
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const userId = await getUserId();
       const res = await secureGet(
         `/v1/alerts/${alertId}/push_notifications?user[access_token]=${accesstoken}&page=${pageNo}&per_page=${recordsPerPage}`,
         authToken
       );
       if (res) {
         await dispatch({
           type: GET_ALERT_NOTIFICATIONS_SUCCESS,
           payload: { alertnotifData: res.data, metaData: res.meta },
         });
         dispatch(CommonActions.stopLoader()); // To stop Loader
       } else {
         await dispatch({
           type: GET_ALERT_NOTIFICATIONS_ERROR,
           payload: { getNotifError: res.error },
         });
         dispatch(CommonActions.stopLoader()); // To stop Loader
       }
     } catch (e) {
       await dispatch({
         type: GET_NOTIFICATIONS_ERROR,
         payload: { getNotifError: null },
       });
       dispatch(CommonActions.stopLoader()); // To stop Loader
     }
   };
 }
 
 export function getNotificationDetail(alertId) {
   return async (dispatch) => {
     try {
       dispatch(CommonActions.startLoader()); // To start Loader
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const userId = await getUserId();
       const accesstoken = await getAccessToken();
       let url = `/v1/users/${userId}/notifications/${alertId}?user[access_token]=${accesstoken}`
       const res = await secureGet(
         url,
         authToken
       );
       if (res) {
         await dispatch({
           type: GET_NOTIFICATIONS_DETAILS_SUCCESS,
           payload: { notificationDetails: res.data },
         });
         dispatch(CommonActions.stopLoader()); // To stop Loader
       } else {
         await dispatch({
           type: GET_NOTIFICATIONS_DETAILS_ERROR,
           payload: { notificationDetailsError: res.error },
         });
         dispatch(CommonActions.stopLoader()); // To stop Loader
       }
     } catch (e) {
       await dispatch({
         type: GET_NOTIFICATIONS_ERROR,
         payload: { getNotifError: null },
       });
       dispatch(CommonActions.stopLoader()); // To stop Loader
     }
   };
 }
 export function resetNotificationDetails() {
   return async (dispatch, getState) => {
     try {
       await dispatch({
         type: RESET_NOTIFICATIONS_DETAILS,
       });
     } catch (e) {
       console.log("in catch+++", e);
     }
   };
 }