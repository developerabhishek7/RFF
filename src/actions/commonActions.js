/**
 * Common Actions
 *
 */
import * as CONST from "../constants/ActionConst";
import {setUserData} from '../constants/DataConst'

export function startLoader() {
  return async (dispatch, getState) => {
    try {
      await dispatch({
        type: CONST.START_LOADER,
        payload: { isLoading: true }
      });
    } catch (e) {
    }
  };
}

export function stopLoader() {
  return async (dispatch, getState) => {
    try {
      await dispatch({
        type: CONST.STOP_LOADER,
        payload: { isLoading: false }
      });
    } catch (e) {
    }
  };
}
export function resetSession() {	
  return async (dispatch, getState) => {	
    try {	
      setUserData()
      await dispatch({	
        type: CONST.SESSION_EXPIRED,	
        payload: { sessionExpired: false }	
      });	
    } catch (e) {	
    }	
  };	
}
export function resetNetworkStatus() {	
  return async (dispatch, getState) => {	
    try {	
      await dispatch({	
        type: CONST.NETWORK_FAILED,	
        payload: { isNetworkFailed: false, noNetworkScreen:'' }	
      });	
    } catch (e) {	
    }	
  };	
}

export function setNetworkStatus(noNetworkScreen) {	
  return async (dispatch, getState) => {	
    try {	
      await dispatch({	
        type: CONST.NETWORK_FAILED,	
        payload: { isNetworkFailed: true, noNetworkScreen:noNetworkScreen }	
      });	
    } catch (e) {	
    }	
  };	
}

