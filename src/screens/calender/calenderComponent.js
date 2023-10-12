/* Running Code.....*/

import React, { Component, Fragment, PureComponent, StrictMode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Linking,
  FlatList,
  TouchableHighlight,
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  ScrollView,
  ImageBackground
} from "react-native";

import * as RootNavigation from '../../router/RouteNavigation';
import {BA_EXE_URL,SKY_SCANNER_URL} from '../../helpers/config'
import styles from "./calenderStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/dist/Ionicons";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import * as IMG_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import Modal from "react-native-modal";
import { colours } from "../../constants/ColorConst";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import moment, { months } from "moment";
import { getAccessToken } from "../../constants/DataConst";
import Entypo from "react-native-vector-icons/dist/Entypo";
var uuid = require('react-native-uuid');
import DeviceInfo from "react-native-device-info";
const {width,height} = Dimensions.get("window")  
classes1 = ["Economy","Premium Economy","Business", "First"]
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
import PopUpComponent from "../../shared/popUpComponent";
import PostHog from 'posthog-react-native'
import MyStatusBar from '../../components/statusbar/index'
let economyPoints = "";
let premiumPoints = "";
let businessPoints = "";
let firstPoints = "";


let economySeats = 0
let premiumSeats = 0
let businessSeats = 0
let firstSeats = 0


let dateExpire = false
let expireDate = ""
let isAlertExpireDays = ""
let isAlertExpireDays2 = ""

var requiredKey = false


