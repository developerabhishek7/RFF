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
  ScrollView
} from "react-native";


import styles from "./calenderStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import * as CONFIG from "../../helpers/config";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/dist/Ionicons";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import * as IMG_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import Modal from "react-native-modal";
import { colours } from "../../constants/ColorConst";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { getAccessToken } from "../../constants/DataConst";
import Entypo from "react-native-vector-icons/dist/Entypo";
var uuid = require('react-native-uuid');
import DeviceInfo from "react-native-device-info";
// import Slider from '@react-native-community/slider';
import {usePostHog} from 'posthog-react-native';
 classes1 = ["Economy","Premium Economy","Businness", "First"]
let getEmptyObj = {}

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
import * as Config from "../../helpers/config";
import appStyle from 'app_style'
import { getFontScaleSync } from "react-native-device-info";
import { toNumber } from "lodash";

let economyPoints = "";
let premiumPoints = "";
let businessPoints = "";
let firstPoints = "";


let economySeats = 0
let premiumSeats = 0
let businessSeats = 0
let firstSeats = 0
let requiredKey = true

let dateExpire = false
let expireDate = ""
let isAlertExpireDays = ""
let isAlertExpireDays2 = ""
let maximumSliderPoints = 0
let minimumSliderPoints = 0
const { height, width } = Dimensions.get("window");

