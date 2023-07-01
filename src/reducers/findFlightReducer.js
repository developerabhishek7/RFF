import {
  GET_AIRLINES_MEMBERSHIP_SUCCESS,
  GET_AIRLINES_MEMBERSHIP_ERROR,
  GET_POSSIBLE_ROUTES_SUCCESS,
  GET_POSSIBLE_ROUTES_ERROR,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_ERROR,
  GET_NEAREST_AIRPORT_SUCCESS,
  SEND_AUDIT_DATA_SUCCESS,
  SEND_AUDIT_DATA_ERROR,
  GET_FLIGHT_SCHEDULE_SUCCESS,
  GET_FLIGHT_SCHEDULE_ERROR,
  RESET_FINDFLIGHT_DATA,
  GET_MULTIPLE_SCHEDULE_DATA_SUCCESS,
  GET_MULTIPLE_SCHEDULE_DATA_ERROR,
  GET_CABIN_CLASS_SUCCESS,
  GET_CABIN_CLASS_FAIL
} from "../constants/ActionConst";

const initialState = {
  airlinesMembershipDetailsError: "",
  airlinesMembershipDetails: null,
  airlinesPossileRoutes: null,
  airlinesPossileRoutesError: "",
  locations: null,
  locationsError: "",
  nearestAirports: [],
  sendAuditDataSuccess: false,
  flightSchedule: null,
  flightScheduleError: "",
  multipleFlightScheduleData:null,
  multipleFlightScheduleError:"",
  cabinClassData:"",
  cabinClassDataError:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AIRLINES_MEMBERSHIP_SUCCESS: {
      return {
        ...state,
        airlinesMembershipDetails: action.payload.airlinesMembershipDetails,
        airlinesMembershipDetailsError: "",
      };
    }
    case GET_AIRLINES_MEMBERSHIP_ERROR:
      return {
        ...state,
        airlinesMembershipDetailsError:
          action.payload.airlinesMembershipDetailsError,
        airlinesMembershipDetails: null,
      };
    case GET_POSSIBLE_ROUTES_SUCCESS: {
      return {
        ...state,
        airlinesPossileRoutes: action.payload.airlinesPossileRoutes,
        airlinesPossileRoutesError: "",
      };
    }
    case GET_POSSIBLE_ROUTES_ERROR:
      return {
        ...state,
        airlinesPossileRoutesError: action.payload.airlinesPossileRoutesError,
        airlinesPossileRoutes: null,
      };
    case GET_LOCATIONS_SUCCESS: {
      return {
        ...state,
        locations: action.payload.locations,
        locationsError: "",
      };
    }
    case GET_LOCATIONS_ERROR:
      return {
        ...state,
        locations: null,
        locationsError: locationsError,
      };
    case GET_NEAREST_AIRPORT_SUCCESS:
      return {
        ...state,
        nearestAirports: action.payload.nearestAirports,
      };

    case SEND_AUDIT_DATA_SUCCESS:
      return {
        ...state,
        sendAuditDataSuccess: true,
      };
    case SEND_AUDIT_DATA_ERROR:
      return {
        ...state,
        sendAuditDataSuccess: false,
      };

      case GET_FLIGHT_SCHEDULE_SUCCESS: {
        return {
          ...state,
          flightSchedule: action.payload.flightSchedule,
          flightScheduleError: "",
        };
      }
      case GET_FLIGHT_SCHEDULE_ERROR:
        return {
          ...state,
          flightSchedule: null,
          flightScheduleError: action.payload.flightScheduleError,
        };
        case GET_CABIN_CLASS_SUCCESS:{
          return {
           ...state,
           cabinClassData: action.payload.cabinClassData,
           cabinClassDataError: "",
          //  screenType:action.payload.screenType
         };}
       case GET_CABIN_CLASS_FAIL:
         return {
           ...state,
           cabinClassData: null,
           cabinClassDataError: action.payload.cabinClassDataError,
         };
      case GET_MULTIPLE_SCHEDULE_DATA_SUCCESS:{
        return{
          ...state,
          multipleFlightScheduleData:action.payload.multipleFlightScheduleData,
          multipleFlightScheduleError:""
        }
      }
      case GET_MULTIPLE_SCHEDULE_DATA_ERROR:{
        return{
          ...state,
          multipleFlightScheduleData:null,
          multipleFlightScheduleError:action.payload.multipleFlightScheduleError
        }
      }
        case RESET_FINDFLIGHT_DATA : {
          return{
            airlinesMembershipDetailsError: "",
            airlinesMembershipDetails: null,
            airlinesPossileRoutes: null,
            airlinesPossileRoutesError: "",
            locations: null,
            locationsError: "",
            nearestAirports: [],
            sendAuditDataSuccess: false,
            flightSchedule: null,
            flightScheduleError: "",
          }
        }

    default:
      return state;
  }
}
