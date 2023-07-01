import {
  SET_PRIMARY_EMAIL_SUCCESS,
  SET_PRIMARY_EMAIL_ERROR,
  SECONDARY_VERIFICATION_SUCCESS,
  SECONDARY_VERIFICATION_ERROR,
  PRIMARY_VERIFICATION_SUCCESS,
  PRIMARY_VERIFICATION_ERROR,
  CREATE_ALTERNATE_EMAIL_SUCCESS,
  CREATE_ALTERNATE_EMAIL_ERROR,
  DELETE_EMAIL_SUCCESS,
  DELETE_EMAIL_ERROR,
  DELETE_NUMBER_SUCCESS,
  DELETE_NUMBER_ERROR,
  VERIFY_NUMBER_SUCCESS,
  VERIFY_NUMBER_ERROR,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_ERROR,
  RESET_MANAGE_CONTACT,
  ADD_MANAGE_CONTACT_DETAILS,
  ADD_MANAGE_CONTACT_DETAILS_SUCCESS,
  ADD_MANAGE_CONTACT_DETAILS_ERROR,
  SET_SECONDARY_EAMIL_PRIMARY_SUCCESS,
  SET_SECONDARY_EAMIL_PRIMARY_ERROR
} from "../constants/ActionConst";

const initialState = {
  setPrimaryEmailSuccess: null,
  setPrimaryEmailError: "",

  setSecondaryEmailPrimary:null,
  setSecondaryEmailPrimaryError:"",

  secondaryVerificationSuccess: null,
  secondaryVerificationError: "",

  primaryVerificationSuccess: null,
  primaryVerificationError: "",

  createAlternateEmailSuccess: null,
  createAlternateEmailError: "",

  deleteEmailSuccess: null,
  deleteEmailError: "",

  deleteNumberSuccess: null,
  deleteNumberError: "",

  verifyNumberSuccess: null,
  verifyNumberError: "",

  resendOTPSuccess: null,
  resendOTPError: "",

  addContactSuccess: null,
  addContactError: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PRIMARY_EMAIL_SUCCESS:
      return {
        ...state,
        setPrimaryEmailSuccess: true,
        setPrimaryEmailError: "",
      };
    case SET_PRIMARY_EMAIL_ERROR:
      return {
        ...state,
        setPrimaryEmailSuccess: false,
        setPrimaryEmailError: action.payload,
      };

      case SET_SECONDARY_EAMIL_PRIMARY_SUCCESS :
        return{
          ...state,
          setSecondaryEmailPrimary:true,
          setSecondaryEmailPrimaryError:"",
        }

      case SET_SECONDARY_EAMIL_PRIMARY_ERROR : 
      return{
        ...state,
        setSecondaryEmailPrimary:false,
        setSecondaryEmailPrimaryError:""
      }

    case SECONDARY_VERIFICATION_SUCCESS:
      return {
        ...state,
        secondaryVerificationSuccess: true,
        secondaryVerificationError: "",
      };
    case SECONDARY_VERIFICATION_ERROR:
      return {
        ...state,
        secondaryVerificationSuccess: false,
        secondaryVerificationError: action.payload,
      };

    case PRIMARY_VERIFICATION_SUCCESS:
      return {
        ...state,
        primaryVerificationSuccess: true,
        primaryVerificationError: "",
      };
    case PRIMARY_VERIFICATION_ERROR:
      return {
        ...state,
        primaryVerificationSuccess: false,
        primaryVerificationError: action.payload,
      };

    case CREATE_ALTERNATE_EMAIL_SUCCESS:
      return {
        ...state,
        createAlternateEmailSuccess: true,
        createAlternateEmailError: "",
      };
    case CREATE_ALTERNATE_EMAIL_ERROR:
      return {
        ...state,
        createAlternateEmailSuccess: false,
        createAlternateEmailError: action.payload,
      };

    case DELETE_EMAIL_SUCCESS:
      return {
        ...state,
        deleteEmailSuccess: true,
        deleteEmailError: "",
      };
    case DELETE_EMAIL_ERROR:
      return {
        ...state,
        deleteEmailSuccess: false,
        deleteEmailError: action.payload,
      };
    case DELETE_NUMBER_SUCCESS:
      return {
        ...state,
        deleteNumberSuccess: true,
        deleteNumberError: "",
      };
    case DELETE_NUMBER_ERROR:
      return {
        ...state,
        deleteNumberSuccess: false,
        deleteNumberError: action.payload,
      };

    case VERIFY_NUMBER_SUCCESS:
      return {
        ...state,
        verifyNumberSuccess: true,
        deleteNumberError: "",
      };
    case VERIFY_NUMBER_ERROR:
      return {
        ...state,
        verifyNumberSuccess: false,
        verifyNumberError: action.payload,
      };
    case ADD_MANAGE_CONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        addContactSuccess: true,
        addContactError: ""
      };
    case ADD_MANAGE_CONTACT_DETAILS_ERROR:
      return {
        ...state,
        addContactSuccess: false,
        addContactError: action.payload
      }
    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        resendOTPSuccess: true,
        resendOTPError: "",
      };
    case RESEND_OTP_ERROR:
      return {
        ...state,
        resendOTPSuccess: false,
        resendOTPError: action.payload,
      };
    case RESET_MANAGE_CONTACT:
      return {
        setPrimaryEmailSuccess: null,
        setPrimaryEmailError: "",
        secondaryVerificationSuccess: null,
        secondaryVerificationError: "",
        primaryVerificationSuccess: null,
        primaryVerificationError: "",
        createAlternateEmailSuccess: null,
        createAlternateEmailError: "",
        deleteEmailSuccess: null,
        deleteEmailError: "",
        deleteNumberSuccess: null,
        deleteNumberError: "",
        verifyNumberSuccess: null,
        verifyNumberError: "",
        resendOTPSuccess: null,
        resendOTPError: "",
        addContactSuccess: null,
        addContactError: "",
        setSecondaryEmailPrimary:null,
        setSecondaryEmailPrimaryError:""
      };

    default:
      return state;
  }
}
