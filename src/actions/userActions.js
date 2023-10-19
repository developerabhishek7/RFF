/**
 * User Actions
 * All actions about User Data
 *
 */
import {
  secureGet,
  securePut,
  securePatch,
  securePutForUserProfile,
  securePostForUser,securePutForUser,secureDeleteForUser, secureGetForUser, securePatchForUser, secureDelete, securePost, securePostMultiPart
} from "../services/apiService";
import * as API_CONST from "../helpers/config";
import {
  UPLOAD_IMAGE_ERROR,
  SESSION_EXPIRED,
  SET_BADGE_COUNT,
  RESET_PASSWORD_UPDATE,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_ERROR,
  RESET_USER_DATA_ERROR,
  GET_COUNTRY_LIST_SUCCESS,
  GET_COUNTRY_LIST_ERROR,
  GET_STATE_LIST_SUCCESS,
  GET_STATE_LIST_ERROR,
  GET_CITY_LIST_SUCCESS,
  GET_CITY_LIST_ERROR,
  ADD_USER_DETAILS_SUCCESS,
  UPDATE_AIRLINE_TIER_SUCCESS,
  UPDATE_AIRLINE_TIER_ERROR,
  UPDATE_AIRLINE_TIER,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,
  USER_SIGN_OUT_SUCCESS,
  GUEST_USER_POSTHOG_SUCCESS,
  GUEST_USER_POSTHOG_FAIL,
  LOGGEDIN_USER_POSTHOG_SUCCESS,
  LOGGEDIN_USER_POSTHOG_FAIL,
  USER_CONFIG_DETAILS,
  USER_CONFIG_DETAILS_SUCCESS,
  USER_CONFIG_DETAILS_FAIL,
  GET_ZENDESK_CATEGORY_SUCCESS,
  GET_ZENDESK_CATEGORY_FAIL,
  POST_ZENDESK_TICKET,
  POST_ZENDESK_TICKET_SUCCESS,
  POST_ZENDESK_TICKET_FAIL,
} from "../constants/ActionConst";
import {NETWORK_ERROR} from '../constants/StringConst'
import * as STR_CONST from '../constants/StringConst'
import * as CommonActions from "./commonActions";
import {getAccessToken, getUserId} from '../constants/DataConst'
import { Alert,  } from "react-native";
import navigationService from "../utils/NavigationService";
import * as RootNavigation from '../router/RouteNavigation';
export function setPassword(password) {
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      let userData = {
        "access_token":accesstoken,
        "password":password
      }
      const res = await securePatch(
        `/v1/users/${userId}/set_password`,
        authToken,
        { user: userData }
      );
      if (res && res.status == 200) {
        await dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
        });
        dispatch(getUserInfo())
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let data = await res.json();
        await dispatch({
          type: UPDATE_PASSWORD_ERROR,
          payload: { passwordError: data.error },
        });
      }
    } catch (e) {
      console.log("cath error Update Password ", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e == STR_CONST.NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
        alert(e)
      }
      await dispatch({
        type: UPDATE_PASSWORD_ERROR,
        payload: { passwordError: e.error },
      }); // To stop Loader
    }
  };
}

export function deleteProfileImage() {
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      let userData = {
        'access_token': accesstoken,
      };
      const res = await securePutForUser(
        `/v1/users/image/_delete`,
        authToken,
        { user:userData }
      );
      if (res && res.status == 200) {
        dispatch(CommonActions.stopLoader()); // To stop Loader
            let temp = getState().userInfo.userData;
            let userData = {}
            Object.assign(userData, temp)
            userData["image"] = "";
            await dispatch({
              type: UPDATE_USER_SUCCESS,
              payload: userData,
            });
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        await dispatch({
          type: UPLOAD_IMAGE_ERROR,
          payload: { error: STR_CONST.REMOVE_IMAG_FAILED },
        });
      }
    } catch (e) {
      console.log("cath error Update USer Info", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      alert(e);
    }
  };
}

