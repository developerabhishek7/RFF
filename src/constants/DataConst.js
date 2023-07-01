import  AsyncStorage from '@react-native-async-storage/async-storage'
import {isEmptyString} from "../utils/commonMethods";
var access_token = "";
var userId = "";
export async function getAccessToken() {
  if (!access_token || isEmptyString(access_token)) {
    access_token = await AsyncStorage.getItem("authorizationHeader");
  }
  return access_token;
}

export async function getUserId() {
  if (!userId || isEmptyString(userId)) {
    userId = await AsyncStorage.getItem("userId");
  }
  return userId;
}

export async function setUserData() {
 access_token = "";
 userId = "";
}

export async function getStoreData(key) {
  let data = await AsyncStorage.getItem(key);
return data;
 }
