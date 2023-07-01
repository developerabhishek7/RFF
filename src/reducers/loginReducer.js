import {
  SOCIAL_LOGIN_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  USER_SIGN_OUT_SUCCESS,
  USER_SIGN_OUT_ERROR
} from "../constants/ActionConst";

const initialState = {
  loginError: "",
  logoutSuccess: false,
  isLoggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        loginError:""
      };
      case USER_SIGN_OUT_SUCCESS:{
      return {
        ...state,
        isLoggedIn: false
      };}
      case USER_SIGN_OUT_ERROR:{
      return {
        ...state,
        isLoggedIn: true,
        loginError: action.payload.logOutError
      };}
           
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload.loginError
      };
    case CLEAR_LOGIN_ERROR:
      return {
        ...state,
        loginError: null
      };
    default:
      return state;
  }
}
