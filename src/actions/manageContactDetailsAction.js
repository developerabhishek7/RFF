/**
 * Manage Contact Actions
 * All actions of Manage Contact Feature
 *
 */
import { secureDelete, securePut, securePost, securePutForUser, secureDeleteForUser, securePostForUser } from "../services/apiService";
import * as API_CONST from "../helpers/config";
import {
  SET_PRIMARY_EMAIL_SUCCESS,
  SET_PRIMARY_EMAIL_ERROR,
  SECONDARY_VERIFICATION_SUCCESS,
  SECONDARY_VERIFICATION_ERROR,
  PRIMARY_VERIFICATION_SUCCESS,
  PRIMARY_VERIFICATION_ERROR,
  CREATE_ALTERNATE_EMAIL_SUCCESS,
  CREATE_ALTERNATE_EMAIL_ERROR,
  DELETE_EMAIL_SUCCESS,
  DELETE_EMAIL_ERROR,
  DELETE_NUMBER_SUCCESS,
  DELETE_NUMBER_ERROR,
  VERIFY_NUMBER_SUCCESS,
  VERIFY_NUMBER_ERROR,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_ERROR,
  SESSION_EXPIRED,
  RESET_MANAGE_CONTACT,
  ADD_MANAGE_CONTACT_DETAILS_SUCCESS,
  ADD_MANAGE_CONTACT_DETAILS_ERROR,
  SET_SECONDARY_EAMIL_PRIMARY_SUCCESS,
  SET_SECONDARY_EAMIL_PRIMARY_ERROR
} from "../constants/ActionConst";
import {NETWORK_ERROR, SOMETHING_WENT_WRONG} from '../constants/StringConst'
import * as CommonActions from "./commonActions";
import { getUserInfo,updateLoggedInUserPostHog } from "./userActions";
import {getAccessToken, getUserId} from '../constants/DataConst'
import { number } from "prop-types";
import { Alert } from "react-native";




export function sendOTP() {
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let userData = {
        access_token: accesstoken,
      };
      const url = `/v1/users/${userId}/user_phone_numbers/resend_otp`;
      const res = await securePutForUser(url, authToken, { user: userData });
    
      if (res && res.status == 200) {
        await dispatch({
          type: RESEND_OTP_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let response = await res.json();
        // console.log("yes check here respo - - - - - - - - - -",response)
        if(response.error == "OTP cannot be send for Bronze and Silver users."){
          Alert.alert("OTP cannot be send for Bronze and Silver users.")
        }
        else{
          await dispatch({
            type: RESEND_OTP_ERROR,
            payload: response.error,
          });
        }
      }
    } catch (e) {
      console.log("catch error resendPrimaryVerification", e,);
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}

//  function here for add contact number.......

export function addContact(userInfo,metaData) {

    return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let loggedInUserPostHog = {}
      loggedInUserPostHog["user"] = {
        access_token: accesstoken
      }
      loggedInUserPostHog["event_name"] = "Adding Phone Number"
      loggedInUserPostHog["data"] = {
        "metaData":metaData

      }
      // let userData = {
      //   access_token: accesstoken,
      // };
      const url = `/v1/users/${userId}/update_phone_number?user[access_token]=${accesstoken}`;
      const res = await securePutForUser(url, authToken, { user: userInfo });
      
     
      if (res && res.status == 200) {
        await dispatch({
          type: ADD_MANAGE_CONTACT_DETAILS_SUCCESS,
        });
        dispatch(getUserInfo());
        // dispatch(updateLoggedInUserPostHog(loggedInUserPostHog))
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        // let response = await res.text();
        await dispatch({
          type: ADD_MANAGE_CONTACT_DETAILS_ERROR,
          payload: "Error Try Again!",
        });
      }
    } catch (e) {
      console.log("catch error resendPrimaryVerification", e,);
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}

export function verifyOTP(code,metaData) {
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let userData = {};
      let loggedInUserPostHog = {}
      loggedInUserPostHog["user"] = {
        access_token: accesstoken
      }
      loggedInUserPostHog["event_name"] = "Verified Phone Number"
      loggedInUserPostHog["data"] = {
        "metaData": metaData
      }
      userData["access_token"] = accesstoken;
      let OTPCode = {};
      OTPCode['code'] = code
      const res = await securePutForUser(
        `/v1/users/${userId}/user_phone_numbers/verify_otp`,
        authToken,
        {
          user: userData,
          user_phone_number: OTPCode,
        }
      );
      if (res && res.status == 200) {
        dispatch(getUserInfo());
        // dispatch(updateLoggedInUserPostHog(loggedInUserPostHog))
        await dispatch({
          type: VERIFY_NUMBER_SUCCESS,
        });
      } else {
        let response = await res.json();
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: VERIFY_NUMBER_ERROR,
          payload: response.error,
        });
      }
    } catch (e) {
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}

