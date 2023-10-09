import {
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  RESET_PASSWORD_UPDATE,
  UPLOAD_IMAGE_ERROR,
  RESET_USER_DATA_ERROR,
  GET_COUNTRY_LIST_SUCCESS,
  GET_COUNTRY_LIST_ERROR,
  GET_STATE_LIST_SUCCESS,
  GET_STATE_LIST_ERROR,
  GET_CITY_LIST_SUCCESS,
  GET_CITY_LIST_ERROR,
  ADD_USER_DETAILS_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_ERROR, 
  PROFILE_UPDATE,
  UPDATE_AIRLINE_TIER,
  UPDATE_AIRLINE_TIER_SUCCESS,
  UPDATE_AIRLINE_TIER_ERROR,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,

  GUEST_USER_POSTHOG,
  GUEST_USER_POSTHOG_FAIL,
  GUEST_USER_POSTHOG_SUCCESS,


  LOGGEDIN_USER_POSTHOG,
  LOGGEDIN_USER_POSTHOG_SUCCESS,
  LOGGEDIN_USER_POSTHOG_FAIL,

  USER_CONFIG_DETAILS_SUCCESS,
  USER_CONFIG_DETAILS_FAIL,
  USER_CONFIG_DETAILS,

  GET_ZENDESK_CATEGORY_SUCCESS,
  GET_ZENDESK_CATEGORY_FAIL,

  POST_ZENDESK_TICKET,
  POST_ZENDESK_TICKET_FAIL

} from "../constants/ActionConst";

const initialState = {
  userData: {},
  userError: "",
  passwordUpdated: null,
  presignedUrl: "",
  presignedUrlError: "",
  countryList: null,
  countryListError: "",
  stateList: null,
  stateListError: "",
  cityList: null,
  cityListError: "",
  addUserDetailsSuccess : false,

  updateProfile: false,
  updateProfileError: "",

  updateAirlineTier: false,
  updateAirlineTierError: "",

  deleteUserAccountSuccess:false,
  deleteUserAccountError:"",


  guestUserPostHog:false,
  guestUserPostHogError:"",


  loggedInUserPostHog:false,
  loggedInUserPostHogError:"",

  userConfigDetails:{},
  userConfigDetailsError:"",

  zendeskCategory:{},
  zendeskCategoryError:"",

  postZendeskTicket:{},
  postZendeskError:"",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userData: action.payload.userData,
      };
    case GET_USER_DETAIL_ERROR:
      return {
        ...state,
        userError: action.payload.userError,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        userError: action.payload.userError,
      };

      case GET_ZENDESK_CATEGORY_SUCCESS:
        return {
          ...state,
          zendeskCategory: action.payload,
        };
      case GET_ZENDESK_CATEGORY_FAIL:
        return {
          ...state,
          zendeskCategoryError: action.payload.error,
        };

      case POST_ZENDESK_TICKET:
        return {
          ...state,
          postZendeskTicket: action.payload,
        };
      case POST_ZENDESK_TICKET_FAIL:
        return {
          ...state,
          postZendeskError: action.payload.error,
        };

      case ADD_USER_DETAILS_SUCCESS:{
      return {
        ...state,
        addUserDetailsSuccess: true,
      };}
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        passwordUpdated: true,
        passwordError: "",
      };
    case UPDATE_PASSWORD_ERROR: {
      return {
        ...state,
        passwordUpdated: false,
        passwordError: action.payload.passwordError,
      };
    }
    case UPDATE_AIRLINE_TIER_SUCCESS:
      {  
        return {
          ...state,
          updateAirlineTier: true,
          updateAirlineTierError:''
        };
      }
      case UPDATE_AIRLINE_TIER_ERROR:
        return {
          ...state,
          updateAirlineTierError: action.payload.updateAirlineTierError,
        };


        case USER_CONFIG_DETAILS: {
          return {
            ...state,
            userConfigDetails: false,
            userConfigDetailsError: action.payload.userConfigDetailsError,
          };
        }
        case USER_CONFIG_DETAILS_SUCCESS:
          {  
            return {
              ...state,
              userConfigDetails: action.payload.userConfigDetails,
              updateAirlineTierError:''
            };
          }
          case USER_CONFIG_DETAILS_FAIL:
            return {
              ...state,
              userConfigDetailsError: action.payload.userConfigDetailsError,
            };

      case PROFILE_UPDATE_SUCCESS:
      {  
        return {
          ...state,
          updateProfile: true,
          updateProfileError:''
        };}
      case PROFILE_UPDATE_ERROR:
        return {
          ...state,
          updateProfileError: action.payload.updateProfileError,
        };
    case RESET_PASSWORD_UPDATE:
      return {
        ...state,
        passwordUpdated: null,
        passwordError: "",
      };
    case UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        uploadImageError: action.payload.error,
      };
    case RESET_USER_DATA_ERROR: {
      return {
        ...state,
        userError: "",
      };
    }

    case GET_COUNTRY_LIST_SUCCESS: {
      return {
        ...state,
        countryList: action.payload.countryList,
        countryListError:""
      };
    }

    case GET_COUNTRY_LIST_ERROR: {
      return {
        ...state,
        countryList: null,
        countryListError:action.payload.error
      };
    }

    case GET_STATE_LIST_SUCCESS: {
      return {
        ...state,
        stateList: action.payload.stateList,
        stateListError:""
      };
    }

    case GET_STATE_LIST_ERROR: {
      return {
        ...state,
        stateList: null,
        stateListError:action.payload.error
      };
    }
    case GET_CITY_LIST_SUCCESS: {
      return {
        ...state,
        cityList: action.payload.cityList,
        cityListError:""
      };
    }

    case GET_CITY_LIST_ERROR: {
      return {
        ...state,
        cityList: null,
        cityListError:action.payload.error
      };
    }

    case DELETE_USER_ACCOUNT_SUCCESS : {
      return {
        ...state,
        deleteUserAccountSuccess:true
      }
    }
    case DELETE_USER_ACCOUNT_FAIL : {
      return {
        ...state,
        deleteUserAccountError:action.payload.deleteUserAccountError
      }
    }

    case GUEST_USER_POSTHOG_SUCCESS : {
      return{
        ...state,
        guestUserPostHog:true
      }
    }

    case GUEST_USER_POSTHOG_FAIL : {
      return{
        ...state,
        guestUserPostHogError:action.payload.guestUserPostHogError
      }
    }

    case LOGGEDIN_USER_POSTHOG_SUCCESS : {
      return{
        ...state,
        loggedInUserPostHog:true
      }
    }

    case LOGGEDIN_USER_POSTHOG_FAIL : {
      return {
        ...state,
        loggedInUserPostHogError:action.payload.loggedInUserPostHogError
      }
    }

    default:
      return state;
  }
}
