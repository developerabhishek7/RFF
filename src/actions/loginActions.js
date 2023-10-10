/**
 * Login Actions
 * All actions that Login process
 *
 */
 import { securePost, secureDelete,securePostForUser, secureDeleteForUser } from "../services/apiService";
 import * as API_CONST from "../helpers/config";
//  import AsyncStorage from '@react-native-async-storage/async-storage'
 import { setUserData } from "../constants/DataConst";
 import AsyncStorage from '@react-native-async-storage/async-storage'
import {
   SOCIAL_LOGIN_SUCCESS,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   CLEAR_LOGIN_ERROR,
   USER_SIGN_OUT_SUCCESS,
   USER_SIGN_OUT_ERROR,
   SESSION_EXPIRED,
   RESET_FINDFLIGHT_DATA,
   RESET_USER_DATA_ERROR,
   GET_USER_DETAIL_SUCCESS
 } from "../constants/ActionConst";
 import * as CommonActions from "./commonActions";
 import { getPresignedURL } from "./userActions";
 import { NETWORK_ERROR } from "../constants/StringConst";
 import { getAccessToken } from "../constants/DataConst";
 import { getUserInfo } from "./userActions";
import {Alert} from 'react-native'
import * as RootNavigation from '../router/RouteNavigation';
 export function setLoginStatus(loginStatus) {
   return async (dispatch) => {
     await dispatch({
       type: LOGIN_SUCCESS,
       payload: { isLoggedIn: loginStatus },
     });
   };
 }
 
 export function socialLogin(
   body,
   successCallBack,
   errorCallBack,
   imageObject,
   extension
 ) {
   console.log("yes getting in the social login Action #######    ",body)
   return async (dispatch, getState) => {
     try {
       dispatch(CommonActions.startLoader()); // To start Loader
       const token = API_CONST.AUTH0RIZATION_TOKEN;
       const res = await securePostForUser(`/v1/users/social_auth`, token, body, true);
       console.log("check here response ####### ",await res)
       if (res && res.status == 200) {
         let data = await res.json()
         console.log("yes chec here socail auth response ########   ",data)
         const authorizationHeader = data.accesstoken;
         var id  = data.user_id
         await AsyncStorage.setItem("userId",(id));
         await AsyncStorage.setItem("authorizationHeader", authorizationHeader);
        
         await dispatch(getUserInfo());
         await dispatch({
           type: SOCIAL_LOGIN_SUCCESS,
           payload: { isLoggedIn: true },
         });
 
         dispatch(CommonActions.stopLoader()); // To stop Loader
         successCallBack(res);
       } else {
         dispatch(CommonActions.stopLoader()); // To stop Loader
         const responseBody = await res.json();
         errorCallBack(responseBody);
       }
     } catch (e) {
       console.log("yes check here on the socail Login API #######√ ",e)
       dispatch(CommonActions.stopLoader()); // To stop Loader
       alert(e);
     }
   };
 }
 
 
 // export default function signIn(body) {
 //   return async (dispatch, getState) => {
 //     try {
 //       dispatch(CommonActions.startLoader()); // To start Loader
 //       const token = API_CONST.AUTH0RIZATION_TOKEN; 
 //       const res = await securePostForUser(`/v1/users/login`, token, body, true);
       
 //         console.log("check on login respmse ",await res.json())
 //       if (res && res.status === 200) {
 //         let data = await res.json()
 //         const authorizationHeader = data.accesstoken;
 //         var id  = data.user_id
 //         await AsyncStorage.setItem("authorizationHeader", authorizationHeader);
 //         await AsyncStorage.setItem("userId", id);
 //         await dispatch(getUserInfo())
 //         await dispatch({
 //           type: LOGIN_SUCCESS,
 //           payload: { isLoggedIn: true, loginError:"" },
 //         });
 //         dispatch(CommonActions.stopLoader()); // To stop Loader
 //       } else {
 //         let response = await res.json()
 //         console.log("check inside the else #######  ",JSON.stringify(res))
 //         await dispatch({
 //             type: LOGIN_ERROR,
 //             payload: { loginError: "Invalid credentails"},
 //          });
 //         dispatch(CommonActions.stopLoader()); // To stop Loader
 //       }
 //     } catch (e) {
 //       console.log("check inside catch ",e)
 //       dispatch(CommonActions.stopLoader()); // To stop Loader
 //       if(e == NETWORK_ERROR){
 //         await dispatch(CommonActions.setNetworkStatus('SIGN_UP'));
 //         }else{
 //         alert(e)
 //       }
 //     }
 //   };
 // }
 
 
 export function signIn(body, successCallBack, errorCallBack) {
   return async (dispatch, getState) => {
     try {
       dispatch(CommonActions.startLoader()); // To start Loader
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const data = await securePostForUser(`/v1/users/login`, authToken, body, true);  
       if (data.status === 200) {
        let res = await data.json()
        const authorizationHeader = res.accesstoken;
        var id  = res.user_id
         await AsyncStorage.setItem("authorizationHeader", authorizationHeader);
         await AsyncStorage.setItem("userId", JSON.stringify(id));
         await dispatch(getUserInfo());
         await dispatch({
           type: LOGIN_SUCCESS,
           payload: { isLoggedIn: true, loginError: "" },
         });
         dispatch(CommonActions.stopLoader()); // To stop Loader
       } 
       else {
        dispatch(CommonActions.stopLoader())
        if(data.error == "Invalid email or password."){
          Alert.alert("Invalid email or password")
        }
        // ; // To stop Loader
        //  await dispatch({
        //    type: LOGIN_ERROR,
        //    payload: { loginError: data.error},
        //  });
        
       }
     } catch (e) {
       console.log("check on catch part ########----------------------------- ",e)
       dispatch(CommonActions.stopLoader()); // To stop Loader
       if (e == NETWORK_ERROR) {
         await dispatch(CommonActions.stopLoader());
         await dispatch(CommonActions.setNetworkStatus("LOG_IN"));
       } else {
         Alert.alert(e);
       }
     }
   };
 }
 
 export function clearLoginError() {
   return async (dispatch, getState) => {
     try {
       await dispatch({
         type: CLEAR_LOGIN_ERROR,
         payload: { loginError: null },
       });
     } catch (error) {}
   };
 }
 
 export function logoutUser() {
   return async (dispatch, getState) => {
     try {
       dispatch(CommonActions.startLoader());
       const authToken = API_CONST.AUTH0RIZATION_TOKEN;
       const accesstoken = await getAccessToken();
       const res = await secureDeleteForUser(
         `/v1/users/logout?user[access_token]=${accesstoken}`,
         authToken
       );
       if (res && res.status == 200) {
        setUserData();
        dispatch(CommonActions.stopLoader());
        // RootNavigation.navigationRef.navigate("SignIn")
        await AsyncStorage.removeItem("MAP_TOKEN")
        
         await dispatch({
           type: USER_SIGN_OUT_SUCCESS,
         });
         await dispatch({
          type: GET_USER_DETAIL_SUCCESS,
          payload: { userData:{} },
        });



        //  await dispatch({
        //   type: GET_USER_DETAIL_SUCCESS,
        //   payload: { userData:{} },
        // });
        //  await dispatch({
        //   type: GET_USER_DETAIL_SUCCESS,
        //   payload: {},
        // });
        //  await dispatch({
        //   type: RESET_FINDFLIGHT_DATA,
        // });
        // await dispatch({
        //   type: RESET_USER_DATA_ERROR,
        // });
   
       } else {
         await dispatch({
           type: USER_SIGN_OUT_ERROR,
           payload: { logOutError: res.error },
         });
         dispatch(CommonActions.stopLoader());
       }
     } catch (e) {
       console.log("catch of logout+++", e);
       if (e.status == 401) {
         await dispatch({
           type: SESSION_EXPIRED,
           payload: { sessionExpired: true },
         });
       } else if (e == NETWORK_ERROR) {
         await dispatch(CommonActions.setNetworkStatus("LOG_IN"));
       } else {
         alert(e);
       }
       dispatch(CommonActions.stopLoader());
     }
   };
 }
 