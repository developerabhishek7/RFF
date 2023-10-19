/**
 * Date: Jan 10, 2022
 * Description: Flight Details Screen.
 *
 */
 import React, { Component } from "react";
 import { connect } from "react-redux";
 import FlightDetailsComponent from "./flightDetailsComponent";
 import {
   getAirlinesMembership,
   getPossibleRoutes,
   getLocations,
   getNearestAirport,
   sendAuditData,
   getFlightSchedule,
   getMultipleFlightSchedule
 } from "../../actions/findFlightActions";
 import { getAirlinesAvailability, getSeatsAvailability} from "../../actions/calendarActions";
 import { setLoginStatus } from "../../actions/loginActions";
 import { getUserInfo,getCountryList,
   getStateList,
   getCityList, updateUserInfo } from "../../actions/userActions";
 import { resetNetworkStatus, resetSession } from "../../actions/commonActions";
 import NetInfo from "@react-native-community/netinfo";
 import {  Alert, Linking, View} from "react-native";
 import AsyncStorage from '@react-native-async-storage/async-storage'
 import * as STRING_CONST from "../../constants/StringConst";
 import * as IMAGE_CONST from "../../constants/ImageConst";
 import { getNotificationSettings } from "../../actions/notificationActions";
 import { getStoreData } from "../../constants/DataConst";
 import { getProductPlans } from "../../actions/subscriptionActions";