export function uploadUserImage(preSignedUrl, imageObject) {
  return async (dispatch, getState) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", preSignedUrl);
      xhr.setRequestHeader("Content-Type", imageObject.type);
      xhr.send({
        uri: imageObject.uri,
        type: imageObject.type,
        name: imageObject.fileName,
      });
      xhr.onreadystatechange = async function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            dispatch(getUserInfo())
          } else {
            console.log("Error while sending the image to S3");
            await dispatch({
              type: UPLOAD_IMAGE_ERROR,
              payload: { error: STR_CONST.IMAGE_UPLOAD_FAILED},
            });
          }
        }
      };
    } catch (e) {
      console.log("cath error Update Image", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      alert(e);
    }
  };
}

export function updateUserProfile(imageData) {  
// console.log("yes getting inside the update userProfile Image ######   ",imageData)
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      const data = new FormData();
      data.append('image', { 
        uri: imageData.uri,
        name: 'image.jpg',
        type: imageData.type
      }
      );

      const res = await securePutForUserProfile(`/v1/users/${userId}/upload_profile_image?user[access_token]=${accesstoken}`,
      authToken,
      {data: data,});
      if (res && res.status == 200) {
        dispatch(getUserInfo())
        if(addingUserDetail){
        await dispatch({
          type: UPDATE_USER_SUCCESS,
        });}
        Alert.alert("Your profile image has been updated successfully !") 
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {  
        let response = await res.json();       
        // console.log("check here inside the else ########",response)
        dispatch(CommonActions.stopLoader()); // To stop Loader
            
        await dispatch({
          type: UPLOAD_IMAGE_ERROR,
          payload: { userError: response.error },
        });
      }
    } catch (e) {
      console.log("cath error Update USer Info", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e == STR_CONST.NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
        alert(STR_CONST.SOMETHING_WENT_WRONG )
      }
    }
  };
}


// export function uploadUserImage(preSignedUrl, imageObject) {
//   return async (dispatch, getState) => {
//     try {
//       const xhr = new XMLHttpRequest();
//       xhr.open("PUT", preSignedUrl);
//       xhr.setRequestHeader("Content-Type", imageObject.type);
//       xhr.send({
//         uri: imageObject.uri,
//         type: imageObject.type,
//         name: imageObject.fileName,
//       });
//       xhr.onreadystatechange = async function() {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             dispatch(getUserInfo())
//           } else {
//             console.log("Error while sending the image to S3");
//             await dispatch({
//               type: UPLOAD_IMAGE_ERROR,
//               payload: { error: STR_CONST.IMAGE_UPLOAD_FAILED},
//             });
//           }
//         }
//       };
//     } catch (e) {
//       console.log("cath error Update Image", e);
//       dispatch(CommonActions.stopLoader()); // To stop Loader
//       alert(e);
//     }
//   };
// }

export function getPresignedURL(extension, imageOject) {
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      dispatch(CommonActions.startLoader()); // To start Loader
      const res = await secureGet(
        `/v1/users/${userId}/profile/?user[access_token]=${accesstoken}&user[file_extension]=${extension}`,
        authToken
      );
      if (res) {
        await dispatch(uploadUserImage(res.presigned_url, imageOject));
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        dispatch(deleteProfileImage())
      }
    } catch (e) {
      console.log("cath error Presigned URL Action ", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else {
        alert(STR_CONST.SOMETHING_WENT_WRONG);
      }
    }
  };
}

