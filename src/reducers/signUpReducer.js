import { SIGN_UP_SUCCESS, SIGNUP_ERROR, CLEAR_SIGNUP_ERROR } from "../constants/ActionConst";

const initialState = {
  signUpSuccess: false,
  signUpError: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
    {  
      return {
        ...state,
        signUpSuccess: true,
        signUpError:''
      };}
    case SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.payload.signUpError,
      };
    case CLEAR_SIGNUP_ERROR:
      return {
        ...state,
        signUpError: null,
      };
    default:
      return state;
  }
}
