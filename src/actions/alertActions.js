/**
 * Alert Actions
 * All actions that SignUp process
 *
 */
import {
  secureGet,
  secureDelete,
  securePut,
  secureDeleteForAlert,
  securePutForAlert,
  secureGetForUser,
  secureDeleteForUser,
  securePutForUser
} from "../services/apiService";
import * as API_CONST from "../helpers/config";
import {
  DISBALE_DEVICE_SUCCESS,
  DISBALE_DEVICE_ERROR,
  GET_ALERT_SUCCESS,
  GET_ALERT_ERROR,
  ALERT_CANCEL_SUCCESS,
  ALERT_CANCEL_ERROR,
  RESET_CANCEL_ALERT,
  EDIT_ALERT_SUCCESS,
  EDIT_ALERT_ERROR,
  RESET_NOTIFICATION_FLAG,
  SESSION_EXPIRED,
  RESET_UPADTE_ALERT,
} from "../constants/ActionConst";
import * as CommonActions from "./commonActions";
import {NETWORK_ERROR} from '../constants/StringConst'
import {getAccessToken} from '../constants/DataConst'
import { getUserInfo } from "./userActions";
import { Alert } from "react-native";

                
import * as RootNavigation from '../router/RouteNavigation';


export function resetAlertUpdate() {
  return async (dispatch, getState) => {
    {
      await dispatch({
        type: RESET_UPADTE_ALERT,
      });
    }
  };
}

export function editAlert(editAlert, alertId) {
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      let userData = {
        'access_token': accesstoken,
      };
      const res = await securePutForUser(
        `/v1/alerts/${alertId}`,
        authToken,
        { user:userData, alert: editAlert }
      );
      if (res && res.status == 200) {
        await dispatch({
          type: EDIT_ALERT_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
        dispatch(getUserInfo())
        dispatch(getAlerts())

      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let response = await res.json()
        await dispatch({
          type: EDIT_ALERT_ERROR,
          payload:response.error
        });
      }
    } catch (e) {
      console.log("cath error Update USer Info on alert", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if(e.status == 401)	
      { await dispatch({	
         type: SESSION_EXPIRED,	
         payload: { sessionExpired: true},	
       });}else if(e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
        alert(e)
      }
    }
  };
}

export function getAlerts() {

  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); 
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const res = await secureGetForUser(
        `/v1/alerts?user[access_token]=${accesstoken}`,
        authToken
      );
      if (res) {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: GET_ALERT_SUCCESS,
          payload: { alertData: res.data },
        });
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: GET_ALERT_ERROR,
          payload: { getAlertError: res.error },
        });
      }
    } catch (e) {
      console.log("cath error of FB", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      }
    }
  };
}

export function cancelAlerts(id,screenType) {
  return async (dispatch) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const res = await secureDelete(
        `/v1/alerts/${id}?user[access_token]=${accesstoken}`,
        authToken,
        screenType
      );
      // const res = await secureDeleteForUser(
      //   `/v1/alerts/${id}?user[access_token]=${accesstoken}`,
      //   authToken,
      //   screenType
      // );
      if (res && res.status == 204) {
        dispatch(getUserInfo())
        dispatch(getAlerts())
        // await dispatch({
        //   type: ALERT_CANCEL_SUCCESS,
        // });
        RootNavigation.navigationRef.navigate("Alerts")
        Alert.alert("Your alert has been deleted successfully!")
       
      } else {
        dispatch(getUserInfo())
        RootNavigation.navigationRef.navigate("Alerts")
        Alert.alert("Your alert has been deleted successfully!")
        // NavigationService.navigate("Alerts")
        // await dispatch({
        //   type: ALERT_CANCEL_ERROR,
        //   payload: { getAlertError: res.error },
        // });
      }
    } catch (e) {
      console.log("cath error cancel Alerts", e);
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      }else if(e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        alert(e)
      }
    }
  };
}

export function deleteDevice(deviceId) {
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const res = await securePutForUser(
        `/v1/devices/${deviceId}/_disable?user[access_token]=${accesstoken}`,
        authToken
      );
      if (res && res.status == 204) {
        await dispatch({
          type: DISBALE_DEVICE_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: DISBALE_DEVICE_ERROR,
          payload: { deviceDisabledError: res.error },
        });
      }
    } catch (e) {
      console.log("cath error delete Device", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } // To stop Loader
    }
  };
}

export function resetCancelAlert() {
  return async (dispatch, getState) => {
    {
      await dispatch({
        type: RESET_CANCEL_ALERT,
      });
    }
  };
}
export function resetNotifFlag() {
  return async (dispatch, getState) => {
    {
      await dispatch({
        type: RESET_NOTIFICATION_FLAG,
      });
    }
  };
}