export function getUserInfo() {
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      const res = await secureGetForUser(
        `/v1/users/${userId}?user[access_token]=${accesstoken}`,
        authToken
      );
      if (res) {
        console.log("yes check here reponse  - - - - - -- - ",res)
        if(res.error == "Session expired."){
          await dispatch({
            type: SESSION_EXPIRED,
            payload: { sessionExpired: true },
          });
          await dispatch({
            type: GET_USER_DETAIL_SUCCESS,
            payload: { userData:"" },
          });
        }
         else{
          await dispatch({
            type: SET_BADGE_COUNT,
            badgeCount: res.data.unread_notifications_count,
          });
          await dispatch({
            type: GET_USER_DETAIL_SUCCESS,
            payload: { userData: res.data },
          });
          dispatch(CommonActions.stopLoader());
         }
      } else {
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: GET_USER_DETAIL_ERROR,
          payload: { userError: res.error },
        });
      }
    } catch (e) {
      console.log("cath error User Action get user info", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 403) {
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

export function updatePassword(passwordInfo) {
  let passwordData = passwordInfo;
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      passwordData["access_token"] = accesstoken;
      const res = await securePatchForUser(
        `/v1/users/${userId}/change_password`,
        authToken,
        { user: passwordData }
      );
      if (res && res.status == 200) {
        await dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {
        dispatch(CommonActions.stopLoader()); // To stop Loader
        let data = await res.json();
        console.log('Let DATATAT ',data)
        if(data.error =="Your old & new passwords are same."){
            Alert.alert("Your old & new passwords are same.");
        }else{
        await dispatch({
          type: UPDATE_PASSWORD_ERROR,
          payload: { passwordError: data.error },
        });
      }
      }
    } catch (e) {
      console.log("cath error Update Password ", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e == STR_CONST.NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
       Alert.alert(e)
      }
      await dispatch({
        type: UPDATE_PASSWORD_ERROR,
        payload: { passwordError: e.error },
      }); // To stop Loader
    }
  };
}

export function updateUserInfo(userInfo,addingUserDetail) {
  
  console.log("yes inside the update user Info - - - - - - - -",)

  let isLastName = userInfo.last_name
  let userData = userInfo;
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const userId = await getUserId();
      userData["access_token"] = accesstoken;
      const res = await securePutForUser(`/v1/users/${userId}`, authToken, {
        user: userData,
      });
      if (res && res.status == 200) {
        dispatch(getUserInfo())
        if(addingUserDetail){
        await dispatch({
          type: ADD_USER_DETAILS_SUCCESS,
        });}
        if(isLastName){
          Alert.alert("Your personal information has been updated successfully")
          RootNavigation.navigationRef.navigate("UserProfileScreen")
        }
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {  
        let response = await res.json();       
        dispatch(CommonActions.stopLoader()); // To stop Loader
            
        await dispatch({
          type: UPDATE_USER_ERROR,
          payload: { userError: response.error },
        });
      }
    } catch (e) {
      console.log("cath error Update USer Info", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e == STR_CONST.NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
        alert(STR_CONST.SOMETHING_WENT_WRONG )
      }
    }
  };
}

export function resetPasswordUpdate() {
  return async (dispatch) => {
    await dispatch({
      type: RESET_PASSWORD_UPDATE,
    });
  };
}

export function resetUserDataError() {
  return async (dispatch) => {
    await dispatch({
      type: RESET_USER_DATA_ERROR,
    });
  };
}

export function getCountryList() {
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await secureGetForUser(
        `/v1/geographies/countries`,
        authToken
      );
      if (res) {
        await dispatch({
          type: GET_COUNTRY_LIST_SUCCESS,
          payload: {countryList: res.countries}
        });
        dispatch(CommonActions.stopLoader());
      } else {
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: GET_COUNTRY_LIST_ERROR,
          payload: { error: res.error },
        });
      }
    } catch (e) {
      console.log("cath error User Action get country", e);
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

export function getStateList() {
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await secureGet(
        `/v1/geographies/states`,
        authToken
      );
      if (res) {
        await dispatch({
          type: GET_STATE_LIST_SUCCESS,
          payload:{stateList: res.states}
        });
        dispatch(CommonActions.stopLoader());
      } else {
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: GET_STATE_LIST_ERROR,
          payload: { error: res.error },
        });
      }
    } catch (e) {
      console.log("cath error User action on get state ", e);
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

export function getCityList() {
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await secureGetForUser(
        `/v1/geographies/cities`,
        authToken
      );
      // console.log("yes check here getCity before response #######  ",res)
      if (res) {
        // console.log("yes after response ########   ",res)
        await dispatch({
          type: GET_CITY_LIST_SUCCESS,
          payload: {cityList:res.cities}
        });
        dispatch(CommonActions.stopLoader());
      } else {
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: GET_CITY_LIST_ERROR,
          payload: { error: res.error },
        });
      }
    } catch (e) {
      console.log("cath error User Action on getcity  ", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else {
        dispatch(CommonActions.stopLoader());
        console.log(STR_CONST.SOMETHING_WENT_WRONG);
      }
    }
  };
}