//  import {trackEventDetails } from "../../helpers/segmentMethods";
 var uuid = require('react-native-uuid');
 
 class FlightDetailsContainer extends Component {
   constructor(props) {
     super(props);
     this.state = {
       userInfo: this.props.userInfo,
       airLinesMembershipDetailsObject: this.props.airlinesMembershipDetails,
       airlinesPossileRoutesList:this.props.airlinesPossileRoutes,
       locationsObject:this.props.locations,
       searchData:{},
       showNetworkPopUp: false,
       currentLongitude: null,
       currentLatitude: null,
       nearestAirport: {},
       cabinClassData:this.props.cabinClassData
     };
   }
   async componentDidMount(){
    //  this.props.getAirlinesMembershipAction()
    //  this.props.getPossibleRouteAction()
    //  this.props.getCountryListAction()
    //  this.props.getStateListAction()
    //  this.props.getCityListAction()
    //  this.props.getLocationsAction()
    //  this.props.getProductPlansAction()
    const isLoggedIn = await getStoreData('authorizationHeader')
    const guestId = await getStoreData('guestId')
    if(!guestId){
    await AsyncStorage.setItem("guestId", uuid.v4() );}
   
    if(isLoggedIn){
       // this.props.getUserInfoAction()
      //  this.props.getNotificationSettingsAction();
     }
     this.loginStatus()
      NetInfo.addEventListener(state => {
       if(state.isConnected && (!this.state.locationsObject || !this.state.airlinesPossileRoutesList)){
        //  this.props.getPossibleRouteAction()
        //  this.props.getLocationsAction()
       }
     });
   }
   async loginStatus(){
     const authorizationHeader = await AsyncStorage.getItem(
       "authorizationHeader"
     );
    //  if(authorizationHeader){
    //    this.props.setLoginStatusAction(true)
    //  }
   }
 
   async componentDidUpdate(prevProps) {
     if (this.props !== prevProps) {
       if(this.props.airlinesMembershipDetails && this.props.airlinesMembershipDetails !== prevProps.airlinesMembershipDetails){
         this.setState({
           airLinesMembershipDetailsObject: this.props.airlinesMembershipDetails
         })
       }
       if(this.props.airlinesPossileRoutes && this.props.airlinesPossileRoutes !== prevProps.airlinesPossileRoutes){
         this.setState({
           airlinesPossileRoutesList: this.props.airlinesPossileRoutes
         })
       }
       if(this.props.locations && this.props.locations !== prevProps.locations){
         this.setState({
           locationsObject: this.props.locations
         })
       }
 
       if(this.props.airlinesDetail && this.props.airlinesDetail !== prevProps.airlinesDetail && this.props.screenType == "FIND_FLIGHT"){
         this.props.navigation.navigate(STRING_CONST.CALENDAR_SCREEN, {searchData:this.state.searchData,focusedDate:null })
        //  trackEventDetails(STRING_CONST.HOME_PAGE_SEARCH_EVENT, null, this.props.userData)
       }
       if(this.props.isNetworkFailed !== prevProps.isNetworkFailed && this.props.isNetworkFailed ){
         this.setState({
           showNetworkPopUp:true
         })
       }
       if (this.props.sessionExpired !== prevProps.sessionExpired) {
         AsyncStorage.removeItem("authorizationHeader");
         AsyncStorage.removeItem("userId");
         AsyncStorage.removeItem("searchDetails");
         Alert.alert(STRING_CONST.SESSION_EXPIRED_MSG);
        //  this.props.navigation.navigate("Anonymous");
          // ----->
          this.props.navigation.navigate("login");
        
         //  this.props.setLoginStatusAction(false)
         // this.props.resetSessionAction();
       }
       if (
         this.props.notiifcationSettingsData !==
         prevProps.notiifcationSettingsData
       ) {
         const NotificationDisbledFromPhone = await AsyncStorage.getItem(
           "NotificationDisbledFromPhone"
         );
         if (
          NotificationDisbledFromPhone &&
           this.props.notiifcationSettingsData.push_notification &&
           JSON.parse(NotificationDisbledFromPhone).value
         ) {
           Alert.alert(STRING_CONST.NOTIFICATION_PERMISSION, null, [
             {
               text: STRING_CONST.OK,
               onPress: () => {
                 Linking.openSettings();
               },
             },
             {
               text: STRING_CONST.IGNORE,
               onPress: () => console.log("Ask me later pressed"),
             },
           ]);
         }
       }
     }
   }
 
   render() {

    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member

     return (
       <View style={{flex:1}}>
         <FlightDetailsComponent
           airLinesMembershipDetailsObject={
             this.state.airLinesMembershipDetailsObject
           }
           airlinesPossileRoutesList={this.state.airlinesPossileRoutesList}
           locationsObject={this.state.locationsObject}
           navigation={this.props.navigation}
           // onSearchPressed={(searchData, auditData) => {
           //   this.setState({
           //     searchData: searchData,
           //   });
           //   this.props.getAirlinesAvailabilityAction(searchData);
           //   this.props.sendAuditDataAction(auditData);
             
           // }}
           getMultipleScheduleData = {(flightScheduleData)=>this.props.getMultipleFlightScheduleAction(flightScheduleData)}
           onSearchPressed={(searchData, auditData) => {
             this.setState({
               searchData: searchData,
             });
             this.props.getAirlinesAvailabilityAction(searchData);
             this.props.getSeatsAvailabilityAction(searchData);
            this.props.sendAuditDataAction(auditData);
             let flightScheduleData = {
               airline :searchData.airline,
               source :searchData.sourceCode,
               destination :searchData.destinationCode,
               bronzeMember:bronzeMember

             }
             this.props.getFlightScheduleAction(flightScheduleData)
           }}
           currentLatitude={this.state.currentLatitude}
           currentLongitude={this.state.currentLongitude}
           nearestAirports={this.props.nearestAirports}
           getNearestAirport = {(lat,long)=>{
             // this.props.getNearestAirportAction(lat,long)
           }
             }
           userData={this.props.userInfo}
          //  onAirlineSelected = {(data)=>this.props.updateUserDataAction(data)}
           date = {this.props.route.params.date}
           flightSchedule = {this.props.flightSchedule}
           isLoggedIn={this.props.isLoggedIn}
          //  multipleFlightScheduleData={this.props.multipleFlightScheduleData}
           seatsAvailabilityData = {this.props.route.params.seatsAvailabilityData}
           dateString= {this.props.route.params.dateString}
           isOutBounded = {this.props.route.params.isOutBounded}


           classSelected = {this.props.route.params.classSelected}
           selectedDate  = {this.props.route.params.selectedDate}
           passengerCount= {this.props.route.params.passengerCount}
           isOffPeakValue= {this.props.route.params.isOffPeakValue}
           economyPoints= {this.props.route.params.economyPoints}
           premiumPoints= {this.props.route.params.premiumPoints}
           businessPoints= {this.props.route.params.businessPoints}
           firstPoints= {this.props.route.params.firstPoints}

           noflightschedule ={this.props.route.params.noflightschedule}
           searchData ={this.props.route.params.searchData}
           multipleFlightScheduleData ={this.props.route.params.multipleFlightScheduleData}
           selectedIndex ={this.props.route.params.selectedIndex}
           cabinClassData ={this.props.route.params.cabinClassData}
           trip_type ={this.props.route.params.trip_type}
           source ={this.props.route.params.source}
           destination ={this.props.route.params.destination}
           flightCount ={this.props.route.params.checkFlightCount}
           classDataArray={this.props.route.params.classDataArray}



            economySeats = {this.props.route.params.economySeats}
            premiumSeats = {this.props.route.params.premiumSeats}
            businessSeats = {this.props.route.params.businessSeats}
            firstSeats = {this.props.route.params.firstSeats}

         />
       </View>
     );
   }
 }
 
 const mapStateToProps = (state) => {
   const { findFlight, calendar,logIn, common, notification, userInfo } = state;

   return {
     airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
     locations: findFlight.locations,
     flightSchedule: findFlight.flightSchedule,
     airlinesPossileRoutes: findFlight.airlinesPossileRoutes,
     airlinesDetail:calendar.airlinesDetail,
     calendarSeats:calendar.calendarSeats,
     screenType:calendar.screenType,
     isNetworkFailed:common.isNetworkFailed,
     sessionExpired: common.sessionExpired,
     notiifcationSettingsData: notification.notiifcationSettingsData,
     nearestAirports:findFlight.nearestAirports,
     userInfo: userInfo.userData,
     cabinClassData:findFlight.cabinClassData,
     locations: findFlight.locations,
     isLoggedIn: logIn.isLoggedIn,
    //  multipleFlightScheduleData:findFlight.multipleFlightScheduleData
   };
 };
 
 const mapDispatchToProps = (dispatch) => {
   return {
     resetNetworkStatusAction:() => dispatch(resetNetworkStatus()),
     setLoginStatusAction:(loginStatus) => dispatch(setLoginStatus(loginStatus)),
                  getUserInfoAction: () => dispatch(getUserInfo()),
     getProductPlansAction: () => dispatch(getProductPlans()),
     getAirlinesMembershipAction: () => dispatch(getAirlinesMembership()),
     resetCreateAlertDataAction: () => dispatch(resetCreateAlertData()),
     getPossibleRouteAction: ()=>dispatch(getPossibleRoutes()),
     getLocationsAction: ()=>dispatch(getLocations()),
     getAirlinesAvailabilityAction:(searchData)=>dispatch(getAirlinesAvailability(searchData, 'MAP')),
     getSeatsAvailabilityAction:(searchData)=>dispatch(getSeatsAvailability(searchData, 'MAP')),
     sendAuditDataAction:(auditData)=>dispatch(sendAuditData(auditData)),
                  resetSessionAction: ()=>dispatch(resetSession()),
     getNotificationSettingsAction: () => dispatch(getNotificationSettings()),
     getNearestAirportAction: (lat, long)=>dispatch(getNearestAirport(lat, long)),
     getCountryListAction: () => dispatch(getCountryList()),
    //  getStateListAction: () => dispatch(getStateList()),
     getCityListAction: () => dispatch(getCityList()),
     updateUserDataAction: (userData) => dispatch(updateUserInfo(userData, false)),
     getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
    //  getMultipleFlightScheduleAction:(flightScheduleData) => dispatch(getMultipleFlightSchedule(flightScheduleData))

   };
 };
 export default connect(
   mapStateToProps,
   mapDispatchToProps
 )(FlightDetailsContainer);
 