export default class CalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      classObject: [
        {
          class: "Economy",
          isSelected: true,
        },
        {
          class: "Premium Economy",
          isSelected: true,
        },
        {
          class: "Business",
          isSelected: true,
        },
        {
          class: "First",
          isSelected: true,
        },
      ],
      classObject1:[
        {
          class: "Economy",
          isSelected: true,
        },
        {
          class: "Premium Economy",
          isSelected: false,
        },
        {
          class: "Business",
          isSelected: false,
        },
        {
          class: "First",
          isSelected: false,
        },
      ],
      classSelected: this.props.searchData.classSelected,
      showCreateAlertModal: false,
      airLinesDetailsObject: this.props.airLinesDetailsObject,
      showTicketDetailModal: false,
      Alert_Visibility2: false,
      noFlightScheduleDate: "",
      noFlightScheduleAlertTxt: "",
      bounceValue: new Animated.Value(250), //This is the initial position of the subview
      seatsAvailabilityData: {},
      isHidden: true,
      dateString: "",
      haveCrossIcon: true,
      departStartDate: "",
      departEndDate: "",
      returnStartDate: "",
      scheuldeDateKey:"",      
      onPressDate:"",
      classSelected1: [true, false, false, false],
      returnEndDate: "",
      isRenderAll: false,
      searchData: this.props.searchData,
      showDateRangeError:false,
      showModelDropdownForBA:false, showModelDropdownForSS:false,
      createAlertPressed: false,
      selectedDate: {},
      showUpgradePopUp: false,
      showLoginPopup: false,
      showLoginCnfmPopup: false,
      isPeakValue: true,
      isOffPeakValue: true,
      showAirlineModal: this.props.userInfo && !this.props.userInfo.airline_memberships,
      userSelectedAirlineIndex: -1,
      userSelectedAirlineMembershipIndex: -1,
      userSelectedAirline: this.props.airlinesMembershipDetails[0],
      userSelectedAirlineMembership: this.props.airlinesMembershipDetails
        ? this.props.airlinesMembershipDetails[0].memberships[0]
        : null,
      outBoundVisibleArray: [],
      inBoundVisibleArray: [],
      flightDate: '',
      flightSchedule: this.props.flightSchedule,
      airlinesDetailPoints: this.props.airlinesDetailPoints,
      peakOffpeakData: this.props.peakOffpeakData.peakOffpeakData,
      PeakOffPeakMonth: "",
      offPeakKey: '',
      lastRefresh: Date(Date.now()).toString(),
      staticDateArray: this.props.staticDateArray,
      flightData: [],
      onDayPressedDate: "",
      isLoader: true,
      flightCount: 0,
      showDetailsModal: false, noflightschedule: false,
      clickDate: "",
      nextThreeMonth:"",
      cabinCode:"M",
      skyScannerCabinCode:"economy",
      accesstoken: "", deviceName: "", deviecBrand: "", isEmulator: "", isTablet: "",
      sliderPoints: 0,
      minClassesForData: [],
      maxClassForData: [],newClassSliderArray:[],
      isSliderRun: false,
      isSliderRunDone: false,
      isNoflightScheudlePopup:false,
      cabinClassData:{},
      multipleFlightScheduleData: this.props.multipleFlightScheduleData,
      sliderEconomyMin: 0, sliderPremiumMin: 0, sliderBusinessMin: 0, sliderFirstMin: 0,
      sliderEconomyMax: 0, sliderPremiumMax: 0, sliderBusinessMax: 0, sliderFirstMax: 0,
      finalData:this.props.finalData,
      originalGuestOutBoundObj:{},orignalGuestInboundObj:{},
      availableOutBoundDate:{},availableInBoundDate:{},availability_data:{},
      orignalInboundObj:{},
      originalOutBoundObj:{},
      maximumSliderPoints:0,
      minimumSliderPoints:0,
      classTypeArray:[]
    };
    getCalendarLocals();
    LocaleConfig.defaultLocale = "us";
    this.refreshScreen = this.refreshScreen.bind(this)
  }

  refreshScreen = () => {
    for (let i = 0; i < 3; i++) {
      this.setState({ lastRefresh: Date(Date.now()).toString() })
         }
  }

  _toggleSubview() {
    var toValue = 100;
    if (this.state.isHidden) {
      toValue = 0;
    }
    Animated.spring(this.state.bounceValue, {
      toValue: toValue,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();
  }

  getPointsText(points) {
    return Math.abs(points) > 999 ? Math.sign(points)*((Math.abs(points)/1000).toFixed(2)) + 'k' : Math.sign(points)*Math.abs(points)
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.airLinesDetailsObject !== prevProps.airLinesDetailsObject
      ) {
        this.setState({
          airLinesDetailsObject: this.props.airLinesDetailsObject,
        });
      }
    }
  }

  getVisibilityArray(boundArray) {
    const { searchData } = this.state
    let boundVisibleArray = []


    for (const property in boundArray) {
      if ("economy" in boundArray[property] && boundArray[property]["economy"].seats >= searchData.passengerCount) {
        !boundVisibleArray.includes("economy") &&
          boundVisibleArray.push("economy");
      }
      if ("premium" in boundArray[property] && boundArray[property]["premium"].seats >= searchData.passengerCount) {
        !boundVisibleArray.includes("premium") &&
          boundVisibleArray.push("premium");
      }
      if ("business" in boundArray[property] && boundArray[property]["business"].seats >= searchData.passengerCount) {
        !boundVisibleArray.includes("business") &&
          boundVisibleArray.push("business");
      }
      if ("first" in boundArray[property] && boundArray[property]["first"].seats >= searchData.passengerCount) {
        !boundVisibleArray.includes("first") &&
          boundVisibleArray.push("first");
      }
    }
    return boundVisibleArray
  }


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }
  handleBackButton = (nav) => {
    if (!nav.isFocused()) {
      BackHandler.removeEventListener('hardwareBackPress', () =>
        this.handleBackButton(this.props.navigation),
      );
      return false;
    } else {
      nav.goBack();
      return true;
    }
  };


  renderCabinClass = ()   => {
    let cabinClassData = this.props.cabinClassData
    let classTypeArray = [
      {
        "class":cabinClassData.economy ? "Economy" : false,
        "isSelected":cabinClassData.economy ? true : false,
      },
      {
        "class":cabinClassData.premium_economy ? "Premium Economy" : false,
        "isSelected":cabinClassData.premium_economy ? true : false,
      },
      {
        "class":cabinClassData.business ? "Business" : false,
        "isSelected":cabinClassData.business ? true : false,
      },
      {
        "class":cabinClassData.first ? "First" : false,
        "isSelected":cabinClassData.first ? true : false,
      }
    ]


    let classTypeArray1 = [
      {
        "class":cabinClassData.economy ? "Economy" : false,
        "isSelected":cabinClassData.economy ? true : false,
      },
      {
        "class":cabinClassData.premium_economy ? "Premium Economy" : false,
        "isSelected" : false,
      },
      {
        "class":cabinClassData.business ? "Business" : false,
        "isSelected":false,
      },
      {
        "class":cabinClassData.first ? "First" : false,
        "isSelected": false,
      }
    ]
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member
    this.setState({
      classTypeArray:bronzeMember ? classTypeArray1 : classTypeArray
    })
  }


  componentDidMount = async () => {

    // this.checkOnloaderFalse()
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member
    const today = moment();
    let data = this.props.searchData.classSelected;
    let outBound = this.state.airLinesDetailsObject.outbound_availability;
    let inBound = this.state.airLinesDetailsObject.inbound_availability;
    let outBoundVisibleArray = this.getVisibilityArray(outBound)
    let inBoundVisibleArray = this.getVisibilityArray(inBound)
    const accesstoken = await getAccessToken();
    let deviceName = await DeviceInfo.getDeviceName()
    let deviecBrand = await DeviceInfo.getBrand()
    let isTablet = await DeviceInfo.isTablet()
    let isEmulator = await DeviceInfo.isEmulator()
    this.setState({
      deviecBrand, deviceName, isTablet, isEmulator
    })
    this.renderCabinClass()
    let data1 = ["economy", "premium", "business", "first"]

    this.setState({
      // outBoundVisibleArray:data1,
      // inBoundVisibleArray:data1,
      outBoundVisibleArray,
      inBoundVisibleArray,
      accesstoken
    });
    let classData = []
    if (data) {
      if (data[0] == true) {
        classData.push(true);
      }
      else {
        classData.push(false);
      }
      if (data[1] == true) {
        classData.push(true);
      }
      else {
        classData.push(false);
      }
      if (data[2] == true) {
        classData.push(true);
      }
      else {
        classData.push(false);
      }
      if (data[3] == true) {
        classData.push(true);
      }
      else {
        classData.push(false);
      }
    }


    
    setTimeout(() => {
      this.setState({ isRenderAll: true, })
      this.setState({ isLoader: false })   
    }, 1000);

    // for (const item in data) {
    //   console.log("check item on the did mount #######    ",data)
    //   if (item == "economy") {
    //     if (this.state.classSelected[0] && data[item] ) {
    //       classData.push(true);
    //     } else {
    //       classData.push(false);
    //     }
    //   }
    //   else if (item == "premium") {
    //     if (this.state.classSelected[1] && data[item]) {
    //       classData.push(true);
    //     } else {
    //       classData.push(false);
    //     }
    //   }
    //   else if (item == "business") {
    //     if (this.state.classSelected[2] && data[item]) {
    //       classData.push(true);
    //     } else {
    //       classData.push(false);
    //     }
    //   }
    //   else if (item == "first") {
    //     if (this.state.classSelected[3] && data[item]) {
    //       classData.push(true);
    //     } else {
    //       classData.push(false);
    //     }
    //   }
    // }

    // let lastDate = this.state.peakOffpeakData.slice(-1)[0] 
    //   if(lastDate){
    //     setTimeout(() => {
    //       this._refCalendarList.scrollToDay(lastDate);
    //     });
    //   }
      
    var data2 = [true,false,false,false]
    
    this.setState({
      classSelected: bronzeMember ? data2 : classData,
    });
  
      BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }



  getMultipleFlightScheduleData = (day) => {
    const { searchData } = this.state;
    let date = moment(day.dateString).format("DD-MM-YYYY")
    let airline = searchData.airline
    let destination = searchData.destinationCode
    let sourceCode = searchData.sourceCode
    let flightScheduleData = { "airline": `${airline}`, "destination": `${destination}`, "source": `${sourceCode}`, "date": `${date}` }
    this.props.getMultipleScheduleData(flightScheduleData)
  }

  formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  

  seatAvailabilityModal(day, isOffPeakValue1) {

    const firstDay = moment().startOf('month')
    const nextThreeMonth = moment(firstDay).add(3, 'months').format("YYYY-MM-DD")

    let clickDate
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member
    if (this.state.clickDate) {
      let date = this.state.clickDate
     
      let date1 = moment(date).format('DD-MM-YYYY')
      let date2 = moment(nextThreeMonth).format('DD-MM-YYYY')

      const dt1 = moment(date1, 'DD-MM-YYYY').valueOf()
      const dt2 = moment(date2, 'DD-MM-YYYY').valueOf()
      if (dt1 == dt2) {
        requiredKey = true
      }
      if (dt1 > dt2) {
        requiredKey = true
      }
      if (dt2 > dt1) {
        requiredKey = false
      }

    }

    const { searchData, offPeakKey,showModelDropdownForBA,showModelDropdownForSS, airLinesDetailsObject, } = this.state;
   
    let airline = searchData.airline
    let destination = searchData.destinationCode
    let sourceCode = searchData.sourceCode

    let date = moment(this.state.flightDate).format("DD-MM-YYYY")
    let flightScheduleData = { "airline": `${airline}`, "destination": `${destination}`, "source": `${sourceCode}`, "date": `${date}` }
    let checkFlightCount = 0

    let scheduleData = {}
    if (this.state.selectedIndex == 0) {
      scheduleData = this.props.flightSchedule.outbound_availability
    }
    else {
      scheduleData = this.props.flightSchedule.inbound_availability
    }

    // let testPoints = this.props.airlinesDetailPoints.airlinesDetailPoints.points
    let checkData = Object.entries(scheduleData)
    let flightData = []
    checkData.map((singleData, index) => {
      if (singleData[0] == this.state.onDayPressedDate) {
        singleData.map((nestedMap) => {
          flightData = nestedMap
          checkFlightCount = nestedMap.count
        })
      }
    })

    let availableOutBoundDate = {}
    let availableInBoundDate = {}
    availableOutBoundDate = airLinesDetailsObject.outbound_availability;
    availableInBoundDate = airLinesDetailsObject.inbound_availability;

    let availavleClassesData = this.state.airLinesDetailsObject.availability

    let data = this.state.seatsAvailabilityData;

    let economy = availavleClassesData.economy
    let premium = availavleClassesData.premium
    let business = availavleClassesData.business
    let first = availavleClassesData.first
   
   let pointsSS = []
   
   pointsSS = this.props.airlinesDetailPoints.airlinesDetailPoints.points.SS ? this.props.airlinesDetailPoints.airlinesDetailPoints.points.SS : []
   
   let pointsBA = []
   pointsBA = this.props.airlinesDetailPoints.airlinesDetailPoints.points.BA ? this.props.airlinesDetailPoints.airlinesDetailPoints.points.BA : []
  
    let points = []

    // points = [...pointsSS, ...pointsBA]
    
    points = [...pointsSS]


  
   if (this.props.isLoggedIn == false) {
      if(requiredKey === true ){
        economySeats = 2
        premiumSeats = 0
        businessSeats = 0
        firstSeats = 2
        dateExpire = true
      }
    else {
      dateExpire = false
      let obj
      if (this.state.selectedIndex == 0) {
        obj = Object.entries(availableOutBoundDate)
      }
      else {
        obj = Object.entries(availableInBoundDate)
      }
      if (day) {
        clickDate = day.dateString
      }
      let date = moment(clickDate).format("YYYY-MM-DD")
      obj.map((singleMap) => {

        if (this.state.clickDate == singleMap[0]) {
          if (singleMap[1].economy) {
            if (singleMap[1].economy.seats) {
              economySeats = singleMap[1].economy.seats
            }
          }
          else {
            economySeats = 0
          }
          if (singleMap[1].premium) {
            if (singleMap[1].premium.seats) {
              premiumSeats = singleMap[1].premium.seats
            }
          }
          else {
            premiumSeats = 0
          }
          if (singleMap[1].business) {
            if (singleMap[1].business.seats) {
              businessSeats = singleMap[1].business.seats
            }
          }
          else {
            businessSeats = 0
          }
          if (singleMap[1] && singleMap[1].first) {
            if (singleMap[1].first.seats) {
              firstSeats = singleMap[1].first.seats
            }
          }
          else {
            firstSeats = 0
          }
        }
      })
    }
  }
  else {
    dateExpire = false
    let obj
    if (this.state.selectedIndex == 0) {
      obj = Object.entries(availableOutBoundDate)
    }
    else {
      obj = Object.entries(availableInBoundDate)
    }
    if (day) {
      clickDate = day.dateString
    }
    let date = moment(clickDate).format("YYYY-MM-DD")
    obj.map((singleMap) => {

    
      if (this.state.clickDate == singleMap[0]) {
      if (singleMap[1].economy) {
          if (singleMap[1].economy.seats) {
            economySeats = singleMap[1].economy.seats
          }
        }
        else {
          economySeats = 0
        }
        if (singleMap[1].premium) {
          if (singleMap[1].premium.seats) {
            premiumSeats = singleMap[1].premium.seats
          }
        }
        else {
          premiumSeats = 0
        }
        if (singleMap[1].business) {
          if (singleMap[1].business.seats) {
            businessSeats = singleMap[1].business.seats
          }
        }
        else {
          businessSeats = 0
        }
        if (singleMap[1] && singleMap[1].first) {
          if (singleMap[1].first.seats) {
            firstSeats = singleMap[1].first.seats
          }
        }
        else {
          firstSeats = 0
        }
      }
    })
  }
    let economySS 
    let premiumSS
    let businessSS
    let firstSS



    let economyBA
    let premiumBA
    let businessBA
    let firstBA

    // Test here as a guest user.............
    if (pointsBA && Object.keys(pointsBA).length !== 0 && this.props.isLoggedIn == false) {
      if(requiredKey === false){ 
        if(offPeakKey == false){ 
          pointsBA.map((singleMap)=>{
            if(singleMap.one_way ==true && singleMap.peak_type === "offpeak" ){
              if(singleMap.economy_avios){
                economyBA = singleMap.economy_avios
              }
              if(singleMap.premium_avios){
                  premiumBA = singleMap.premium_avios
              }
              if(singleMap.business_avios ){
                  businessBA = singleMap.business_avios
              }
              if(singleMap.first_avios){
                  firstBA = singleMap.first_avios
              } 
            }
          })
    }
    else{
          pointsBA.map((singleMap)=>{
              if(singleMap.one_way ==true && singleMap.peak_type === "peak"){
              if(singleMap.economy_avios){
                economyBA = singleMap.economy_avios
              }
              if(singleMap.premium_avios){
                  premiumBA = singleMap.premium_avios
              }
              if(singleMap.business_avios ){
                  businessBA = singleMap.business_avios
              }
              if(singleMap.first_avios){
                  firstBA = singleMap.first_avios
              } 
            }
          })
    }
      }
      else{
        if(requiredKey === true){ 
          economyBA = 1100
          premiumBA = 1100
          businessBA = 1100
          firstBA = 1100
      
          economySS = 1100
          premiumSS = 1100
          businessSS = 1100
          firstSS = 1100
          hideFlight = true
      
          }
      }
}


if (pointsSS && Object.keys(pointsSS).length !== 0 && this.props.isLoggedIn == false) {
 

  if(requiredKey === false){ 

    if(offPeakKey === false){
      pointsSS.map((singleMap)=>{
        if(singleMap.one_way == true && singleMap.peak_type === "offpeak" ){
          if(singleMap.economy_avios){
            economySS = singleMap.economy_avios
          }
          if(singleMap.premium_avios){
              premiumSS = singleMap.premium_avios
          }
          if(singleMap.business_avios ){
              businessSS = singleMap.business_avios
          }
          if(singleMap.first_avios){
              firstSS = singleMap.first_avios
          } 
        }
      })
    }
    else{
      pointsSS.map((singleMap)=>{
    
        if(singleMap.one_way == true && singleMap.peak_type === "peak"){
          if(singleMap.economy_avios){
            economySS = singleMap.economy_avios
          }
          if(singleMap.premium_avios){
              premiumSS = singleMap.premium_avios
          }
          if(singleMap.business_avios ){
              businessSS = singleMap.business_avios
          }
          if(singleMap.first_avios){
              firstSS = singleMap.first_avios
          } 
        }
      })
    } 



   }
  else{
    if(requiredKey === true){ 

    economyBA = 1100
    premiumBA = 1100
    businessBA = 1100
    firstBA = 1100

    economySS = 1100
    premiumSS = 1100
    businessSS = 1100
    firstSS = 1100
    hideFlight = true

    }
  } 
}

      // BA array computation.  . . . . . . . . . ..

      if (pointsBA && Object.keys(pointsBA).length !== 0 && this.props.isLoggedIn == true) {
        if(offPeakKey == false){ 
              pointsBA.map((singleMap)=>{
                if(singleMap.one_way ==true && singleMap.peak_type === "offpeak" ){
                  if(singleMap.economy_avios){
                    economyBA = singleMap.economy_avios
                  }
                  if(singleMap.premium_avios){
                      premiumBA = singleMap.premium_avios
                  }
                  if(singleMap.business_avios ){
                      businessBA = singleMap.business_avios
                  }
                  if(singleMap.first_avios){
                      firstBA = singleMap.first_avios
                  } 
                }
              })
        }
        else{
              pointsBA.map((singleMap)=>{
                  if(singleMap.one_way ==true && singleMap.peak_type === "peak"){
                  if(singleMap.economy_avios){
                    economyBA = singleMap.economy_avios
                  }
                  if(singleMap.premium_avios){
                      premiumBA = singleMap.premium_avios
                  }
                  if(singleMap.business_avios ){
                      businessBA = singleMap.business_avios
                  }
                  if(singleMap.first_avios){
                      firstBA = singleMap.first_avios
                  } 
                }
              })
        }
  }


  if (pointsSS && Object.keys(pointsSS).length !== 0 && this.props.isLoggedIn == true) {
  if(offPeakKey === false){
    pointsSS.map((singleMap)=>{
      if(singleMap.one_way == true && singleMap.peak_type === "offpeak" ){
        if(singleMap.economy_avios){
          economySS = singleMap.economy_avios
        }
        if(singleMap.premium_avios){
            premiumSS = singleMap.premium_avios
        }
        if(singleMap.business_avios ){
            businessSS = singleMap.business_avios
        }
        if(singleMap.first_avios){
            firstSS = singleMap.first_avios
        } 
      }
    })
  }
  else{
    pointsSS.map((singleMap)=>{
      if(singleMap.one_way == true && singleMap.peak_type === "peak"){
        if(singleMap.economy_avios){
          economySS = singleMap.economy_avios
        }
        if(singleMap.premium_avios){
            premiumSS = singleMap.premium_avios
        }
        if(singleMap.business_avios ){
            businessSS = singleMap.business_avios
        }
        if(singleMap.first_avios){
            firstSS = singleMap.first_avios
        } 
      }
    })
  }
  }
    let economyClass
    let premiumClass
    let businessClas
    let firstClass

    let travelData = []

    let cabinClassData = this.props.cabinClassData

    if(cabinClassData){
      if(cabinClassData.economy){
        economyClass = cabinClassData.economy && "Economy" 
      }
     
      if(cabinClassData.premium_economy){
        premiumClass = cabinClassData.premium_economy && "Premium" 
      }
    
      if(cabinClassData.business){
        businessClas = cabinClassData.business && "Business" 
      }
    
      if(cabinClassData.first){
        firstClass = cabinClassData.first && "First"
      }
    } 

    if(economyClass){
      travelData[0] = economyClass
    }
    if(premiumClass){
      travelData[1] = premiumClass
    }
    if(businessClas){
      travelData[2] = businessClas
    }
    if(firstClass){
      travelData[3] = firstClass
    }

    let trip_type =  this.state.searchData.isReturn ? "return" : "one_way"

    let economy2 = this.state.classSelected[0]
    let premium2 = this.state.classSelected[1]
    let business2 = this.state.classSelected[2]
    let first2 = this.state.classSelected[3]

    let classSelectedArray = []

    if (economy2) {
      classSelectedArray.push(economy)
    }
    if (premium2) {
      classSelectedArray.push(premium)
    }
    if (business2) {
      classSelectedArray.push(business)
    }
    if (first2) {
      classSelectedArray.push(first)
    }


    return (
      <Animated.View
        style={[
          styles.animatedView,
          {
            transform: [{ translateY: this.state.bounceValue }],
          },
        ]}
      >
        <View style={styles.animatedInnerView}>
          <View style={{ alignItems: "center", alignSelf: "stretch", }}>
            <View style={[styles.titleView]}>
              <TouchableOpacity onPress={() => { }}>
                {/* {IMAGE_CONST.DARK_CROSS} */}
              </TouchableOpacity>
              <Text style={[styles.titleText,{
                paddingStart:scale(20)
              }]}>{searchData.selectedSource.city_name} - {searchData.selectedDestination.city_name}</Text>
            
              {/* (${!data.peak ? STRING_CONST.OFF_PEAK_FARE : STRING_CONST.PEAK_FARE
                }) */}

              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                }}
                onPress={() => {
                  this.setState({
                    showTicketDetailModal: false,
                    bounceValue: new Animated.Value(250),
                    isHidden: true,
                    selectedDate: {},
                    showModelDropdownForBA:false,
                    showModelDropdownForSS:false
                  });
                  this._toggleSubview();
                }}
              >
                {IMAGE_CONST.GREY_CROSS}
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: colours.lightGreyish,
                marginTop: verticalScale(5),
                fontSize: scale(13),
              }}
            >
              {this.state.dateString}
            </Text>
            <View style={{ backgroundColor: "#0072A0", borderRadius: scale(20), margin: scale(4),marginBottom:scale(10), opacity: 0.4 }}>
              <Text
                style={{
                  color: colours.black,
                  // marginTop: verticalScale(5),
                  fontWeight:"700",
                  fontSize: scale(13),
                  padding: scale(4),
                 
                  paddingStart: scale(9),
                  paddingEnd: scale(9)
                }}
              >
                {`${!offPeakKey ? STRING_CONST.OFF_PEAK_FARE : STRING_CONST.PEAK_FARE
                  }`}
              </Text>
            </View>
            <View style={styles.availabiltyView}>
              <View>
                <View
                  style={{
                    marginTop: isPad() ? verticalScale(35) : verticalScale(10),
                  }}
                >
                  <Text style={{ color: colours.lightGreyish }}></Text>
                </View>
                <View style={{ marginTop: verticalScale(32), }}>
                  <Text style={styles.pointSeatsText}>
                    {STRING_CONST.SEATS_TEXT}
                  </Text>
                </View>
                <View style={{ marginTop: verticalScale(16), }}>
                  <Text style={styles.pointSeatsText}>
                    {STRING_CONST.POINTS_TEXT}
                  </Text>
                </View>
              </View>
              {
                economy ?
                  <View>
                    <View
                      style={{ alignItems: "center", marginTop: verticalScale(13),marginBottom:scale(-10) }}
                    >
                      <View style={{ alignItems: "center",marginBottom:scale(-10) }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(12)}
                          color={colours.economySeatColor}
                        />
                        <Text
                          style={[
                            styles.classText,
                            { color: colours.economySeatColor },
                          ]}
                        >
                          {STRING_CONST.ECONOMY}
                        </Text>
                      </View>
                      <Text style={styles.seatNumberText}>
                        {economySeats ? economySeats : "0"}
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          <Fragment>
                            {  economySS ? this.getPointsText(economySS) : 
                                 economyBA ? this.getPointsText(economyBA)  :  "-"
                              }
                          </Fragment>
                        }
                      </Text>
                    </View>
                  </View>
                  : null
              }
              {
                premium ?
                  <View>
                    <View
                      style={{ alignItems: "center", marginTop: verticalScale(13),marginBottom:scale(-10) }}
                      >
                      <View style={{ alignItems: "center",marginBottom:scale(-10) }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(12)}
                          color={colours.yellow}
                        />
                        <Text
                          style={[
                            styles.classText,
                            {
                              color: colours.yellow,
                            },
                          ]}
                        >
                          Premium
                        </Text>
                      </View>
                      <Text style={styles.seatNumberText}>
                      {
                            !bronzeMember ? 
                            <>
                                {premiumSeats ? premiumSeats : "0"}
                            </>
                            :
                            <>
                              {"-"}
                            </>
                          }
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          <Fragment>
                             {  premiumSS ? this.getPointsText(premiumSS) : 
                                 premiumBA ? this.getPointsText(premiumBA)  :  "-"
                              }

                          </Fragment>
                        }
                      </Text>
                    </View>
                  </View>
                  : null
              }
              {
                business ?
                  <View>
                    <View
                     style={{ alignItems: "center", marginTop: verticalScale(13),marginBottom:scale(-10) }}
                     >
                      <View style={{ alignItems: "center",marginBottom:scale(-10) }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(12)}
                          color={colours.purple}
                        />
                        <Text
                          style={[
                            styles.classText,
                            {
                              color: colours.purple,
                            },
                          ]}
                        >
                          {STRING_CONST.BUSINESS}
                        </Text>
                      </View>
                      <Text style={styles.seatNumberText}>


                      {
                            !bronzeMember ? 
                            <>
                                {businessSeats ? businessSeats : "0"}
                            </>
                            :
                            <>
                              {"-"}
                            </>
                          }
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          <Fragment>
                             {  businessSS ? this.getPointsText(businessSS) : 
                                 businessBA ? this.getPointsText(businessBA)  :  "-"
                              }
                          </Fragment>
                        }
                      </Text>
                    </View>
                  </View>
                  : null
              }
              {
                first ?
                  <View>
                    <View
                      style={{ alignItems: "center", marginTop: verticalScale(13),marginBottom:scale(-10) }}
                      >
                      <View style={{ alignItems: "center",marginBottom:scale(-10) }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(12)}
                          color={colours.firstSeatColor}
                        />
                        <Text
                          style={[
                            styles.classText,
                            {
                              color: colours.firstSeatColor,
                            },
                          ]}
                        >
                          {STRING_CONST.FIRST}
                        </Text>
                      </View>
                      <Text style={styles.seatNumberText}>
                          {
                            !bronzeMember ? 
                            <>
                               {firstSeats ? firstSeats : "0"}
                            </>
                            :
                            <>
                              {"-"}
                            </>
                          }
                        {/* {firstSeats ? firstSeats : "0"} */}
                      </Text>
                      <Text style={styles.seatNumberText}>
                      {  firstSS ? this.getPointsText(firstSS) : 
                                 firstBA ? this.getPointsText(firstBA)  :  "-"
                              }
                      </Text>
                      <Text style={styles.seatNumberText}>
                      </Text>
                    </View>
                  </View>
                  : null
              }
            </View>
            {
              checkFlightCount == 1 ?
                <Text style={[styles.seatNumberText1,{
                  marginTop:scale(15),marginBottom:scale(5)
                }]}>
                  One flight scheduled
                </Text>
                : null
            }
            {economyPoints != 1100 && firstPoints != 1100 ?
              <Fragment>
                {checkFlightCount == 1 ? this._renderFlightList() : null}
              </Fragment>
              : null}
            <View style={styles.checkOnAirlineView}>
              {economyPoints != 1100 && firstPoints != 1100 ?
                <Fragment>
                <TouchableOpacity
                  style={[styles.checkOnAirlineButton,{
                    marginTop:classSelectedArray.length > 2 ? scale(10) : scale(16)
                  }]}
                  onPress={() => {
                    if(trip_type == "one_way"){
                      this.setState({
                        showModelDropdownForBA:true,
                        // showModelDropdownForSS:false
                      })
                    }

                    else{
                        this.props.navigation.navigate("priceDetails",{
                        cabinClassData:this.state.cabinClassData,
                        headerTxt:"Booking Details",
                        trip_type:trip_type,
                        searchData:this.state.searchData,
                        classArray:classSelectedArray,
                        selectedDate: this.state.selectedDate,
                      })
                    }
                    // this.setState({
                    //   showModelDropdownForBA:true,
                    //   showModelDropdownForSS:false
                    // })
                  }}
                >
                  <Image source={IMG_CONST.BRITISH_AIRWAYS_TRANPARENT_LOGO} />
                  <Text
                    style={{ color: colours.white, marginLeft: scale(10), fontSize: scale(13) }}
                  >
                    {STRING_CONST.BOOK_ON_BA}
                  </Text>
                </TouchableOpacity>
                {
                    showModelDropdownForBA && 
                    <View style={{height:classSelectedArray.length > 2 ? scale(135) : scale(80),borderRadius:scale(3),marginTop:scale(-9),width:scale(334),marginBottom:scale(20),alignSelf:"center",}}>
                    {travelData.map((singleMap)=>{
                          return( 
                            <TouchableOpacity  
                              onPress={()=>{

                                if(this.props.isLoggedIn == true){
                                  if(singleMap == "Economy"){

                                    this.setState({
                                      skyScannerCabinCode:"economy",
                                      cabinCode:"M",
                                    })
                                  }
                                  if(singleMap == "Premium"){
                                    this.setState({
                                      skyScannerCabinCode:"premiumeconomy",
                                      cabinCode:"W"
                                    })
                                  }if(singleMap == "Business"){
                                    this.setState({
                                      skyScannerCabinCode:"business",
                                      cabinCode:"C"
                                    })
  
                                  }if(singleMap == "First"){
                                    this.setState({
                                      cabinCode:"F",
                                      skyScannerCabinCode:"first"
                                    })
                                  }
                                  this.setState({
                                    showModelDropdownForBA:false,
                                    showModelDropdownForSS:false
                                  })
                                  this.handleBaRedirection()
                                }else{
                                  this.props.navigation.navigate(STRING_CONST.LOGIN)
                                }
                              }}
                              style={{justifyContent:'center',alignItems:'center',paddingTop:classSelectedArray.length > 2 ? scale(6):scale(1),
                              backgroundColor:singleMap=="Economy" ? "#dee3ff" : singleMap == "Premium" ? "#fef1dd" : singleMap == "Business" ? "#f1d9fc" : singleMap == "First" ? "#fcddea" : null
                             }}>
                           <Text style={[styles.classTxt,{
                              color:singleMap=="Economy" ? "#2044FF" : singleMap == "Premium" ? "#FEA41D" : singleMap == "Business" ? "#A400F1" : singleMap == "First" ? "#F31973" : null
                            }]}>
                              {singleMap}
                            </Text>
                          </TouchableOpacity>
                          )
                        })}
                      </View> 
                  }
                  {/* <TouchableOpacity
                  style={styles.checkOnAirlineButton1}
                  onPress={() => {
                    if(trip_type == "one_way"){
                      this.setState({
                        showModelDropdownForSS:true,
                        showModelDropdownForBA:false
                      })
                    }
                    else{
                        this.props.navigation.navigate("priceDetails",{
                        cabinClassData:this.state.cabinClassData,
                        trip_type:trip_type,
                        headerTxt:"See Cash Prices",
                        searchData:this.state.searchData,
                        classArray1:classSelectedArray,
                        selectedDate: this.state.selectedDate,
                      })
                    }
                  }}
                  >
                   <Text
                    style={{ color: colours.white, marginLeft: scale(10), fontSize: scale(13) }}
                  >
                    {"Price"}
                  </Text>
                  </TouchableOpacity> */}
                  {/* {
                    showModelDropdownForSS && 
                    <View style={{height:classSelectedArray.length > 2 ? scale(135) : scale(80),borderRadius:scale(3),marginTop:scale(-9),width:scale(334),marginBottom:scale(25),alignSelf:"center",}}>
                   {travelData.map((singleMap)=>{
                          return( 
                            <TouchableOpacity  
                              onPress={()=>{
                                if(singleMap == "Economy"){
                                  this.setState({
                                    skyScannerCabinCode:"economy",
                                    cabinCode:"M"
                                  })
                                }
                                if(singleMap == "Premium"){
                                  this.setState({
                                    skyScannerCabinCode:"premiumeconomy",
                                    cabinCode:"W"
                                  })
                                }if(singleMap == "Business"){
                                  this.setState({
                                    skyScannerCabinCode:"business",
                                    cabinCode:"C"
                                  })
                                }if(singleMap == "First"){
                                  this.setState({
                                    cabinCode:"F",
                                    skyScannerCabinCode:"first"
                                  })
                                }
                                this.setState({
                                  showModelDropdownForBA:false,
                                  showModelDropdownForSS:false
                                })
                                this.handleSkyScannerRedirection()
                              }}
                              style={{justifyContent:'center',alignItems:'center',paddingTop:classSelectedArray.length > 2 ? scale(6):scale(1),
                              backgroundColor:singleMap=="Economy" ? "#dee3ff" : singleMap == "Premium" ? "#fef1dd" : singleMap == "Business" ? "#f1d9fc" : singleMap == "First" ? "#fcddea" : null
                              }} >
                           <Text style={[styles.classTxt,{
                              color:singleMap=="Economy" ? "#2044FF" : singleMap == "Premium" ? "#FEA41D" : singleMap == "Business" ? "#A400F1" : singleMap == "First" ? "#F31973" : null
                            }]}>
                              {singleMap}
                            </Text>
                          </TouchableOpacity>
                          )
                        })}
                      </View> 
                  } */}
                  </Fragment>
                : null}
              <Fragment>
                {
                  economyPoints != 1100 && firstPoints != 1100 ?
                    <Fragment>
                      {
                        checkFlightCount > 1 ?
                          <TouchableOpacity
                            style={{ marginBottom: scale(12) }}
                            onPress={() => {
                              this.setState({
                                showTicketDetailModal: false,
                                showModelDropdownForBA:false,
                                showModelDropdownForSS:false,
                                bounceValue: new Animated.Value(250),
                                isHidden: true,
                                selectedDate: {},
                              })
                              this._toggleSubview();
                              // this.props.navigation.navigate("test1")
                              this.props.navigation.navigate(
                                'findFlightDetails1', {
                                date: this.state.flightDate,
                                multipleFlightScheduleData: this.props.multipleFlightScheduleData,
                                flightScheduleData: flightScheduleData,
                                dateString: this.state.dateString,
                                seatsAvailabilityData: this.state.seatsAvailabilityData,
                                isOutBounded: this.state.selectedIndex == 0,
                                classSelected: this.state.classSelected,
                                searchData: this.state.searchData,
                                source:searchData.selectedSource,
                                destination:searchData.selectedDestination,
                                selectedDate: this.state.selectedDate,
                                passengerCount: this.state.searchData.passengerCount,
                                isOffPeakValue: offPeakKey,
                                economyPoints: economySS ? economySS : economyBA,
                                premiumPoints: premiumSS ? premiumSS : premiumBA,
                                businessPoints: businessSS ? businessSS : businessBA,
                                firstPoints: firstSS ? firstSS : firstBA,
                                trip_type: this.state.searchData.isReturn ? "return" : "one_way",
                                businessSeats: businessSeats ? businessSeats : "",
                                economySeats: economySeats ? economySeats : "",
                                premiumSeats: premiumSeats ? premiumSeats : "",
                                firstSeats: firstSeats ? firstSeats : "",
                                selectedIndex: this.state.selectedIndex,
                                cabinClassData:this.props.cabinClassData,
                                classDataArray:classSelectedArray,
                                checkFlightCount:checkFlightCount
                              }
                              );
                            }}
                          >
                            {
                              checkFlightCount > 1 ?
                                <View style={{marginTop:scale(15)}}>
                                  <Text style={styles.aviosText1} >
                                    {STRING_CONST.MULTIPLE_FLIGHT_SCHEDULE}

                                  </Text>
                                  <Text style={styles.aviosText2} >

                                    {STRING_CONST.CLICK_ON_THE_DATES_TO_SEE_DETAILS}
                                  </Text>
                                </View>
                                : null
                            }
                          </TouchableOpacity>
                          : null
                      }
                      {
                        this.state.noflightschedule == true && checkFlightCount !== 1 && checkFlightCount < 1 ?
                          <TouchableOpacity
                            style={{ marginBottom: scale(12) }}
                            onPress={() => {
                              this.setState({
                                showTicketDetailModal: false,
                                showModelDropdownForBA:false,
                                showModelDropdownForSS:false
                              })
                              // this.props.navigation.navigate("test1")
                              this.props.navigation.navigate(
                                'findFlightDetails1', {
                                date: this.state.flightDate,
                                multipleFlightScheduleData: this.props.multipleFlightScheduleData,
                                flightScheduleData: flightScheduleData,
                                dateString: this.state.dateString,
                                seatsAvailabilityData: this.state.seatsAvailabilityData,
                                isOutBounded: this.state.selectedIndex == 0,
                                classSelected: this.state.classSelected,
                                searchData: this.state.searchData,
                                source:searchData.selectedSource,
                                destination:searchData.selectedDestination,
                                selectedDate: this.state.selectedDate,
                                passengerCount: this.state.searchData.passengerCount,
                                isOffPeakValue: offPeakKey,
                                economyPoints: economySS ? economySS : economyBA,
                                premiumPoints: premiumSS ? premiumSS : premiumBA,
                                businessPoints: businessSS ? businessSS : businessBA,
                                firstPoints: firstSS ? firstSS : firstBA,
                                 trip_type: this.state.searchData.isReturn ? "return" : "one_way",
                                businessSeats: businessSeats ? businessSeats : "",
                                economySeats: economySeats ? economySeats : "",
                                premiumSeats: premiumSeats ? premiumSeats : "",
                                firstSeats: firstSeats ? firstSeats : "",
                                noflightschedule: this.state.noflightschedule,
                                selectedIndex: this.state.selectedIndex,
                                cabinClassData:this.props.cabinClassData,
                                classDataArray:classSelectedArray,
                                checkFlightCount:checkFlightCount
                              }
                              );
                            }}
                          >
                            <Text style={styles.aviosText2} >{"No flight scheduled"}</Text>
                          </TouchableOpacity>
                          :
                          null
                      }
                    </Fragment>
                    : null
                }
              </Fragment>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }

  handleSkyScannerRedirection = () => {
    // const { dId, aId, numberOfPassengers, jType, date, cabinCode, returnDate } = data || {}  
    const {selectedIndex,searchData,passengerCount,dateString,skyScannerCabinCode,}  = this.state;
  
    let sourceCode = searchData.selectedSource.code.toLowerCase()
    let destinationCode = searchData.selectedDestination.code.toLowerCase()

    let numberOfPassengers = searchData.passengerCount
    const dDate =  moment(dateString).format('DD')
    const dYear =  moment(dateString).format('YYMM')
    const aDate =  moment().format('DD')
    const aYear =  moment().format('YYMM')


    let url = ""
     if(sourceCode){
      if(selectedIndex == 1){
         url = `${SKY_SCANNER_URL}/${sourceCode}/${destinationCode}/${dYear}${dDate}/${aYear}${aDate}/?adults=${numberOfPassengers}&adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&iym=${aYear}&selectediday=${aDate}&rtn=1`
      }
      if(selectedIndex == 0){
         url = `${SKY_SCANNER_URL}/${sourceCode}/${destinationCode}/${dYear}${dDate}/?adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&rtn=0`
      }
       Linking.openURL(url, '_blank') 
     }else{
        Linking.openURL(`${SKY_SCANNER_URL}/, "_blank`)
     }
  }

  handleBaRedirection = () => {  
    
    const {selectedIndex,passengerCount,dateString,cabinCode,searchData,destination}  = this.state;

    let sourceCode = searchData.selectedSource.code.toLowerCase()
    let destinationCode = searchData.selectedDestination.code.toLowerCase()

    let numberOfPassengers = searchData.passengerCount
    let oneWay = selectedIndex == 0 ? true : false
    const departInputDate =  moment(dateString).format('DD/MM/YYYY')
    const returnInputDate =  moment().format('DD/MM/YYYY')

     if(sourceCode){
      const url = `${BA_EXE_URL}_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=${sourceCode}&destinationPoint=${destinationCode}&departInputDate=${departInputDate}${oneWay && departInputDate ? `&returnInputDate=${returnInputDate}` : ''}&oneWay=${oneWay}&RestrictionType=Restricted&NumberOfAdults=${numberOfPassengers}&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=${cabinCode}`
        Linking.openURL(url, '_blank')
     }else{
      Linking.openURL(`${BA_EXE_URL}`, "_blank")
     }
  }

  _renderFlightList = () => {
    let checkFlightCount = 0
    let scheduleData = {}

    if (this.props.flightSchedule) {
      if (this.state.selectedIndex == 0) {
        scheduleData = this.props.flightSchedule.outbound_availability
      }
      else {
        scheduleData = this.props.flightSchedule.inbound_availability
      }
    }

    let checkData = Object.entries(scheduleData)

    let flightData = []
    checkData.map((singleData, index) => {
      if (singleData[0] == this.state.onDayPressedDate) {
        singleData.map((nestedMap) => {
          checkFlightCount = nestedMap.count
          flightData = nestedMap.schedules
        })
      }
    })

    return (
      <View style={{ flex: 1,}}>
        {
          flightData && flightData.map((singleItem) => {
            return (
              <View style={{ flex: 1, width: width }} >
                <TouchableOpacity
                  style={[styles.cellContainer]}
                  activeOpacity={0.6}
                  onPress={() => {
                    this.Hide_Custom_Alert2()
                    this.setState({
                      showDetailsModal: true,
                      showTicketDetailModal: false,
                      showModelDropdownForBA:false,
                      showModelDropdownForSS:false
                    })
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={IMAGE_CONST.BIG_TAKE_OFF}
                      style={{ marginRight: scale(10) }}
                    />
                    <Text
                      style={styles.flightDetailText}
                    >{`${singleItem.departure_time} ${singleItem.source_code}`}</Text>
                  </View>
                  <Text style={styles.flightDetailText}>{` - `}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={IMAGE_CONST.BIG_LANDING}
                      style={{ marginRight: scale(10) }}
                    />
                    <Text
                      style={styles.flightDetailText}
                    >{`${singleItem.arrival_time} ${singleItem.destination_code}`}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    )
  }

  flightDetailsModal() {
    let checkFlightCount = 0
    let scheduleData = {}
    if (this.state.selectedIndex == 0) {
      scheduleData = this.props.flightSchedule.outbound_availability
    }
    else {
      scheduleData = this.props.flightSchedule.inbound_availability
    }
    let checkData = Object.entries(scheduleData)
    let flightData = []
    checkData.map((singleData, index) => {
      if (singleData[0] == this.state.onDayPressedDate) {
        singleData.map((nestedMap) => {
          checkFlightCount = nestedMap.count
          flightData = nestedMap.schedules
        })
      }
    })
    let data = this.state.searchData
    return (
      <View>
        {
          flightData && flightData.map((selectedFlight) => {
            return (
              <Animated.View
              style={[
                styles.animatedView1,
                { 
                  backgroundColor:"#FFF",
                  borderColor:"#EFEFEF",
                  transform: [{ translateY: this.state.bounceValue }],
                },
              ]}
            >
              <View style={styles.animatedInnerView}>
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "stretch",
                  }}
                >
                  <View style={[styles.titleView]}>
                    <TouchableOpacity onPress={() => { }}>
                    <Image
                  source={IMAGE_CONST.BA_LOGO_CAL}
                  style={{ marginRight: scale(10),height:scale(30),width:scale(70),margin:scale(5),marginBottom:scale(10) }}
                />
                    </TouchableOpacity>
                    <Text style={styles.titleText1}>{`${STRING_CONST.SEAT_AVAILABILITY
                      } (${this.state.isOffPeakValue
                        ? STRING_CONST.OFF_PEAK_FARE
                        : STRING_CONST.PEAK_FARE
                      })`}</Text>
                    <TouchableOpacity
                      style={{
                        alignSelf: "flex-end",
                        marginTop:scale(-7),marginBottom:scale(9)
                      }}
                      onPress={() => {
                        this.setState({
                          showDetailsModal: false,
                          bounceValue: new Animated.Value(250),
                          isHidden: true,
                        });
                        this._toggleSubview();
                      }}
                    >
                      <Entypo
                        name="cross"
                        size={scale(27)}
                        color={colours.lightGreyish}
                      />
                    </TouchableOpacity>
                  </View>
                  {
                    this.state.selectedIndex == 0 ?
                      <Fragment>
                        <Text style={styles.detailLocationText}>
                          {data.selectedSource.name.toString()} to {data.selectedDestination.name.toString()}
                        </Text>
                      </Fragment>
                      :
                      <Fragment>
                        <Text style={styles.detailLocationText}>
                          {data.selectedDestination.name.toString()}  to {data.selectedSource.name.toString()}
                        </Text>
                      </Fragment>
                  }
                


                  <View
              style={[styles.timingContainer]}
              activeOpacity={0.6}
              onPress={() => { }}
            >
              <View style={{ flexDirection: "row", marginRight: scale(20) }}>
                <Image
                  source={IMAGE_CONST.BIG_TAKE_OFF}
                  style={{ marginRight: scale(10),marginTop:scale(2), }}
                />
                <Text
                  style={[
                    styles.flightDetailText,
                    { color:"#132C52", fontSize: scale(14),fontWeight:"600" },
                  ]}
                >{`${selectedFlight.departure_time} ${selectedFlight.source_code}`}</Text>
              </View>
              <View style={{ flexDirection: "row",marginStart:scale(15)}}>
                <Image
                  source={IMAGE_CONST.BIG_LANDING}
                  style={{ marginRight: scale(10) }}
                />
                <Text
                  style={[
                    styles.flightDetailText,
                    { color: "#132C52", fontSize: scale(14),fontWeight:"600" },
                  ]}
                >{`${selectedFlight.arrival_time} ${selectedFlight.destination_code}`}</Text>
              </View>
            </View>

            <View style={{width:scale(340),flexDirection:"row",justifyContent:"space-between",alignItems:"center",alignSelf:"center",margin:scale(1),marginBottom:scale(20),marginRight:scale(10)}}>
                  <View style={{backgroundColor:"#E9F8FB",margin:scale(10),justifyContent:"center",alignSelf:"center",alignItems:"center",borderWidth:scale(1),borderRadius:scale(10),borderColor:"#03B2D8",width:scale(155),height:scale(110)}}> 
                      <Image source={IMAGE_CONST.AERO_LOGO} resizeMode="contain" style={{height:scale(30),width:scale(54)}} />
                      <Text
                  style={[
                    styles.flightDetailText,
                    {
                      color: "#424448",
                      fontWeight:"500",
                      fontSize: scale(14),
                      paddingTop:scale(5),
                      padding: scale(1),
                    },
                  ]}
                >{`${"Aircraft"}`}</Text>
                  <Text
                  style={[
                    styles.flightDetailText,
                    {
                      color: "#727272",
                      fontWeight:"400",
                      fontSize: scale(14),
                      paddingTop:scale(5),
                      padding: scale(1),
                    },
                  ]}
                >{`${selectedFlight.aircraft_details}`}</Text>
                  </View>
                  <View style={{backgroundColor:"#E9F8FB",justifyContent:"center",alignSelf:"center",alignItems:"center",borderWidth:scale(1),borderRadius:scale(10),borderColor:"#03B2D8",width:scale(155),height:scale(110)}}> 
                      <Image source={IMAGE_CONST.TIME_LOGO}  resizeMode="contain" style={{height:scale(34),width:scale(34)}} />
                      <Text
                  style={[
                    styles.flightDetailText,
                    {
                      color: "#424448",
                      fontWeight:"500",
                      fontSize: scale(14),
                      paddingTop:scale(8),
                      padding: scale(1),
                    },
                  ]}
                >{`${"Duration"}`}</Text>
                  <Text
                  style={[
                    styles.flightDetailText,
                    {
                      color: "#727272",
                      fontWeight:"400",
                      fontSize: scale(14),
                      paddingTop:scale(5),
                      padding: scale(1),
                    
                    },
                  ]}
                >{`${getTimeFromMins(selectedFlight.duration)}`}</Text>
                  </View>



                  </View>
            
                </View>
              </View>
            </Animated.View>
            );
          })
        }
      </View>
    )
  }

  jsonToQueryString = (json) =>
    "?" +
    Object.keys(json)
      .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&");

  verifyAlertData() {
    const { departStartDate, returnStartDate, searchData } = this.state;
    if (!departStartDate) {
      return false;
    } else if (searchData.isReturn && !returnStartDate) {
      return false;
    } else {
      return true;
    }
  }


    renderClassValues(){
      const { classSelected } = this.state;
  
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
      return classSelected1;
    }
    getBAClassesStringForAlert(classSelected) {
      let classArray = ["Economy", "Premium Economy", "Business", "First"];
      let travel_classes = "";
      for (i = 0; i < classSelected.length; i++) {
        if (classSelected[i]) {
          if (travel_classes !== "")
            travel_classes = `${travel_classes},${classArray[i]}`;
          else {
            travel_classes = `${classArray[i]}`;
          }
        }
      }
      return travel_classes;
    }

  // ALERT VERIFY AND SUBMIT CODE .    . . . . . . .. . .. . . . 
  async onSubmitAlertPress() {
    this.setState({
      createAlertPressed: true,
    });

    if (this.verifyAlertData()) {
      this.setState({
        showCreateAlertModal: false,
      });

      const accesstoken = await getAccessToken();
      const { searchData, classSelected } = this.state;

      let userData = this.props.userInfo
      let current_membership = userData.airline_memberships[0].membership
      // let curreantDate = moment().format("YYYY-MM-DD")
      // Test all condition for the outbound date range..........

      let goldMember = userData.gold_member
      let silverMember = userData.silver_member
      let bronzeMember = userData.bronze_member
  
      let bronzeExpireDate = moment(this.state.departStartDate).add(19, 'days').format("YYYY-MM-DD")
      let silverExpireDate = moment(this.state.departStartDate).add(44, 'days').format("YYYY-MM-DD")
      let goldExpireDate = moment(this.state.departStartDate).add(89, 'days').format("YYYY-MM-DD")

      let bronzeExpirertnDate = moment(this.state.returnStartDate).add(19, 'days').format("YYYY-MM-DD")
      let silverExpirertnDate = moment(this.state.returnStartDate).add(44, 'days').format("YYYY-MM-DD")
      let goldExpirertnDate = moment(this.state.returnStartDate).add(89, 'days').format("YYYY-MM-DD")
      // expireDate = new Date(goldExpireDate).getTime()
      let txtForPopup = ""
      let alertDate = moment(this.state.departEndDate).format("YYYY-MM-DD")
      let rtnEndDate = moment(this.state.returnEndDate).format("YYYY-MM-DD")
      let expireDate = ""
      let departureEndDate = ""
      let returnEndDate = ""
      let returnExpireDate = ""
      let days = 0

      let inbounddateRange = false
      let outbounddateRange = false
      if (goldMember) {
        expireDate = new Date(goldExpireDate).getTime()
        departureEndDate = new Date(alertDate).getTime()
        returnEndDate = new Date(rtnEndDate).getTime()
        returnExpireDate = new Date(goldExpirertnDate)
        if (returnExpireDate < returnEndDate) {
          txtForPopup = `You are allowed a maximum date range of 60 days.`
          inbounddateRange = true
          days = 90
        }
        else {
          txtForPopup = `You are allowed a maximum date range of 60 days.`
          days = 90
          outbounddateRange = true
        }
      }
      else if (silverMember) {
        expireDate = new Date(silverExpireDate).getTime()
        departureEndDate = new Date(alertDate).getTime()
        returnEndDate = new Date(rtnEndDate).getTime()
        returnExpireDate = new Date(silverExpirertnDate)
        if (returnExpireDate < returnEndDate) {
          days = 45
          txtForPopup = `You are allowed a maximum date range of 45 days.`
          inbounddateRange = true
        }
        else {
          days = 45
          outbounddateRange = true
          txtForPopup = `You are allowed a maximum date range of 45 days.`
        }
      }
      else {
        expireDate = new Date(bronzeExpireDate).getTime()
        departureEndDate = new Date(alertDate).getTime()
        returnEndDate = new Date(rtnEndDate).getTime()
        returnExpireDate = new Date(bronzeExpirertnDate)
        if (returnExpireDate < returnEndDate) {
          days = 20
          inbounddateRange = true
          txtForPopup = `You are allowed a maximum date range of 20 days.`
        }
        else {
          days = 20
          outbounddateRange = true
          txtForPopup = `You are allowed a maximum date range of 20 days.`
        }
      }
      if (expireDate === departureEndDate) {
        isAlertExpireDays = true
      }
      if (expireDate > departureEndDate) {
        isAlertExpireDays = true
      }
      if (expireDate < departureEndDate) {
        isAlertExpireDays = false
      }

      if (returnExpireDate === returnEndDate) {
        isAlertExpireDays2 = true
      }
      if (returnExpireDate > returnEndDate) {
        isAlertExpireDays2 = true
      }
      if (returnExpireDate < returnEndDate) {
        isAlertExpireDays2 = false
      }

      let data = this.state.airLinesDetailsObject.availability;

      let classData = []
      if (data) {
        if (data.economy == true) {
          classData.push(true);
        }
        else {
          classData.push(false);
        }
        if (data.premium == true) {
          classData.push(true);
        }
        else {
          classData.push(false);
        }
        if (data.business == true) {
          classData.push(true);
        }
        else {
          classData.push(false);
        }
        if (data.first == true) {
          classData.push(true);
        }
        else {
          classData.push(false);
        }
      }

      let newArray = []
      this.state.classTypeArray.map((singleMap)=>{
        newArray.push(singleMap.isSelected)
      })

      let travel_classes = getBAClassesString(newArray);

      let classForAlert = this.getBAClassesStringForAlert(newArray)


      let availableclasses = this.state.airLinesDetailsObject.availability;
      let availableClassString = "";
      for (const item in availableclasses) {
        if (availableclasses[item]) {
          if (!isEmptyString(availableClassString)) {
            availableClassString = `${availableClassString},${item}`;
          } else {
            {
              availableClassString = `${item}`;
            }
          }
        }
      }
      let selectedSource = this.state.airLinesDetailsObject.source
      let selectedDestination = this.state.airLinesDetailsObject.destination

      let airline_code = getAirlinesCode(this.state.searchData.airline)
      let membership = this.state.searchData.tier
      let airline = this.state.searchData.airline

      const url = {
        aCode: "BA",
        numberOfPassengers: searchData.passengerCount,
        tclass: "Economy",
        tValue: "economy",
        jType: this.state.searchData.isReturn ? "return" : "one-way",
        dPlace: getLocationNameWithCode(selectedSource),
        dId: searchData.sourceCode,
        aPlace: getLocationNameWithCode(selectedDestination),
        aId: searchData.destinationCode,
        economy: classData[0],
        premium: classData[1],
        first: classData[2],
        business: classData[3],
        start_date: moment(searchData.startDate).format("YYYY-MM-DD") || null,
        airlineMembership: membership,    
        start_date: moment(searchData.startDate).format("YYYY-MM-DD") || null,
      };
      var body = {
        user: {
          access_token: accesstoken,
        },
        alert: {
          source_code: searchData.sourceCode,
          destination_code: searchData.destinationCode,
          airline_name: airline.replace("-", "_"),
          number_of_passengers: searchData.passengerCount,
          travel_classes: this.props.userInfo.bronze_member ? 'economy' : travel_classes,
          available_travel_classes: travel_classes,
          trip_type: this.state.searchData.isReturn ? "return" : "one_way",
          membership_type: current_membership,
          start_date: moment(this.state.departStartDate).format("DD-MM-YYYY"),
          end_date: moment(this.state.departEndDate).format("DD-MM-YYYY"),
          arrival_start_date: this.state.searchData.isReturn
            ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
            : "",
          arrival_end_date: this.state.searchData.isReturn
            ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
            : "",
          availability_url: `/calendar${this.jsonToQueryString(url)}`,
        },
      };

    
      if (this.state.searchData.isReturn) {
        if (isAlertExpireDays && isAlertExpireDays2) {
          const trackData = {
            "Alert Type": "Created",
            "Alert Parameters": {   
              airline: "British Airways",
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ?searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: selectedSource ? selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:this.state.searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: classForAlert ? classForAlert : 'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate: moment(this.state.departStartDate).format("DD-MM-YYYY") ? moment(this.state.departStartDate).format("DD-MM-YYYY") : 'N/A',
              outboundEndDate: moment(this.state.departEndDate).format("DD-MM-YYYY") ? moment(this.state.departEndDate).format("DD-MM-YYYY") : 'N/A',
              inboundStartDate: 
              this.state.searchData.isReturn
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : 'N/A',
              inboundEndDate: this.state.searchData.isReturn
              ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
              : 'N/A',
            },
            "Old Alert Parameters": {   
              airline:'N/A',
              originIATA:  'N/A',
              destinationIATA:'N/A',
              originCity:  'N/A',
              destinationCity: 'N/A',
              originCountry:'N/A',
              destinationCountry:'N/A',
              journeyType: "one_way",
              numberOfPassengers:  'N/A',
              cabinClasses:  'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate:  'N/A',
              outboundEndDate:'N/A',
              inboundStartDate:'N/A',
              inboundEndDate: 'N/A',
            }
          }
          PostHog.capture('Alert', trackData);
          this.props.onSubmitAlertPress(body);
          this.setState({
            departStartDate: "",
            departEndDate: "",
            returnStartDate: "",
            returnEndDate: "",
            createAlertPressed: false,
          });
        }
        else {
          if (this.props.isLoggedIn == true) {
            let loggedInUserPostHog = {}
            loggedInUserPostHog["user"] = {
              access_token: this.state.accesstoken
            }
            loggedInUserPostHog["event_name"] = "Create alert date range length error"
            loggedInUserPostHog["data"] = {
              "outbound_start_date": moment(this.state.departStartDate).format("DD-MM-YYYY"),
              "outbound_end_date": moment(this.state.departEndDate).format("DD-MM-YYYY"),
              "inbound_start_date": this.state.searchData.isReturn
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : "",
              "inbound_end_date": this.state.searchData.isReturn
                ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
                : "",
              "trip_type": "one_way",
              "allowedDateRange": days,
              "inBoundLengthExceed": inbounddateRange,
              "outBoundLengthExceed": outbounddateRange,
              "metaData": {
                "deviecBrand": this.state.deviecBrand,
                "deviceName": this.state.deviceName,
                "isEmulator": this.state.isEmulator,
                "isTablet": this.state.isTablet,
                "plateform": "Mobile",
              }
            }
            // this.props.loggedinUserPostHogFun(loggedInUserPostHog)
          }
          else {
            let uuid_Key = uuid.v4()
            let guestUserPostHog = {}
            guestUserPostHog["sessionId"] = `${uuid_Key}`
            guestUserPostHog["event_name"] = "Create alert date range length error"
            guestUserPostHog["data"] = {
              "outbound_start_date": moment(this.state.departStartDate).format("DD-MM-YYYY"),
              "outbound_end_date": moment(this.state.departEndDate).format("DD-MM-YYYY"),
              "inbound_start_date": this.state.searchData.isReturn
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : "",
              "inbound_end_date": this.state.searchData.isReturn
                ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
                : "",
              "trip_type": "one_way",
              "allowedDateRange": days,
              "inBoundLengthExceed": inbounddateRange,
              "outBoundLengthExceed": outbounddateRange,
              "metaData": {
                "deviecBrand": this.state.deviecBrand,
                "deviceName": this.state.deviceName,
                "isEmulator": this.state.isEmulator,
                "isTablet": this.state.isTablet,
                "plateform": "Mobile",
              }
            }
            // this.props.guestUserPostHogFunc(guestUserPostHog)
          }
          this.setState({
            departStartDate: "",
            departEndDate: "",
            returnStartDate: "",
            returnEndDate: "",
            createAlertPressed: false,
          });
          setTimeout(() => {
            Alert.alert(
              'Message',
              `${txtForPopup}`,
              [{ text: 'OK', onPress: () => { console.log("yes something here #######  ") } }],
              { cancelable: false },
            );
          }, 400);
        }
      }
      else {
        if (isAlertExpireDays) {
          const trackData = {
            "Alert Type": "Created",
            "Alert Parameters": {   
              airline: "British Airways",
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ?searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: selectedSource ? selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:this.state.searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: classForAlert ? classForAlert : 'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate: moment(this.state.departStartDate).format("DD-MM-YYYY") ? moment(this.state.departStartDate).format("DD-MM-YYYY") : 'N/A',
              outboundEndDate: moment(this.state.departEndDate).format("DD-MM-YYYY") ? moment(this.state.departEndDate).format("DD-MM-YYYY") : 'N/A',
              inboundStartDate: 
              this.state.searchData.isReturn
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : 'N/A',
              inboundEndDate: this.state.searchData.isReturn
              ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
              : 'N/A',
            },
            "Old Alert Parameters": {    
              airline:'N/A',
              originIATA:  'N/A',
              destinationIATA:'N/A',
              originCity:  'N/A',
              destinationCity: 'N/A',
              originCountry:'N/A',
              destinationCountry:'N/A',
              journeyType: "one_way",
              numberOfPassengers:  'N/A',
              cabinClasses:  'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate:  'N/A',
              outboundEndDate:'N/A',
              inboundStartDate:'N/A',
              inboundEndDate: 'N/A',
            }
          }
    
          PostHog.capture('Alert', trackData);

          this.props.onSubmitAlertPress(body);
          this.setState({
            departStartDate: "",
            departEndDate: "",
            returnStartDate: "",
            returnEndDate: "",
            createAlertPressed: false,
          });
        }
        else {
          if (this.props.isLoggedIn == true) {
            let loggedInUserPostHog = {}
            loggedInUserPostHog["user"] = {
              access_token: this.state.accesstoken
            }
            loggedInUserPostHog["event_name"] = "Create alert date range length error"
            loggedInUserPostHog["data"] = {
              "outbound_start_date": moment(this.state.departStartDate).format("DD-MM-YYYY"),
              "outbound_end_date": moment(this.state.departEndDate).format("DD-MM-YYYY"),
              "inbound_start_date": this.state.searchData.isReturn
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : "",
              "inbound_end_date": this.state.searchData.isReturn
                ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
                : "",
              "trip_type": "one_way",
              "allowedDateRange": days,
              "inBoundLengthExceed": inbounddateRange,
              "outBoundLengthExceed": outbounddateRange,
              "metaData": {
                "deviecBrand": this.state.deviecBrand,
                "deviceName": this.state.deviceName,
                "isEmulator": this.state.isEmulator,
                "isTablet": this.state.isTablet,
                "plateform": "Mobile",
              }
            }
            // this.postHogAnalytics(loggedInUserPostHog)
            // this.props.loggedinUserPostHogFun(loggedInUserPostHog)
          }
          else {
            let uuid_Key = uuid.v4()
            let guestUserPostHog = {}
            guestUserPostHog["sessionId"] = `${uuid_Key}`
            guestUserPostHog["event_name"] = "Create alert date range length error"
            guestUserPostHog["data"] = {
              "outbound_start_date": moment(this.state.departStartDate).format("DD-MM-YYYY"),
              "outbound_end_date": moment(this.state.departEndDate).format("DD-MM-YYYY"),
              "inbound_start_date": this.state.searchData.isReturn
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : "",
              "inbound_end_date": this.state.searchData.isReturn
                ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
                : "",
              "trip_type": "one_way",
              "allowedDateRange": days,
              "inBoundLengthExceed": inbounddateRange,
              "outBoundLengthExceed": outbounddateRange,
              "metaData": {
                "deviecBrand": this.state.deviecBrand,
                "deviceName": this.state.deviceName,
                "isEmulator": this.state.isEmulator,
                "isTablet": this.state.isTablet,
                "plateform": "Mobile",
              }
            }
          }
          this.setState({
            departStartDate: "",
            departEndDate: "",
            returnStartDate: "",
            returnEndDate: "",
            createAlertPressed: false,
          });
          setTimeout(() => {
            Alert.alert(
              'Message',
              `${txtForPopup}`,
              [{ text: 'OK', onPress: () => { console.log("yes something here #######  ") } }],
              { cancelable: false },
            );
          }, 400);
        }
      }
    }
  }

  verifyCreateAlert() {
    let userInfo = this.props.userInfo;
    const {departStartDate, returnStartDate,showDateRangeError} = this.state
    let trip_type =  this.state.searchData.isReturn ? "return" : "one_way"
    if (userInfo.email_verified) {
      let allowedActiveAlerts = userInfo.allowed_active_alerts;
      let currentActiveAlerts = userInfo.current_active_alerts;
      if (allowedActiveAlerts > currentActiveAlerts) {
        this.onSubmitAlertPress();
      } else {
        if (userInfo.gold_member) {
            this.setState(
              {
                showCreateAlertModal: false,
              },
              () => {
                setTimeout(() => {
                  Alert.alert("You have reached your limit of Active Alerts.");
                }, 100);
              }
            );
        } else {
              if(!departStartDate){
                this.setState({
                  showDateRangeError:true
                })
              }


            else{
            this.setState(
              {
                showCreateAlertModal: false,
                showDateRangeError:false
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    showUpgradePopUp: true,
                  });
                }, 100);
              }
            );
          }
        }
      }
    } else {
      this.setState(
        {
          showCreateAlertModal: false,
        },
        () => {
          setTimeout(() => {
            alert(STRING_CONST.VERIFY_EMAIL);
          }, 100);
        }
      );
    }
  }

  createAlertModal() {
    const {
      departStartDate,
      departEndDate,
      createAlertPressed,
      searchData,
      returnStartDate,
      returnEndDate,
      showDateRangeError
    } = this.state;

    let trip_type =  this.state.searchData.isReturn ? "return" : "one_way"

    return (
      <View>
        <Modal
          isVisible={true}
          style={{ margin: 0, justifyContent: "flex-end" }}
        >
          <View style={styles.createAlertModalContainer}>
            <View style={{ margin: scale(20) }}>
              <View style={styles.createAlertText}>
                <Text
                  style={{
                    fontFamily: STRING_CONST.appFonts.INTER_BOLD,
                    fontSize: scale(18),
                    color: colours.darkBlueTheme,
                    fontWeight: "600",marginStart:scale(8)
                  }}
                >
                  {STRING_CONST.CREATE_ALERT}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showCreateAlertModal: false });
                  }}
                  style={{height:scale(30),width:scale(30)}}
                >
                  {IMAGE_CONST.GREY_CROSS}
                </TouchableOpacity>
              </View>
              <View style={styles.createAlertInnerContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={[
                      styles.createAlertTakeOffIcon,
                      { marginHorizontal: scale(22) },
                    ]}
                    resizeMode="contain"
                    source={IMG_CONST.DEPARTURE}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ showCreateAlertModal: false });
                      let hasStartDate = false;
                      {
                        if (departStartDate && departEndDate)
                          hasStartDate = true;
                      }
                      this.props.navigation.navigate(
                        STRING_CONST.CREATE_ALERT_SCREEN,
                        {
                          headingText: STRING_CONST.DEPART_TEXT,
                          onSelectPress: (startDate, endDate) => {
                            this.setState({
                              showCreateAlertModal: true,
                              departStartDate: startDate,
                              departEndDate: endDate,
                            });
                          },
                          showDateRange: true,
                          selectedStartDate: hasStartDate
                            ? departStartDate
                            : null,
                          selectedEndDate: hasStartDate ? departEndDate : null,
                        }
                      );
                    }}
                  >
                     <Text style={[styles.dateTextHeading,{
                      marginBottom:departStartDate? scale(5):scale(0),
                      marginTop:departStartDate ? scale(10):scale(25)
                    }]}>
                      {STRING_CONST.DEPARTURE_DATE_RANGE}
                    </Text>
                    <Text style={styles.dateText}>
                      {`${departStartDate
                        ? `${getformattedDate(departStartDate)}  -`
                        :""
                        }  ${departEndDate
                          ? `${getformattedDate(departEndDate)}`
                          :""
                        }`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.errorView} />
                {createAlertPressed && isEmptyString(departStartDate) && (
                  <Text style={styles.errorTextStyle}>
                    {STRING_CONST.SELECT_DEPARTURE_DATE}
                  </Text>
                )}

                {searchData.isReturn ? (
                  <View style={styles.dateContainer}>
                    <Image
                      style={[
                        styles.createAlertTakeOffIcon,
                        {
                          marginHorizontal: scale(22),
                        },
                      ]}
                      source={IMG_CONST.DEPARTURE}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        let hasStartDate = false;
                        {
                          if (returnStartDate && returnEndDate)
                            hasStartDate = true;
                        }
                        if (departStartDate) {
                          this.setState({
                            showCreateAlertModal: false,
                          });
                          this.props.navigation.navigate(
                            STRING_CONST.CREATE_ALERT_SCREEN,
                            {
                              headingText: STRING_CONST.RETURN,
                              onSelectPress: (startDate, endDate) => {
                                this.setState({
                                  showCreateAlertModal: true,
                                  returnStartDate: startDate,
                                  returnEndDate: endDate,
                                });
                              },
                              minDate: this.state.departStartDate,
                              showDateRange: true,
                              selectedStartDate: hasStartDate
                                ? returnStartDate
                                : null,
                              selectedEndDate: hasStartDate
                                ? returnEndDate
                                : null,
                            }
                          );
                        }
                      }}
                    >
                        <Text style={[styles.dateTextHeading,{
                      marginBottom:returnStartDate? scale(5):scale(0),
                      marginTop:returnStartDate ? scale(10):scale(25)
                    }]}>
                        {STRING_CONST.RETURN_DATE_RANGE}
                      </Text>
                      <Text
                        style={[
                          styles.dateText,
                          {
                            color: departStartDate
                              ? colours.darkBlueTheme
                              : colours.lightGreyish,
                          },
                        ]}
                      >
                        {`${returnStartDate
                          ? `${getformattedDate(returnStartDate)}  -`
                          : ""
                          }  ${returnEndDate
                            ? `${getformattedDate(returnEndDate)}`
                            : ""
                          }`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {searchData.isReturn ? <View style={styles.errorView} /> : null}
                {searchData.isReturn &&
                  createAlertPressed &&
                  isEmptyString(returnStartDate) && (
                    <Text style={styles.errorTextStyle}>
                      {STRING_CONST.SELECT_RETURN_DATE}
                    </Text>
                  )}
              </View>
              {
                <Fragment>
                  {
                    trip_type == "one_way" ?
                      <Fragment>
                          {
                          showDateRangeError && !departStartDate ?
                            <Text style={styles.errorTextStyle}>
                            {"Please select the date range."}
                            </Text>
                            : null
                          }
                      </Fragment>
                    : 
                    <Fragment>
                            {
                            showDateRangeError && !returnEndDate ?
                              <Text style={styles.errorTextStyle}>
                              {"Please select the date range."}
                              </Text>
                              : null
                          }
                      </Fragment>
                  }
                </Fragment>
              }
            <View>
            <Text style={{fontSize:scale(16),fontWeight:"600",padding:scale(7),marginTop:scale(10),color:"#132C52"}}>Select Cabin Class</Text>
                {this.getClassType()}
            </View>
              {this.renderSubmitAlertButton1("Create Alert", () => {
                // this.setState({
                //   departStartDate:"",
                //   departEndDate:"",
                //   returnStartDate:"",
                //   returnEndDate:""
                // })
                this.verifyCreateAlert();
              })}
            </View>
          </View>
        </Modal>
      </View>
    );
  }


  getClassText() {

    const {userData}  = this.props;

    let goldMember = userData.gold_member
    let silverMember = userData.silver_member
    let bronzeMember = userData.bronze_member

    let classObject
    let classSelected 

    if(bronzeMember){
      classObject = this.state.classObject1;
      classSelected = this.state.classSelected1;

    }
    else{
      classObject = this.state.classObject1;
      classSelected = this.state.classSelected;
    }

    let selectedClassCount = 0;
    let index = -1;
    for (i = 0; i < classSelected.length; i++) {
      if (classSelected[i]) {
        selectedClassCount = selectedClassCount + 1;
        index = i;
      }
    }
    if (selectedClassCount == 1) {
      return `${classObject[index].class}`;
    } else if (selectedClassCount == 0) {
      return ` None`;
    } else {
      return `${selectedClassCount} Classes`;
    }
  }

  onClassTypeSelected(item, index) {
    let classTypeArray = this.state.classTypeArray;
    classTypeArray[index].isSelected = !classTypeArray[index].isSelected;
   
    this.setState({
      classTypeArray: classTypeArray,
    });
  }

  getClassType() {

    let isEconomySelected = this.state.classTypeArray[0].isSelected
    let isPremiumSelected = this.state.classTypeArray[1].isSelected
    let isBusinessSelected = this.state.classTypeArray[2].isSelected
    let isFirstSelected = this.state.classTypeArray[3].isSelected
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member
    return (
      <View>
        {
          <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-around"}}>
          {
            this.state.classTypeArray.map((item, index) => { 
                return (
                <Fragment>
                 {
                  item.class ? 
                  <Fragment>
                  
                  <View>
                    <TouchableOpacity
                      style={{ backgroundColor:  item.class  == "Economy" ?
                      "#edf0ff" : item.class == "Premium Economy" ?
                      "#fef8ed" : item.class == "Business" ?
                      "#f8ebfe" : item.class == "First" ? 
                      "#fde8f1" : null,
                      // borderColor:  item.class  == "Economy" ?
                      // "#bfc9ff" : item.class == "Premium Economy" ?
                      // "#fce1b3" : item.class == "Business" ?
                      // "#d7a1f0" : item.class == "First" ? 
                      // "#f9b9d4" : null,

                      borderRadius:scale(10),borderWidth:0,marginVertical: verticalScale(7),alignItems:"center",width:scale(153),height:scale(120) }}
                      onPress={() => {
                        if(item.class == "Economy") { 
                          if(isPremiumSelected || isBusinessSelected || isFirstSelected) { 
                            this.onClassTypeSelected(item, index);
                          }
                        }
                        else if(item.class == "Premium Economy") { 
                          if(!bronzeMember){
                            if(isEconomySelected || isBusinessSelected || isFirstSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                          else{
                            this.setState({ showCreateAlertModal: false })
                            this.showAlert1()
                          }
                        }
                        else if(item.class == "Business"){
                          if(!bronzeMember){
                            if(isEconomySelected || isPremiumSelected || isFirstSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                          else{
                            this.setState({ showCreateAlertModal: false })
                            this.showAlert1()
                          }
                        }
                        else if(item.class == "First"){
                          if(!bronzeMember){
                            if(isEconomySelected || isPremiumSelected || isBusinessSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }else{
                            this.setState({ showCreateAlertModal: false })
                            this.showAlert1()
                          }
                        }
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if(item.class == "Economy") { 
                            if(isPremiumSelected || isBusinessSelected || isFirstSelected) { 
                              this.onClassTypeSelected(item, index);
                            }
                          }
                          else if(item.class == "Premium Economy") { 
                            if(!bronzeMember){
                              if(isEconomySelected || isBusinessSelected || isFirstSelected) { 
                                this.onClassTypeSelected(item, index);
                              }
                            }else{
                              this.setState({ showCreateAlertModal: false })
                              this.showAlert1()
                            }
                          }
                          else if(item.class == "Business"){
                            if(!bronzeMember){
                              if(isEconomySelected || isPremiumSelected || isFirstSelected) { 
                                this.onClassTypeSelected(item, index);
                              }
                            }
                            else{
                              this.setState({ showCreateAlertModal: false })
                              this.showAlert1()
                            }
                          }
                          else if(item.class == "First"){
                            if(!bronzeMember){
                              if(isEconomySelected || isPremiumSelected || isBusinessSelected) { 
                                this.onClassTypeSelected(item, index);
                              }
                            }else{
                              
                              this.showAlert1()
                            }
                          }
                        }}
                      >
                      <View style={{alignSelf:"flex-end",justifyContent:"flex-end",marginTop:scale(6),marginStart:scale(80)}}>
                        <MaterialIcon
                          name={
                            item.isSelected ? "checkbox-marked-circle" : "radiobox-blank"
                          }
                          size={verticalScale(22)}
                          color={
                            item.class == "Economy" ?
                            item.isSelected ? "#2044ff" : colours.lightGreyish :
                            item.class == "Premium Economy" ?
                            item.isSelected ? "#f8a41e" : colours.lightGreyish :
                            item.class == "Business" ? 
                            item.isSelected ? "#af49de" : colours.lightGreyish :
                            item.class == "First" ? 
                            item.isSelected ? "#eb186f" : colours.lightGreyish :
                             null
                          }
                        />
                        </View>
                      </TouchableOpacity>
                      <View style={{flexDirection:"column",margin:scale(4)}}>
                      <ImageBackground
                        source={
                          item.class  == "Economy" ?
                          IMAGE_CONST.ECONOMYC : item.class == "Premium Economy" ?
                          IMAGE_CONST.PREMIUMC : item.class == "Business" ?
                          IMAGE_CONST.BUSINESSC : item.class == "First" ? 
                          IMAGE_CONST.FIRSTC : null
                        }
                        resizeMode="contain"
                        style={{height:scale(40),width:scale(40),alignSelf:"center",justifyContent:"center",alignItems:"center"}}
                      >
                      </ImageBackground>
                      <Text
                        style={[styles.membershipSubListTextStyle, { marginLeft: scale(12),marginTop:scale(4),marginBottom:scale(9) }]}
                      >
                        {item.class == "First" ? "First Class " :  item.class == "Premium Economy" ? "Prem Econ" : item.class }
                        {/* {item.class == "First" ? "First Class " : item.class} */}
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </Fragment>
                  : null
                 }
                  </Fragment>
                )                       
            })
          }
          </View>
        }
      </View>
    );
  }

  renderBottomButton(buttonText, onButtonPress) {
    return (
      <TouchableOpacity
        style={[
          styles.submitAlertView,
          { position: "absolute", bottom: scale(20),
        backgroundColor:"#132C52",width:scale(180) },
        ]}
        onPress={() => {
          onButtonPress();
        }}
        activeOpacity={.6}
      >
        <Image source={IMAGE_CONST.BELL_IMAGE} style={styles.bellIconStyle} />
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }

  renderSubmitAlertButton(buttonText, onButtonPress) {
    return (
      <TouchableOpacity
        style={[styles.submitAlertView]}
        activeOpacity={.6}
        onPress={() => {
          onButtonPress();
        }}
      >
        <Image source={IMAGE_CONST.BELL_IMAGE} style={styles.bellIconStyle} />
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
  renderSubmitAlertButton1(buttonText, onButtonPress) {
    return (
      <TouchableOpacity
        style={[styles.submitAlertView1]}
        activeOpacity={.6}
        onPress={() => {
          onButtonPress();
        }}
      >
        <Image source={IMAGE_CONST.BELL_IMAGE} style={styles.bellIconStyle} />
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }

  renderHeader() {
    return (
      <TouchableOpacity
        style={
          styles.headerContainer
        }
        >
        <TouchableOpacity
          onPress={() => { 
            // this.props.navigation.goBack() 
            RootNavigation.navigationRef.navigate("FindFlightContainerScreen")
          }}
        >
           {IMAGE_CONST.IOS_BACK_ARROW}
        </TouchableOpacity>
        <View style={{}}>
          <View style={styles.locationView}>
            {
              this.state.searchData ?
                <View style={{margin:scale(10)}}>
                  <Text style={styles.locationText}>
                    {this.state.searchData.selectedSource.city_name} to{" "}
                    {this.state.searchData.selectedDestination.city_name}
                  </Text>
                  {this.ticketDetailView()}
                </View>
                : null
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  ticketDetailView() {
    let airline_code = getAirlinesCode(this.state.searchData.airline)
    let membership = this.state.searchData.tier

    let count  = this.state.searchData.passengerCount 
    return (
      <View style={styles.ticketDetailView}>
        <Text style={styles.ticketDetailText}>
          {airline_code} |{" "}
          {/* {membership.charAt(0).toUpperCase() + membership.slice(1)} ·{" "} */}
          {this.state.searchData.isReturn
            ? STRING_CONST.RETURN
            : STRING_CONST.ONE_WAY}{" "}
          · {count > 1  ?  "Passengers" : "Passenger"} 
            {" "}{count}
        </Text>
      </View>
    );
  }

  getIcon(icon, color) {
    return <MaterialIcon name={icon} size={scale(16)} color={color} />;
  }
  showAlert1() {  
    Alert.alert(  
        '',  
        'Upgrade to Silver or Gold membership to see availability for all cabin classes',  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'Cancel',  
            },  
            {text: 'Upgrade', onPress: () =>  RootNavigation.navigationRef.navigate("MembershipContainerScreen") },  
        ]  
    );  
}  

  ticketClass = () => {

    const {airLinesDetailsObject} = this.state
    let classSelected = this.state.classSelected
    let availability = airLinesDetailsObject.availability;

    let economy = classSelected[0]
    let premium = classSelected[1]
    let business = classSelected[2]
    let first = classSelected[3]

   let classSelectedArray = []

    if (economy) {
      classSelectedArray.push(economy)
    }
    if (premium) {
      classSelectedArray.push(premium)
    }
    if (business) {
      classSelectedArray.push(business)
    }
    if (first) {
      classSelectedArray.push(first)
    }
    let bronzeMember
    let userData = this.props.userInfo
    if(userData && userData !== undefined && userData !== null){
      bronzeMember = userData.bronze_member
    }

    return (
      <View style={[styles.ticketClassView, {
        justifyContent: classSelected.length > 2 ? "center" : "center",
      }]}>
        {availability.economy && (
          <TouchableOpacity
            style={[
              styles.classButton]}
            onPress={() => {
              if(!bronzeMember){
                if (premium || business || first) {
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("economy")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("economy"))
                    ) {
                      let newClassArray = this.state.classSelected;
                      let arr = this.state.classSelected
                      newClassArray[0] = !newClassArray[0];
                      this.setState({
                        classSelected:newClassArray
                      });
                    } else {
                      Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                    }
                  }
              }
              else{
                this.showAlert1()
              }
            }}
          >
            {!this.state.classSelected[0]
              ? this.getIcon(
                STRING_CONST.CHECK_EMPTY_CIRCLE,
                colours.lightGreyish
              )
              : this.getIcon(
                STRING_CONST.CHECK_CIRCLE,
                this.state.selectedIndex == 0
                  ? this.state.outBoundVisibleArray.includes("economy")
                    ? colours.blue
                    :"#EFEFEF"
                  : this.state.inBoundVisibleArray.includes("economy")
                    ? colours.blue
                    :"#EFEFEF"
              )}
            {/* <Text style={styles.classTextStyle}>{STRING_CONST.ECONOMY}</Text> */}
            {
                this.state.selectedIndex == 0 ?
                <Text style={[styles.classTextStyle,{
                  opacity: this.state.outBoundVisibleArray.includes("economy") ? 1 : 0.3
                }]}>{STRING_CONST.ECONOMY}</Text>
                :
                <Text style={[styles.classTextStyle,{
                  opacity: this.state.inBoundVisibleArray.includes("economy") ? 1 : 0.3
                }]}>{STRING_CONST.ECONOMY}</Text>
              }
          </TouchableOpacity>
        )}
        {availability.premium && (
          <TouchableOpacity
            style={[styles.classButton]}
            onPress={() => {
              if(!bronzeMember){
                if (economy || business || first) {
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("premium")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("premium"))
                    ) {
                      let newClassArray = this.state.classSelected;
                      newClassArray[1] = !newClassArray[1];
                      this.setState({
                        classSelected: newClassArray
                      });
                    } else {
                      Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                    }
                  }
              }
              else{
                this.showAlert1()
              }
            }}
          >
            {!this.state.classSelected[1]
              ? this.getIcon(
                STRING_CONST.CHECK_EMPTY_CIRCLE,
                colours.lightGreyish
              )
              : this.getIcon(
                STRING_CONST.CHECK_CIRCLE,
                this.state.selectedIndex == 0
                  ? this.state.outBoundVisibleArray.includes("premium")
                    ? colours.yellow
                    :"#EFEFEF"
                  : this.state.inBoundVisibleArray.includes("premium")
                    ? colours.yellow
                    :"#EFEFEF"
              )}
            {
                this.state.selectedIndex == 0 ?

                <Text style={[styles.classTextStyle,{
                  opacity: this.state.outBoundVisibleArray.includes("premium") ? 1 : 0.3
                }]}>  {"Prem Econ"}</Text>
                :

                <Text style={[styles.classTextStyle,{
                  opacity: this.state.inBoundVisibleArray.includes("premium") ? 1 : 0.3
               
                }]}>  {"Prem Econ"}</Text>
              }

            {/* <Text style={styles.classTextStyle}>
              {"Prem Econ"}
            </Text> */}
          </TouchableOpacity>
        )}
        {availability.business && (
          <TouchableOpacity
            style={[styles.classButton]}
            onPress={() => {
              if(!bronzeMember){
                if (economy || premium || first) {
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("business")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("business"))
                    ) {
                      let newClassArray = this.state.classSelected;
                      newClassArray[2] = !newClassArray[2];
                      this.setState({
                          classSelected:newClassArray,
                        });
                    } else {
                      Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                    }
                }
              }
              else{
                this.showAlert1()
              }        
            }}
          >
            {!this.state.classSelected[2]
              ? this.getIcon(
                STRING_CONST.CHECK_EMPTY_CIRCLE,
                colours.lightGreyish
              )
              : this.getIcon(
                STRING_CONST.CHECK_CIRCLE,
                this.state.selectedIndex == 0
                  ? this.state.outBoundVisibleArray.includes("business")
                    ? colours.purple
                    :"#EFEFEF"
                  : this.state.inBoundVisibleArray.includes("business")
                    ? colours.purple
                    :"#EFEFEF"
              )}
            {/* <Text style={styles.classTextStyle}>{STRING_CONST.BUSINESS}</Text> */}
            {
                this.state.selectedIndex == 0 ?
                <Text style={[styles.classTextStyle,{
                  opacity: this.state.outBoundVisibleArray.includes("business") ? 1 : 0.3
                }]}>{STRING_CONST.BUSINESS}</Text>
                :
                <Text style={[styles.classTextStyle,{
                  opacity: this.state.inBoundVisibleArray.includes("business") ? 1 : 0.3
                }]}>{STRING_CONST.BUSINESS}</Text>
              }
          </TouchableOpacity>
        )}
        {availability.first && (
          <TouchableOpacity
            style={[
              styles.classButton,
            ]}
            onPress={() => {
              if(!bronzeMember){
                if (economy || premium || business) {
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("first")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("first"))
                    ){
                      let newClassArray = this.state.classSelected;
                      newClassArray[3] = !newClassArray[3];
                      this.setState({
                        classSelected:newClassArray,
                      });
                    } else {
                      Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                    }
                }
              }
              else{
                this.showAlert1()
              }
            }}
          >
            {!this.state.classSelected[3]
              ? this.getIcon(
                STRING_CONST.CHECK_EMPTY_CIRCLE,
                colours.lightGreyish
              )
              : this.getIcon(
                STRING_CONST.CHECK_CIRCLE,
                this.state.selectedIndex == 0
                  ? this.state.outBoundVisibleArray.includes("first")
                    ? colours.pink
                    :"#EFEFEF"
                  : this.state.inBoundVisibleArray.includes("first")
                    ? colours.pink
                    :"#EFEFEF"
              )}
              {
                this.state.selectedIndex == 0 ?

                <Text style={[styles.classTextStyle,{
                  opacity: this.state.outBoundVisibleArray.includes("first") ? 1 : 0.3
                }]}>{STRING_CONST.FIRST}</Text>
                :

                <Text style={[styles.classTextStyle,{
                  opacity: this.state.inBoundVisibleArray.includes("first") ? 1 : 0.3
               
                }]}>{STRING_CONST.FIRST}</Text>
              }
         
          </TouchableOpacity>
        )}
      </View>
    );
  }
  singleTabView() {
    return (
      <TouchableOpacity style={styles.singleTabView}>
        <Image
          style={styles.takeOffIcon}
          resizeMode="contain"
          source={
            this.state.selectedIndex == 0
              ? IMG_CONST.CALENDAR_ACTIVE_TAKEOFF
              : IMG_CONST.TAKE_OFF_DISABLED
          }
        />
        <Text
          style={{
            color: colours.lightBlueTheme,
            fontSize: scale(14),
          }}
        >
          {STRING_CONST.OUT_BOUND_SEATS}
        </Text>
      </TouchableOpacity>
    );
  }
  tabView() {
    return (
      <View style={{ flexDirection: "row",backgroundColor:"#FFF", paddingHorizontal: scale(30) }}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              selectedIndex: 0,
            });
          }}
          style={[
            styles.tripTypeView,
            {
              borderBottomColor:
                this.state.selectedIndex == 0
                  ? colours.lightBlueTheme
                  : colours.transparentColor,
            },
          ]}
        >
          <Image
            style={styles.takeOffIcon}
            resizeMode="contain"
            source={
              this.state.selectedIndex == 0
                ? IMG_CONST.CALENDAR_ACTIVE_TAKEOFF
                : IMG_CONST.TAKE_OFF_DISABLED
            }
          />
          <Text
            style={{
              color:
                this.state.selectedIndex == 0
                  ? colours.lightBlueTheme
                  : colours.lightGreyish,
              fontSize: scale(14),
            }}
          >
            {STRING_CONST.OUT_BOUND_SEATS}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              selectedIndex: 1,
            });
          }}
          style={[
            styles.tripTypeView,
            {
              borderBottomColor:
                this.state.selectedIndex == 1
                  ? colours.lightBlueTheme
                  : colours.transparentColor,
              paddingVertical: verticalScale(5),
            },
          ]}
        >
          <Image
            style={styles.takeOffIcon}
            resizeMode="contain"
            source={
              this.state.selectedIndex == 1
                ? IMG_CONST.RETURN_ACTIVE
                : IMG_CONST.RETURN_INACTIVE
            }
          />
          <Text
            style={{
              color:
                this.state.selectedIndex == 1
                  ? colours.lightBlueTheme
                  : colours.lightGreyish,
              fontSize: scale(14),
            }}
          >
            {STRING_CONST.RETURN_SEATS}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  fareView() {
    const { isPeakValue, isOffPeakValue } = this.state;
    return (
      <View style={styles.fareViewContainer}>
        {isOffPeakValue ? (
          <TouchableOpacity
            style={[
              styles.fareViewButton,
              {
                backgroundColor: isOffPeakValue
                  ? colours.dimSkyBlueColor
                  : colours.white,
                borderColor: colours.highlightBorderColor,
              },
            ]}
            onPress={() => {
              this.setState({
                isOffPeakValue: !this.state.isOffPeakValue,
              });
            }}
          >
            <MaterialIcon
              name={"check-circle"}
              size={scale(16)}
              color={colours.darkBlueTheme}
              style={{ marginRight: scale(3) }}
            />
            <Text style={[styles.peakText, { color: colours.darkBlueTheme }]}>
              {STRING_CONST.HIGHLIGHT_OFF_PEAK}
            </Text>
            <Image
              style={styles.peakImageStyle}
              source={IMG_CONST.OFF_PEAK_FARE}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.fareViewButton,
              {
                backgroundColor: isPeakValue
                  ? colours.dimGreyColor
                  : colours.white,
                marginLeft: scale(3),
              },
            ]}
            onPress={() => {
              this.setState({
                isOffPeakValue: !this.state.isOffPeakValue,
              });
            }}
          >
            <Ionicons
              name="ios-radio-button-off"
              size={scale(16)}
              color={colours.greyHighlightColor}
              style={styles.peakImageStyle}
            />
            <Text style={styles.peakText}>
              {STRING_CONST.HIGHLIGHT_OFF_PEAK}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }





  onDayPressed(day, isOffPeakValue1) {

    const { isOffPeakValue, isPeakValue, airLinesDetailsObject, searchData } = this.state;


    let txt = "No flight scheduled"
    let flightSchedule = this.props.flightSchedule;
    let actualDay = day.dateString;
    if (flightSchedule) {
      let data;
      if (this.state.selectedIndex == 0) {
        let scheduleDate = flightSchedule.outbound_availability
        let availableDate = airLinesDetailsObject.outbound_availability;
        let scheduleDateKey = scheduleDate[actualDay]
        let availableDateKey = availableDate[actualDay]

        availableDateKey ? this.setState({
          offPeakKey: availableDateKey.peak
        }) : this.setState({ offPeakKey: "" })


         if ((!scheduleDateKey) && (!availableDateKey) ) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay, clickDate:actualDay, showTicketDetailModal: false, })
          availableDateKey ? this.setState({
            offPeakKey: availableDateKey.peak
          }) : this.setState({ offPeakKey: true })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Available" })
        }

        else if ( (!scheduleDateKey)  && availableDateKey) {
          this.seatAvailabilityModal(day, isOffPeakValue1, txt)
          data = this.state.airLinesDetailsObject.outbound_availability;
          if (data && data[day.dateString]) {
            dateString = getformattedDate(day.dateString);
            this.setState({
              seatsAvailabilityData: data[day.dateString],
              noflightschedule: true,
              showTicketDetailModal: true,
              dateString,
              selectedDate: day,
              flightDate: day.dateString,
            });
          }
           }
        else if ((!availableDateKey)  && (scheduleDateKey)) {
          this.Show_Custom_Alert2()
          data = this.state.airLinesDetailsObject.outbound_availability;
         let seatsAvailabilityData = data[day.dateString]
          let noflightschedule = true
          let showTicketDetailModal =  true

          availableDateKey ? this.setState({
            offPeakKey: availableDateKey.peak
          }) : this.setState({ offPeakKey: true })
          // dateString,       
          let selectedDate = day
          let flightDate = day.dateString
          this.setState({isNoflightScheudlePopup:true})
          this.renderNoFlight(data,seatsAvailabilityData,noflightschedule,showTicketDetailModal,selectedDate,flightDate,isOffPeakValue1,day)
          this.setState({ noFlightScheduleDate: actualDay,selectedDate:selectedDate, showTicketDetailModal: false,
            clickDate:actualDay
          })
          this.setState({ noFlightScheduleAlertTxt: "No seat available in any cabin class" })

        }
        else if (scheduleDateKey && availableDateKey) {
          data = this.state.airLinesDetailsObject.outbound_availability;
          if (data && data[day.dateString]) {
            dateString = getformattedDate(day.dateString);
            this.setState({
              seatsAvailabilityData: data[day.dateString],
              showTicketDetailModal: true,
              dateString,
              selectedDate: day,
              flightDate: day.dateString,
            });
          }
        }
      }

      else {
        let scheduleDate = flightSchedule.inbound_availability
        let availableDate = airLinesDetailsObject.inbound_availability;
        let scheduleDateKey = scheduleDate[actualDay]
        let availableDateKey = availableDate[actualDay]
        availableDateKey ? this.setState({
          offPeakKey: availableDateKey.peak
        }) : this.setState({ offPeakKey: true })
     
         if (!scheduleDateKey && !availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay, clickDate:actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Available", showTicketDetailModal: false,})

        }
        else if (!scheduleDateKey && availableDateKey) {
          this.seatAvailabilityModal(day, isOffPeakValue1)
          data = this.state.airLinesDetailsObject.inbound_availability;
          if (data && data[day.dateString]) {
            dateString = getformattedDate(day.dateString);
            this.setState({
              seatsAvailabilityData: data[day.dateString],
              noflightschedule: true,
              showTicketDetailModal: true,
              dateString,
              selectedDate: day,
              flightDate: day.dateString,
            });
          }
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay, clickDate:actualDay })
          availableDateKey ? this.setState({
            offPeakKey: availableDateKey.peak
          }) : this.setState({ offPeakKey: true })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Schedule", showTicketDetailModal: false, })
        }
        else if (!availableDateKey && scheduleDateKey) {
          this.Show_Custom_Alert2()
          // Alert.alert("Alert", "No Seats Available!")
          data = this.state.airLinesDetailsObject.outbound_availability;
          let seatsAvailabilityData = data[day.dateString]
           let noflightschedule = true
           let showTicketDetailModal =  true
           let selectedDate = day
           let flightDate = day.dateString
           this.setState({isNoflightScheudlePopup:true})
           availableDateKey ? this.setState({
            offPeakKey: availableDateKey.peak
          }) : this.setState({ offPeakKey: true })
           this.renderNoFlight(data,
            seatsAvailabilityData,
            noflightschedule,
            showTicketDetailModal,
            selectedDate,
            flightDate,
            isOffPeakValue1,
            day)
           this.setState({ noFlightScheduleDate: actualDay, clickDate:actualDay,selectedDate:selectedDate, showTicketDetailModal: false, })
           this.setState({ noFlightScheduleAlertTxt: "No Seats Available in any Cabin Classes" })
         
        }
        else if (availableDateKey && scheduleDateKey) {
          data = this.state.airLinesDetailsObject.inbound_availability;
          if (data && data[day.dateString]) {
            dateString = getformattedDate(day.dateString);
            this.setState({
              seatsAvailabilityData: data[day.dateString],
              showTicketDetailModal: true,
              dateString,
              selectedDate: day,
              flightDate: day.dateString,
            });
          }
        }
      }
    }
    let eventData = moment(day).format("DD-MM-YYYY")

    if (this.props.isLoggedIn == true) {
      let loggedInUserPostHog = {}
      loggedInUserPostHog["user"] = {
        access_token: this.state.accesstoken
      }
      loggedInUserPostHog["event_name"] = "Specific Date Click on Calendar Page"
      loggedInUserPostHog["data"] = {
        "calendar_date_clicked": eventData,
        "membership_tier": searchData.tier.value,
        "sourceCode": searchData.sourceCode,
        "destinationCode": searchData.destinationCode,
        "airlineCode": "BA",
        "metaData": {
          "deviecBrand": this.state.deviecBrand,
          "deviceName": this.state.deviceName,
          "isEmulator": this.state.isEmulator,
          "isTablet": this.state.isTablet,
          "plateform": "Mobile",
        }
      }

      // this.postHogAnalytics(loggedInUserPostHog)
    }
    else {
      let uuid_Key = uuid.v4()
      let guestUserPostHog = {}
      guestUserPostHog["sessionId"] = `${uuid_Key}`
      guestUserPostHog["event_name"] = "Specific Date Click on Calendar Page"
      guestUserPostHog["data"] = {
        "calendar_date_clicked": eventData,
        "membership_tier": searchData.tier.value,
        "sourceCode": searchData.sourceCode,
        "destinationCode": searchData.destinationCode,
        "airlineCode": "BA",
        "metaData": {
          "deviecBrand": this.state.deviecBrand,
          "deviceName": this.state.deviceName,
          "isEmulator": this.state.isEmulator,
          "isTablet": this.state.isTablet,
          "plateform": "Mobile",
        }
      }
      // this.postHogAnalytics(guestUserPostHog)              
    }
    let date = moment(day.dateString).format("DD-MM-YYYY")
    let airline = searchData.airline
    let destination = searchData.destinationCode
    let sourceCode = searchData.sourceCode
    let flightScheduleData = { "airline": `${airline}`, "destination": `${destination}`, "source": `${sourceCode}`, "date": `${date}` }
    this.props.getMultipleScheduleData(flightScheduleData)

  }


  checkOnloaderFalse = () => {
    const { airLinesDetailsObject } = this.state
    
    let availableOutBoundDate = airLinesDetailsObject.outbound_availability;
    if (availableOutBoundDate) {
      this.setState({ isLoader: false })
    }
  }




  // getLocations(isLoader) {

  //   const { isOffPeakValue, isPeakValue, airLinesDetailsObject, staticDateArray, peakOffpeakData
  //     , sliderEconomyMax, sliderEconomyMin,
  //     sliderPremiumMax, sliderPremiumMin,
  //     sliderBusinessMax, sliderBusinessMin,
  //     sliderFirstMax, sliderFirstMin,
  //     sliderPoints, isSliderRun,
  //     classSelected
  //   } = this.state;

  //   let flightSchedule = this.props.flightSchedule;
  //   let outboundData = {};
  //   let inboundData = {};
  //   let scheduleOutBoundDate = {}
  //   let availableOutBoundDate = {}
  //   let scheduleInboundData = {}
  //   let availableInBoundDate = {}
  //   if (flightSchedule) {
  //     scheduleOutBoundDate = flightSchedule.outbound_availability
  //     availableOutBoundDate = airLinesDetailsObject.outbound_availability;
  //     scheduleInboundData = flightSchedule.inbound_availability
  //     availableInBoundDate = airLinesDetailsObject.inbound_availability;
  //     if (scheduleOutBoundDate && availableOutBoundDate) {
  //       for (let i of Object.keys(scheduleOutBoundDate)) {
  //         if (availableOutBoundDate[i]) {
  //           outboundData[i] = availableOutBoundDate[i]
  //         }
  //       }
  //     }

  //     if (scheduleInboundData && availableInBoundDate) {
  //       for (let i of Object.keys(scheduleInboundData)) {
  //         if (availableInBoundDate[i]) {
  //           inboundData[i] = availableInBoundDate[i];
  //         }
  //       }
  //     }
  //     // if (outboundData && outboundData !== null && outboundData !== undefined && isLoader) {
  //     //   this.setState({ isLoader: false })
  //     // }
  //   }

  //   let userData = this.props.userInfo
  //   var originalOutBoundObj = {}
  //   var orignalInboundObj = {}
  //   var originalGuestOutBoundObj = {}
  //   var orignalGuestInboundObj = {}
  //   let Obj = {}
  //   if (peakOffpeakData) {
  //     let dateArray = this.state.staticDateArray.filter(val => !peakOffpeakData.includes(val));

  //     for (let data of dateArray) {
  //       Obj[data] = { "peak": false }
  //     }

  //     if (this.props.isLoggedIn) {
  //       originalOutBoundObj = {
  //         ...Obj,
  //         ...availableOutBoundDate
  //       }
  //       orignalInboundObj = {
  //         ...Obj,
  //         ...availableInBoundDate
  //       }
  //     }
  //   }

  //   if (!this.props.isLoggedIn || this.props.isLoggedIn == undefined || this.props.isLoggedIn == null || this.props.isLoggedIn == "" || this.props.isLoggedIn == false) {
  //     if (this.state.selectedIndex == 0) {
  //       let mainObj = this.state.airLinesDetailsObject.outbound_availability
  //       let data = { ...mainObj }
  //       Object.keys(data).forEach((key) => {
  //         Object.keys(data[key]).forEach((innerKey) => {
  //           const firstDay = moment().startOf('month')
  //           const nextThreeMonth = moment(firstDay).add(3, 'months').format("YYYY-MM-DD")
  //           const isMonthExceed = moment(key).isSameOrAfter(nextThreeMonth)
  //           if (isMonthExceed && data[key][innerKey] && data[key][innerKey].seats) {
  //             return data[key] = { peak: true, economy: { seats: 2, points: 1100 }, first: { seats: 2, points: 1100 }, isDummyData: true }
  //           }
  //         })
  //       })
  //       originalGuestOutBoundObj = {
  //         ...Obj,
  //         ...data
  //       }
  //     }
  //     else {
  //       let mainObj = this.state.airLinesDetailsObject.inbound_availability
  //       let data = { ...mainObj }
  //       Object.keys(data).forEach((key) => {
  //         Object.keys(data[key]).forEach((innerKey) => {
  //           const firstDay = moment().startOf('month')
  //           const nextThreeMonth = moment(firstDay).add(3, 'months').format("YYYY-MM-DD")
  //           const isMonthExceed = moment(key).isSameOrAfter(nextThreeMonth)
  //           if (isMonthExceed && data[key][innerKey] && data[key][innerKey].seats) {
  //             return data[key] = { peak: true, economy: { seats: 2, points: 1100 }, first: { seats: 2, points: 1100 }, isDummyData: true }
  //           }
  //         })
  //       })
  //       orignalGuestInboundObj = {
  //         ...Obj,
  //         ...data
  //       }
  //     }
  //   }


  // //   if (sliderPoints && isSliderRun) {
  // //     if(sliderEconomyMin == 0){
  // //       sliderEconomy = false
  // //    }
  // //    else if(sliderEconomyMin == sliderPoints || sliderEconomyMin < sliderPoints){
  // //       sliderEconomy = true
  // //    }
   
  // //   if(sliderPremiumMin == 0){
  // //       sliderPremium = false
  // //    }
  // //    else if(sliderPremiumMin == sliderPoints || sliderPremiumMin < sliderPoints){
  // //       sliderPremium = true
  // //    }
   
  // //  if(sliderBusinessMin == 0){
  // //       sliderBusiness = false
  // //    }
  // //    else if(sliderBusinessMin == sliderPoints || sliderBusinessMin < sliderPoints){
  // //       sliderBusiness = true
  // //    }
   
  // //  if(sliderFirstMin == 0){
  // //       sliderFirst = false
  // //    }
  // //    else if(sliderFirstMin == sliderPoints || sliderFirstMin < sliderPoints){
  // //       sliderFirst = true
  // //    }
  // //   }

  //   let availability = airLinesDetailsObject.availability;
  //   var economyClass = false
  //   var premiumClass = false
  //   var businessClass = false
  //   var firstClass = false


  //       if(availability && Object.keys(availability).length !==0 ) {
  //         economyClass = availability.economy
  //         premiumClass = availability.premium
  //         businessClass = availability.business
  //         firstClass = availability.first   
  //       }

        

  // // if(availability && Object.keys(availability).length !==0 ) {
  // //   economyClass = availability.economy
  // //   premiumClass = availability.premium
  // //   businessClass = availability.business
  // //   firstClass = availability.first   
  // //  }
 

  //     let availability_data = {'economy': economyClass, 'premium': premiumClass, 'business': businessClass, 'first': firstClass }
  //       // code for outbound obj - -  - - - 
  //       // for(let i of Object.keys(originalOutBoundObj)){ 
  //       //   if(originalOutBoundObj[i]["economy"]){
  //       //     originalOutBoundObj[i]["aeconomy"] = originalOutBoundObj[i]["economy"]
  //       //     delete originalOutBoundObj[i]['economy']
  //       //   }
  //       //     if(originalOutBoundObj[i]["premium"]){
  //       //     originalOutBoundObj[i]["bpremium"] = originalOutBoundObj[i]["premium"]
  //       //     delete originalOutBoundObj[i]['premium']
  //       //   }
  //       //   if(originalOutBoundObj[i]["business"]){
  //       //     originalOutBoundObj[i]["cbusiness"] = originalOutBoundObj[i]["business"]
  //       //     delete originalOutBoundObj[i]['business']
  //       //   }

  //       //   if(originalOutBoundObj[i]["first"]){
  //       //     originalOutBoundObj[i]["dfirst"] = originalOutBoundObj[i]["first"]
  //       //     delete originalOutBoundObj[i]['first']
  //       //   }              
  //       // }
       
  //       // code for inbound ---------- - - - 
  //       // for(let i of Object.keys(orignalInboundObj)){ 
  //       //   if(orignalInboundObj[i]["economy"]){
  //       //     orignalInboundObj[i]["aeconomy"] = orignalInboundObj[i]["economy"]
  //       //     delete orignalInboundObj[i]['economy']
  //       //   }
  //       //     if(orignalInboundObj[i]["premium"]){
  //       //     orignalInboundObj[i]["bpremium"] = orignalInboundObj[i]["premium"]
  //       //     delete orignalInboundObj[i]['premium']
  //       //   }
  //       //   if(orignalInboundObj[i]["business"]){
  //       //     orignalInboundObj[i]["cbusiness"] = orignalInboundObj[i]["business"]
  //       //     delete orignalInboundObj[i]['business']
  //       //   }
  //       //   if(orignalInboundObj[i]["first"]){
  //       //     orignalInboundObj[i]["dfirst"] = orignalInboundObj[i]["first"]
  //       //     delete orignalInboundObj[i]['first']
  //       //   }
  //       // }

  //   let finalData = {}
  //   if (!this.props.isLoggedIn || this.props.isLoggedIn == undefined || this.props.isLoggedIn == null || this.props.isLoggedIn == "" || this.props.isLoggedIn == false) {
  //     finalData = {
  //       outbound_availability: peakOffpeakData ? originalGuestOutBoundObj : availableOutBoundDate,
  //       inbound_availability: peakOffpeakData ? orignalGuestInboundObj : availableInBoundDate,
  //       availability: availability_data,
  //       source: airLinesDetailsObject.source,
  //       destination: airLinesDetailsObject.destination,
  //     }
  //   }
  //   else {
  //     finalData = {
  //       outbound_availability: peakOffpeakData ? originalOutBoundObj : availableOutBoundDate,
  //       inbound_availability: peakOffpeakData ? orignalInboundObj : availableInBoundDate,
  //       availability: availability_data,
  //       source: airLinesDetailsObject.source,
  //       destination: airLinesDetailsObject.destination,
  //     }
  //   }
  //   return finalData;
  // }


  getLocations = () => {
    const { airLinesDetailsObject, peakOffpeakData, searchData, staticDateArray } = this.state;
    let classSelected = searchData.classSelected
    let flightSchedule = this.props.flightSchedule;
    let outboundData = {};
    let inboundData = {};
    let scheduleOutBoundDate = {}
    let availableOutBoundDate = {}
    let scheduleInboundData = {}
    let availableInBoundDate = {}

    if (flightSchedule) {
      scheduleOutBoundDate = flightSchedule.outbound_availability
      availableOutBoundDate = airLinesDetailsObject.outbound_availability;
      scheduleInboundData = flightSchedule.inbound_availability
      availableInBoundDate = airLinesDetailsObject.inbound_availability;
      if (scheduleOutBoundDate && availableOutBoundDate) {
        for (let i of Object.keys(scheduleOutBoundDate)) {
          if (availableOutBoundDate[i]) {
            outboundData[i] = availableOutBoundDate[i]
          }
        }
      }

      if (scheduleInboundData && availableInBoundDate) {
        for (let i of Object.keys(scheduleInboundData)) {
          if (availableInBoundDate[i]) {
            inboundData[i] = availableInBoundDate[i];
          }
        }
      }
    }

    let userData = this.props.userInfo
    var originalOutBoundObj = {}
    var orignalInboundObj = {}
    var originalGuestOutBoundObj = {}
    var orignalGuestInboundObj = {}
    let Obj = {}
    if (peakOffpeakData) {
      let dateArray = this.state.staticDateArray.filter(val => !peakOffpeakData.includes(val));

      for (let data of dateArray) {
        Obj[data] = { "peak": false }
      }

      if (this.props.isLoggedIn) {
        originalOutBoundObj = {
          ...Obj,
          ...availableOutBoundDate
        }
        orignalInboundObj = {
          ...Obj,
          ...availableInBoundDate
        }
      }
    }

    if (!this.props.isLoggedIn || this.props.isLoggedIn == undefined || this.props.isLoggedIn == null || this.props.isLoggedIn == "" || this.props.isLoggedIn == false) {
      if (this.state.selectedIndex == 0) {
        let mainObj = this.state.airLinesDetailsObject.outbound_availability
        let data = { ...mainObj }
        Object.keys(data).forEach((key) => {
          Object.keys(data[key]).forEach((innerKey) => {
            const firstDay = moment().startOf('month')
            const nextThreeMonth = moment(firstDay).add(3, 'months').format("YYYY-MM-DD")
            const isMonthExceed = moment(key).isSameOrAfter(nextThreeMonth)
            if (isMonthExceed && data[key][innerKey] && data[key][innerKey].seats) {
              return data[key] = { peak: true, economy: { seats: 2, points: 1100 }, first: { seats: 2, points: 1100 }, isDummyData: true }
            }
          })
        })
        originalGuestOutBoundObj = {
          ...Obj,
          ...data
        }
      }
      else {
        let mainObj = this.state.airLinesDetailsObject.inbound_availability
        let data = { ...mainObj }
        Object.keys(data).forEach((key) => {
          Object.keys(data[key]).forEach((innerKey) => {
            const firstDay = moment().startOf('month')
            const nextThreeMonth = moment(firstDay).add(3, 'months').format("YYYY-MM-DD")
            const isMonthExceed = moment(key).isSameOrAfter(nextThreeMonth)
            if (isMonthExceed && data[key][innerKey] && data[key][innerKey].seats) {
              return data[key] = { peak: true, economy: { seats: 2, points: 1100 }, first: { seats: 2, points: 1100 }, isDummyData: true }
            }
          })
        })
        orignalGuestInboundObj = {
          ...Obj,
          ...data
        }
      }
    }

    let availability = airLinesDetailsObject.availability;
    var economyClass = false
    var premiumClass = false
    var businessClass = false
    var firstClass = false


    if(availability && Object.keys(availability).length !==0 ) {
      economyClass = availability.economy
      premiumClass = availability.premium
      businessClass = availability.business
      firstClass = availability.first   
    }


    let availability_data = { 'economy': availability.economy, 'premium': availability.premium, 'business': availability.business, 'first': availability }

    let finalData = {}
    if (!this.props.isLoggedIn || this.props.isLoggedIn == undefined || this.props.isLoggedIn == null || this.props.isLoggedIn == "" || this.props.isLoggedIn == false) {
      finalData = {
        outbound_availability: peakOffpeakData ? originalGuestOutBoundObj : availableOutBoundDate,
        inbound_availability: peakOffpeakData ? orignalGuestInboundObj : availableInBoundDate,
        availability: availability_data,
        source: airLinesDetailsObject.source,
        destination: airLinesDetailsObject.destination,
      }
    }
    else {
      finalData = {
        outbound_availability: peakOffpeakData ? originalOutBoundObj : availableOutBoundDate,
        inbound_availability: peakOffpeakData ? orignalInboundObj : availableInBoundDate,
        availability: availability_data,
        source: airLinesDetailsObject.source,
        destination: airLinesDetailsObject.destination,
      }
    }
    return finalData;
  }


  getDummyData = () => {
    let key = "outbound_availability"
    let mainObj = this.state.airLinesDetailsObject.inbound_availability

    const data = { ...mainObj }
    Object.keys(data).forEach((key) => {
      Object.keys(data[key]).forEach((innerKey) => {
        const firstDay = moment().startOf('month')
        const nextThreeMonth = moment(firstDay).add(3, 'months').format("YYYY-MM-DD")
        const isMonthExceed = moment(key).isSameOrAfter(nextThreeMonth)
        if (isMonthExceed && data[key][innerKey] && data[key][innerKey].seats) {
          return data[key] = { peak: true, economy: { seats: 2, points: 1100 }, first: { seats: 2, points: 1100 }, isDummyData: true }
        }
      })
    })
    return data
  }

  renderRow(option) {
    return (
      <View style={{ padding: scale(15) }}>
        <Text style={{ fontSize: scale(14), color: colours.darkBlueTheme }}>
          {option.title}
        </Text>
      </View>
    );
  }

  renderSubListItem(item, index, itemObject) {
    const { userSelectedAirlineMembershipIndex } = this.state;
    return (
      <TouchableHighlight
        onPress={() => {
          this.setState({
            userSelectedAirline: itemObject,
            userSelectedAirlineMembership: item,
            userSelectedAirlineMembershipIndex: index,
          });
        }}
        activeOpacity={1}
        underlayColor={colours.dimLightBlueBackgroundColor}
        style={{
          borderRadius: scale(5),
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(10),
          marginTop: verticalScale(5),
          backgroundColor:
            userSelectedAirlineMembershipIndex == index
              ? colours.dimLightBlueBackgroundColor
              : colours.white,
        }}
      >
        <Text style={styles.membershipSubListTextStyle}>{item.title}</Text>
      </TouchableHighlight>
    );
  }

  renderLoader() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.isLoader}
      >
        <View style={{
          flex: 1, justifyContent: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          alignItems: 'center',
          width: width + 4, height: height,
          marginStart: Platform.OS == "ios" ? -scale(20) : scale(-30),
          marginEnd: -scale(27),
          marginTop: -scale(20),
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

  renderListItem(itemObject, index) {
    return (
      <View>
        {itemObject.airline == STRING_CONST.BRITISH_AIRWAYS &&
          <View>
            <TouchableOpacity
              style={styles.airlineContainer}
              onPress={() => {
                this.setState({
                  userSelectedAirlineIndex:
                    this.state.userSelectedAirlineIndex == index ? -1 : index,
                  userSelectedAirlineMembershipIndex: -1,
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={getAirlinesLogo(STRING_CONST.BRITISH_AIRWAYS)}
                  style={{ marginRight: scale(10) }}
                />
                <Text style={styles.membershipListTextStyle}>
                  {itemObject.airline}
                </Text>
              </View>
              <View>{IMAGE_CONST.DARK_SORT_DOWN}</View>
            </TouchableOpacity>
            {this.state.userSelectedAirlineIndex == index && (
              <FlatList
                initialNumToRender={n}
                keyboardShouldPersistTaps="always"
                data={itemObject.memberships}
                renderItem={({ item, index }) => {
                  return this.renderSubListItem(item, index, itemObject);
                }}
              />
            )}
          </View>
        }
      </View>
    );
  }

  Show_Custom_Alert2(visible) {
    this.setState({ Alert_Visibility2: visible });
  }
  Hide_Custom_Alert2() {
    this.setState({ Alert_Visibility2: false });
  }


  renderLoginPopup = () => {
    const { showLoginCnfmPopup, haveCrossIcon } = this.state;
    // console.log("print  showLogin popup confirm value - - - - - ",showLoginCnfmPopup)

    return (
      <Modal
        transparent={true}
        visible={showLoginCnfmPopup}
        animationType={"none"}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View style={styles.mainView}>
          <View style={styles.innerView}>
            <View
              style={[
                styles.titleView,
                {
                  justifyContent: 'space-between'
                },
              ]}
            >
              <Text style={styles.titleTextStyle}>{"       "}</Text>
              <Text style={[styles.titleTextStyle, { textAlign:'center' }]}>{"Sign In / Sign Up"}</Text>
              <TouchableOpacity
                style={{ }}
                onPress={() => {
                  this.setState({ showLoginCnfmPopup: false, haveCrossIcon: false });
                }}
              >
                {this.state.haveCrossIcon && (
                  <Entypo name="cross" size={24} color={colours.lightGreyish} />
                )}
              </TouchableOpacity>
            </View>
            <Image
              source={IMAGE_CONST.LOGIN_ICON}
              style={{ marginTop: verticalScale(35), width: scale(106), height: scale(94) }}
            />
            <Text style={[styles.messageStyle, { fontWeight: "500", }]}>{"Please Sign In / Sign Up to use this feature"}</Text>
            {/* {this.state.isSingleButton
            ? this.singleButtonView()
            : this.doubleButtonView()} */}

            <View style={{flexDirection:"row",justifyContent:"space-between",width:scale(320)}}>
            <TouchableOpacity
              style={styles.singleButtonStyle}
              onPress={() => {
                this.setState({ showLoginCnfmPopup: false,})
                this.props.navigation.navigate("SignIn")
              }}
            >
              <Text style={styles.rightButtonTextStyle}>
                {"Sign In"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.singleButtonStyle}
              onPress={() => {
                this.setState({ showLoginCnfmPopup: false,})
                this.props.navigation.navigate("SignUp")
              }}
            >
              <Text style={styles.rightButtonTextStyle}>
                {"Sign Up"}
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }




  postHogAnalytics = (body) => {
    if (this.props.isLoggedIn) {
      this.props.loggedinUserPostHogFun(body)
    }
    else {
      this.props.guestUserPostHogFunc(body)
    }
  }



  // renderCalendarList(){
  //   const {
  //     showTicketDetailModal,
  //     showCreateAlertModal,
  //     showUpgradePopUp,
  //     showLoginPopup,
  //     peakOffpeakData,
  //     PeakOffPeakMonth,
  //     sliderPoints,
  //     isSliderRunDone,
  //     isRenderAll,
  //     newClassSliderArray,
  //     finalData
  //   } = this.state;
  //   const today = moment().format("YYYY-MM-DD");
  //   let noFlightScheduleDate = moment(this.state.noFlightScheduleDate).format("DD MMM YYYY");
  //   let isLoader = this.state.isLoader
  //   let userInfo  =  this.props.userInfo
  //   let currentPlan = userInfo.gold_member
  //   let isLoggedIn = this.props.isLoggedIn

  //     return(
  //       <View style={styles.calendarContainer} 
  //       onStartShouldSetResponder={() => true}
  //       >
  //         <CalendarList
  //           // ref={(ref) => {
  //           //   this._refCalendarList = ref;
  //           // }}
  //           calendarStyle={styles.calendarStyle}
  //           style={{
  //             backgroundColor: colours.offWhite,
  //           }}
  //           firstDay={1}
  //           showScrollIndicator={false}
  //           onVisibleMonthsChange={(months) => {
  //             console.log("yes print here month value -  - - -- - ",months)
  //             let firstDay = moment().startOf('month')
  //             let nextThreeMonth = moment(firstDay).add(2, 'months').format("YYYY-MM-DD")
  //             if (months[0].dateString >= nextThreeMonth && !this.props.isLoggedIn) {
  //               console.log("getting condition is satisfying or not  -  - --  - - - -",months)
  //               this.setState({ showLoginCnfmPopup: true }, () => {
  //                 this.renderLoginPopup()
  //               })
  //             }
  //           }
  //           }
  //           onDayPress={(day) => {
  //             let onPressDate = day
  //             let scheuldeDateKey = day
  //             let clickDate = day.dateString
  //             let isOffPeakValue1 = this.state.isOffPeakValue
  //             this.onDayPressed(day, isOffPeakValue1);
  //             this.setState({ onDayPressedDate: day.dateString, clickDate: clickDate ,scheuldeDateKey:scheuldeDateKey,onPressDate:onPressDate})
  //             this._toggleSubview();
  //             this.seatAvailabilityModal(day, isOffPeakValue1)
  //           }}
  //           pastScrollRange={0}
  //           minDate={today}
  //           futureScrollRange={ isLoggedIn ? 12 : 3}
  //           scrollEnabled={true}
  //           calendarWidth={scale(343)}
  //           horizontal={false}
  //           isOutBounded={this.state.selectedIndex == 0}
  //           classSelected={this.state.classSelected}
  //           selectedDate={this.state.selectedDate}
  //           passengerCount={this.state.searchData.passengerCount}
  //           isOffPeakValue={this.state.isOffPeakValue}
  //           theme={{
  //             isOutBounded: this.state.selectedIndex == 0,
  //             classSelected: this.state.classSelected,
  //             availabilityData:this.getLocations(),
  //             width: scale(20),
  //             selectedDayBackgroundColor: "gray",
  //             calendarBackground: colours.white,
  //             textSectionTitleColor: colours.lightGreyish,
  //             selectedDayTextColor: colours.white,
  //             todayTextColor: colours.lightBlueTheme,
  //             textDisabledColor: colours.lightGreyish,
  //             selectedDotColor: colours.white,
  //             monthTextColor: colours.lightBlueTheme,
  //             textDayFontWeight: "300",
  //             textMonthFontWeight: "`bold`",
  //             textDayHeaderFontWeight: "300",
  //             dayTextColor: '#2d4150',
  //             textDayFontSize: scale(11),
  //             textMonthFontSize: scale(11),
  //             textDayHeaderFontSize: scale(11),
  //             backgroundColor: '#ffffff',
  //             "stylesheet.calendar.header": {
  //               header: styles.header,
  //               monthText: styles.monthText,
  //             },
  //           }}
  //           listFooterComponent={() => {
  //             return <View style={{ height: verticalScale(70) }} />;
  //           }}
  //         />
  //       </View>
  //     )
  // }



  renderNoFlight(data,seatsAvailabilityData,noflightschedule,showTicketDetailModal,selectedDate,flightDate,isOffPeakValue1,day){
   

    let noFlightScheduleDate = moment(this.state.noFlightScheduleDate).format("DD MMM YYYY");
      const {onDayPressedDate,scheuldeDateKey,onPressDate} = this.state;
    let scheduleData = {}
    if (this.state.selectedIndex == 0) {
      scheduleData = this.props.flightSchedule.outbound_availability
    }
    else {
      scheduleData = this.props.flightSchedule.inbound_availability
    }

    let checkFlightCount = 0

    // let testPoints = this.props.airlinesDetailPoints.airlinesDetailPoints.points
    let checkData = Object.entries(scheduleData)
    let flightData = []
    checkData.map((singleData, index) => {
      if (singleData[0] == this.state.onDayPressedDate) {
        singleData.map((nestedMap) => {
          flightData = nestedMap
          checkFlightCount = nestedMap.count
        })
      }
    })


    data = this.state.airLinesDetailsObject.inbound_availability;
    let peakTxt = ""

    if(data && data[onDayPressedDate]) {
      peakTxt = data[onDayPressedDate].peak
    }
    return(
      <Modal
      visible={this.state.Alert_Visibility2}
      animationType={"none"}
      transparent={true}
      onRequestClose={() => {
        this.Show_Custom_Alert2(!this.state.Alert_Visibility2);
      }}>
        <View  style={[styles.animatedView2]}>
        <View style={{justifyContent:"center",alignItems:"center", height:scale(260), width: width*0.9 ,  borderTopLeftRadius: scale(20),borderTopRightRadius:scale(20),marginStart:scale(15) }}>
        <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    marginTop:scale(10)
                  }}
                    onPress={() => {this.Hide_Custom_Alert2()
                  }}
                >
                  <Entypo
                    name="cross"
                    size={scale(27)}
                    color="#97adb6"
                  />
                </TouchableOpacity>
        <Text style={styles.titleText}>{`${STRING_CONST.SEAT_AVAILABILITY
                  } (${!peakTxt
                    ? STRING_CONST.OFF_PEAK_FARE
                    : STRING_CONST.PEAK_FARE
                  })`}</Text>
        <Text style={{ fontSize: scale(14), color:"#41454b", padding: scale(7), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD, }}>{noFlightScheduleDate}</Text>
          <Image source={require('../../assets/calendar/sad.png')} style={{ height: scale(64), width: scale(64),margin:scale(6)  }} resizeMode="contain" />
          <Text style={{ fontSize: scale(14), fontWeight:"600",color:"#132C52", padding:scale(6), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD }}>{this.state.noFlightScheduleAlertTxt}</Text>
          
          {
            checkFlightCount ?
            <Fragment>
                {
                  checkFlightCount > 1 ?
                  <TouchableOpacity
                    onPress={()=>{
                        economySeats=0
                        premiumSeats=0
                        businessSeats=0
                        firstSeats=0
                      if(this.state.selectedIndex == 0) {
                        data = this.state.airLinesDetailsObject.outbound_availability;
                        let onDayPressedDate = onPressDate.dateString
                        let   dateString = getformattedDate(onDayPressedDate);
                          this.setState({
                            showTicketDetailModal: true,
                            noflightschedule: true,
                            dateString:dateString,
                            selectedDate: onPressDate,
                            flightDate: onDayPressedDate,
                          });
                        
                        this.Hide_Custom_Alert2()
                        this.seatAvailabilityModal(day, isOffPeakValue1)
                      }
                      else{
                      data = this.state.airLinesDetailsObject.inbound_availability;
                         let  dateString = getformattedDate(onDayPressedDate);
                          this.setState({
                            noflightschedule: true,
                            showTicketDetailModal: true,
                            showTicketDetailModal: true,
                            dateString:dateString,
                            flightDate: onDayPressedDate,
                          });
                        this.Hide_Custom_Alert2()
                        this.seatAvailabilityModal(day, isOffPeakValue1)
                      }
                    }}
                  >
                  <View style={{marginTop:scale(5),marginBottom:scale(25)}}>
                  <Text style={styles.aviosText1} >
                    {STRING_CONST.MULTIPLE_FLIGHT_SCHEDULE}
                  </Text>
                  <Text style={styles.aviosText2} >
                    {STRING_CONST.CLICK_ON_THE_DATES_TO_SEE_DETAILS}
                  </Text>
                </View>  
                </TouchableOpacity>
                :
                <TouchableOpacity
                onPress={()=>{
                this.Hide_Custom_Alert2()
              }}
                >
               <Text style={[styles.seatNumberText3,{
                  marginTop:scale(2),
                  marginBottom:scale(2),
                  alignSelf:'center'
                 }]}>
                 One flight scheduled
               </Text>
               <View style={{height:scale(70)}}>
               {this._renderFlightList()}
               </View>
               </TouchableOpacity>
                   }
            </Fragment>
            : 
            <Text style={{ fontSize: scale(14), color: colours.gray, padding: scale(6), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,marginBottom:scale(20) }}>{"There is no available flight for this date."}</Text>
          }
        </View>
      </View>
    </Modal>
    )
  }

  render() {
    const {
      showTicketDetailModal,
      showCreateAlertModal,
      showUpgradePopUp,
      showLoginPopup,
      searchData
    } = this.state;
    const today = moment().format("YYYY-MM-DD");
    let userInfo  =  this.props.userInfo
    let isLoggedIn = this.props.isLoggedIn
    let classData = searchData.classSelected
    let startDate = this.props.startDate

    // console.log("yes print here is Logged in inside render   - - - - - -",isLoggedIn)

     return (
        <SafeAreaView style={[styles.container]}  >
          <MyStatusBar />
           {this.renderHeader()}
          <View style={{ backgroundColor: "#FFF", flex: 1}}>
            {/* {this.renderLoader()} */}
            {this.renderLoginPopup()}
            <View style={{borderWidth:0}}>
             {this.state.airLinesDetailsObject ? this.ticketClass() : null}
                {this.fareView()}
                {this.state.searchData.isReturn
                  ? this.tabView()
                  : this.singleTabView()}      
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{  flex: 1,}}
              onMomentumScrollEnd={()=>{
                if(!isLoggedIn){
                  this.setState({ showLoginCnfmPopup: true }, () => {
                    this.renderLoginPopup()
                  })
                }
              }}
              ref={ref => this.scrollView = ref}
            >
              <View style={[styles.calendarContainer,{
                backgroundColor:"#E4E4E4"
              }]} 
                 onStartShouldSetResponder={() => true}
              >
          <CalendarList
            ref={(ref) => {
              this._refCalendarList = ref;
            }}
            calendarStyle={styles.calendarStyle}
            style={{
              backgroundColor:"#E4E4E4",marginBottom:scale(35)
            }}
            onMonthChange={(months)=>{
              // console.log("yes check on scrolling throught month  - - - - - ",months)
            }}
            onVisibleMonthsChange={(months)=>{
              // console.log("yes chc on visible month change - - - - - - - -",months)
            }}
            showScrollIndicator={false}
            onDayPress={(day) => {
              let onPressDate = day
              let scheuldeDateKey = day
              let clickDate = day.dateString
              let isOffPeakValue1 = this.state.isOffPeakValue
              this.onDayPressed(day, isOffPeakValue1);
              this.setState({ onDayPressedDate: day.dateString, clickDate: clickDate ,scheuldeDateKey:scheuldeDateKey,onPressDate:onPressDate})
              this._toggleSubview();
              this.seatAvailabilityModal(day, isOffPeakValue1)
            }}
            current={startDate ? startDate : today}
            key={startDate ? startDate : today}
            pastScrollRange={0}
            minDate={startDate ? startDate : today}
            futureScrollRange={ isLoggedIn ? 12 : 3}
            scrollEnabled={true}
            calendarWidth={scale(330)}
            horizontal={false}
            isOutBounded={this.state.selectedIndex == 0}
            classSelected={this.state.classSelected}
            selectedDate={this.state.selectedDate}
            passengerCount={this.state.searchData.passengerCount}
            isOffPeakValue={this.state.isOffPeakValue}
            theme={{
              isOutBounded: this.state.selectedIndex == 0,
              classSelected: this.state.classSelected,
              availabilityData:this.getLocations(),
              width: scale(20),
              selectedDayBackgroundColor: "gray",
              calendarBackground: colours.white,
              textSectionTitleColor: colours.lightGreyish,
              selectedDayTextColor: colours.white,
              todayTextColor: colours.lightBlueTheme,
              textDisabledColor: colours.lightGreyish,
              selectedDotColor: colours.white,
              monthTextColor: colours.lightBlueTheme,
              textDayFontWeight: "300",
              textMonthFontWeight: "`bold`",
              textDayHeaderFontWeight: "300",
              dayTextColor: '#2d4150',
              textDayFontSize: scale(11),
              textMonthFontSize: scale(11),
              textDayHeaderFontSize: scale(11),
              backgroundColor: '#E4E4E4',
              "stylesheet.calendar.header": {
                header: styles.header,
                monthText: styles.monthText,
                margin:scale(10),borderColor:"red",borderWidth:1
              },
            }}
            listFooterComponent={() => {
              return <View style={{ height: verticalScale(70) }} />;
            }}
          />
        </View>
           </ScrollView>
            {showTicketDetailModal && this.seatAvailabilityModal()}
            {showCreateAlertModal || showTicketDetailModal
              ? null
              : !this.state.showDetailsModal && this.renderBottomButton(STRING_CONST.CREATE_ALERT, () => {
                if (this.props.isLoggedIn) {
                  let loggedInUserPostHog = {}
                  loggedInUserPostHog["user"] = {
                    access_token: this.state.accesstoken
                  }
                  loggedInUserPostHog["event_name"] = "Has begun to create an alert"
                  loggedInUserPostHog["data"] = {
                    "metaData": {
                      "deviecBrand": this.state.deviecBrand,
                      "deviceName": this.state.deviceName,
                      "isEmulator": this.state.isEmulator,
                      "isTablet": this.state.isTablet,
                      "plateform": "Mobile",
                    }
                  }
                  this.setState({
                    showCreateAlertModal: true,
                  });
                } else {
                  this.setState({
                    showLoginPopup: true,
                  });
                }
              })}
            {showCreateAlertModal && this.createAlertModal()}
            {showUpgradePopUp && (
              <PopUpComponent
                isSingleButton={false}
                title={STRING_CONST.LIMIT_EXCEEDED}
                message={
                  isAndroid()
                    ? STRING_CONST.CREATE_ALERT_LIMIT
                    : STRING_CONST.CREATE_ALERT_LIMIT_IOS
                }
                image={IMAGE_CONST.UPGRADE_MEMBERSHIP}
                leftButtonText={STRING_CONST.CANCEL_TEXT}
                rightButtonText={STRING_CONST.UPGRADE}
                onLeftButtonPress={() => {
                  this.setState({
                    showUpgradePopUp: false,
                  });
                }}
                onRightButtonPress={() => {
                  this.setState({
                    showUpgradePopUp: false,
                  });
                  this.props.navigation.navigate("MembershipContainerScreen")
                 
                }}
              />
            )}
            {showLoginPopup && (
              <PopUpComponent
                isSingleButton={false}
                title={"Sign In / Sign Up"}
                message={STRING_CONST.LOGIN_TEXT}
                image={IMAGE_CONST.LOGIN_ICON}
                leftButtonText={STRING_CONST.NO}
                rightButtonText={STRING_CONST.LOGIN}
                onLeftButtonPress={() => {
                  this.setState({
                    showLoginPopup: false,
                  });
                }}
                onRightButtonPress={() => {
                  this.setState({
                    showLoginPopup: false,
                  });
                  this.props.navigation.navigate("SignIn");
                }}
              />
            )}
          </View>
          {this.state.isNoflightScheudlePopup &&  this.renderNoFlight()}
          {this.state.showDetailsModal && this.flightDetailsModal()}
        </SafeAreaView>
    );
  }
}