export default class CalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
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
      returnEndDate: "",
      isRenderAll: false,
      searchData: this.props.searchData,
      showDateRangeError:false,
      showModelDropdownForBA:false, showModelDropdownForSS:false,
      // searchData:{"airline":"british-airways","sourceCode":"LON","destinationCode":"ABV","selectedDestination":{"city_name":"Abuja","code":"ABV","country_name":"Nigeria","latitude":9.006792,"longitude":7.263172,"name":"Nnamdi Azikiwe Intl","miles_required":5000,"distance_in_miles":2966,"available_classes":{"business":true,"economy":true,"premium":true,"first":false},"availability":{"outboundLeftCounter":0,"outbound":{"2022-03-25":{"peak":false,"business":{"seats":3,"points":31250},"economy":{"seats":6,"points":5000},"premium":{"seats":6,"points":20000}},"2022-03-27":{"peak":true,"economy":{"seats":2,"points":12500}}}}},"selectedSource":{"name":"London","code":"LON","type":"city","country_name":"United Kingdom","city_name":"London","airports":[{"name":"Gatwick","code":"LGW"},{"name":"Heathrow","code":"LHR"},{"name":"City","code":"LCY"},{"name":"Luton","code":"LTN"},{"name":"Southend","code":"SEN"},{"name":"Stansted","code":"STN"}],"latitude":51.148056,"longitude":-0.190278},"tier":"blue","passengerCount":1,"isReturn":false,"classSelected":[true,true,true,true],"airways":"british_airways","selectedStartDate":"2022-03-25"},
      createAlertPressed: false,
      selectedDate: {},
      showUpgradePopUp: false,
      showLoginPopup: false,
      showLoginCnfmPopup: false,
      isPeakValue: true,
      isOffPeakValue: true,
      showAirlineModal: !this.props.userInfo.airline_memberships,
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
      staticDateArray: [],
      classSelectedSlider:[],
      flightData: [],
      onDayPressedDate: "",
      // monthNumber: this.props.route.params.selectedDate,
      isLoader: true,
      // monthKey: this.props.route.params.monthKey,
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
      finalData1:{},
      finalData:{},
      originalGuestOutBoundObj:{},orignalGuestInboundObj:{},
      availableOutBoundDate:{},availableInBoundDate:{},availability_data:{},
      orignalInboundObj:{},
      originalOutBoundObj:{},
      maximumSliderPoints:0,
      minimumSliderPoints:0,
      isSliderLoader:false,
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
    if (points % 1000 == 0) {
      return `${points / 1000}k`;
    } else {
      return points;
    }
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

  componentDidMount = async () => {
    this.getDates()
    this.checkOnloaderFalse()

    setTimeout(() => {
       this.setState({cabinClassData:this.props.cabinClassData})
      //  this.renderClassValues()
    }, 1500);
    
   
    const today = moment();
    let currentDate = moment("2023-01-17T18:12:17.211Z", "DD-MM-YYYY").fromNow(today)

    let data = this.state.airLinesDetailsObject.availability;
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
    setTimeout(() => {
      this.setState({ isRenderAll: true, })
    }, 1000);
    setTimeout(() => {
      this.setState({   isSliderLoader:true, })
    }, 2000);

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

    let userData = this.props.userInfo

    let bronzeMember = userData.bronze_member

    var data2 = [true,false,false,false]
    
    this.setState({
      classSelected: bronzeMember ? data2 : classData,
    });
    if (this.props.route.params.focusedDate) {
      setTimeout(() => {
        this._refCalendarList.scrollToDay(
          this.props.route.params.focusedDate
        );
      });
    }

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
    let firstDay = moment().startOf('month')
    let nextThreeMonth = moment(firstDay).add(3, 'months').format("YYYY-MM-DD")
    let clickDate
    let dt1
    let dt2
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member
    if (day) {
      clickDate = day.dateString
      let date1 = moment(clickDate).format("MM/DD/YYYY")
      let date2 = moment(nextThreeMonth).format("MM/DD/YYYY")

      dt1 = new Date(date1).getTime()
      dt2 = new Date(date2).getTime()
      if (dt1 === dt2) {
        requiredKey = true
      }
      if (dt1 > dt2) {
        requiredKey = true
      }
      if (dt2 > dt1) {
        requiredKey = false
      }
    }

    const { searchData, offPeakKey,showModelDropdownForBA,showModelDropdownForSS, airLinesDetailsObject,cabinClassData } = this.state;
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
    let pointsBA = []
    pointsBA = this.props.airlinesDetailPoints.airlinesDetailPoints.points.BA ? this.props.airlinesDetailPoints.airlinesDetailPoints.points.BA : this.props.airlinesDetailPoints.airlinesDetailPoints.points.SS;
   
   let pointsSS = []
   
   pointsSS = this.props.airlinesDetailPoints.airlinesDetailPoints.points.SS ? this.props.airlinesDetailPoints.airlinesDetailPoints.points.SS : this.props.airlinesDetailPoints.airlinesDetailPoints.points.BA;
   

    let points = []

    points = [...pointsSS, ...pointsBA]
    
   if (requiredKey == true && this.props.isLoggedIn == false) {
      economySeats = 2
      premiumSeats = 0
      businessSeats = 0
      firstSeats = 2
      dateExpire = true

      // businessPoints = 1100
      // economyPoints = 1100
      // premiumPoints = 1100
      // firstPoints = 1100
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
      // if (data.economy) {
      //   economySeats = data.economy.seats
      // }
      // if (data.premium) {
      //   premiumSeats = data.premium.seats
      // }
      // if (data.business) {
      //   businessSeats = data.business.seats
      // }
      // if (data.first) {
      //   firstSeats = data.first.seats
      // }
    }

    let isReturn = this.state.searchData.isReturn
    let oneWay = []
    let returnWay = []
    let economy1 
    let premium1
    let business1
    let first1

    
    // console.log("yes check here points details- -  - - - -",points)


    if (points && Object.keys(points).length !== 0 && this.props.isLoggedIn == false) { 
      if(offPeakKey == false){
        if(requiredKey == false) {
          points.map((singleMap)=>{
            if(singleMap.one_way && singleMap.peak_type == "offpeak" && singleMap.bot == "BA" && offPeakKey == false ){
              if(singleMap.economy_avios){
                economy1 = singleMap.economy_avios
              }
              if(singleMap.premium_avios){
                  premium1 = singleMap.premium_avios
              }
              if(singleMap.business_avios ){
                  business1 = singleMap.business_avios
              }
              if(singleMap.first_avios){
                  first1 = singleMap.first_avios
              } 
            }
          })
    
          points.map((singleMap)=>{
            if(singleMap.one_way && singleMap.peak_type == "offpeak" && singleMap.bot == "SS" && offPeakKey == false){
              if(singleMap.economy_avios && economy1 == undefined){
                economy1 = singleMap.economy_avios
              }
              if(singleMap.premium_avios && premium1 == undefined){
                  premium1 = singleMap.premium_avios
              }
              if(singleMap.business_avios && business1 == undefined ){
                  business1 = singleMap.business_avios
              }
              if(singleMap.first_avios && first1 == undefined){
                  first1 = singleMap.first_avios
              }
            }
          })
        }
        if(requiredKey == true){
          business1 = 1100
          economy1 = 1100
          premium1 = 1100
          first1 = 1100
          hideFlight = true
        }
      }
  
      if(offPeakKey == true){
        if(requiredKey == false) {
          points.map((singleMap)=>{
            if(singleMap.one_way && singleMap.peak_type == "peak" && singleMap.bot == "BA" && offPeakKey == true ){
              if(singleMap.economy_avios){
                economy1 = singleMap.economy_avios
              }
              if(singleMap.premium_avios){
                  premium1 = singleMap.premium_avios
              }
              if(singleMap.business_avios ){
                  business1 = singleMap.business_avios
              }
              if(singleMap.first_avios){
                  first1 = singleMap.first_avios
              } 
            }
          })
    
          points.map((singleMap)=>{
            if(singleMap.one_way && singleMap.peak_type == "peak" && singleMap.bot == "SS" && offPeakKey == true){
              if(singleMap.economy_avios && economy1 == undefined){
                economy1 = singleMap.economy_avios
              }
              if(singleMap.premium_avios && premium1 == undefined){
                  premium1 = singleMap.premium_avios
              }
              if(singleMap.business_avios && business1 == undefined ){
                  business1 = singleMap.business_avios
              }
              if(singleMap.first_avios && first1 == undefined){
                  first1 = singleMap.first_avios
              }
            }
          })
        }
        if(requiredKey == true){
          business1 = 1100
          economy1 = 1100
          premium1 = 1100
          first1 = 1100
          hideFlight = true
        }
      }
    }







    if (points && Object.keys(points).length !== 0 && this.props.isLoggedIn == true) {
    if(offPeakKey == false){
      points.map((singleMap)=>{
        if(singleMap.one_way && singleMap.peak_type == "offpeak" && singleMap.bot == "SS" && offPeakKey == false ){
          if(singleMap.economy_avios){
            economy1 = singleMap.economy_avios
          }
          if(singleMap.premium_avios){
              premium1 = singleMap.premium_avios
          }
          if(singleMap.business_avios ){
              business1 = singleMap.business_avios
          }
          if(singleMap.first_avios){
              first1 = singleMap.first_avios
          } 
        }
      })

      points.map((singleMap)=>{
        if(singleMap.one_way && singleMap.peak_type == "offpeak"  && offPeakKey == false){
          if(singleMap.economy_avios && economy1 == undefined){
            economy1 = singleMap.economy_avios
          }
          if(singleMap.premium_avios && premium1 == undefined){
              premium1 = singleMap.premium_avios
          }
          if(singleMap.business_avios && business1 == undefined ){
              business1 = singleMap.business_avios
          }
          if(singleMap.first_avios && first1 == undefined){
              first1 = singleMap.first_avios
          }
        }
      })

    }

    if(offPeakKey == true){
      points.map((singleMap)=>{
        if(singleMap.one_way && singleMap.peak_type == "peak" && offPeakKey == true ){
          if(singleMap.economy_avios){
            economy1 = singleMap.economy_avios
          }
          if(singleMap.premium_avios){
              premium1 = singleMap.premium_avios
          }
          if(singleMap.business_avios ){
              business1 = singleMap.business_avios
          }
          if(singleMap.first_avios){
              first1 = singleMap.first_avios
          } 
        }
      })

      points.map((singleMap)=>{
        if(singleMap.one_way && singleMap.peak_type == "peak"  && offPeakKey == true){
          if(singleMap.economy_avios && economy1 == undefined){
            economy1 = singleMap.economy_avios
          }
          if(singleMap.premium_avios && premium1 == undefined){
              premium1 = singleMap.premium_avios
          }
          if(singleMap.business_avios && business1 == undefined ){
              business1 = singleMap.business_avios
          }
          if(singleMap.first_avios && first1 == undefined){
              first1 = singleMap.first_avios
          }
        }
      })

    }
  }

    

    

    // SS POINTS CODE ........  .. . . . . . . . . . . . .

    let economyClass
    let premiumClass
    let businessClas
    let firstClass

    let travelData = []
    if(cabinClassData ){
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


    // console.log('ECONOMY POINTS - - ',economy1)
    // console.log('Premoum POINTS - - ',premium1)
    // console.log('business POINTS - - ',business1)
    // console.log('first POINTS - - ',first1)





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
                {IMAGE_CONST.DARK_CROSS}
              </TouchableOpacity>
              <Text style={styles.titleText}>{searchData.selectedSource.city_name} - {searchData.selectedDestination.city_name}</Text>
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
                  color: colours.white,
                  // marginTop: verticalScale(5),
                  fontWeight:"700",
                  fontSize: scale(13),
                  padding: scale(4),
                 
                  paddingStart: scale(9),
                  paddingEnd: scale(9)
                }}
              >
                {`${!data.peak ? STRING_CONST.OFF_PEAK_FARE : STRING_CONST.PEAK_FARE
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
                <View style={{ marginTop: verticalScale(28), }}>
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
                            {  economy1 ? this.formatPrice(economy1) : 
                                  "-"
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
                            {premium1
                              ? this.formatPrice(premium1)
                              : "-"}

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
                        {/* {data.business ? data.business.seats : "0"} */}
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          <Fragment>
                            {business1
                              ? this.formatPrice(business1)
                              : "-"}
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
                            {first1 ? this.formatPrice(first1) : "-"}
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
                  Only one flight scheduled
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
                    marginTop:classSelectedArray.length > 2 ? scale(-10) : scale(16)
                  }]}
                  onPress={() => {
                    if(trip_type == "one_way"){
                      this.setState({
                        showModelDropdownForBA:true,
                        showModelDropdownForSS:false
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
                                isOffPeakValue: this.state.isOffPeakValue,
                                economyPoints: economy1,
                                premiumPoints: premium1,
                                businessPoints: business1,
                                firstPoints: first1,
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
                                isOffPeakValue: this.state.isOffPeakValue,
                                economyPoints: economy1,
                                premiumPoints: premium1,
                                businessPoints: business1,
                                firstPoints: first1,
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
                            <Text style={styles.aviosText2} >{"No Flight Scheduled"}</Text>
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
         url = `https://www.skyscanner.co.in/transport/flights/${sourceCode}/${destinationCode}/${dYear}${dDate}/${aYear}${aDate}/?adults=${numberOfPassengers}&adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&iym=${aYear}&selectediday=${aDate}&rtn=1`
      }
      if(selectedIndex == 0){
         url = `https://www.skyscanner.co.in/transport/flights/${sourceCode}/${destinationCode}/${dYear}${dDate}/?adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&rtn=0`
      }

    
       Linking.openURL(url, '_blank') 
     }else{
        Linking.openURL("https://www.skyscanner.co.in/transport/flights/", "_blank")
     }
  }

  // https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=LON&destinationPoint=ABZ&departInputDate=02/07/2023&returnInputDate=23/03/2023&oneWay=false&RestrictionType=Restricted&NumberOfAdults=1&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=M
  handleBaRedirection = () => {  
    
    const {selectedIndex,passengerCount,dateString,cabinCode,searchData,destination}  = this.state;
    
  

    let sourceCode = searchData.selectedSource.code.toLowerCase()
    let destinationCode = searchData.selectedDestination.code.toLowerCase()



    let numberOfPassengers = searchData.passengerCount
    let oneWay = selectedIndex == 0 ? true : false
    const departInputDate =  moment(dateString).format('DD/MM/YYYY')
    const returnInputDate =  moment().format('DD/MM/YYYY')

  

     if(sourceCode){
      const url = `https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=${sourceCode}&destinationPoint=${destinationCode}&departInputDate=${departInputDate}${oneWay && departInputDate ? `&returnInputDate=${returnInputDate}` : ''}&oneWay=${oneWay}&RestrictionType=Restricted&NumberOfAdults=${numberOfPassengers}&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=${cabinCode}`
        Linking.openURL(url, '_blank')
     }else{
      Linking.openURL("https://www.britishairways.com/travel/redeem/execclub/", "_blank")
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
      <View style={{ flex: 1, }} >
        {
          flightData && flightData.map((selectedFlight) => {
            return (
              // <Animated.View
              //   style={[
              //     styles.animatedView1,
              //     {
              //       transform: [{ translateY: this.state.bounceValue }],
              //     },
              //   ]}
              // >
              //   <View style={styles.animatedInnerView}>
              //     <View
              //       style={{
              //         alignItems: "center",
              //         alignSelf: "stretch",
              //       }}
              //     >
              //       <View style={[styles.titleView]}>
              //         <TouchableOpacity onPress={() => { }}>
              //           <Image
              //             source={IMAGE_CONST.WHITE_BACKGROUND_BA_LOGO}
              //             style={{ marginRight: scale(10) }}
              //           />
              //         </TouchableOpacity>
              //         <Text style={styles.titleText}>{`${STRING_CONST.SEAT_AVAILABILITY
              //           } (${this.state.isOffPeakValue
              //             ? STRING_CONST.OFF_PEAK_FARE
              //             : STRING_CONST.PEAK_FARE
              //           })`}</Text>
              //         <TouchableOpacity
              //           style={{
              //             alignSelf: "flex-end",
              //           }}
              //           onPress={() => {
              //             this.setState({
              //               showDetailsModal: false,
              //               bounceValue: new Animated.Value(250),
              //               isHidden: true,
              //             });
              //             this._toggleSubview();
              //           }}
              //         >
              //           <Entypo
              //             name="cross"
              //             size={scale(35)}
              //             color={colours.lightGreyish}
              //           />
              //         </TouchableOpacity>
              //       </View>
              //       {
              //         this.state.selectedIndex == 0 ?
              //           <Fragment>
              //             <Text style={styles.detailLocationText}>
              //               {data.selectedSource.name}{" "}
              //               to{" "}
              //               {data.selectedDestination.name}
              //             </Text>
              //           </Fragment>
              //           :
              //           <Fragment>
              //             <Text style={styles.detailLocationText}>
              //               {data.selectedDestination.name}{" "}
              //               to{" "}
              //               {data.selectedSource.name}
              //             </Text>
              //           </Fragment>
              //       }
              //       <View
              //         style={[styles.timingContainer]}
              //         activeOpacity={0.6}
              //         onPress={() => { }}
              //       >
              //         <View style={{ flexDirection: "row", marginRight: scale(30) }}>
              //           <Image
              //             source={IMAGE_CONST.BIG_TAKE_OFF}
              //             style={{ marginRight: scale(10) }}
              //           />
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               { color: colours.white, fontSize: scale(14) },
              //             ]}
              //           >{`${selectedFlight.departure_time} ${selectedFlight.source_code}`}</Text>
              //         </View>
              //         <View style={{ flexDirection: "row" }}>
              //           <Image
              //             source={IMAGE_CONST.BIG_LANDING}
              //             style={{ marginRight: scale(10) }}
              //           />
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               { color: colours.white, fontSize: scale(14) },
              //             ]}
              //           >{`${selectedFlight.arrival_time} ${selectedFlight.destination_code}`}</Text>
              //         </View>
              //       </View>
              //       <View style={{ alignSelf: "stretch", flex: 1 }}>
              //         <View
              //           style={{
              //             flexDirection: "row",
              //             backgroundColor: "rgba(255,255,255,0.1)",
              //             flex: 1,
              //             paddingHorizontal: scale(20),
              //           }}
              //         >
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 4,
              //               },
              //             ]}
              //           >{`${"Airline:"}`}</Text>
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 6,
              //               },
              //             ]}
              //           >{`${"British Airways"}`}</Text>
              //         </View>
              //         <View
              //           style={{ flexDirection: "row", paddingHorizontal: scale(20) }}
              //         >
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 4,
              //               },
              //             ]}
              //           >{`${"Aircraft:"}`}</Text>
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 6,
              //               },
              //             ]}
              //           >{`${selectedFlight.aircraft_details}`}</Text>
              //         </View>
              //         <View
              //           style={{
              //             flexDirection: "row",
              //             backgroundColor: "rgba(255,255,255,0.1)",
              //             flex: 1,
              //             paddingHorizontal: scale(20),
              //           }} >
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 4,
              //               },
              //             ]}
              //           >{`${`Flight:`}`}</Text>
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 6,
              //               },
              //             ]}
              //           >{selectedFlight.flight}</Text>
              //         </View>
              //         <View
              //           style={{ flexDirection: "row", paddingHorizontal: scale(20) }}
              //         >
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 4,
              //               },
              //             ]}
              //           >{`${`Departure:`}`}</Text>
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 6,
              //               },
              //             ]}
              //           >{`${moment(selectedFlight.departure).format(
              //             "ddd, DD MMM YYYY, "
              //           )}${selectedFlight.departure_time}`}</Text>
              //         </View>
              //         <View
              //           style={{
              //             flexDirection: "row",
              //             backgroundColor: "rgba(255,255,255,0.1)",
              //             alignItems: "center",
              //             paddingHorizontal: scale(20),
              //           }}
              //         >
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 4,
              //               },
              //             ]}
              //           >{`${`Arrival:`}`}</Text>
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 6,
              //               },
              //             ]}
              //           >{`${moment(selectedFlight.arrival_date).format(
              //             "ddd, DD MMM YYYY, "
              //           )}${selectedFlight.arrival_time}`}</Text>
              //         </View>
              //         <View
              //           style={{ flexDirection: "row", paddingHorizontal: scale(20), paddingBottom: scale(10), marginBottom: scale(6) }}
              //         >
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 4,
              //               },
              //             ]}
              //           >{`${"Duration:"}`}</Text>
              //           <Text
              //             style={[
              //               styles.flightDetailText,
              //               {
              //                 color: colours.white,
              //                 fontSize: scale(14),
              //                 padding: scale(10),
              //                 flex: 6,
              //               },
              //             ]}
              //           >{`${getTimeFromMins(selectedFlight.duration)}`}</Text>
              //         </View>
              //       </View>
              //     </View>
              //   </View>
              // </Animated.View>
              <Animated.View
              style={[
                styles.animatedView1,
                {
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
                        source={IMAGE_CONST.WHITE_BACKGROUND_BA_LOGO}
                        style={{ marginRight: scale(10) }}
                      />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{`${STRING_CONST.SEAT_AVAILABILITY
                      } (${this.state.isOffPeakValue
                        ? STRING_CONST.OFF_PEAK_FARE
                        : STRING_CONST.PEAK_FARE
                      })`}</Text>
                    <TouchableOpacity
                      style={{
                        alignSelf: "flex-end",
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
                        size={scale(35)}
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
                    <View style={{ flexDirection: "row", marginRight: scale(30) }}>
                      <Image
                        source={IMAGE_CONST.BIG_TAKE_OFF}
                        style={{ marginRight: scale(10) }}
                      />
                      <Text
                        style={[
                          styles.flightDetailText,
                          { color: colours.white, fontSize: scale(14) },
                        ]}
                      >{`${selectedFlight.departure_time} ${selectedFlight.source_code}`}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={IMAGE_CONST.BIG_LANDING}
                        style={{ marginRight: scale(10) }}
                      />
                      <Text
                        style={[
                          styles.flightDetailText,
                          { color: colours.white, fontSize: scale(14) },
                        ]}
                      >{`${selectedFlight.arrival_time} ${selectedFlight.destination_code}`}</Text>
                    </View>
                  </View>
                  <View style={{ alignSelf: "stretch", flex: 1 }}>
                    {/* <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        flex: 1,
                        paddingHorizontal: scale(20),
                      }}
                    >
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 4,
                          },
                        ]}
                      >{`${"Airline:"}`}</Text>
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 6,
                          },
                        ]}
                      >{`${"British Airways"}`}</Text>
                    </View> */}
                    {/* <View
                      style={{ flexDirection: "row", paddingHorizontal: scale(20) }}
                    >
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 4,
                          },
                        ]}
                      >{`${`Flight:`}`}</Text>
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 6,
                          },
                        ]}
                      >{selectedFlight.flight}</Text>
                    </View> */}
                    <View
                      style={{
                        flexDirection: "row",
                        // backgroundColor: "rgba(255,255,255,0.1)",
                        alignItems: "center",
                        paddingHorizontal: scale(20),
                      }} >
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 4,
                          },
                        ]}
                      >{`${"Aircraft:"}`}</Text>
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 6,
                          },
                        ]}
                      >{`${selectedFlight.aircraft_details}`}</Text>
                    </View>
                    {/* <View
                      // style={{
                      //   flexDirection: "row",
                      //   backgroundColor: "rgba(255,255,255,0.1)",
                      //   alignItems: "center",
                      //   paddingHorizontal: scale(20),
                      // }}
      
                      style={{ flexDirection: "row", paddingHorizontal: scale(20) }}
      
                    >
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 4,
                          },
                        ]}
                      >{`${`Departure:`}`}</Text>
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 6,
                          },
                        ]}
                      >{`${moment(selectedFlight.departure).format(
                        "ddd, DD MMM YYYY, "
                      )}${selectedFlight.departure_time}`}</Text>
                    </View> */}
                    {/* <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        paddingHorizontal: scale(20),
                      }}
      
                    >
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 4,
                          },
                        ]}
                      >{`${`Arrival:`}`}</Text>
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 6,
                          },
                        ]}
                      >{`${moment(selectedFlight.arrival_date).format(
                        "ddd, DD MMM YYYY, "
                      )}${selectedFlight.arrival_time}`}</Text>
                    </View> */}
                    <View
                      style={{ flexDirection: "row", backgroundColor: "rgba(255,255,255,0.1)", paddingHorizontal: scale(20), paddingBottom: scale(10), marginBottom: scale(6) }}
                    >
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 4,
                          },
                        ]}
                      >{`${"Duration:"}`}</Text>
                      <Text
                        style={[
                          styles.flightDetailText,
                          {
                            color: colours.white,
                            fontSize: scale(14),
                            padding: scale(10),
                            flex: 6,
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
  
  
      let bronzeExpireDate = moment(this.state.departStartDate).add(20, 'days').format("YYYY-MM-DD")
      let silverExpireDate = moment(this.state.departStartDate).add(45, 'days').format("YYYY-MM-DD")
      let goldExpireDate = moment(this.state.departStartDate).add(90, 'days').format("YYYY-MM-DD")


      let bronzeExpirertnDate = moment(this.state.returnStartDate).add(20, 'days').format("YYYY-MM-DD")
      let silverExpirertnDate = moment(this.state.returnStartDate).add(45, 'days').format("YYYY-MM-DD")
      let goldExpirertnDate = moment(this.state.returnStartDate).add(90, 'days').format("YYYY-MM-DD")

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
          txtForPopup = `Maximum date range allowed is 60 days. Please reduce your Inbound date range.`
          inbounddateRange = true
          days = 90
        }
        else {
          txtForPopup = `Maximum date range allowed is 60 days. Please reduce your Outbound date range.`
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
          txtForPopup = `Maximum date range allowed is 45 days. Please reduce your Inbound date range.`
          inbounddateRange = true
        }
        else {
          days = 45
          outbounddateRange = true
          txtForPopup = `Maximum date range allowed is 45 days. Please reduce your Outbound date range.`
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
          txtForPopup = `Maximum date range allowed is 20 days. Please reduce your Inbound date range.`
        }
        else {
          days = 20
          outbounddateRange = true
          txtForPopup = `Maximum date range allowed is 20 days. Please reduce your Outbound date range.`
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
      let travel_classes = getBAClassesString(classSelected);
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
        economy: searchData.classSelected[0],
        premium: searchData.classSelected[1],
        first: searchData.classSelected[2],
        business: searchData.classSelected[3],
        start_date: moment(searchData.startDate).format("YYYY-MM-DD") || null,
        // airlineSelected: `${airline}_${membership}`,
        airlineMembership: membership,
        // membership: membership,       
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
          available_travel_classes: availableClassString,
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
              originCountry: searchData.selectedSource.country_name ? searchData.selectedSource.selectedSource : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:this.state.searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: this.renderClassValues() ? this.renderClassValues() : 'N/A',
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
          // const posthog = usePostHog()
          // posthog.capture('Alert', trackData);
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
              originCountry: searchData.selectedSource.selectedSource ? searchData.selectedSource.selectedSource : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:this.state.searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: this.renderClassValues() ? this.renderClassValues() : 'N/A',
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
    
          // const posthog = usePostHog()
          // posthog.capture('Alert', trackData);
        
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
            // this.postHogAnalytics(guestUserPostHog)
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
                  alert(STRING_CONST.CREATE_ALERT_LIMIT_GOLD);
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
                    fontSize: scale(16),
                    color: colours.darkBlueTheme,
                    fontWeight: "bold",
                  }}
                >
                  {STRING_CONST.CREATE_ALERT}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showCreateAlertModal: false });
                  }}
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
                    source={IMG_CONST.TAKE_OFF}
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
                    <Text style={styles.dateTextHeading}>
                      {STRING_CONST.DEPARTURE_DATE_RANGE}
                    </Text>
                    <Text style={styles.dateText}>
                      {`${departStartDate
                        ? `${getformattedDate(departStartDate)}`
                        : STRING_CONST.START_DATE
                        } - ${departEndDate
                          ? `${getformattedDate(departEndDate)}`
                          : STRING_CONST.END_DATE
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
                      source={IMG_CONST.RETURN_LANDING}
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
                      <Text style={styles.dateTextHeading}>
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
                          ? `${getformattedDate(returnStartDate)}`
                          : STRING_CONST.START_DATE
                          } - ${returnEndDate
                            ? `${getformattedDate(returnEndDate)}`
                            : STRING_CONST.END_DATE
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
              {/* <Text style={{textAlign:'center',alignSelf:"center",color:"red"}}>{"Maximum date range allowed is 60 days Please reduce your Outbound date range."}</Text> */}
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
              
            
             
              {this.renderSubmitAlertButton(STRING_CONST.SUBMIT_ALERT, () => {
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
  renderBottomButton(buttonText, onButtonPress) {
    return (
      <TouchableOpacity
        style={[
          styles.submitAlertView,
          { position: "absolute", bottom: scale(20) },
        ]}
        onPress={() => {
          onButtonPress();
        }}
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
        onPress={() => { this.props.navigation.goBack() }}

      // onPress={() => {
      //   fromdestinationDetails == true ?
      //   this.props.navigation.navigate("MapComponentScreen",{
      //     destinations:destination,
      //     WhereFrom:WhereFrom,
      //     auditData:auditData,
      //     searchData:searchData,
      //     tripType:tripType
      //   })
      //   : 
      //   this.props.navigation.navigate("FindFlightContainerScreen")
      // }}
      >
        <TouchableOpacity
          onPress={() => { this.props.navigation.goBack() }}

        // onPress={() => {
        //   fromdestinationDetails == true ?
        //   this.props.navigation.navigate("MapComponentScreen",{
        //     destinations:destination,
        //     WhereFrom:WhereFrom,
        //     auditData:auditData,
        //     searchData:searchData,
        //     tripType:tripType
        //   })
        //   : 
        //   this.props.navigation.navigate("FindFlightContainerScreen")
        //    }}
        >
          <Icon name="ios-arrow-back" size={scale(30)} color={colours.black} />
        </TouchableOpacity>

        <View style={{}}>
          <View style={styles.locationView}>
            {
              this.state.searchData ?
                <View>
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

  ticketClass() {
    let classes = this.state.airLinesDetailsObject.availability;
    const { searchData ,isSliderRunDone} = this.state

    let economy = this.state.classSelected[0]
    let premium = this.state.classSelected[1]
    let business = this.state.classSelected[2]
    let first = this.state.classSelected[3]

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
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member

    return (
      <View style={[styles.ticketClassView, {
        justifyContent: classSelectedArray.length > 2 ? "space-evenly" : "center",
      }]}>
        {classes.economy && (
          <TouchableOpacity
            style={[
              styles.classButton]}
            onPress={() => {
              if(!bronzeMember){
                if (premium || business || first) {
                  this.setState({isSliderRunDone:false},()=>{
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("economy")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("economy"))
                    ) {
                      let newClassArray = this.state.classSelected;
                      let arr = this.state.classSelected
                      newClassArray[0] = !newClassArray[0];
                      let slideClassArray = this.state.newClassSliderArray
                      // slideClassArray[0] = slideClassArray[0]
                      this.setState({
                        classSelected:newClassArray,
                        newClassSliderArray:newClassArray
                      });
                    } else {
                      alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);
                    }
                  })
                  }
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
                    : colours.gray
                  : this.state.inBoundVisibleArray.includes("economy")
                    ? colours.blue
                    : colours.gray
              )}
            <Text style={styles.classTextStyle}>{STRING_CONST.ECONOMY}</Text>
          </TouchableOpacity>
        )}
        {classes.premium && (
          <TouchableOpacity
            style={[styles.classButton]}
            onPress={() => {
              if(!bronzeMember){
                if (economy || business || first) {
                  this.setState({isSliderRunDone:false},()=>{
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("premium")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("premium"))
                    ) {
                      let newClassArray = this.state.classSelected;
                      let arr = this.state.classSelected
                      newClassArray[1] = !newClassArray[1];
                      let slideClassArray = this.state.newClassSliderArray
                       this.setState({
                        classSelected: newClassArray,
                        newClassSliderArray:newClassArray
                      });
                    } else {
                      alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);
                    }
                  })
                  }
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
                    : colours.gray
                  : this.state.inBoundVisibleArray.includes("premium")
                    ? colours.yellow
                    : colours.gray
              )}

            <Text style={styles.classTextStyle}>
              {STRING_CONST.PREMIUM_ECONOMY}
            </Text>
          </TouchableOpacity>
        )}
        {classes.business && (
          <TouchableOpacity
            style={[styles.classButton]}
            onPress={() => {
              if(!bronzeMember){
                if (economy || premium || first) {

                  this.setState({isSliderRunDone:false},()=>{
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("business")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("business"))
                    ) {
                      let newClassArray = this.state.classSelected;
                      newClassArray[2] = !newClassArray[2];
                      let slideClassArray = this.state.newClassSliderArray
                      let arr =  this.state.classSelected
                      this.setState({
                          classSelected:newClassArray,
                          newClassSliderArray:newClassArray
                        });
                    } else {
                      alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);
                    }
                  })
                    
                  }
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
                    : colours.gray
                  : this.state.inBoundVisibleArray.includes("business")
                    ? colours.purple
                    : colours.gray
              )}
            <Text style={styles.classTextStyle}>{STRING_CONST.BUSINESS}</Text>
          </TouchableOpacity>
        )}
        {classes.first && (
          <TouchableOpacity
            style={[
              styles.classButton,
            ]}
            onPress={() => {
              if(!bronzeMember){
                if (economy || premium || business) {
                  this.setState({isSliderRunDone:false},()=>{
                    if (
                      (this.state.selectedIndex == 0 &&
                        this.state.outBoundVisibleArray.includes("first")) ||
                      (this.state.selectedIndex == 1 &&
                        this.state.inBoundVisibleArray.includes("first"))
                    ){
                      let newClassArray = this.state.classSelected;
                      let arr = this.state.classSelected
                      newClassArray[3] = !newClassArray[3];
                      let slideClassArray = this.state.newClassSliderArray
                      this.setState({
                        classSelected:newClassArray,
                        newClassSliderArray:newClassArray
                      });
                    } else {
                      alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);
                    }
                  })
                }
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
                    : colours.gray
                  : this.state.inBoundVisibleArray.includes("first")
                    ? colours.pink
                    : colours.gray
              )}
            <Text style={styles.classTextStyle}>{STRING_CONST.FIRST}</Text>
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
      <View style={{ flexDirection: "row", paddingHorizontal: scale(30) }}>
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
            {"Inbound Seats"}
            {/* {STRING_CONST.RETURN_SEATS} */}
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


// ON DAY PRESS FUNCTIONALITY . . . . . . . .

  onDayPressed(day, isOffPeakValue1) {
    const { isOffPeakValue, isPeakValue, airLinesDetailsObject, searchData } = this.state;
    let txt = "No Flight Scheduled"
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
          this.setState({ noFlightScheduleDate: actualDay })
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
          // this.Show_Custom_Alert2()
          // this.setState({ noFlightScheduleDate: actualDay })
          // this.setState({ noFlightScheduleAlertTxt: "No Flight Scheduled" })
        }


        else if ((!availableDateKey)  && (scheduleDateKey)) {
          this.Show_Custom_Alert2()
          data = this.state.airLinesDetailsObject.outbound_availability;
         let seatsAvailabilityData = data[day.dateString]
          let noflightschedule = true
          let showTicketDetailModal =  true
          // dateString,       
          let selectedDate = day
          let flightDate = day.dateString
          this.setState({isNoflightScheudlePopup:true})
          this.renderNoFlight(data,seatsAvailabilityData,noflightschedule,showTicketDetailModal,selectedDate,flightDate,isOffPeakValue1,day)
          this.setState({ noFlightScheduleDate: actualDay,selectedDate:selectedDate })
          this.setState({ noFlightScheduleAlertTxt: "No Seats Available in any Cabin Classes" })

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
        }) : this.setState({ offPeakKey: "" })
     
         if (!scheduleDateKey && !availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Available" })

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
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Schedule" })
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
           this.renderNoFlight(data,seatsAvailabilityData,noflightschedule,showTicketDetailModal,selectedDate,flightDate,isOffPeakValue1,day)
           this.setState({ noFlightScheduleDate: actualDay,selectedDate:selectedDate })
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

  getDates = () => {
    var dateArray = [];
    let today = new Date()

    let d = moment().year() + 2
    let endDateKey = `${d}/01/01`
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


  checkOnloaderFalse = () => {
    const { airLinesDetailsObject } = this.state
    let availableOutBoundDate = airLinesDetailsObject.outbound_availability;
    if (availableOutBoundDate) {
      this.setState({ isLoader: false })
    }
  }



  getLocations(isLoader) {

    const { isOffPeakValue, isPeakValue, airLinesDetailsObject, staticDateArray, peakOffpeakData
      , sliderEconomyMax, sliderEconomyMin,
      sliderPremiumMax, sliderPremiumMin,
      sliderBusinessMax, sliderBusinessMin,
      sliderFirstMax, sliderFirstMin,
      sliderPoints, isSliderRun,
      classSelected
    } = this.state;

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
      // if (outboundData && outboundData !== null && outboundData !== undefined && isLoader) {
      //   this.setState({ isLoader: false })
      // }
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

    let sliderEconomy = false
    let sliderPremium = false
    let sliderBusiness = false
    let sliderFirst = false

  

    if (sliderPoints && isSliderRun) {
      if(sliderEconomyMin == 0){
        sliderEconomy = false
     }
     else if(sliderEconomyMin == sliderPoints || sliderEconomyMin < sliderPoints){
        sliderEconomy = true
     }
   
    if(sliderPremiumMin == 0){
        sliderPremium = false
     }
     else if(sliderPremiumMin == sliderPoints || sliderPremiumMin < sliderPoints){
        sliderPremium = true
     }
   
   if(sliderBusinessMin == 0){
        sliderBusiness = false
     }
     else if(sliderBusinessMin == sliderPoints || sliderBusinessMin < sliderPoints){
        sliderBusiness = true
     }
   
   if(sliderFirstMin == 0){
        sliderFirst = false
     }
     else if(sliderFirstMin == sliderPoints || sliderFirstMin < sliderPoints){
        sliderFirst = true
     }
    }

    let availability = airLinesDetailsObject.availability;
    var economyClass = false
    var premiumClass = false
    var businessClass = false
    var firstClass = false


        if(availability && Object.keys(availability).length !==0 ) {
          if (isSliderRun && sliderPoints && maximumSliderPoints != sliderPoints) {
              economyClass = isSliderRun ? sliderEconomy : availability.economy
              premiumClass = isSliderRun ? sliderPremium : availability.premium
              businessClass = isSliderRun ? sliderBusiness : availability.business
              firstClass = isSliderRun ? sliderFirst : availability.first
          }
        else if (maximumSliderPoints == sliderPoints && isSliderRun && sliderPoints) {

            economyClass = availability.economy
            premiumClass = availability.premium
            businessClass = availability.business
            firstClass = availability.first
        }
        
        else {
            economyClass = availability.economy
            premiumClass = availability.premium
            businessClass = availability.business
            firstClass = availability.first      
        }
        }

  // if(availability && Object.keys(availability).length !==0 ) {
  //   economyClass = availability.economy
  //   premiumClass = availability.premium
  //   businessClass = availability.business
  //   firstClass = availability.first   
  //  }
 

      let availability_data = {'economy': economyClass, 'premium': premiumClass, 'business': businessClass, 'first': firstClass }
        // code for outbound obj - -  - - - 
        // for(let i of Object.keys(originalOutBoundObj)){ 
        //   if(originalOutBoundObj[i]["economy"]){
        //     originalOutBoundObj[i]["aeconomy"] = originalOutBoundObj[i]["economy"]
        //     delete originalOutBoundObj[i]['economy']
        //   }
        //     if(originalOutBoundObj[i]["premium"]){
        //     originalOutBoundObj[i]["bpremium"] = originalOutBoundObj[i]["premium"]
        //     delete originalOutBoundObj[i]['premium']
        //   }
        //   if(originalOutBoundObj[i]["business"]){
        //     originalOutBoundObj[i]["cbusiness"] = originalOutBoundObj[i]["business"]
        //     delete originalOutBoundObj[i]['business']
        //   }

        //   if(originalOutBoundObj[i]["first"]){
        //     originalOutBoundObj[i]["dfirst"] = originalOutBoundObj[i]["first"]
        //     delete originalOutBoundObj[i]['first']
        //   }              
        // }
       
        // code for inbound ---------- - - - 
        // for(let i of Object.keys(orignalInboundObj)){ 
        //   if(orignalInboundObj[i]["economy"]){
        //     orignalInboundObj[i]["aeconomy"] = orignalInboundObj[i]["economy"]
        //     delete orignalInboundObj[i]['economy']
        //   }
        //     if(orignalInboundObj[i]["premium"]){
        //     orignalInboundObj[i]["bpremium"] = orignalInboundObj[i]["premium"]
        //     delete orignalInboundObj[i]['premium']
        //   }
        //   if(orignalInboundObj[i]["business"]){
        //     orignalInboundObj[i]["cbusiness"] = orignalInboundObj[i]["business"]
        //     delete orignalInboundObj[i]['business']
        //   }
        //   if(orignalInboundObj[i]["first"]){
        //     orignalInboundObj[i]["dfirst"] = orignalInboundObj[i]["first"]
        //     delete orignalInboundObj[i]['first']
        //   }
        // }

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




  // renderSlider(isLoader){

  //   const {airlinesDetailPoints,isRenderAll} = this.state
  //   var data = []
  //   var data1 = []
  //   if (airlinesDetailPoints && Object.keys(airlinesDetailPoints).length !== 0 ) {
  //     data = this.state.airlinesDetailPoints.airlinesDetailPoints.points.BA
  //     data1 = this.state.airlinesDetailPoints.airlinesDetailPoints.points.SS
  //   }

  //   let pointsData = [...data, ...data1]



  //   // code here for minimum classes points .................

  //   var economyPointsMin = null
  //   var premiumPointsMin = null
  //   var businessPointsMin = null
  //   var firstPointsMin = null

  //   var economyPointsMinArray = []
  //    var premiumPointsMinArray = []
  //   var businessPointsMinArray = []
  //   var firstPointsMinArray = []


  //   if (pointsData && pointsData.length !== 0) {
  //     pointsData.map((singleMap) => {
  //      if (singleMap.one_way) {
  //         if(singleMap.economy_avios){
  //           economyPointsMinArray.push((singleMap.economy_avios))
  //         }
  //         if(singleMap.premium_avios ){
  //           premiumPointsMinArray.push((singleMap.premium_avios))
  //          }
  //         if(singleMap.business_avios){ 
  //           businessPointsMinArray.push((singleMap.business_avios))
         
  //         }
  //         if(singleMap.first_avios ){ 
  //           firstPointsMinArray.push((singleMap.first_avios))
  //         }
  //         }
  //     })
  //   }
    
  //   if(economyPointsMinArray && economyPointsMinArray.length !== 0){
  //     economyPointsMin = Math.min(...economyPointsMinArray.map((item)=> item))
  //   }
  //   if(premiumPointsMinArray && premiumPointsMinArray.length !== 0){
  //     premiumPointsMin = Math.min(...premiumPointsMinArray.map((item)=> item))
  //   }  
  //   if(businessPointsMinArray && businessPointsMinArray.length !== 0){
  //     businessPointsMin = Math.min(...businessPointsMinArray.map((item)=> item))
  //   }
  //   if(firstPointsMinArray && firstPointsMinArray.length !== 0){
  //     firstPointsMin = Math.min(...firstPointsMinArray.map((item)=> item))
  //   }

  //   let minClassesArray1 = [economyPointsMin,premiumPointsMin,businessPointsMin,firstPointsMin]
  //   let minClassesArray = minClassesArray1.filter(Number);



  //   // code here for maximum classes points...................
  //   var economyPointsMax = null
  //   var premiumPointsMax = null
  //   var businessPointsMax = null
  //   var firstPointsMax = null

  //   var economyPointsMaxArray = []
  //    var premiumPointsMaxArray = []
  //   var businessPointsMaxArray = []
  //   var firstPointsMaxArray = []


  //     if (pointsData && pointsData.length !== 0) {
  //       pointsData.map((singleMap) => {
  //        if (singleMap.one_way) {
  //           if(singleMap.economy_avios){
  //             economyPointsMaxArray.push((singleMap.economy_avios))
  //           }
  //           if(singleMap.premium_avios ){
  //             premiumPointsMaxArray.push((singleMap.premium_avios))
  //            }
  //           if(singleMap.business_avios){ 
  //             businessPointsMaxArray.push((singleMap.business_avios))
           
  //           }
  //           if(singleMap.first_avios ){ 
  //             firstPointsMaxArray.push((singleMap.first_avios))
  //           }
  //           }
  //       })
  //     }
      
  //     if(economyPointsMaxArray && economyPointsMaxArray.length !== 0){
  //       economyPointsMax = Math.max(...economyPointsMaxArray.map((item)=> item))
  //     }
  //     if(premiumPointsMaxArray && premiumPointsMaxArray.length !== 0){
  //       premiumPointsMax = Math.max(...premiumPointsMaxArray.map((item)=> item))
  //     }  
  //     if(businessPointsMaxArray && businessPointsMaxArray.length !== 0){
  //       businessPointsMax = Math.max(...businessPointsMaxArray.map((item)=> item))
  //     }
  //     if(firstPointsMaxArray && firstPointsMaxArray.length !== 0){
  //       firstPointsMax = Math.max(...firstPointsMaxArray.map((item)=> item))
  //     }

  //     let maxClassesArray1 = [economyPointsMax,premiumPointsMax,businessPointsMax,firstPointsMax]
  //     let maxClassesArray = maxClassesArray1.filter(Number);

  //   let minimumSliderPoints = 0
  
  //   if(maxClassesArray && maxClassesArray.length !== 0){
  //   maximumSliderPoints = Math.max(...maxClassesArray.map((item)=> item))

  //  }
  //  if(minClassesArray && minClassesArray.length !== 0){
  //    minimumSliderPoints = Math.min(...minClassesArray.map((item)=> item))
 
  //  }


  //   return (
  //     <Fragment>
  //       {
  //         this.state.isSliderLoader  ?
  //         <Slider
  //         style={{ width: scale(170), height: scale(70)}}
  //         minimumValue = {minimumSliderPoints ? minimumSliderPoints : null}
  //         maximumValue={maximumSliderPoints ? maximumSliderPoints : null}
  //         value={maximumSliderPoints ? maximumSliderPoints : null}
  //         // minimumValue = {2000}
  //         // maximumValue={10000}
  //         // value={10000}
  //         step={1000}
  //         maximumTrackTintColor="#000000"
  //         thumbTintColor="#03B2D8"
  //         onValueChange={(value) => {
  //           let newClassSliderArray = []
  //           if (value) {
  //             if(economyPointsMin == 0 || economyPointsMin > value ){
  //               sliderEconomy = false 
  //               // newClassSliderArray.splice(0,0,false);
  //               newClassSliderArray.push(false)
  //            }
  //            else if(economyPointsMin == value || economyPointsMin < value){
  //               sliderEconomy = true
  //               newClassSliderArray.push(true)
  //               // newClassSliderArray.splice(0,0,true);
  //            }
           
  //           if(premiumPointsMin == 0 ||  premiumPointsMin > value){
  //               sliderPremium = false
  //               newClassSliderArray.push(false)
  //               // newClassSliderArray.splice(1,1,false);
  //             }
  //            else if(premiumPointsMin == value || premiumPointsMin < value){
  //               sliderPremium = true
  //               newClassSliderArray.push(true)
  //               // newClassSliderArray.splice(1,1,true);
  //             }
           
  //          if(businessPointsMin == 0 || businessPointsMin > value){
  //               sliderBusiness = false
  //               // newClassSliderArray.splice(2,2,false);
  //               newClassSliderArray.push(false)
  //            }
  //            else if(businessPointsMin == value || businessPointsMin < value){
  //               sliderBusiness = true
  //               // newClassSliderArray.splice(2,2,true);
  //               newClassSliderArray.push(true)
  //            }
           
  //          if(firstPointsMin == 0 || firstPointsMin >  value){
  //               sliderFirst = false
  //               // newClassSliderArray.push(false)
  //               newClassSliderArray.splice(3,3,false);
  //            }
  //            else if(firstPointsMin == value || firstPointsMin <  value){
  //               sliderFirst = true
  //               newClassSliderArray.splice(3,3,true);
  //               // newClassSliderArray.push(true)
  //            }
  //               this.setState({
  //                 sliderPoints: parseInt(value),
  //                 isLoader: true,
  //                 newClassSliderArray:newClassSliderArray,
  //                 isSliderRun: true,
  //                 sliderEconomyMin: economyPointsMin,
  //                 sliderPremiumMin: premiumPointsMin,
  //                 sliderBusinessMin: businessPointsMin,
  //                 sliderFirstMin: firstPointsMin,
  //               })  
  //           }
  //         }}
      
  //         onSlidingComplete={(value1) => {
  //           if (value1) {
  //               this.setState({
  //                 sliderPoints: parseInt(value1),
  //                 isLoader: false,
  //                 isSliderRun: true,
  //                 isSliderRunDone: true,
  //                 sliderEconomyMin: economyPointsMin,
  //                 sliderPremiumMin: premiumPointsMin,
  //                 sliderBusinessMin: businessPointsMin,
  //                 sliderFirstMin: firstPointsMin,
  //               })
             
  //           }
  //         }}
  //       />

  //         : 
  //         <View>
  //           <Text></Text>
  //         </View>
  //       }
  //     </Fragment>
    
  //   )
  // }



//   renderMaxMinPointsForSlider(){
   

//      if(maximumSliderPoints && minimumSliderPoints && economyPointsMin){
//           this.renderSlider(minimumSliderPoints,maximumSliderPoints,economyPointsMin,premiumPointsMin,businessPointsMin,firstPointsMin)
//      }
// }



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
          marginStart: -scale(20),
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
    const { showLoginCnfmPopup, haveCrossIcon } = this.state
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
                  justifyContent: this.state.haveCrossIcon
                    ? "space-between"
                    : "center",
                },
              ]}
            >
              <Text style={styles.titleTextStyle}>{"    "}</Text>
              <Text style={styles.titleTextStyle}>{"Login"}</Text>
              <TouchableOpacity
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
            <Text style={[styles.messageStyle, { fontWeight: "500", }]}>{"Please login/Signup to use this feature"}</Text>
            {/* {this.state.isSingleButton
            ? this.singleButtonView()
            : this.doubleButtonView()} */}

            <View style={{flexDirection:"row",justifyContent:"space-between",width:scale(250)}}>
            <TouchableOpacity
              style={styles.singleButtonStyle}
              onPress={() => {
                this.props.navigation.navigate("SignIn")
              }}
            >
              <Text style={styles.rightButtonTextStyle}>
                {"Login"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.singleButtonStyle}
              onPress={() => {
                this.props.navigation.navigate("SignUp")
              }}
            >
              <Text style={styles.rightButtonTextStyle}>
                {"Signup"}
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
  getPointsText(points) {
    if (points % 1000 == 0) {
      return `${points / 1000}k`;
    } else {
      return points;
    }
  }




  renderCalendarList(){


    const {
      showTicketDetailModal,
      showCreateAlertModal,
      showUpgradePopUp,
      showLoginPopup,
      peakOffpeakData,
      PeakOffPeakMonth,
      classSelected,
      sliderPoints,
      isSliderRunDone,
      isRenderAll,
      classSelectedSlider,
      newClassSliderArray
    } = this.state;
    const today = moment().format("YYYY-MM-DD");
    let noFlightScheduleDate = moment(this.state.noFlightScheduleDate).format("DD MMM YYYY");
    let isLoader = this.state.isLoader

    let userInfo  =  this.props.userInfo
    
    let currentPlan = userInfo.gold_member

    let isLoggedIn = this.props.isLoggedIn

      return(
        <View style={[styles.calendarContainer,{
          marginTop: isLoggedIn ? verticalScale(100) : verticalScale(1),
        }]}>
        <StrictMode>
          {/* <ScrollView ref="_scrollView" showsHorizontalScrollIndicator={false}> */}
          <CalendarList
            ref={(ref) => {
              this._refCalendarList = ref;
            }}
            calendarStyle={styles.calendarStyle}
            style={{
              backgroundColor: colours.offWhite,
              marginTop:scale(20),
            }}
            firstDay={1}
            showScrollIndicator={false}
            onVisibleMonthsChange={(months) => {
              let firstDay = moment().startOf('month')
              let nextThreeMonth = moment(firstDay).add(2, 'months').format("YYYY-MM-DD")

              if (months[0].dateString >= nextThreeMonth && !this.props.isLoggedIn) {
                this.setState({ showLoginCnfmPopup: true }, () => {
                  this.renderLoginPopup()
                })
              }
            }
            }
            onDayPress={(day) => {
              let scheuldeDateKey = day
              let clickDate = day.dateString
              let isOffPeakValue1 = this.state.isOffPeakValue
              this.onDayPressed(day, isOffPeakValue1);
              this.setState({ onDayPressedDate: day.dateString, clickDate: clickDate ,scheuldeDateKey:scheuldeDateKey})
              this._toggleSubview();
              this.seatAvailabilityModal(day, isOffPeakValue1)
            }}
            pastScrollRange={0}
            minDate={today}
            calendarHeight={350}
            // futureScrollRange={peakOffpeakData ? this.state.monthKey : 12}
            futureScrollRange={ isLoggedIn ? 12 : 3}
            scrollEnabled={true}
            calendarWidth={scale(343)}
            horizontal={false}
            isOutBounded={this.state.selectedIndex == 0}
            classSelected={isSliderRunDone ? newClassSliderArray : this.state.classSelected}
            selectedDate={this.state.selectedDate}
            passengerCount={this.state.searchData.passengerCount}
            isOffPeakValue={this.state.isOffPeakValue}
            theme={{
              isOutBounded: this.state.selectedIndex == 0,
              classSelected: isSliderRunDone ? newClassSliderArray : this.state.classSelected,
              availabilityData:this.getLocations(isLoader),
              width: scale(20),
              selectedDayBackgroundColor: "gray",
              // backgroundColor: "#eafcfc",
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
              textDayFontSize: scale(12),
              textMonthFontSize: scale(12),
              textDayHeaderFontSize: scale(12),
              backgroundColor: '#ffffff',
              "stylesheet.calendar.header": {
                header: styles.header,
                monthText: styles.monthText,
              },
            }}
            listFooterComponent={() => {
              return <View style={{ height: verticalScale(70) }} />;
            }}
          />
          </StrictMode>
          {/* </ScrollView> */}
        </View>
      )
  }



  renderNoFlight(data,seatsAvailabilityData,noflightschedule,showTicketDetailModal,selectedDate,flightDate,isOffPeakValue1,day){
    let noFlightScheduleDate = moment(this.state.noFlightScheduleDate).format("DD MMM YYYY");
      const {onDayPressedDate,scheuldeDateKey} = this.state;
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
        <View style={{justifyContent:"center",alignItems:"center",backgroundColor: "#152d55", height: height / 2.7, width: width*0.9 ,  borderTopLeftRadius: scale(20),borderTopRightRadius:scale(20),marginStart:scale(15) }}>
        <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    marginTop:scale(10)
                  }}
                      onPress={() => { this.Hide_Custom_Alert2()
                  }}
                >
                  <Entypo
                    name="cross"
                    size={scale(35)}
                    color={colours.white}
                  />
                </TouchableOpacity>
        <Text style={styles.titleText}>{`${STRING_CONST.SEAT_AVAILABILITY
                  } (${!peakTxt
                    ? STRING_CONST.OFF_PEAK_FARE
                    : STRING_CONST.PEAK_FARE
                  })`}</Text>
        <Text style={{ fontSize: scale(14), color: colours.gray, padding: scale(7), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD, }}>{noFlightScheduleDate}</Text>
          <Image source={require('../../assets/sad.png')} style={{ height: scale(80), width: scale(80),margin:scale(6)  }} resizeMode="contain" />
          <Text style={{ fontSize: scale(14), color: colours.white, padding:scale(6), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD }}>{this.state.noFlightScheduleAlertTxt}</Text>
          
          {
            checkFlightCount ?
            <Fragment>
                {
                  checkFlightCount > 1 ?
                  <TouchableOpacity
                    onPress={()=>{
                        data = this.state.airLinesDetailsObject.inbound_availability;
                      if (data && data[onDayPressedDate]) {
                        dateString = getformattedDate(onDayPressedDate);
                        this.setState({
                          seatsAvailabilityData: data[onDayPressedDate],
                          noflightschedule: true,
                          showTicketDetailModal: true,
                          dateString:onDayPressedDate,
                          flightDate: onDayPressedDate,
                        });
                      }
                      this.Hide_Custom_Alert2()
                      this.seatAvailabilityModal(day, isOffPeakValue1)
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
                 Only one flight scheduled
               </Text>
               <View style={{height:scale(70)}}>
               {this._renderFlightList()}
               </View>
            
               </TouchableOpacity>
               
                  // <Text style={{ fontSize: scale(14), color: colours.gray, padding: scale(6), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD }}>{"There is no available flight for this date."}</Text>
               }
            </Fragment>
            : 
            <Text style={{ fontSize: scale(14), color: colours.gray, padding: scale(6), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD,marginBottom:scale(20) }}>{"There is no available flight for this date."}</Text>
          }
          {/* <TouchableOpacity onPress={() => { this.Hide_Custom_Alert2() }}
            style={{ backgroundColor: colours.lightBlueTheme, borderRadius: 9, margin: 7, marginTop: 10, }}
          >
            <Text style={{ marginStart: 30, marginEnd: 30, margin: 9, color: "#FFF" }}>OK</Text>
          </TouchableOpacity> */}
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
      peakOffpeakData,
      PeakOffPeakMonth,
      classSelected,
      sliderPoints,
      isSliderRunDone,
      isRenderAll,
      classSelectedSlider,
      newClassSliderArray
    } = this.state;
    const today = moment().format("YYYY-MM-DD");
    let noFlightScheduleDate = moment(this.state.noFlightScheduleDate).format("DD MMM YYYY");
    let isLoader = this.state.isLoader
    let userInfo  =  this.props.userInfo
    let currentPlan = userInfo.gold_member
    let isLoggedIn = this.props.isLoggedIn
    let height1

    if(isLoggedIn){
       height1 = scale(100)
    }
    else{
       height1 = scale(1)
    }
   
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0,height1)
    const translateY = diffClamp.interpolate({
      inputRange:[0,height1],
      outputRange:[0,-height1]
    })
  
     return (
      <Fragment>
        <SafeAreaView style={styles.container}>
          <View style={{ backgroundColor: "#FFF", flex: 1}}>
            {this.renderLoader()}
            {this.renderLoginPopup()}
            {this.renderHeader()}
           
            {
              isLoggedIn   ?
              <Animated.View
              style={{
              transform:[
                {translateY:translateY}
              ],
              zIndex:10,
              elevation:0,
              backgroundColor:"#FFFFFF",
              borderTopColor:"#FFFFFF",borderTopWidth:3,
              borderWidth:1,borderColor:"#FFFFFF",  
            }}
            >
                {this.state.airLinesDetailsObject.availability
                              ? this.ticketClass()
                              : null}
                {this.fareView()}
                {this.state.searchData.isReturn
                  ? this.tabView()
                  : this.singleTabView()}
            </Animated.View>
            :
            <View>
            {this.state.airLinesDetailsObject.availability
                              ? this.ticketClass()
                              : null}

                {this.fareView()}
                {this.state.searchData.isReturn
                  ? this.tabView()
                  : this.singleTabView()}      
            </View>
            }
          {
            isLoggedIn ?
            <ScrollView
            style={{
              flex:1,position:"absolute",top:scale(60),left:0,right:0,bottom:0,
            }}
               onScroll={(e)=>{
                scrollY.setValue(e.nativeEvent.contentOffset.y)    
            }}
            scrollEventThrottle={16} 
        >
          <View style={{  flex: 1, marginTop:Platform.OS =="android"?scale(50):scale(0)}}>
           {this.renderCalendarList()}
           </View>
          </ScrollView>
            : 
            <View style={{  flex: 1,}}>
            {this.renderCalendarList()}
           </View>
          }
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
                  // this.postHogAnalytics(loggedInUserPostHog)
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
                isSingleButton={isAndroid() ? false : true}
                title={
                  isAndroid()
                    ? STRING_CONST.UPGRADE_MEMBERSHIP_TEXT
                    : STRING_CONST.LIMIT_EXCEEDED
                }
                message={
                  isAndroid()
                    ? STRING_CONST.CREATE_ALERT_LIMIT
                    : STRING_CONST.CREATE_ALERT_LIMIT_IOS
                }
                image={IMAGE_CONST.UPGRADE_MEMBERSHIP}
                leftButtonText={STRING_CONST.NO}
                rightButtonText={
                  isAndroid() ? STRING_CONST.UPGRADE : STRING_CONST.OK
                }
                onLeftButtonPress={() => {
                  this.setState({
                    showUpgradePopUp: false,
                  });

                  // this.props.navigation.navigate("MembershipContainerScreen")
                }}
                onRightButtonPress={() => {
                  this.setState({
                    showUpgradePopUp: false,
                  });
                  this.props.navigation.navigate("MembershipContainerScreen")
                  // After Verfiy app on live will uncommment this code accordinlgy.......
                  // if (isAndroid()) {
                  //   Linking.canOpenURL(Config.UPGRADE_MEMBERSHIP_URL).then(
                  //     (supported) => {
                  //       if (supported) {
                  //         Linking.openURL(Config.UPGRADE_MEMBERSHIP_URL);
                  //       } else {
                  //         // console.log(
                  //         //   "Can not open URI: " + Config.UPGRADE_MEMBERSHIP_URL
                  //         // );
                  //       }
                  //     }
                  //   );
                  // } else {
                  //   this.setState(
                  //     {
                  //       showUpgradePopUp: false,
                  //     },
                  //     () => {
                  //       this.props.navigation.navigate(
                  //         STRING_CONST.PRICING_SCREEN
                  //       );
                  //     }
                  //   );
                  // }
                }}
              />
            )}
            {showLoginPopup && (
              <PopUpComponent
                isSingleButton={false}
                title={STRING_CONST.LOGIN}
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
                  this.props.navigation.navigate("Anonymous");
                }}
              />
            )}
            {/* {this.state.showAirlineModal && (
            <Modal isVisible={true}>
              <View style={styles.airlineContainerView}>
                <View style={styles.airlineViewHeader}>
                  <Text style={styles.airlineHeaderText}>
                    {STRING_CONST.AIRLINE_MEMBERSHIP_TIERS}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ showAirlineModal: false });
                    }}
                  >
                    {IMAGE_CONST.GREY_CROSS}
                  </TouchableOpacity>
                </View>
                <View style={styles.airlineInnerContainerView} />
                <Text style={styles.confirmTierText}>
                  {STRING_CONST.CONFIRM_AIRLINE_TIERS}
                </Text>
                <FlatList
                  style={{ marginTop: verticalScale(10) }}
                  keyboardShouldPersistTaps="always"
                  data={this.props.airlinesMembershipDetails}
                  renderItem={({ item, index }) => {
                    return this.renderListItem(item, index);
                  }}
                />
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => {
                    const {
                      userSelectedAirline,
                      userSelectedAirlineMembership,
                    } = this.state;
                    var userInfo = {};
                    userInfo[
                      "airline_name"
                    ] = userSelectedAirline.airline
                      .replace(" ", "_")
                      .toLowerCase();
                    userInfo["membership_type"] =
                      userSelectedAirlineMembership.value;
                    userInfo["airline_code"] = "BA"
                    this.props.onAirlineSelected(userInfo);
                    this.setState({ showAirlineModal: false });
                  }}
                >
                  <Text style={styles.okText}>{STRING_CONST.OK}</Text>
                </TouchableOpacity>
                <Text style={styles.airlineMessageText}>
                  {STRING_CONST.AIRLINE_MESSAGE}
                </Text>
              </View>
            </Modal>
          )} */}
          </View>
          {this.state.isNoflightScheudlePopup &&  this.renderNoFlight()}
        </SafeAreaView>
        {this.state.showDetailsModal && this.flightDetailsModal()}
      </Fragment>
    );
  }
}