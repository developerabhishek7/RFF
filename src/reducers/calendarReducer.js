import {
GET_AIRLINES_AVAILABILITY_SUCCESS,
GET_AIRLINES_AVAILABILITY_ERROR,
CREATE_ALERT_SUCCESS,
CREATE_ALERT_ERROR,
RESET_CREATE_ALERT_DATA,
GET_AVAILABLE_CALENDAR_POINTS_ERROR,
GET_AVAILABLE_CALENDAR_POINTS_SUCESS,
GET_PEAK_OFFPEAK_SUCCESS,
GET_PEAK_OFFPEAK_ERROR,
RESET_CALENDAR_DATA,
CHECK_SEATS_AVAILABLE_SUCCESS,
CHECK_SEATS_AVAILABLE_FAIL
  } from "../constants/ActionConst";
  
  const initialState = {
    airlinesDetailError: "",
    airlinesDetail: null,
    airlinesDetailPoints:null,
    airlinesDetailPointsError:"",
    createAlertSuccess:null,
    createAlertError:"",
    screenType:'',
    peakOffpeakData:"",
    peakOffpeakError:"",
    calendarSeats:null,
    calendarSeatsError:""

  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_AIRLINES_AVAILABILITY_SUCCESS:{
         return {
          ...state,
          airlinesDetail: action.payload.airlinesDetail,
          screenType:action.payload.screenType
        };}
      case GET_AIRLINES_AVAILABILITY_ERROR:
        return {
          ...state,
          airlinesDetailError: action.payload.airlinesDetailError,
        };
        case CHECK_SEATS_AVAILABLE_SUCCESS:{
          return {
           ...state,
           calendarSeats: action.payload.calendarSeats,
         };}
       case CHECK_SEATS_AVAILABLE_FAIL:
         return {
           ...state,
           calendarSeatsError: action.payload.calendarSeatsError,
         };

        case GET_AVAILABLE_CALENDAR_POINTS_SUCESS:{
          return {
           ...state,
           airlinesDetailPoints: action.payload,
         };}
       case GET_AVAILABLE_CALENDAR_POINTS_ERROR:
         return {
           ...state,
           airlinesDetailPointsError: action.payload.airlinesDetailPointsError,
         };
         case GET_PEAK_OFFPEAK_SUCCESS:{
          return {
           ...state,
           peakOffpeakData: action.payload,
         };}
       case GET_PEAK_OFFPEAK_ERROR:
         return {
           ...state,
           peakOffpeakError: action.payload.peakOffpeakError,
         };

        case CREATE_ALERT_SUCCESS:{
          return {
           ...state,
           createAlertSuccess: true,
           createAlertError: ""
         };}
       case CREATE_ALERT_ERROR:
         return {
           ...state,
           createAlertError: action.payload.createAlertError,
           createAlertSuccess:false
         };


         case RESET_CREATE_ALERT_DATA:
         return {
           ...state,
           createAlertError: "",
           createAlertSuccess:null
         };  
         
         case RESET_CALENDAR_DATA : {
          return{
            airlinesDetailError: "",
            airlinesDetail: null,
            airlinesDetailPoints:null,
            calendarSeats:null,
            calendarSeatsError:"",
            airlinesDetailPointsError:"",
            createAlertSuccess:null,
            createAlertError:"",
            screenType:'',
            peakOffpeakData:"",
            peakOffpeakError:"",
          }
         }
      default:
        return state;
    }
  }
  