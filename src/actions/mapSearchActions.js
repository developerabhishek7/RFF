/**
 * Map Search Actions
 * All actions of Map Search Screen
 *
 */
import { nodeSecureGet ,secureGet } from "../services/apiService";
import * as API_CONST from "../helpers/config";
import {
  GET_AVAILABLE_DESTINATIONS_SUCCESS,
  GET_AVAILABLE_DESTINATIONS_ERROR,
  RESET_MAP_DATA,

  GET_MAP_KEY,
  GET_MAP_KEY_SUCCESS,
  GET_MAP_KEY_ERROR
} from "../constants/ActionConst";
import * as CommonActions from "./commonActions";
import {NETWORK_ERROR, SOMETHING_WENT_WRONG} from '../constants/StringConst'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from "react-native";
import {BASE_NODE_URL} from '../helpers/config'

export function resetCreateAlertData() {
  return async (dispatch, getState) => {
    dispatch({
      type: RESET_CREATE_ALERT_DATA,
    });
  };
}

export function resetData() {
  return async (dispatch) => {
    dispatch({
      type: RESET_MAP_DATA,
    });
  };
}

 export function getAvailableDestinations(searchData) {
  let URL;
  if (searchData.inboundDate) {
    URL = `${API_CONST.BASE_NODE_URL}/${searchData.airline}/v2/available-destinations?tier=${searchData.tier}&trip_type=${searchData.tripType}&number_of_passengers=${searchData.passengerCount}&source_code=${searchData.sourceCode.code}&outbound_date=${searchData.outboundStartDate}&inbound_date=${searchData.outboundEndDate}&from=executive`;   
  } else {
    URL = `${API_CONST.BASE_NODE_URL}/${searchData.airline}/v2/available-destinations?tier=${searchData.tier}&trip_type=${searchData.tripType}&number_of_passengers=${searchData.passengerCount}&source_code=${searchData.sourceCode.code}&outbound_start_date=${searchData.outboundStartDate}&outbound_end_date=${searchData.outboundEndDate}&airlineCode=BA&travelTo=${searchData.travelTo}&inbound_start_date=${searchData.inboundStartDate}&inbound_end_date=${searchData.inboundEndDate}`;
  } 
  // URL = `${API_CONST.BASE_NODE_URL}/available-destinations/${searchData.airline}?tier=${searchData.tier}&travel_class=${searchData.classSelected}&trip_type=${searchData.tripType}&number_of_passengers=${searchData.passengerCount}&source_code=${searchData.sourceCode.code}&outbound_start_date=${searchData.outboundStartDate}&outbound_end_date=${searchData.outboundEndDate}&airlineCode=BA&travelTo=${searchData.travelTo}&inbound_start_date=${searchData.inboundStartDate}&inbound_end_date=${searchData.inboundEndDate}`;
  return async (dispatch) => {
    try {
      dispatch(CommonActions.startLoader());
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await nodeSecureGet(URL, authToken);
      if (res.available_destinations) {      
        await dispatch({
          type: GET_AVAILABLE_DESTINATIONS_SUCCESS,
          payload: { availableDestinations: res },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        await dispatch({
          type: GET_AVAILABLE_DESTINATIONS_ERROR,
          payload: {
            availableDestinationsError: res.error
              ? res.error
              : res.message
              ? res.message
              : SOMETHING_WENT_WRONG,
          },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      dispatch(CommonActions.stopLoader()); // To stop Loader

      if (e == NETWORK_ERROR) {
        await dispatch(CommonActions.setNetworkStatus(''));
      } else {
        Alert.alert(e);
      }
    }
  };
}


export function getMapKey(uuid_Key,userId) {
  console.log("yes check insdie action ########  ",uuid_Key,userId)
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      let URL = `${BASE_NODE_URL}/map-box?platform=mobile&user_id=${userId}&device_token=${uuid_Key}`
      const res = await nodeSecureGet(
        URL
      );
      if (res) {
        let MAP_TOKEN  = res.result.token
        await AsyncStorage.setItem("MAP_TOKEN",MAP_TOKEN)
        await dispatch({
          type: GET_MAP_KEY_SUCCESS,
          payload: {MapKeyData:res.result}
        });
        dispatch(CommonActions.stopLoader());
      } else {      
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: GET_MAP_KEY_ERROR,
          payload: { error: res.error },
        });
      }
    } catch (e) {
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else {
        console.log(STR_CONST.SOMETHING_WENT_WRONG);
      }
    }
  };
}