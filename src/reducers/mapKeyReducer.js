import { GET_MAP_KEY, GET_MAP_KEY_ERROR, GET_MAP_KEY_SUCCESS } from "../constants/ActionConst";

const initialState = {
  MapKeyData: false,
  MapKeySucessError: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MAP_KEY_SUCCESS:
    {  
      return {
        ...state,
        MapKeyData: action.payload.MapKeyData,
        MapKeySucessError:''
      };}
    case GET_MAP_KEY_ERROR:
      return {
        ...state,
        MapKeySucessError: action.payload.error,
      };
    case GET_MAP_KEY:
      return {
        ...state,
        MapKeySucessError: null,
      };
    default:
      return state;
  }
}