export function deleteNumber() {
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      const res = await secureDeleteForUser(
        `/v1/users/${userId}/user_phone_numbers?user[access_token]=${accesstoken}`,
        authToken
      );
      if (res && res.status == 200) {
        dispatch(getUserInfo());
        await dispatch({
          type: DELETE_NUMBER_SUCCESS,
        });
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: DELETE_NUMBER_ERROR,
          payload: SOMETHING_WENT_WRONG,
        });
      }
    } catch (e) {
      console.log("cath error cancel Alerts", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      }else if(e == NETWORK_ERROR || e[0] == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}

export function deleteEmail(emailId) {
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      const res = await secureDeleteForUser(
        `/v1/users/${userId}/notification_emails/${emailId}?user[access_token]=${accesstoken}`,
        authToken
      );
      if (res && res.status == 200) {
        dispatch(getUserInfo());
        await dispatch({
          type: DELETE_EMAIL_SUCCESS,
        });
      } else {
        let response = await res.json();
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: DELETE_EMAIL_ERROR,
          payload: response.error,
        });
      }
    } catch (e) {
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}


export function setSecondaryAsPrimaryEmail(emailId) {

  console.log("check here on the email id ####### ",emailId)
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let userData = {
        access_token: accesstoken,
        email:emailId
      };
      const res = await securePutForUser(
        `/v1/users/${userId}/update_email`,
        authToken,
        { user: userData }
      );
      if (res && res.status == 200) {
        Alert.alert("Email Update Successfully!")
        await dispatch({
          type: SET_SECONDARY_EAMIL_PRIMARY_SUCCESS,
        });
        dispatch(getUserInfo());
      
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let response = await res.json();
        await dispatch({
          type: SET_SECONDARY_EAMIL_PRIMARY_ERROR,
          payload: response.error,
        });
      }
    } catch (e) {
      console.log("catch error setPrimaryEmailAsSecondary", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}
export function createAlternateEmail(body) {
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const token = API_CONST.AUTH0RIZATION_TOKEN;
      const userId = await getUserId();
      const res = await securePostForUser(
        `/v1/users/${userId}/notification_emails`,
        token,
        body,
        true
      );      

      if (res && res.status == 200) {
        await dispatch({
          type: CREATE_ALTERNATE_EMAIL_SUCCESS,
        });
        dispatch(getUserInfo());
      } else {
        let data = await res.json();
        if(data.error == "This email already exists."){
          Alert.alert("This email already exists.")
        }else{
          await dispatch({
            type: CREATE_ALTERNATE_EMAIL_ERROR,
            payload: data.error,
          });
        }
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
      console.log("catch of createAlternateEmail", e);
    }
  };
}

export function setPrimaryEmail(emailId) {
  
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let userData = {
        access_token: accesstoken,
      };
      const res = await securePutForUser(
        `/v1/users/${userId}/notification_emails/${emailId}/set_as_primary`,
        authToken,
        { user: userData }
      );
      if (res && res.status == 200) {
        await dispatch({
          type: SET_PRIMARY_EMAIL_SUCCESS,
        });
        dispatch(getUserInfo());
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let response = await res.json();
        await dispatch({
          type: SET_PRIMARY_EMAIL_ERROR,
          payload: response.error,
        });
      }
    } catch (e) {
      console.log("catch error setPrimaryEmail", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}

export function resendSecondaryVerification(emailId) {
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let userData = {
        access_token: accesstoken,
      };
      const res = await securePutForUser(
        `/v1/users/${userId}/notification_emails/${emailId}/reverify`,
        authToken,
        { user: userData }
      );
      if (res && res.status == 200) {
        await dispatch({
          type: SECONDARY_VERIFICATION_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let response = await res.json();
        await dispatch({
          type: SECONDARY_VERIFICATION_ERROR,
          payload: response.error,
        });
      }
    } catch (e) {
      console.log("catch error resendSecondaryVerification", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}

export function resendPrimaryVerification() {
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let userData = {
        access_token: accesstoken,
      };
      const url = `/v1/users/${userId}/resend_verification_emails`;
      const res = await securePutForUser(url, authToken, { user: userData });
      if (res && res.status == 200) {
        await dispatch({
          type: PRIMARY_VERIFICATION_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let response = await res.json();
        await dispatch({
          type: PRIMARY_VERIFICATION_ERROR,
          payload: response.error,
        });
      }
    } catch (e) {
      console.log("catch error resendPrimaryVerification", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e[0] == NETWORK_ERROR || e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        Alert.alert(e)
      }
    }
  };
}

export function resetManageContact() {
  return async (dispatch, getState) => {
    {
      await dispatch({
        type: RESET_MANAGE_CONTACT,
      });
    }
  };
}
