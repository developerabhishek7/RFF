/**
 * Date: August 06, 2020
 * Description: Calendar Screen.
 *
 */
 import React, { Component } from "react";
 import { connect } from "react-redux";
 import CalenderComponent from "./calenderComponent";
 import { createAlert, resetCreateAlertData,getPeakOffPeakData,resetCalendarData,getSeatsAvailability } from '../../actions/calendarActions'
 import {
   updateAirlineTier,updateGuestUserPostHog,updateLoggedInUserPostHog
 } from "../../actions/userActions";
 import * as CONST from '../../constants/StringConst'
 import { Alert } from "react-native";
 import {
  getFlightSchedule,
  getMultipleFlightSchedule
} from "../../actions/findFlightActions";
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from "moment";
import { getStoreData } from "../../constants/DataConst";
import { sendFCMToken } from "../../actions/notificationActions";
 class CalenderContainer extends Component {
   constructor(props) {
     super(props);
     this.state = {
       userInfo: this.props.userInfo,
       airLinesDetailsObject: this.props.airlinesDetails,
       calendarSeatsObject:this.props.calendarSeats,
       airlinesDetailPoints:this.props.airlinesDetailPoints,
       cabinClassData:this.props.cabinClassData,
       searchData:this.props.route.params.searchData,
       peakOffpeakData:this.props.peakOffpeakData.peakOffpeakData,
       staticDateArray:this.props.route.params.staticDateArray,
       finalData:{}
     };
   }
   
   componentDidMount = async() => {
    const Device_Token = await AsyncStorage.getItem("Device_Token");
    const isLoggedIn = this.props.isLoggedIn
    console.log("yes  is logged in - - -  - - - -",isLoggedIn)
    console.log("yes Device_Token on calendar - - -  - - - -",Device_Token)
    if (isLoggedIn) { 
          this.props.sendFCMTokenAction(Device_Token);
     }
   }



   componentDidUpdate(prevProps){
    //  let bronze_member = this.props.userInfo.bronze_member
     if( this.props !== prevProps){
       this.props
       if(this.props.createAlertSuccess && this.props.createAlertSuccess !== prevProps.createAlertSuccess )
       {
         Alert.alert(CONST.ALERT_CREATED)
         this.props.resetCreateAlertDataAction()
                  //  if(bronze_member == true){
                  // Alert.alert(CONST.ALERT_CREATED, null, [
                  //   {
                  //     text: 'OK',
                  //     onPress: () => {
                  //       alert(STR_CONST.BRONZE_ALERT_INFO)
                  //     },
                  //   },
                  // ]);
                  //  Alert.alert(STR_CONST.BRONZE_ALERT_INFO)
                  //  }              
       }
       else if (this.props.createAlertError) {
         Alert.alert(this.props.createAlertError)
         this.props.resetCreateAlertDataAction()
       }
     }
   }
 
   render() {
     return (
       <CalenderComponent
         userInfo={this.props.userInfo}
         airLinesDetailsObject={this.state.airLinesDetailsObject}
         calendarSeatsObject={this.props.calendarSeats}
         navigation = {this.props.navigation}
         onSubmitAlertPress = {(alertData)=>this.props.createAlertAction(alertData)}        
         searchData={this.props.route.params.searchData}
         isLoggedIn = {this.props.isLoggedIn}
         airlinesMembershipDetails={this.props.airlinesMembershipDetails}
         flightSchedule={this.props.flightSchedule}
         airlinesDetailPoints={this.props.airlinesDetailPoints}
         onGetScheduleData={(flightScheduleData) => this.props.getFlightScheduleAction(flightScheduleData)}
         onAirlineSelected = {(data)=>this.props.updateAirlineTierAction(data)}
         peakOffpeakData={this.props.route.params.peakOffpeakData}
         focusedDate={this.props.route.params.focusedDate}
         cabinClassData={this.props.cabinClassData}
         staticDateArray={this.props.route.params.staticDateArray}
         startDate={this.props.route.params.startDate}
         getMultipleScheduleData = {(flightScheduleData)=>this.props.getMultipleFlightScheduleAction(flightScheduleData)}
         multipleFlightScheduleData={this.props.multipleFlightScheduleData}   
         alertsArray={this.props.alertsArray} 
       />
     );
   }
 }


 const mapStateToProps = (state) => {
    const { calendar,userInfo,logIn, findFlight,alerts } = state; 
    return {
     userInfo: userInfo.userData,
     alertsArray: alerts.alertsArray,
     createAlertSuccess: calendar.createAlertSuccess,
     createAlertError: calendar.createAlertError,
     airlinesDetails: calendar.airlinesDetail,
     calendarSeats:calendar.calendarSeats,
     airlinesDetailPoints:calendar.airlinesDetailPoints,
     isLoggedIn: logIn.isLoggedIn,
     airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
     flightSchedule:findFlight.flightSchedule,
     peakOffpeakData:calendar.peakOffpeakData,
     multipleFlightScheduleData:findFlight.multipleFlightScheduleData,
     cabinClassData:findFlight.cabinClassData
   };
 };
 
 const mapDispatchToProps = (dispatch) => {
   return {
     getSeatsAvailabilityAction: (searchData) => dispatch(getSeatsAvailability(searchData)),
     updateGuestUserPostHogAction: (guestUserPostHog) => dispatch(updateGuestUserPostHog(guestUserPostHog)),
     updateLoggedInUserPostHogAction: (loggedInUserPostHog) => dispatch(updateLoggedInUserPostHog(loggedInUserPostHog)),
     createAlertAction: (alertData) => dispatch(createAlert(alertData)),
     sendFCMTokenAction: (fcmToken) => dispatch(sendFCMToken(fcmToken)),
     resetCreateAlertDataAction: () => dispatch(resetCreateAlertData()),    
     getPeakOffPeakDataAction:() => dispatch(getPeakOffPeakData()),
     getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
     resetCalendarDataAction:()=>dispatch(resetCalendarData()),
     updateAirlineTierAction: (userData) => dispatch(updateAirlineTier(userData)),
     getMultipleFlightScheduleAction:(flightScheduleData) => dispatch(getMultipleFlightSchedule(flightScheduleData))
    };
 };
 export default connect(mapStateToProps, mapDispatchToProps)(CalenderContainer);
 