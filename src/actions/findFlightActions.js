/**
 * Calender Actions
 * All actions of Find Flight Screen
 *
 */
import { nodeSecureGet, securePost} from "../services/apiService";
import * as API_CONST from "../helpers/config";
import {
  GET_POSSIBLE_ROUTES_SUCCESS,
  GET_POSSIBLE_ROUTES__ERROR,
  RESET_CREATE_ALERT_DATA,
  GET_AIRLINES_MEMBERSHIP_ERROR,
  GET_AIRLINES_MEMBERSHIP_SUCCESS,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  GET_NEAREST_AIRPORT_SUCCESS,
  SEND_AUDIT_DATA_SUCCESS,
  SEND_AUDIT_DATA_ERROR,
  GET_FLIGHT_SCHEDULE_ERROR,
  GET_FLIGHT_SCHEDULE_SUCCESS,
  RESET_FINDFLIGHT_DATA,
  GET_MULTIPLE_SCHEDULE_DATA_SUCCESS,
  GET_MULTIPLE_SCHEDULE_DATA_ERROR,
  GET_CABIN_CLASS_SUCCESS,
  GET_CABIN_CLASS_FAIL
} from "../constants/ActionConst";
import * as CommonActions from './commonActions';
import {NETWORK_ERROR} from '../constants/StringConst'
export function resetCreateAlertData(){
  return async (dispatch, getState) =>{
    dispatch({
      type: RESET_CREATE_ALERT_DATA
    })
  }
}

