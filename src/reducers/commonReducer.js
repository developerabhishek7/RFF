import * as CONST from "../constants/ActionConst";

const initialState = {
  isLoading: false,
  sessionExpired: false,
  isNetworkFailed:false,
  noNetworkScreen:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONST.START_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case CONST.STOP_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    case CONST.SESSION_EXPIRED: {
      return {
        ...state,
        sessionExpired: action.payload.sessionExpired,
      };
    };
    case CONST.NETWORK_FAILED:{
      return {
        ...state,
        isNetworkFailed: action.payload.isNetworkFailed,
        noNetworkScreen: action.payload.noNetworkScreen
      };}
    default:
      return state;
  }
}