export function updateAirlineTier(userInfo) {
return async (dispatch, getState) => {
  try {
    dispatch(CommonActions.startLoader());
    const accesstoken = await getAccessToken();
    const userId = await getUserId();
    const authToken = API_CONST.AUTH0RIZATION_TOKEN;
    const url = `/v1/users/${userId}/update_airline_tier?user[access_token]=${accesstoken}`;
  //   const res = await securePutForUser(`/v1/plans`, authToken);
  const res = await securePutForUser(url, authToken, { user: userInfo });
    if (res && res.status == 200) {
      dispatch(CommonActions.stopLoader()); // To stop Loader
      dispatch(getUserInfo());
      await dispatch({
        type: UPDATE_AIRLINE_TIER_SUCCESS,
        payload: { updateAirlineTier: res.data },
      });
    } else {
      dispatch(CommonActions.stopLoader()); // To stop Loader
      await dispatch({
        type: UPDATE_AIRLINE_TIER_ERROR,
      });
    }
  } catch (e) {
    console.log("cath user acton on update tier", e);
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



// Delete account api call......

export function deleteAccount(emailId) {
  console.log("yes check here delete user account emails id ########  ",emailId)
  return async (dispatch) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const res = await secureDeleteForUser(
        `/v1/users/delete_users?user[access_token]=${accesstoken}&emails=${emailId}`,
        authToken,
      );
      // console.log("yes checek here inside the res ##########   ",await res.json())
      // const res = await secureDeleteForUser(
      //   `/v1/alerts/${id}?user[access_token]=${accesstoken}`,
      //   authToken,
      //   screenType
      // );
      if (res && res.status == 200) {
        // await dispatch({
        //   type: DELETE_USER_ACCOUNT_SUCCESS,
        // });
      
        await dispatch({
          type: USER_SIGN_OUT_SUCCESS,
        });
        await dispatch({
          type: GET_USER_DETAIL_SUCCESS,
          payload: { userData:{} },
        });
        RootNavigation.navigationRef.navigate("login",{
          email:"",password:""
        })
        Alert.alert("Your Account has been deleted successfully!")
      
      
      } else {
        //  await dispatch({
        //   type: DELETE_USER_ACCOUNT_FAIL ,
        //   payload: { error: res.error },
        // });
        // NavigationService.navigate("Alerts")
        // Alert.alert("Your alert has been deleted successfully!")
        // NavigationService.navigate("Alerts")
       
      }
    } catch (e) {
      console.log("catch error on user delete account #######  ", e);
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      }else if(e == NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus('')); 
      }else{
        console.log("yes check here on########### delete user account catch else ---------",e)
        // alert(e)
      }
    }
  };
}


// post hog tracking api . .  . .  .
export function updateGuestUserPostHog(userInfo) {
  // console.log("yes check here userInfo on the post hog guest payload  - -  - - -",userInfo)
  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;      
      const res = await securePost(`/v1/posthog_guest`, authToken,
       userInfo
      );

      if (res && res.status == 200) {
        // dispatch(getUserInfo())
        await dispatch({
          type: GUEST_USER_POSTHOG_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {  
        let response = await res;  
        
        // console.log("yes check here  - - -  --  -- ",response)
        
        dispatch(CommonActions.stopLoader()); // To stop Loader
            
        await dispatch({
          type: GUEST_USER_POSTHOG_FAIL,
          payload: { guestUserPostHogError: response.error },
        });
      }
    } catch (e) {
      console.log("cath error Update USer Info", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e == STR_CONST.NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
        alert(STR_CONST.SOMETHING_WENT_WRONG )
      }
    }
  };
}


export function updateLoggedInUserPostHog(userInfo) {  

  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      // const accesstoken = await getAccessToken();
      // const userId = await getUserId();
      // userData["access_token"] = accesstoken;
      const res = await securePostForUser(`/v1/posthog`, authToken,
       userInfo,
      );
      // console.log("yes check logged in user response ####### ", await res)
      if (res && res.status == 200) {
        dispatch(getUserInfo())
        await dispatch({
          type: LOGGEDIN_USER_POSTHOG_SUCCESS,
        });
        dispatch(CommonActions.stopLoader()); // To stop Loader
      } else {  
        let response = await res       
        dispatch(CommonActions.stopLoader()); // To stop Loader
            
        await dispatch({
          type: LOGGEDIN_USER_POSTHOG_FAIL,
          payload: { loggedInUserPostHogError: response.error },
        });
      }
    } catch (e) {
      console.log("cath error Update USer Info", e);
      dispatch(CommonActions.stopLoader()); // To stop Loader
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e == STR_CONST.NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
        alert(STR_CONST.SOMETHING_WENT_WRONG )
      }
    }
  };
}