export function getNearestAirport(lat, long) {
  return async (dispatch, getState) => {
    try {
        dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      let url = `${API_CONST.AVIATION_URL}lat=${lat}&lng=${long}&distance=100`
    const res = await nodeSecureGet(
        url,
        authToken
      );
      if (res) {
        await dispatch({
          type: GET_NEAREST_AIRPORT_SUCCESS,
          payload: { nearestAirports: res },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      console.log("error on nearest airpot -----------------",e)
      dispatch(CommonActions.stopLoader()); // To stop Loader
    }
  };
}

export function getLocations() {
  return async (dispatch, getState) => {
    try {
        dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
    const res = await nodeSecureGet(
      API_CONST.GET_LOCATION_NODE_URL,
        authToken
      );
      if (res) {
        await dispatch({
          type: GET_LOCATIONS_SUCCESS,
          payload: { locations: res },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        await dispatch({
          type: GET_LOCATIONS_ERROR,
          payload: { locationsError: res.error },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {

      console.log("error on the get location ########   ",e)
        await dispatch({
            type: GET_LOCATIONS_ERROR,
            payload: { locationsError: e},
          });
          dispatch(CommonActions.stopLoader()); // To stop Loader
    }
  };
}

export function getPossibleRoutes() {
  return async (dispatch, getState) => {
    try {
        dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
    const res = await nodeSecureGet(
        API_CONST.GET_POSSIBLE_ROUTES_NODE_URL,
        authToken
      );
      if (res) {
        // console.log("check here getting response or not €######### ",res)
        await dispatch({
          type: GET_POSSIBLE_ROUTES_SUCCESS,
          payload: { airlinesPossileRoutes: res },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        await dispatch({
          type: GET_POSSIBLE_ROUTES__ERROR,
          payload: { airlinesPossileRoutesError: res.error },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      console.log("on the get possible route ####### ",e)
        await dispatch({
            type: GET_POSSIBLE_ROUTES_ERROR,
            payload: { airlinesPossileRoutesError: e},
          });
          dispatch(CommonActions.stopLoader()); // To stop Loader
    }
  };
}

export function getAirlinesMembership() {
  return async (dispatch, getState) => {
    try {
        dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
    const res = await nodeSecureGet(
        API_CONST.GET_MEMBERSHIP_NODE_URL,
        authToken
      );
      if (res) {
        await dispatch({
          type: GET_AIRLINES_MEMBERSHIP_SUCCESS,
          payload: { airlinesMembershipDetails: res },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        await dispatch({
          type: GET_AIRLINES_MEMBERSHIP_ERROR,
          payload: { airlinesMembershipDetailsError: res.error },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {

      console.log("yes on the membersio error ####### ",e)
        await dispatch({
            type: GET_AIRLINES_MEMBERSHIP_ERROR,
            payload: { airlinesMembershipDetailsError: e},
          });
          dispatch(CommonActions.stopLoader()); // To stop Loader
    }
  };
}

export function sendAuditData(auditData) {
  return async (dispatch, getState) => {
    try {
      const token = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await securePost(`/v1/user_action_audits`, token, {user_action_audit:auditData}, true);
      if (res && res.status === 201) {
        await dispatch({
          type: SEND_AUDIT_DATA_SUCCESS,
        });
      } else {
        await dispatch({
          type: SEND_AUDIT_DATA_ERROR,
        });
      }
    } catch (e) {
      console.log("yes check here audit data error   ####### ",e)
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
// GET MULTIPLE SCHEDULE DATA ...
export function getMultipleFlightSchedule(flightScheduleData) {
  return async (dispatch, getState) => {
    try {
        dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
    const res = await nodeSecureGet(
      `${API_CONST.BASE_NODE_URL}/schedule/${flightScheduleData.airline}?source_code=${flightScheduleData.source}&destination_code=${flightScheduleData.destination}&date=${flightScheduleData.date}`,     
        authToken
      );
      if (res) {
        await dispatch({
          type: GET_MULTIPLE_SCHEDULE_DATA_SUCCESS,
          payload: { multipleFlightScheduleData: res },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        await dispatch({
          type: GET_MULTIPLE_SCHEDULE_DATA_ERROR,
          payload: { multipleFlightScheduleError: res.error },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      console.log("yes on the get multiple light error ######## ",e)
        await dispatch({
            type: GET_MULTIPLE_SCHEDULE_DATA_ERROR,
            payload: { multipleFlightScheduleError: e},
          });
          dispatch(CommonActions.stopLoader()); // To stop Loader
    }
  };
}



export function getFlightSchedule(flightScheduleData) {

  // console.log("yes check here get flight scheudle  -  - - - - ",flightScheduleData)
  let url = ""
  if(flightScheduleData.bronzeMember){
    url = null
  }
  else{
    url = `params=schedule`
  }


  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN
        const res = await nodeSecureGet(
      `${API_CONST.BASE_NODE_URL}/schedule-count/${flightScheduleData.airline}?source_code=${flightScheduleData.source}&destination_code=${flightScheduleData.destination}&${url}`,     
        authToken
      );
      if (res) {
        // console.log("check response on the flight schedule ####### --------------------------- ",res)
        await dispatch({
          type: GET_FLIGHT_SCHEDULE_SUCCESS,
          payload: { flightSchedule: res },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        await dispatch({
          type: GET_FLIGHT_SCHEDULE_ERROR,
          payload: { flightScheduleError: res.error },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      console.log("yes check here get flighr schedule error ####### ",e)
        await dispatch({
            type: GET_FLIGHT_SCHEDULE_ERROR,
            payload: { flightScheduleError: e},
          });
          dispatch(CommonActions.stopLoader()); // To stop Loader
    }
  };
}


export function getCabinClass(data) {  
  // console.log("yes ceck here on cabinclass function #######   ",data)
  // let URL = `https://lu7oe93qmi.execute-api.eu-west-2.amazonaws.com/production/cabin-classes/ba?source_code=${data.source}&destination_code=${data.destination}`
 
  let URL = `https://hb4rj6hzo7.execute-api.eu-west-2.amazonaws.com/staging/cabin-classes/ba?source_code=${data.source}&destination_code=${data.destination}`
 
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await nodeSecureGet(
        `${URL}`,
        authToken
      );

      // console.log("on the cabin class action screen #######  ",res)

     if (res) {   
        await dispatch({
          type: GET_CABIN_CLASS_SUCCESS,
          payload: { cabinClassData: res.cabinclasses,},
        });
        dispatch(CommonActions.stopLoader());
      } else {
        await dispatch({
          type: GET_CABIN_CLASS_FAIL,
          payload: { cabinClassDataError: res.error,},
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


export function resetFindFlightData() {
  return async (dispatch, getState) => {
    {
      await dispatch({
        type: RESET_FINDFLIGHT_DATA,
      });
    }
  };
}

