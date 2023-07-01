/**
 * SignUp Actions
 * All actions that SignUp process
 *
 */
import { securePost,securePostForUser } from "../services/apiService";
import * as API_CONST from "../helpers/config";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SIGN_UP_SUCCESS, SIGNUP_ERROR, CLEAR_SIGNUP_ERROR, LOGIN_SUCCESS } from "../constants/ActionConst";
import * as CommonActions from './commonActions';
import {NETWORK_ERROR} from '../constants/StringConst'
import { getUserInfo } from "./userActions";

export default function createUser(body) {
  console.log("check here on user singup action ####### ",body)
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const token = API_CONST.AUTH0RIZATION_TOKEN; 
      const res = await securePostForUser(`/v1/users`, token, body, true);
     
      // console.log("yes check before res on signin up ###### ",await res)

      if (res && res.status == 201) {
        // console.log("ON IF  - - - - - -  -- -")
        let data = await res.json()
        const authorizationHeader = data.accesstoken;
        var id  = data.user_id
        await AsyncStorage.setItem("authorizationHeader", authorizationHeader);
        await AsyncStorage.setItem("userId", id);
        await AsyncStorage.setItem("isNewSignUp","true")

        await dispatch(getUserInfo())
        await dispatch({
          type: SIGN_UP_SUCCESS,
          payload: { signUpSuccess: true, signUpError:"" },
        });
        await dispatch({
          type: LOGIN_SUCCESS,
          payload: { isLoggedIn: true, loginError:"" },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        // console.log("on else  -=----=-=-===-=-=")
        let response = await res
        await dispatch({
          type: SIGNUP_ERROR,
          payload: { signUpError: response.error },
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      }
    } catch (e) {
      console.log("check inside catch ",e)
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if(e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('SIGN_UP'));
        }else{
        alert(e)
      }
    }
  };
}

export function clearSignupError() {
  return async (dispatch, getState) => {
    try {
      await dispatch({
        type: CLEAR_SIGNUP_ERROR,
        payload: { signUpError: null }
      });
    } catch (error) {
    }
  }
}
