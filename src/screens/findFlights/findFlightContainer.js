/**
 * Date: June 26, 2020
 * Description: Find Flight Screen.
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import FindFlightComponent from "./findFlightComponent";
import {
  getAirlinesMembership,
  getPossibleRoutes,
  getLocations,
  getNearestAirport,
  sendAuditData,
  getFlightSchedule,
  getCabinClass
} from "../../actions/findFlightActions";
import {
  getCalendarLocals,
  isAndroid,
  getformattedDate,
  getBAClassesString,
  isPad,
  isEmptyString,
  getLocationNameWithCode,
  getAirlinesLogo,
  getAirlinesCode,
  getTimeFromMins,
} from "../../utils/commonMethods";
import scale, { verticalScale } from "../../helpers/scale";
import { getAirlinesAvailability, getSeatsAvailability,getPointsAvailability, getPeakOffPeakData } from "../../actions/calendarActions";
import { setLoginStatus } from "../../actions/loginActions";
import { getAlerts, cancelAlerts } from "../../actions/alertActions";
import {
  getUserInfo, getCountryList,
  getZendeskCategoryData,
  getStateList,getUserConfigDetails,
  getCityList, updateUserInfo, updateAirlineTier, updateGuestUserPostHog, updateLoggedInUserPostHog
} from "../../actions/userActions";
import { resetNetworkStatus, resetSession } from "../../actions/commonActions";
import NetInfo from "@react-native-community/netinfo";
import {  Alert, Platform,Modal, Linking, Image, View, Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import { getNotificationSettings } from "../../actions/notificationActions";
import { getStoreData } from "../../constants/DataConst";
import { getProductPlans } from "../../actions/subscriptionActions";
import { sendFCMToken } from "../../actions/notificationActions";
import { getAccessToken, getUserId } from '../../constants/DataConst'
import {trackEventDetails } from "../../helpers/segmentMethods";
var uuid = require('react-native-uuid');
import moment from 'moment'
import DeviceInfo from "react-native-device-info";
const classes1 = ["Economy","Premium Economy","Business", "First"]
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
let monthKey = 12
class FindFlightContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
      airLinesMembershipDetailsObject: this.props.airlinesMembershipDetails,
      airlinesPossileRoutesList: this.props.airlinesPossileRoutes,
      locationsObject: this.props.locations,
      searchData: {},
      showNetworkPopUp: false,
      currentLongitude: null,
      currentLatitude: null,
      nearestAirport: {},
      staticDateArray:[],
      isLoader: false,
      accesstoken: "",
      deviceName:"",
      deviecBrand:"",
      isEmulator:"",
      isTablet:"",
      userConfigDetails:this.props.userConfigDetails
    };
  }



   componentDidMount = async () =>  {

   

    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()
    let trackData = {}
    let isNewSignUp =  await AsyncStorage.getItem("isNewSignUp");








    const accesstoken = await getAccessToken();
    this.setState({
      accesstoken
    })
    this.props.getAirlinesMembershipAction()
    this.props.getPossibleRouteAction()
    this.props.getCountryListAction()
    this.props.getLocationsAction()
    this.props.getProductPlansAction()
    this.props.getPeakOffPeakDataAction()
    this.props.getZendeskCategoryDataAction()
    
    const isLoggedIn = await getStoreData('authorizationHeader')
    const guestId = await getStoreData('guestId')
    if (!guestId) {
      await AsyncStorage.setItem("guestId", uuid.v4());
    }

    this.getDates()
    

    const Device_Token = await AsyncStorage.getItem("Device_Token");

    console.log("yes check here login value - - -  - - - -",isLoggedIn)

    if (isLoggedIn) {
      const userId = await getUserId("userId");
      let Id = JSON.parse(userId)
      this.props.sendFCMTokenAction(Device_Token);
      this.props.getUserInfoAction()
      this.props.getUserConfigDetailsAction()
      this.props.getNotificationSettingsAction();
    }
    this.loginStatus()
    NetInfo.addEventListener(state => {
      if (state.isConnected && (!this.state.locationsObject || !this.state.airlinesPossileRoutesList)) {
        this.props.getPossibleRouteAction()
        this.props.getLocationsAction()
      }
    });
  }
  async loginStatus() {
    const authorizationHeader = await AsyncStorage.getItem(
      "authorizationHeader"
    );
    if (authorizationHeader) {
      this.props.setLoginStatusAction(true)
    }
  }

  renderLoader  =  () =>  {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.isLoader}
      >
        <View style={{
          flex: 1, justifyContent: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.4)',
          alignItems: 'center',
          width: width + 36, height: height,
          marginStart: -scale(20),
          marginEnd: -scale(27),
          marginTop:Platform.OS == "ios"?  scale(-20) :scale(-40),
          marginBottom: -scale(20),
        }}>
          <View style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{ height: verticalScale(130), width: verticalScale(130), backgroundColor: "#FFF", justifyContent: 'center', alignItems: 'center', borderRadius: verticalScale(10), overflow: 'hidden' }}>
              <Image source={IMAGE_CONST.LOADER} style={{ height: verticalScale(200), width: verticalScale(200) }} />
            </View>
          </View>
        </View>
      </Modal>
    )
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
        const keys = await AsyncStorage.getAllKeys()
        let searchData = this.state.searchData
        let searchDetails = JSON.stringify({searchCount:1,sourceCode:searchData.sourceCode, destinationCode:searchData.destinationCode})
        if(keys.includes('searchDetails')){
          const searchDetailsString = await AsyncStorage.getItem('searchDetails')
          searchDetails = JSON.parse(searchDetailsString)
          if(searchDetails.sourceCode !== searchData.sourceCode || searchDetails.destinationCode !== searchData.destinationCode)
          await AsyncStorage.setItem("searchDetails", JSON.stringify({searchCount:searchDetails.searchCount + 1,sourceCode:searchData.sourceCode, destinationCode:searchData.destinationCode}));
        }else{
          await AsyncStorage.setItem("searchDetails", JSON.stringify({searchCount:1,sourceCode:searchData.sourceCode, destinationCode:searchData.destinationCode}));
        }
        if(searchDetails && Object.keys(searchDetails).length !== 0){

          console.log("yes check here search details  - - - - - - -",searchDetails)


          if(searchDetails && searchDetails.searchCount < 3 || this.props.userInfo && this.props.userInfo !== undefined && this.props.userInfo !== null && !this.props.userInfo.bronze_member){
            this.setState({ isLoader: false }, () => {
              this.props.navigation.navigate(STRING_CONST.CALENDAR_SCREEN, {
                searchData: this.state.searchData, focusedDate: null,
                peakOffpeakData: this.props.peakOffpeakData,
                staticDateArray:this.state.staticDateArray
              })
          })
          }else{  
            if(this.props.userInfo && this.props.userInfo !== undefined && this.props.userInfo !== null && this.props.userInfo.bronze_member && searchDetails.searchCount >= 3){
              this.isAlert()
            }
            else{
              this.setState({ isLoader: false }, () => {
                this.props.navigation.navigate(STRING_CONST.CALENDAR_SCREEN, {
                  searchData: this.state.searchData, focusedDate: null,
                  peakOffpeakData: this.props.peakOffpeakData,
                  staticDateArray:this.state.staticDateArray
                })
              })
            }
          }
        }
      }
      if(this.props.isNetworkFailed !== prevProps.isNetworkFailed && this.props.isNetworkFailed ){
        this.setState({
          isLoader:false
        })
        this.setState({
          showNetworkPopUp:true
        })
      }
      if (this.props.sessionExpired !== prevProps.sessionExpired) {
        AsyncStorage.removeItem("authorizationHeader");
        AsyncStorage.removeItem("userId");
        AsyncStorage.removeItem("searchDetails");
        Alert.alert(STRING_CONST.SESSION_EXPIRED_MSG);

        this.props.navigation.navigate("login");
        this.props.setLoginStatusAction(false)
        this.props.resetSessionAction();
      }
      if (
        this.props.notiifcationSettingsData !==
        prevProps.notiifcationSettingsData
      ) {
        const NotificationDisbledFromPhone = await AsyncStorage.getItem(
          "NotificationDisbledFromPhone"
        );
        if (
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

  gotoMembershipScreen = () => {
    this.setState({isLoader:false})
    this.props.navigation.navigate("MembershipContainerScreen")
  }


  isAlert = () => {
    Alert.alert(
      '',
      'Upgrade to Silver or Gold membership to make more searches',
      [
        {  
          text: 'Cancel',  
          onPress: () =>  this.setState({isLoader:false}),  
          style: 'Cancel',  
      }, 
        {text: 'Upgrade',onPress: ()=>{ 
        this.gotoMembershipScreen()
      }}
    ],
      {cancelable: false},
    );
  }



  getDates = () => {

    var dateArray = [];
    let today = new Date()

    let d = moment().year() + 1
    let month = moment().month() + 2

    let endDateKey = `${d}-${month}-01`
    let exactEndDate = moment(endDateKey).format("YYYY-MM-DD")

    let endDay = new Date(exactEndDate)
    var currentDate = moment(today);
    var stopDate = moment(endDay);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days');
    }

    this.setState({
      staticDateArray: dateArray
    })

   
    return dateArray;
  }

  render() {
    const {deviceName, deviecBrand, isEmulator, isTablet} = this.state

    return (
      <View style={{ flex: 1 }}>
        {this.renderLoader()}
        <FindFlightComponent
          airLinesMembershipDetailsObject={
            this.state.airLinesMembershipDetailsObject
          }
          airlinesPossileRoutesList={this.state.airlinesPossileRoutesList}
          locationsObject={this.state.locationsObject}
          navigation={this.props.navigation}
          isLoggedIn={this.props.isLoggedIn}
          onSearchPressed={(searchData, auditData) => {   
            
            let  classSelected = searchData.classSelected
            let classSelected1 = "";
            for (i = 0; i < classSelected.length; i++) {
              if (classSelected[i]) {
                if (isEmptyString(classSelected1)) {
                  classSelected1 = classSelected1.concat(`${classes1[i]}`);
                } else {
                  classSelected1 = classSelected1.concat(`,${classes1[i]}`);
                }
              }
            }   
            if (this.props.isLoggedIn == true) {
              const trackData = {
                "Search Type": 'Calendar Page',
                "Search Parameters": {   
                  airline: "British Airways",
                  originIATA: searchData.sourceCode,
                  destinationIATA: searchData.destinationCode,
                  originCity: searchData.selectedSource.city_name ?  searchData.selectedSource.city_name : 'N/A',
                  destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
                  originCountry: searchData.selectedSource.country_name ?searchData.selectedSource.country_name   : 'N/A',
                  destinationCountry: searchData.selectedDestination.country_name ?  searchData.selectedDestination.country_name : 'N/A',
                  journeyType: searchData.isReturn ? 'Return' : 'One Way',
                  numberOfPassengers: searchData.passengerCount,
                  cabinClasses: classSelected1,
                  searchOriginatedFrom: "Calendar Page",
                  outboundStartDate: 'N/A since Calendar Page search',
                  outboundEndDate: 'N/A since Calendar Page search',
                  inboundStartDate: 'N/A since Calendar Page search',
                  inboundEndDate: 'N/A since Calendar Page search'
                },
              }
                // PostHog.capture('Search', trackData);
            }
            else {
              const trackData = {
                "Search Type": 'Calendar Page',
                "Search Parameters": {   
                  airline: "British Airways",
                  originIATA: searchData.sourceCode,
                  destinationIATA: searchData.destinationCode,
                  originCity: searchData.selectedSource.city_name ?  searchData.selectedSource.city_name : 'N/A',
                  destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
                  originCountry: searchData.selectedSource.country_name ?searchData.selectedSource.country_name   : 'N/A',
                  destinationCountry: searchData.selectedDestination.country_name ?  searchData.selectedDestination.country_name : 'N/A',
                  journeyType: searchData.isReturn ? 'Return' : 'One Way',
                  numberOfPassengers: searchData.passengerCount,
                  cabinClasses: classSelected1,
                  searchOriginatedFrom: "Calendar Page",
                  outboundStartDate: 'N/A since Calendar Page search',
                  outboundEndDate: 'N/A since Calendar Page search',
                  inboundStartDate: 'N/A since Calendar Page search',
                  inboundEndDate: 'N/A since Calendar Page search'
                },
              }
              // PostHog.capture('Search', trackData);
            }
            this.setState({
              searchData: searchData,
              isLoader: true
            });
            this.props.getAirlinesAvailabilityAction(searchData);
            this.props.getSeatsAvailabilityAction(searchData);
            this.props.sendAuditDataAction(auditData);
            let flightScheduleData = {
              airline: searchData.airline,
              source: searchData.sourceCode,
              destination: searchData.destinationCode
            }
            let data = {
               source: searchData.sourceCode,
              destination: searchData.destinationCode
            }
            this.props.getFlightScheduleAction(flightScheduleData)
            this.props.getPointsAvailabilityAction(searchData)
            this.props.getCabinClassAction(data)
          }}
          currentLatitude={this.state.currentLatitude}
          currentLongitude={this.state.currentLongitude}
          nearestAirports={this.props.nearestAirports}
          userData={this.props.userInfo}
          userConfigDetails={this.props.userConfigDetails}
          onAirlineSelected={(data) => this.props.updateAirlineTierAction(data)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { findFlight, calendar, common, notification, userInfo, logIn } = state;
  return {
    airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
    locations: findFlight.locations,
    airlinesPossileRoutes: findFlight.airlinesPossileRoutes,
    airlinesDetail: calendar.airlinesDetail,
    calendarSeats:calendar.calendarSeats,
    screenType: calendar.screenType,
    isNetworkFailed: common.isNetworkFailed,
    sessionExpired: common.sessionExpired,
    notiifcationSettingsData: notification.notiifcationSettingsData,
    nearestAirports: findFlight.nearestAirports,
    userInfo: userInfo.userData,
    isLoggedIn: logIn.isLoggedIn,
    peakOffpeakData: calendar.peakOffpeakData,
    userConfigDetails:userInfo.userConfigDetails
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetNetworkStatusAction: () => dispatch(resetNetworkStatus()),
    setLoginStatusAction: (loginStatus) => dispatch(setLoginStatus(loginStatus)),
    sendFCMTokenAction: (fcmToken) => dispatch(sendFCMToken(fcmToken)),
    updateGuestUserPostHogAction: (UserInfo) => dispatch(updateGuestUserPostHog(UserInfo)),
    updateLoggedInUserPostHogAction: (UserInfo) => dispatch(updateLoggedInUserPostHog(UserInfo)),
    getUserInfoAction: () => dispatch(getUserInfo()),
    getProductPlansAction: () => dispatch(getProductPlans()),
    getAirlinesMembershipAction: () => dispatch(getAirlinesMembership()),
    resetCreateAlertDataAction: () => dispatch(resetCreateAlertData()),
    getPossibleRouteAction: () => dispatch(getPossibleRoutes()),
    getLocationsAction: () => dispatch(getLocations()),
    getAirlinesAvailabilityAction: (searchData) => dispatch(getAirlinesAvailability(searchData, 'FIND_FLIGHT')),
    getSeatsAvailabilityAction: (searchData) => dispatch(getSeatsAvailability(searchData, 'FIND_FLIGHT')),
    getPointsAvailabilityAction: (searchData) => dispatch(getPointsAvailability(searchData)),
    sendAuditDataAction: (auditData) => dispatch(sendAuditData(auditData)),
    resetSessionAction: () => dispatch(resetSession()),
    getNotificationSettingsAction: () => dispatch(getNotificationSettings()),
    getNearestAirportAction: (lat, long) => dispatch(getNearestAirport(lat, long)),
    getCountryListAction: () => dispatch(getCountryList()),
    updateAirlineTierAction: (userData) => dispatch(updateAirlineTier(userData, false)),
    getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
    getPeakOffPeakDataAction: () => dispatch(getPeakOffPeakData()),
    getUserConfigDetailsAction:() => dispatch(getUserConfigDetails()),
    getCabinClassAction:(data)=> dispatch(getCabinClass(data)),
    getZendeskCategoryDataAction: () => dispatch(getZendeskCategoryData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindFlightContainer);