// Getting config deatils   - -  - - - - - -  -
export function getUserConfigDetails() {
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const res = await secureGetForUser(
        `/v1/settings?ConfigTypeGUID=isAppReviewed,appBuildVersion`,
        authToken
      );
      // console.log("yes check hre resposnse - - - - - -",res)      
      if (res) {
        // await dispatch({
        //   type: SET_BADGE_COUNT,
        //   badgeCount: res.data.unread_notifications_count,      
        // });
        await dispatch({
          type: USER_CONFIG_DETAILS_SUCCESS,
          payload: { userConfigDetails: res.data },
        });
        dispatch(CommonActions.stopLoader());
      } else {
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: USER_CONFIG_DETAILS_FAIL,
          payload: { userConfigDetailsError: res.error },
        });
      }
    } catch (e) {
      console.log("cath error User Action get user info", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 403) {
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


export function getZendeskCategoryData() {
  return async (dispatch, getState) => {
    try {
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      const res = await secureGetForUser(
        `/v1/supports/categories?user[access_token]=${accesstoken}`,
        authToken
      );
      if (res) {
        await dispatch({
          type: GET_ZENDESK_CATEGORY_SUCCESS,
          payload: { zendeskCategory: res.data },
        });
        dispatch(CommonActions.stopLoader());
      } else {
        dispatch(CommonActions.stopLoader());
        await dispatch({
          type: GET_ZENDESK_CATEGORY_FAIL,
          payload: { zendeskCategoryError: res.error },
        });
      }
    } catch (e) {
      console.log("cath error User Action get user info", e);
      dispatch(CommonActions.stopLoader());
      if (e.status == 403) {
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


export function submitHelpForm(postData) {

  console.log('postZendeskTicket ', postData);

  return async (dispatch, getState) => {
    try {
      dispatch(CommonActions.startLoader()); // To start Loader
      const authToken = API_CONST.AUTH0RIZATION_TOKEN;
      const accesstoken = await getAccessToken();
      // const userId = await getUserId();
      // userData["access_token"] = accesstoken;
      const res = await securePostMultiPart(`/v1/supports/ticket?user[access_token]=${accesstoken}`, authToken,
       postData
      );
      console.log("POST_ZENDESK_TICKET_SUCCESS >>>  ", res)
      if (res) {
        await dispatch({
          type: POST_ZENDESK_TICKET_SUCCESS,
        });
        dispatch(CommonActions.stopLoader());
        Alert.alert("Support ticket created sucessfully.")
        RootNavigation.navigationRef.navigate("FindFlightContainerScreen")
      } else {
        let response = await res
        console.log("POST_ZENDESK_TICKET_FAIL >>>  ", response, response.status)
        dispatch(CommonActions.stopLoader());
            
        await dispatch({
          type: POST_ZENDESK_TICKET_FAIL,
          payload: { postZendeskError: response.error },
        });
      }
    } catch (e) {
      dispatch(CommonActions.stopLoader());
      if (e.status == 401) {
        await dispatch({
          type: SESSION_EXPIRED,
          payload: { sessionExpired: true },
        });
      } else if(e == STR_CONST.NETWORK_ERROR){
        await dispatch(CommonActions.setNetworkStatus(''));
      }else{
        alert(STR_CONST.SOMETHING_WENT_WRONG )
      }
    }
  };
}