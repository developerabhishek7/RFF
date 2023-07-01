/**
 * Calender Actions
 * All actions of Calendar Screen
 *
 */
import { securePost, nodeSecureGet,securePostForAlert, securePostForUser} from "../services/apiService";
import * as API_CONST from "../helpers/config";
import { Alert  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  CREATE_ALERT_SUCCESS,
  CREATE_ALERT_ERROR,
  GET_AIRLINES_AVAILABILITY_SUCCESS,
  GET_AIRLINES_AVAILABILITY_ERROR,
  RESET_CREATE_ALERT_DATA,
  SESSION_EXPIRED,
  GET_AVAILABLE_CALENDAR_POINTS_ERROR,
  GET_AVAILABLE_CALENDAR_POINTS_SUCESS,

  GET_PEAK_OFFPEAK,
  GET_PEAK_OFFPEAK_SUCCESS,
  GET_PEAK_OFFPEAK_ERROR,
  RESET_CALENDAR_DATA

} from "../constants/ActionConst";
import * as CommonActions from './commonActions';
import {NETWORK_ERROR} from '../constants/StringConst'
import { getUserInfo } from "./userActions";
import {getAlerts} from './alertActions'
export function resetCreateAlertData(){
  return async (dispatch, getState) =>{
    dispatch({
      type: RESET_CREATE_ALERT_DATA
    })
  }
}
   

export function createAlert(body) {
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const token = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await securePostForAlert(`/v1/alerts`, token, body, true);
     
      if (res && res.status == 201) {
        await dispatch({
          type: CREATE_ALERT_SUCCESS,
        });
        dispatch(getUserInfo())
        dispatch(getAlerts())
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        let data = await res.json()
        await dispatch({
          type: CREATE_ALERT_ERROR,
          payload: { createAlertError:data.error },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      console.log("yes check here on create alert error ",e)
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if(e.status == 401)	
      { await dispatch({	
         type: SESSION_EXPIRED,	
         payload: { sessionExpired: true},	
       });}else if(e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
        }else{
          console.log("yes check here on catch section of alert creat #########")
        alert(e)
      }
      console.log("catch of Create Alert",e);
    }
  };
}

export function getAirlinesAvailability(propsData,type) {

 
  let NEW_URL = `${API_CONST.BASE_NODE_URL}/calendar-availability/${propsData.airline}?source_code=${propsData.sourceCode}&destination_code=${propsData.destinationCode}&tier=${"gold"}&number_of_passengers=${propsData.passengerCount}&from=executive` 
  
  console.log("NEW URL ‹‹‹‹‹‹‹‹ ",NEW_URL)
    return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader 
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await nodeSecureGet(
        `${NEW_URL}`,
        authToken
      );
     if (res) {
        await dispatch({
          type: GET_AIRLINES_AVAILABILITY_SUCCESS,
          payload: { airlinesDetail: res, screenType: type },
        });
        dispatch(CommonActions.stopLoader());
      } else {
        await dispatch({
          type: GET_AIRLINES_AVAILABILITY_ERROR,
          payload: { airlinesDetailError: res.error, screenType: type },
        });
        dispatch(CommonActions.stopLoader());
      }
    } 
    catch (e) {    
      console.log("yes check here on airline availability error ###### ",e)
      // Alert.alert("ERROR",JSON.stringify(e))     
      dispatch(CommonActions.stopLoader());
      if(e.status == 401)	

      { await dispatch({	
         type: SESSION_EXPIRED,	
         payload: { sessionExpired: true},	
       });}else if(e == NETWORK_ERROR){
         await dispatch(CommonActions.setNetworkStatus(''));}else{
        alert(e)
      }
    }
  };
}

// render points data 

export function getPointsAvailability(searchData) {  
    let URL = `${API_CONST.BASE_NODE_URL}/points/${searchData.airline}?source_code=${searchData.sourceCode}&destination_code=${searchData.destinationCode}`

    console.log("yes check here points availability data #######   ",URL)
   
    return async (dispatch, getState) => {
      try {
        dispatch(CommonActions.startLoader()); // To start Loader
        const authToken = API_CONST.AUTH0RIZATION_TOKEN;
        const res = await nodeSecureGet(
          `${URL}`,
          authToken
        );
       if (res) {   
          await dispatch({
            type: GET_AVAILABLE_CALENDAR_POINTS_SUCESS,
            payload: { airlinesDetailPoints: res,},
          });
          dispatch(CommonActions.stopLoader());
        } else {
          await dispatch({
            type: GET_AVAILABLE_CALENDAR_POINTS_ERROR,
            payload: { airlinesDetailPointsError: res.error,},
          });
          dispatch(CommonActions.stopLoader());
        }
      } catch (e) {
        console.log("check here on points error part #######  ",e)
        dispatch(CommonActions.stopLoader());
        if(e.status == 401)	
        { await dispatch({	
           type: SESSION_EXPIRED,	
           payload: { sessionExpired: true},	
         });}else if(e == NETWORK_ERROR){
           await dispatch(CommonActions.setNetworkStatus(''));}else{
          alert(e)
        }
      }
    };
  }


// API call to get all the peak Offpeak data.....


export function getPeakOffPeakData() {  
  let URL = `https://hb4rj6hzo7.execute-api.eu-west-2.amazonaws.com/staging/getPeakDates/british-airways`
 
 
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await nodeSecureGet(
        `${URL}`,
        authToken
      );
     if (res) {   
        await dispatch({
          type: GET_PEAK_OFFPEAK_SUCCESS,
          payload: { peakOffpeakData: res.result,},
        });
        dispatch(CommonActions.stopLoader());
      } else {
        await dispatch({
          type: GET_PEAK_OFFPEAK_ERROR,
          payload: { peakOffpeakError: res.error,},
        });
        dispatch(CommonActions.stopLoader());
      }
    } catch (e) {
      dispatch(CommonActions.stopLoader());
      if(e.status == 401)	
      { await dispatch({	
         type: SESSION_EXPIRED,	
         payload: { sessionExpired: true},	
       });}else if(e == NETWORK_ERROR){
         await dispatch(CommonActions.setNetworkStatus(''));}else{
        alert(e)
      }
    }
  };
}

export function resetCalendarData() {
  return async (dispatch, getState) => {
    {
      await dispatch({
        type: RESET_CALENDAR_DATA,
      });
    }
  };
}