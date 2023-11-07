/* Running Code.....*/

import React, { Component, Fragment, PureComponent, StrictMode } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, Animated, Linking, FlatList, TouchableHighlight, Alert, BackHandler, Dimensions, Platform, ScrollView, ImageBackground } from "react-native";
import * as RootNavigation from '../../router/RouteNavigation';
import { BA_EXE_URL, SKY_SCANNER_URL } from '../../helpers/config'
import styles from "./calenderStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import Ionicons from "react-native-vector-icons/Ionicons";
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
const { width, height } = Dimensions.get("window")
classes1 = ["Economy", "Premium Economy", "Business", "First"]
import {
  getCalendarLocals, isAndroid, getformattedDate, getBAClassesString, isPad, isEmptyString, getLocationNameWithCode, getAirlinesLogo, getAirlinesCode, getTimeFromMins,
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
let isAlertExpireDays = ""
let isAlertExpireDays2 = ""
var requiredKey = false
export default class CalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      classObject: [{ class: "Economy", isSelected: true, },
      { class: "Premium Economy", isSelected: true, },
      { class: "Business", isSelected: true, },
      { class: "First", isSelected: true, },
      ],
      classObject1: [{ class: "Economy", isSelected: true, },
      { class: "Premium Economy", isSelected: false, },
      { class: "Business", isSelected: false, },
      { class: "First", isSelected: false, },
      ],
      classSelected: this.props.searchData.classSelected,
      showCreateAlertModal: false,
      airLinesDetailsObject: this.props.airLinesDetailsObject,
      calendarSeatsObject: this.props.calendarSeatsObject && this.props.calendarSeatsObject,
      showTicketDetailModal: false,
      Alert_Visibility2: false,
      noFlightScheduleDate: "",
      noFlightScheduleAlertTxt: "",
      bounceValue: new Animated.Value(250), //This is the initial position of the subview
      seatsAvailabilityData: {}, isHidden: true, dateString: "", haveCrossIcon: true,
      departStartDate: "", departEndDate: "", returnStartDate: "", scheuldeDateKey: "", onPressDate: "",
      classSelected1: [true, false, false, false],
      returnEndDate: "", isRenderAll: false, searchData: this.props.searchData,
      showDateRangeError: false, showModelDropdownForBA: false, showModelDropdownForSS: false, createAlertPressed: false, selectedDate: {},
      showUpgradePopUp: false, showLoginPopup: false, showLoginCnfmPopup: false, isPeakValue: true, isOffPeakValue: true,
      userSelectedAirlineIndex: -1,
      userSelectedAirlineMembershipIndex: -1,
      userSelectedAirline: this.props.airlinesMembershipDetails[0],
      userSelectedAirlineMembership: this.props.airlinesMembershipDetails
        ? this.props.airlinesMembershipDetails[0].memberships[0]
        : null,
      outBoundVisibleArray: [], inBoundVisibleArray: [],
      flightDate: '', flightSchedule: this.props.flightSchedule, airlinesDetailPoints: this.props.airlinesDetailPoints,
      peakOffpeakData: this.props.peakOffpeakData.peakOffpeakData,
      offPeakKey: '', lastRefresh: Date(Date.now()).toString(),
      staticDateArray: this.props.staticDateArray,
      flightData: [], onDayPressedDate: "", isLoader: true, flightCount: 0, showDetailsModal: false, noflightschedule: false,
      clickDate: "", nextThreeMonth: "", cabinCode: "M", skyScannerCabinCode: "economy",
      accesstoken: "", deviceName: "", deviecBrand: "", isEmulator: "", isTablet: "",
      isNoflightScheudlePopup: false, cabinClassData: {},
      multipleFlightScheduleData: this.props.multipleFlightScheduleData, finalData: this.props.finalData,
      originalGuestOutBoundObj: {}, orignalGuestInboundObj: {}, availableOutBoundDate: {}, availableInBoundDate: {}, availability_data: {}, orignalInboundObj: {}, originalOutBoundObj: {},
      classTypeArray: [], startDate: this.props.startDate
    };
    getCalendarLocals();
    LocaleConfig.defaultLocale = "us";
    this.refreshScreen = this.refreshScreen.bind(this)
    this.scrollView = React.createRef();
    this._refCalendarList = React.createRef();
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
    return Math.abs(points) > 999 ? Math.sign(points) * ((Math.abs(points) / 1000).toFixed(2)) + 'k' : Math.sign(points) * Math.abs(points)
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.airLinesDetailsObject !== prevProps.airLinesDetailsObject) {
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

  renderCabinClass = () => {
    let cabinClassData = this.props.cabinClassData
    let classTypeArray = [{ "class": cabinClassData.economy ? "Economy" : false, "isSelected": cabinClassData.economy ? true : false, },
    { "class": cabinClassData.premium_economy ? "Premium Economy" : false, "isSelected": cabinClassData.premium_economy ? true : false, },
    { "class": cabinClassData.business ? "Business" : false, "isSelected": cabinClassData.business ? true : false, },
    { "class": cabinClassData.first ? "First" : false, "isSelected": cabinClassData.first ? true : false, }
    ]
    let classTypeArray1 = [{ "class": cabinClassData.economy ? "Economy" : false, "isSelected": cabinClassData.economy ? true : false, },
    { "class": cabinClassData.premium_economy ? "Premium Economy" : false, "isSelected": false, },
    { "class": cabinClassData.business ? "Business" : false, "isSelected": false, },
    { "class": cabinClassData.first ? "First" : false, "isSelected": false, }
    ]
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member
    this.setState({
      classTypeArray: bronzeMember ? classTypeArray1 : classTypeArray
    })
  }

  componentDidMount = async () => {
    let userData = this.props.userInfo
    let bronzeMember = userData && userData.bronze_member
    const today = moment();
    let selectedClass = this.props.selectedClass;
    let data = selectedClass ? selectedClass : this.props.searchData.classSelected;
    let avail = { "business": true, "economy": true, "first": true, "premium": true }
    var availability = await this.props.calendarSeatsObject && this.props.calendarSeatsObject ? this.props.calendarSeatsObject : avail
    let economy = data[0]
    let premium = data[1]
    let business = data[2]
    let first = data[3]
    let isEconomyAvailable = availability.economy ? true : ""
    let isPremiumAvailable = availability.premium ? true : ""
    let isBusinessAvailble = availability.business ? true : ""
    let isFirstAvailable = availability.first ? true : ""
    let classSelectedArray = []
    if (economy && isEconomyAvailable) {
      classSelectedArray.push(true)
    }
    else {
      classSelectedArray.push(false)
    }
    if (premium && isPremiumAvailable) {
      classSelectedArray.push(true)
    }
    else {
      classSelectedArray.push(false)
    }
    if (business && isBusinessAvailble) {
      classSelectedArray.push(true)
    }
    else {
      classSelectedArray.push(false)
    }
    if (first && isFirstAvailable) {
      classSelectedArray.push(true)
    }
    else {
      classSelectedArray.push(false)
    }
    var data2 = [true, false, false, false]
    this.setState({
      classSelected: bronzeMember ? data2 : classSelectedArray,
    });
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
    this.setState({ outBoundVisibleArray, inBoundVisibleArray, accesstoken });
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
    setTimeout(() => {
      this.setState({ startDate: null })
    }, 3000);
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

  getMultipleFlightScheduleData = (day) => {
    const { searchData } = this.state;
    let date = moment(day.dateString).format(STRING_CONST.DD_MM_YYYY_FORMAT)
    let airline = searchData.airline
    let destination = searchData.destinationCode
    let sourceCode = searchData.sourceCode
    let flightScheduleData = { "airline": `${airline}`, "destination": `${destination}`, "source": `${sourceCode}`, "date": `${date}` }
    this.props.getMultipleScheduleData(flightScheduleData)
  }
  seatAvailabilityModal = (day) => {
    const firstDay = moment().startOf('month')
    const nextThreeMonth = moment(firstDay).add(3, 'months').format(STRING_CONST.YYYY_MM_DD_FORMAT)
    let clickDate
    let userData = this.props.userInfo
    let bronzeMember = userData.bronze_member
    if (this.state.clickDate) {
      let date = this.state.clickDate
      let date1 = moment(date).format(STRING_CONST.DD_MM_YYYY_FORMAT)
      let date2 = moment(nextThreeMonth).format(STRING_CONST.DD_MM_YYYY_FORMAT)
      const dt1 = moment(date1, STRING_CONST.DD_MM_YYYY_FORMAT).valueOf()
      const dt2 = moment(date2, STRING_CONST.DD_MM_YYYY_FORMAT).valueOf()
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
    const { searchData, offPeakKey, showModelDropdownForBA, airLinesDetailsObject, } = this.state;
    let airline = searchData.airline
    let destination = searchData.destinationCode
    let sourceCode = searchData.sourceCode
    let date = moment(this.state.flightDate).format(STRING_CONST.DD_MM_YYYY_FORMAT)
    let flightScheduleData = { "airline": `${airline}`, "destination": `${destination}`, "source": `${sourceCode}`, "date": `${date}` }
    let checkFlightCount = 0
    let scheduleData = {}
    if (this.state.selectedIndex == 0) {
      scheduleData = this.props.flightSchedule.outbound_availability
    }
    else {
      scheduleData = this.props.flightSchedule.inbound_availability
    } let checkData = Object.entries(scheduleData)
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
    let seatsAvailableOutBoundData = {}
    let seatsAvailableInBoundData = {}
    if (airLinesDetailsObject && Object.keys(airLinesDetailsObject).length !== 0) {
      availableOutBoundDate = airLinesDetailsObject.outbound_availability;
    }
    if (airLinesDetailsObject && Object.keys(airLinesDetailsObject).length !== 0) {
      availableInBoundDate = airLinesDetailsObject.inbound_availability;
    }
    let availavleClassesData = this.state.airLinesDetailsObject.availability
    let data = this.state.seatsAvailabilityData;
    let economy = availavleClassesData.economy
    let premium = availavleClassesData.premium
    let business = availavleClassesData.business
    let first = availavleClassesData.first
    let pointsSS = this.props.airlinesDetailPoints.airlinesDetailPoints.points.SS && this.props.airlinesDetailPoints.airlinesDetailPoints.points.SS
    let pointsBA = this.props.airlinesDetailPoints.airlinesDetailPoints.points.BA && this.props.airlinesDetailPoints.airlinesDetailPoints.points.BA
    let points = [...pointsSS]
    if (this.props.isLoggedIn == false) {
      if (requiredKey === true) {
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
          obj = seatsAvailableOutBoundData && Object.entries(availableOutBoundDate)
        }
        else {
          obj = seatsAvailableInBoundData && Object.entries(availableInBoundDate)
        }
        if (day) {
          clickDate = day.dateString
        }
        obj.map((singleMap) => {
          const mapDate1 = moment(this.state.clickDate, STRING_CONST.DD_MM_YYYY_FORMAT).valueOf()
          const mapDate2 = moment(singleMap[0], STRING_CONST.DD_MM_YYYY_FORMAT).valueOf()
          if (mapDate1 === mapDate2) {
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
        obj = seatsAvailableOutBoundData && Object.entries(availableOutBoundDate)
      }
      else {
        obj = seatsAvailableInBoundData && Object.entries(availableInBoundDate)
      }
      if (day) {
        clickDate = day.dateString
      }
      let date = moment(clickDate).format(STRING_CONST.YYYY_MM_DD_FORMAT)
      obj.map((singleMap) => {
        const mapDate1 = moment(this.state.clickDate, STRING_CONST.DD_MM_YYYY_FORMAT).valueOf()
        const mapDate2 = moment(singleMap[0], STRING_CONST.DD_MM_YYYY_FORMAT).valueOf()
        if (mapDate1 === mapDate2) {
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

    let economySS, premiumSS, businessSS, firstSS
    let economyBA, premiumBA, businessBA, firstBA

    if (pointsBA && Object.keys(pointsBA).length !== 0 && this.props.isLoggedIn == false) {
      if (requiredKey === false) {
        if (offPeakKey == false) {
          pointsBA.map((singleMap) => {
            if (singleMap.one_way == true && singleMap.peak_type == "offpeak") {
              if (singleMap.economy_avios) {
                economyBA = singleMap.economy_avios
              }
              if (singleMap.premium_avios) {
                premiumBA = singleMap.premium_avios
              }
              if (singleMap.business_avios) {
                businessBA = singleMap.business_avios
              }
              if (singleMap.first_avios) {
                firstBA = singleMap.first_avios
              }
            }
          })
        }
        else {
          pointsBA.map((singleMap) => {
            if (singleMap.one_way == true && singleMap.peak_type == "peak") {
              if (singleMap.economy_avios) {
                economyBA = singleMap.economy_avios
              }
              if (singleMap.premium_avios) {
                premiumBA = singleMap.premium_avios
              }
              if (singleMap.business_avios) {
                businessBA = singleMap.business_avios
              }
              if (singleMap.first_avios) {
                firstBA = singleMap.first_avios
              }
            }
          })
        }
      }
      else {
        if (requiredKey === true) {
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
      if (requiredKey === false) {
        if (offPeakKey === false) {
          pointsSS.map((singleMap) => {
            if (singleMap.one_way == true && singleMap.peak_type == "offpeak") {
              if (singleMap.economy_avios) {
                economySS = singleMap.economy_avios
              }
              if (singleMap.premium_avios) {
                premiumSS = singleMap.premium_avios
              }
              if (singleMap.business_avios) {
                businessSS = singleMap.business_avios
              }
              if (singleMap.first_avios) {
                firstSS = singleMap.first_avios
              }
            }
          })
        }
        else {
          pointsSS.map((singleMap) => {
            if (singleMap.one_way == true && singleMap.peak_type == "peak") {
              if (singleMap.economy_avios) {
                economySS = singleMap.economy_avios
              }
              if (singleMap.premium_avios) {
                premiumSS = singleMap.premium_avios
              }
              if (singleMap.business_avios) {
                businessSS = singleMap.business_avios
              }
              if (singleMap.first_avios) {
                firstSS = singleMap.first_avios
              }
            }
          })
        }

      }
      else {
        if (requiredKey === true) {
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
    if (pointsBA && Object.keys(pointsBA).length !== 0 && this.props.isLoggedIn == true) {
      if (offPeakKey == false) {
        pointsBA.map((singleMap) => {
          if (singleMap.one_way == true && singleMap.peak_type == "offpeak") {
            if (singleMap.economy_avios) {
              economyBA = singleMap.economy_avios
            }
            if (singleMap.premium_avios) {
              premiumBA = singleMap.premium_avios
            }
            if (singleMap.business_avios) {
              businessBA = singleMap.business_avios
            }
            if (singleMap.first_avios) {
              firstBA = singleMap.first_avios
            }
          }
        })
      }
      else {
        pointsBA.map((singleMap) => {
          if (singleMap.one_way == true && singleMap.peak_type == "peak") {
            if (singleMap.economy_avios) {
              economyBA = singleMap.economy_avios
            }
            if (singleMap.premium_avios) {
              premiumBA = singleMap.premium_avios
            }
            if (singleMap.business_avios) {
              businessBA = singleMap.business_avios
            }
            if (singleMap.first_avios) {
              firstBA = singleMap.first_avios
            }
          }
        })
      }
    }

    if (pointsSS && Object.keys(pointsSS).length !== 0 && this.props.isLoggedIn == true) {
      if (offPeakKey === false) {
        pointsSS.map((singleMap) => {
          if (singleMap.one_way == true && singleMap.peak_type == "offpeak") {
            if (singleMap.economy_avios) {
              economySS = singleMap.economy_avios
            }
            if (singleMap.premium_avios) {
              premiumSS = singleMap.premium_avios
            }
            if (singleMap.business_avios) {
              businessSS = singleMap.business_avios
            }
            if (singleMap.first_avios) {
              firstSS = singleMap.first_avios
            }
          }
        })
      }
      else {
        pointsSS.map((singleMap) => {
          if (singleMap.one_way == true && singleMap.peak_type == "peak") {
            if (singleMap.economy_avios) {
              economySS = singleMap.economy_avios
            }
            if (singleMap.premium_avios) {
              premiumSS = singleMap.premium_avios
            }
            if (singleMap.business_avios) {
              businessSS = singleMap.business_avios
            }
            if (singleMap.first_avios) {
              firstSS = singleMap.first_avios
            }
          }
        })
      }
    }
    let economyClass, premiumClass, businessClas, firstClass
    let travelData = []
    let cabinClassData = this.props.cabinClassData
    if (cabinClassData) {
      if (cabinClassData.economy) {
        economyClass = cabinClassData.economy && "Economy"
      }
      if (cabinClassData.premium_economy) {
        premiumClass = cabinClassData.premium_economy && "Premium"
      }
      if (cabinClassData.business) {
        businessClas = cabinClassData.business && "Business"
      }
      if (cabinClassData.first) {
        firstClass = cabinClassData.first && "First"
      }
    }

    if (economyClass) {
      travelData[0] = economyClass
    }
    if (premiumClass) {
      travelData[1] = premiumClass
    }
    if (businessClas) {
      travelData[2] = businessClas
    }
    if (firstClass) {
      travelData[3] = firstClass
    }
    let trip_type = this.state.searchData.isReturn ? STRING_CONST.RETURN : STRING_CONST.ONE_WAY
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
      <Animated.View style={[ styles.animatedView, { transform: [{ translateY: this.state.bounceValue }], }, ]}>
        <View style={styles.animatedInnerView}>
          <View style={{ alignItems: STRING_CONST.CENTER, alignSelf: STRING_CONST.STRETCH, }}>
            <View style={[styles.titleView]}>
              <TouchableOpacity>
              </TouchableOpacity>
              <Text style={[styles.titleText, { paddingStart: scale(20) }]}>{searchData.selectedSource.city_name} - {searchData.selectedDestination.city_name}
                {` (${!offPeakKey ? STRING_CONST.OFF_PEAK_FARE : STRING_CONST.PEAK_FARE})`}
              </Text>
              <TouchableOpacity
                style={{ alignSelf: STRING_CONST.FLEX_END }}
                onPress={() => {
                  this.setState({
                    showTicketDetailModal: false, bounceValue: new Animated.Value(250),
                    isHidden: true,selectedDate: {}, showModelDropdownForBA: false, showModelDropdownForSS: false
                  });
                  this._toggleSubview();
                }}
              >
                {IMAGE_CONST.GREY_CROSS}
              </TouchableOpacity>
            </View>
            <Text style={styles.popupDateStyle}>{this.state.dateString} </Text>
            <View style={styles.availabiltyView}>
              <View style={{ marginTop: isPad() ? verticalScale(35) : verticalScale(10), }}>
                <Text style={{ color: colours.lightGreyish }}></Text>
              </View>
              <View style={{marginTop:scale(22)}}>
              <View style={{ marginTop: verticalScale(32)}}>
                <Text style={styles.pointSeatsText}>
                  {STRING_CONST.SEATS_TEXT}
                </Text>
              </View>
              <View style={{ marginTop: verticalScale(16)}}>
                <Text style={styles.pointSeatsText}>
                  {STRING_CONST.POINTS_TEXT}
                </Text>
              </View>
              </View>
              {
                economy ?
                  <View style={styles.popupClassView}>
                    <View style={styles.popupMainView}>
                      <Ionicons name="ios-radio-button-on" size={scale(12)} color={colours.economySeatColor} />
                      <Text style={[styles.classText, { color: colours.economySeatColor },]} >
                        {STRING_CONST.ECONOMY}
                      </Text>
                    </View>
                    <Text style={styles.seatNumberText}>
                      {economySeats ? economySeats : "0"}
                    </Text>
                    <Text style={styles.seatNumberText}>
                      {
                        <Fragment>
                          {economySS ? this.getPointsText(economySS) : economyBA ? this.getPointsText(economyBA) : "-"}
                        </Fragment>
                      }
                    </Text>
                  </View>
                  : null
              }
              {
                premium ?
                  <View style={styles.popupClassView}>
                    <View style={styles.popupMainView}>
                      <Ionicons name="ios-radio-button-on" size={scale(12)} color={colours.yellow} />
                      <Text style={[styles.classText, { color: colours.yellow, },]}>
                        {STRING_CONST.PREMIUM}
                      </Text>
                    </View>
                    <Text style={styles.seatNumberText}>
                      {
                        !bronzeMember ? <> {premiumSeats ? premiumSeats : "0"} </> : <> {"-"} </>
                      }
                    </Text>
                    <Text style={styles.seatNumberText}>
                      {
                        <Fragment>
                          {premiumSS ? this.getPointsText(premiumSS) : premiumBA ? this.getPointsText(premiumBA) : "-"}
                        </Fragment>
                      }
                    </Text>
                  </View>
                  : null
              }
              {
                business ?
                  <View style={styles.popupClassView}>
                    <View style={styles.popupMainView}>
                      <Ionicons name="ios-radio-button-on" size={scale(12)} color={colours.purple} />
                      <Text style={[styles.classText, { color: colours.purple, },]}>
                        {STRING_CONST.BUSINESS}
                      </Text>
                    </View>
                    <Text style={styles.seatNumberText}>
                      {!bronzeMember ? <> {businessSeats ? businessSeats : "0"} </> : <> {"-"}  </>}
                    </Text>
                    <Text style={styles.seatNumberText}>
                      {
                        <Fragment>
                          {businessSS ? this.getPointsText(businessSS) : businessBA ? this.getPointsText(businessBA) : "-"}
                        </Fragment>
                      }
                    </Text>
                  </View>
                  : null
              }
              {
                first ?
                  <View style={styles.popupClassView}>
                    <View style={styles.popupMainView}>
                      <Ionicons name="ios-radio-button-on" size={scale(12)} color={colours.firstSeatColor} />
                      <Text style={[styles.classText, { color: colours.firstSeatColor, },]}  >
                        {STRING_CONST.FIRST}
                      </Text>
                    </View>
                    <Text style={styles.seatNumberText}>
                      {!bronzeMember ? <> {firstSeats ? firstSeats : "0"}  </> : <>  {"-"}  </>}
                    </Text>
                    <Text style={styles.seatNumberText}>
                      {firstSS ? this.getPointsText(firstSS) : firstBA ? this.getPointsText(firstBA) : "-"}
                    </Text>
                    <Text style={styles.seatNumberText}>
                    </Text>
                  </View>
                  : null
              }
            </View>
            {
              checkFlightCount == 1 ?
                <Text style={[styles.seatNumberText1, { marginTop: scale(15), marginBottom: scale(5) }]}>
                  {STRING_CONST.ONLY_ONE_FLIGHT_SCHEDULE}
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
                    style={[styles.checkOnAirlineButton, {
                      marginTop: classSelectedArray.length > 2 ? scale(10) : scale(16)
                    }]}
                    onPress={() => {
                      if (trip_type == "one_way") {
                        this.setState({
                          showModelDropdownForBA: true,
                        })
                      }
                      else {
                        this.props.navigation.navigate("priceDetails", {
                          cabinClassData: this.state.cabinClassData,
                          headerTxt: "Booking Details",
                          trip_type: trip_type,
                          searchData: this.state.searchData,
                          classArray: classSelectedArray,
                          selectedDate: this.state.selectedDate,
                        })
                      }
                    }}
                  >
                    <Image source={IMG_CONST.BRITISH_AIRWAYS_TRANPARENT_LOGO} />
                    <Text
                      style={{ color: colours.white, marginLeft: scale(10), fontSize: scale(13) }}
                    >
                      {STRING_CONST.BOOK_ON_BA}
                    </Text>
                  </TouchableOpacity>
                  {showModelDropdownForBA &&
                    <View style={{ height: classSelectedArray.length > 2 ? scale(135) : scale(80), borderRadius: scale(3), marginTop: scale(-9), width: scale(334), marginBottom: scale(20), alignSelf: "center", }}>
                      {travelData.map((singleMap) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              if (this.props.isLoggedIn == true) {
                                if (singleMap == "Economy") {
                                  this.setState({
                                    skyScannerCabinCode: "economy",
                                    cabinCode: "M",
                                  })
                                }
                                if (singleMap == "Premium") {
                                  this.setState({
                                    skyScannerCabinCode: "premiumeconomy",
                                    cabinCode: "W"
                                  })
                                } if (singleMap == "Business") {
                                  this.setState({
                                    skyScannerCabinCode: "business",
                                    cabinCode: "C"
                                  })

                                } if (singleMap == "First") {
                                  this.setState({
                                    cabinCode: "F",
                                    skyScannerCabinCode: "first"
                                  })
                                }
                                this.setState({
                                  showModelDropdownForBA: false,
                                  showModelDropdownForSS: false
                                })
                                this.handleBaRedirection()
                              } else {
                                this.props.navigation.navigate(STRING_CONST.LOGIN)
                              }
                            }}
                            style={{
                              justifyContent: 'center', alignItems: 'center', paddingTop: classSelectedArray.length > 2 ? scale(6) : scale(1),
                              backgroundColor: singleMap == "Economy" ? "#dee3ff" : singleMap == "Premium" ? "#fef1dd" : singleMap == "Business" ? "#f1d9fc" : singleMap == "First" ? "#fcddea" : null
                            }}>
                            <Text style={[styles.classTxt, {
                              color: singleMap == "Economy" ? "#2044FF" : singleMap == "Premium" ? "#FEA41D" : singleMap == "Business" ? "#A400F1" : singleMap == "First" ? "#F31973" : null
                            }]}>
                              {singleMap}
                            </Text>
                          </TouchableOpacity>
                        )
                      })}
                    </View>
                  }
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
                                showModelDropdownForBA: false,
                                showModelDropdownForSS: false,
                                bounceValue: new Animated.Value(250),
                                isHidden: true,
                                selectedDate: {},
                              })
                              this._toggleSubview();
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
                                source: searchData.selectedSource,
                                destination: searchData.selectedDestination,
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
                                cabinClassData: this.props.cabinClassData,
                                classDataArray: classSelectedArray,
                                checkFlightCount: checkFlightCount
                              }
                              );
                            }}
                          >
                            {
                              checkFlightCount > 1 ?
                                <View style={{ marginTop: scale(15) }}>
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
                                showModelDropdownForBA: false,
                                showModelDropdownForSS: false
                              })
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
                                source: searchData.selectedSource,
                                destination: searchData.selectedDestination,
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
                                cabinClassData: this.props.cabinClassData,
                                classDataArray: classSelectedArray,
                                checkFlightCount: checkFlightCount
                              }
                              );
                            }}
                          >
                            <Text style={styles.aviosText2} >{STRING_CONST.NO_FLIGHT_SCHEDULE}</Text>
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

  handleBaRedirection = () => {
    const { selectedIndex, passengerCount, dateString, cabinCode, searchData, destination } = this.state;
    let sourceCode = searchData.selectedSource.code.toLowerCase()
    let destinationCode = searchData.selectedDestination.code.toLowerCase()
    let numberOfPassengers = searchData.passengerCount
    let oneWay = selectedIndex == 0 ? true : false
    const departInputDate = moment(dateString).format(STRING_CONST.DD_MM_YYYY1)
    const returnInputDate = moment().format(STRING_CONST.DD_MM_YYYY1)
    if (sourceCode) {
      const url = `${BA_EXE_URL}_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=${sourceCode}&destinationPoint=${destinationCode}&departInputDate=${departInputDate}${oneWay && departInputDate ? `&returnInputDate=${returnInputDate}` : ''}&oneWay=${oneWay}&RestrictionType=Restricted&NumberOfAdults=${numberOfPassengers}&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=${cabinCode}`
      Linking.openURL(url, '_blank')
    } else {
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
      <View style={{ flex: 1, }}>
        {
          flightData && flightData.map((singleItem) => {
            return (
              <View style={{ flex: 1, width: width }} >
                <TouchableOpacity
                  style={[styles.cellContainer]}
                  activeOpacity={0.6}
                  onPress={() => {
                    this.Hide_Custom_Alert2()
                    this.setState({ showDetailsModal: true, showTicketDetailModal: false,showModelDropdownForBA: false,showModelDropdownForSS: false})}}>
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
              <Animated.View style={[styles.animatedView1, { backgroundColor: "#FFF", borderColor: "#EFEFEF", transform: [{ translateY: this.state.bounceValue }], },]} >
                <View style={styles.animatedInnerView}>
                  <View style={{ alignItems: STRING_CONST.CENTER, alignSelf: STRING_CONST.STRETCH, }}>
                    <View style={[styles.titleView]}>
                      <TouchableOpacity onPress={() => { }}>
                        <Image source={IMAGE_CONST.BA_LOGO_CAL}
                          style={{ marginRight: scale(10), height: scale(30), width: scale(70), margin: scale(5), marginBottom: scale(10) }} />
                      </TouchableOpacity>
                      <Text style={styles.titleText1}>{`${STRING_CONST.SEAT_AVAILABILITY
                        } (${!this.state.isOffPeakValue
                          ? STRING_CONST.OFF_PEAK_FARE
                          : STRING_CONST.PEAK_FARE
                        })`}</Text>
                      <TouchableOpacity
                        style={styles.crossstyleView}
                        onPress={() => {
                          this.setState({ showDetailsModal: false,bounceValue: new Animated.Value(250),isHidden: true,selectedDate: {},});
                          this._toggleSubview();
                        }}
                      >
                        <Entypo name="cross" size={scale(27)} color={colours.lightGreyish} />
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
                    <View style={[styles.timingContainer]} activeOpacity={0.6} onPress={() => { }} >
                      <View style={{ flexDirection: "row", marginRight: scale(20) }}>
                        <Image
                          source={IMAGE_CONST.BIG_TAKE_OFF}
                          style={{ marginRight: scale(10), marginTop: scale(2), }}
                        />
                        <Text style={[styles.flightDetailText, { color: "#132C52", fontSize: scale(14), fontWeight: "600" },]}
                        >{`${selectedFlight.departure_time} ${selectedFlight.source_code}`}</Text>
                      </View>
                      <View style={{ flexDirection: "row", marginStart: scale(15) }}>
                        <Image
                          source={IMAGE_CONST.BIG_LANDING}
                          style={{ marginRight: scale(10) }}
                        />
                        <Text
                          style={[ styles.flightDetailText,{ color: "#132C52", fontSize: scale(14), fontWeight: "600" },]}
                        >{`${selectedFlight.arrival_time} ${selectedFlight.destination_code}`}</Text>
                      </View>
                    </View>
                    <View style={styles.singleFlightStyles}>
                      <View style={styles.singleFlightSubStyles}>
                        <Image source={IMAGE_CONST.AERO_LOGO} resizeMode="contain" style={{ height: scale(30), width: scale(54) }} />
                        <Text  style={[  styles.flightDetailText, { color: "#424448", fontWeight: "500",fontSize: scale(14),paddingTop: scale(5),padding: scale(1),},]}
                        >{STRING_CONST.AIRCRAFT}</Text>
                        <Text style={[ styles.flightDetailText,{ color: "#727272", fontWeight: "400", fontSize: scale(14), paddingTop: scale(5),padding: scale(1), }, ]}
                        >{`${selectedFlight.aircraft_details}`}</Text>
                      </View>
                      <View style={styles.singleFlightSubStyles}>
                        <Image source={IMAGE_CONST.TIME_LOGO} resizeMode="contain" style={{ height: scale(34), width: scale(34) }} />
                        <Text  style={[ styles.flightDetailText, {color: "#424448", fontWeight: "500", fontSize: scale(14),paddingTop: scale(8), padding: scale(1), }, ]}
                        >{STRING_CONST.DURATION}</Text>
                        <Text  style={[   styles.flightDetailText,{ color: "#727272",fontWeight: "400", fontSize: scale(14), paddingTop: scale(5), padding: scale(1),}, ]}
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

  renderClassValues() {
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
      let goldMember = userData.gold_member
      let silverMember = userData.silver_member
      let bronzeMember = userData.bronze_member
      let bronzeExpireDate = moment(this.state.departStartDate).add(19, 'days').format(STRING_CONST.YYYY_MM_DD_FORMAT)
      let silverExpireDate = moment(this.state.departStartDate).add(44, 'days').format(STRING_CONST.YYYY_MM_DD_FORMAT)
      let goldExpireDate = moment(this.state.departStartDate).add(89, 'days').format(STRING_CONST.YYYY_MM_DD_FORMAT)
      let bronzeExpirertnDate = moment(this.state.returnStartDate).add(19, 'days').format(STRING_CONST.YYYY_MM_DD_FORMAT)
      let silverExpirertnDate = moment(this.state.returnStartDate).add(44, 'days').format(STRING_CONST.YYYY_MM_DD_FORMAT)
      let goldExpirertnDate = moment(this.state.returnStartDate).add(89, 'days').format(STRING_CONST.YYYY_MM_DD_FORMAT)
      let txtForPopup = ""
      let alertDate = moment(this.state.departEndDate).format(STRING_CONST.YYYY_MM_DD_FORMAT)
      let rtnEndDate = moment(this.state.returnEndDate).format(STRING_CONST.YYYY_MM_DD_FORMAT)
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
          txtForPopup = STRING_CONST.GOLD_DATE_RANGE
          inbounddateRange = true
          days = 90
        }
        else {
          txtForPopup = STRING_CONST.GOLD_DATE_RANGE
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
          txtForPopup = STRING_CONST.SILVER_DATE_RANGE
          inbounddateRange = true
        }
        else {
          days = 45
          outbounddateRange = true
          txtForPopup = STRING_CONST.SILVER_DATE_RANGE
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
          txtForPopup = STRING_CONST.BRONZE_DATE_RANGE
        }
        else {
          days = 20
          outbounddateRange = true
          txtForPopup = STRING_CONST.BRONZE_DATE_RANGE
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
      this.state.classTypeArray.map((singleMap) => {
        newArray.push(singleMap.isSelected)
      })
      let travel_classes = getBAClassesString(classSelected);
      let classForAlert = this.getBAClassesStringForAlert(classSelected)
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
        start_date: moment(searchData.startDate).format(STRING_CONST.YYYY_MM_DD_FORMAT) || null,
        airlineMembership: membership,
        start_date: moment(searchData.startDate).format(STRING_CONST.YYYY_MM_DD_FORMAT) || null,
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
          start_date: moment(this.state.departStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT),
          end_date: moment(this.state.departEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT),
          arrival_start_date: this.state.searchData.isReturn
            ? moment(this.state.returnStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT)
            : "",
          arrival_end_date: this.state.searchData.isReturn
            ? moment(this.state.returnEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT)
            : "",
          availability_url: `/calendar${this.jsonToQueryString(url)}`,
        },
      };

      if (this.state.searchData.isReturn) {
        if (isAlertExpireDays && isAlertExpireDays2) {
          const trackData = {
            "Alert Type": "Created",
            "Alert Parameters": {
              airline: STRING_CONST.BRITISH_AIRWAYS,
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ? searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: selectedSource ? selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType: this.state.searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: classForAlert ? classForAlert : 'N/A',
              onlyAlertOffPeakAvailable: 'No',
              outboundStartDate: moment(this.state.departStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) ? moment(this.state.departStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) : 'N/A',
              outboundEndDate: moment(this.state.departEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) ? moment(this.state.departEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) : 'N/A',
              inboundStartDate:
                this.state.searchData.isReturn
                  ? moment(this.state.returnStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT)
                  : 'N/A',
              inboundEndDate: this.state.searchData.isReturn
                ? moment(this.state.returnEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT)
                : 'N/A',
            },
            "Old Alert Parameters": {
              airline: 'N/A',
              originIATA: 'N/A',
              destinationIATA: 'N/A',
              originCity: 'N/A',
              destinationCity: 'N/A',
              originCountry: 'N/A',
              destinationCountry: 'N/A',
              journeyType: "one_way",
              numberOfPassengers: 'N/A',
              cabinClasses: 'N/A',
              onlyAlertOffPeakAvailable: 'No',
              outboundStartDate: 'N/A',
              outboundEndDate: 'N/A',
              inboundStartDate: 'N/A',
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
              [{ text: 'OK', onPress: () => { } }],
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
              airline: STRING_CONST.BRITISH_AIRWAYS,
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ? searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: selectedSource ? selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType: this.state.searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: classForAlert ? classForAlert : 'N/A',
              onlyAlertOffPeakAvailable: 'No',
              outboundStartDate: moment(this.state.departStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) ? moment(this.state.departStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) : 'N/A',
              outboundEndDate: moment(this.state.departEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) ? moment(this.state.departEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT) : 'N/A',
              inboundStartDate:
                this.state.searchData.isReturn
                  ? moment(this.state.returnStartDate).format(STRING_CONST.DD_MM_YYYY_FORMAT)
                  : 'N/A',
              inboundEndDate: this.state.searchData.isReturn
                ? moment(this.state.returnEndDate).format(STRING_CONST.DD_MM_YYYY_FORMAT)
                : 'N/A',
            },
            "Old Alert Parameters": {
              airline: 'N/A',
              originIATA: 'N/A',
              destinationIATA: 'N/A',
              originCity: 'N/A',
              destinationCity: 'N/A',
              originCountry: 'N/A',
              destinationCountry: 'N/A',
              journeyType: "one_way",
              numberOfPassengers: 'N/A',
              cabinClasses: 'N/A',
              onlyAlertOffPeakAvailable: 'No',
              outboundStartDate: 'N/A',
              outboundEndDate: 'N/A',
              inboundStartDate: 'N/A',
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
              [{ text: 'OK', onPress: () => {  } }],
              { cancelable: false },
            );
          }, 400);
        }
      }
    }
  }

  verifyCreateAlert() {
    let userInfo = this.props.userInfo;
    const { departStartDate, } = this.state
    let trip_type = this.state.searchData.isReturn ? "return" : "one_way"
    if (userInfo.email_verified) {
      let allowedActiveAlerts = userInfo.allowed_active_alerts;
      let currentActiveAlerts = userInfo.current_active_alerts;
      if (allowedActiveAlerts > currentActiveAlerts) {
        this.onSubmitAlertPress();
      } else {
        if (userInfo.gold_member) {
          this.setState(
            {showCreateAlertModal: false, },
            () => {
              setTimeout(() => {
                Alert.alert(STRING_CONST.ALERT_REACH_LIMIT);
              }, 100);
            }
          );
        } else {
          if (!departStartDate) {
            this.setState({
              showDateRangeError: true
            })
          }
          else {
            this.setState(
              {
                showCreateAlertModal: false,
                showDateRangeError: false
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
            Alert.alert(STRING_CONST.VERIFY_EMAIL);
          }, 100);
        }
      );
    }
  }

  createAlertModal() {
    const { departStartDate, departEndDate,createAlertPressed,searchData,returnStartDate,returnEndDate, showDateRangeError} = this.state;
    let trip_type = this.state.searchData.isReturn ? "return" : "one_way"
    return (
      <View>
        <Modal isVisible={true} style={{ margin: 0, justifyContent: "flex-end" }}
        >
          <View style={styles.createAlertModalContainer}>
            <View style={{ margin: scale(20) }}>
              <View style={styles.createAlertText}>
                <Text style={styles.createAlertTxt} >
                  {STRING_CONST.CREATE_ALERT}
                </Text>
                <TouchableOpacity onPress={() => {this.setState({ showCreateAlertModal: false }) }} style={{ height: scale(30), width: scale(30) }}>
                  {IMAGE_CONST.GREY_CROSS}
                </TouchableOpacity>
              </View>
              <View style={styles.createAlertInnerContainer}>
                <View style={{ flexDirection: STRING_CONST.ROW, alignItems:STRING_CONST.CENTER }}>
                  <Image style={[  styles.createAlertTakeOffIcon, { marginHorizontal: scale(22) }, ]}
                    resizeMode="contain" source={IMG_CONST.DEPARTURE} />
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
                    <Text style={[styles.dateTextHeading, { marginBottom: departStartDate ? scale(5) : scale(0),  marginTop: departStartDate ? scale(10) : scale(25)}]}>
                      {STRING_CONST.DEPARTURE_DATE_RANGE}
                    </Text>
                    <Text style={styles.dateText}>
                      {`${departStartDate ? `${getformattedDate(departStartDate)}  -` : "" }  ${departEndDate ? `${getformattedDate(departEndDate)}`  : ""  }`}
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
                    <Image  style={[ styles.createAlertTakeOffIcon, {  marginHorizontal: scale(22), },]}
                      source={IMG_CONST.DEPARTURE}  resizeMode="contain" />
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
                              minDate: this.state.departStartDate, showDateRange: true,
                              selectedStartDate: hasStartDate ? returnStartDate : null,
                              selectedEndDate: hasStartDate ? returnEndDate : null,
                            }
                          );
                        }
                      }}
                    >
                      <Text style={[styles.dateTextHeading, {
                        marginBottom: returnStartDate ? scale(5) : scale(0),
                        marginTop: returnStartDate ? scale(10) : scale(25)
                      }]}>
                        {STRING_CONST.RETURN_DATE_RANGE}
                      </Text>
                      <Text
                        style={[
                          styles.dateText,{
                            color: departStartDate ? colours.darkBlueTheme : colours.lightGreyish }]} >
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
                              {STRING_CONST.DATE_RANGE_ALERT}
                            </Text>
                            : null
                        }
                      </Fragment>
                      :
                      <Fragment>
                        {
                          showDateRangeError && !returnEndDate ?
                            <Text style={styles.errorTextStyle}>
                              {STRING_CONST.DATE_RANGE_ALERT}
                            </Text>
                            : null
                        }
                      </Fragment>
                  }
                </Fragment>
              }
              <View>
                <Text style={{ fontSize: scale(16), fontWeight: "600", padding: scale(7), marginTop: scale(10), color: "#132C52" }}>Select Cabin Class</Text>
                {this.getClassType()}
              </View>
              {this.renderSubmitAlertButton1("Create Alert", () => {
                this.verifyCreateAlert();
              })}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  getClassType() {
    let isEconomySelected = this.state.classTypeArray[0].isSelected
    let isPremiumSelected = this.state.classTypeArray[1].isSelected
    let isBusinessSelected = this.state.classTypeArray[2].isSelected
    let isFirstSelected = this.state.classTypeArray[3].isSelected
    let userData = this.props.userInfo

    const { airLinesDetailsObject } = this.state
    let availability = airLinesDetailsObject.availability;

    const { classSelected } = this.state

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
    if (userData && userData !== undefined && userData !== null) {
      bronzeMember = userData.bronze_member
    }

    let isEconomyAvailable = availability.economy ? true : ""
    let isPremiumAvailable = availability.premium ? true : ""
    let isBusinessAvailble = availability.business ? true : ""
    let isFirstAvailable = availability.first ? true : ""

    let classAvialability = [isEconomyAvailable, isPremiumAvailable, isBusinessAvailble, isFirstAvailable]

    const emptyCount = classAvialability.filter(a => a.length === 0).length;

    return (
      <Fragment>
        {
          emptyCount == 2 ?
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
              {
                this.state.classTypeArray.map((item, index) => {
                  return (
                    <Fragment>
                      {
                        item.class ?
                          <Fragment>
                            <View>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: item.class == "Economy" ?
                                    "#edf0ff" : item.class == "Premium Economy" ?
                                      "#fef8ed" : item.class == "Business" ?
                                        "#f8ebfe" : item.class == "First" ?
                                          "#fde8f1" : null,
                                  borderRadius: scale(10), borderWidth: 0, marginVertical: verticalScale(7), alignItems: "center", width: scale(153), height: scale(120)
                                }}
                                onPress={() => {
                                  if (item.class == "Economy") {
                                    if (isBusinessSelected) {
                                      if (business) {
                                        if (
                                          (this.state.selectedIndex == 0 &&
                                            this.state.outBoundVisibleArray.includes("economy")) ||
                                          (this.state.selectedIndex == 1 &&
                                            this.state.inBoundVisibleArray.includes("economy"))
                                        ) {
                                          let newClassArray = this.state.classSelected;
                                          newClassArray[0] = !newClassArray[0];
                                          this.setState({
                                            classSelected: newClassArray
                                          });
                                        }
                                      }
                                    }
                                  }
                                  else if (item.class == "Business") {
                                    if (!bronzeMember) {
                                      if (isEconomySelected) {
                                        if (economy) {
                                          if (
                                            (this.state.selectedIndex == 0 &&
                                              this.state.outBoundVisibleArray.includes("business")) ||
                                            (this.state.selectedIndex == 1 &&
                                              this.state.inBoundVisibleArray.includes("business"))
                                          ) {
                                            let newClassArray = this.state.classSelected;
                                            newClassArray[2] = !newClassArray[2];
                                            this.setState({
                                              classSelected: newClassArray,
                                            });
                                          }
                                        }
                                      }
                                    }
                                    else {
                                      this.setState({ showCreateAlertModal: false })
                                      this.showAlert1()
                                    }
                                  }
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    if (item.class == "Economy") {
                                      if (isBusinessSelected) {
                                        if (business) {
                                          if (
                                            (this.state.selectedIndex == 0 &&
                                              this.state.outBoundVisibleArray.includes("economy")) ||
                                            (this.state.selectedIndex == 1 &&
                                              this.state.inBoundVisibleArray.includes("economy"))
                                          ) {
                                            let newClassArray = this.state.classSelected;
                                            newClassArray[0] = !newClassArray[0];
                                            this.setState({
                                              classSelected: newClassArray
                                            });
                                          }
                                        }
                                      }
                                    }
                                    else if (item.class == "Business") {
                                      if (!bronzeMember) {
                                        if (economy) {
                                          if (
                                            (this.state.selectedIndex == 0 &&
                                              this.state.outBoundVisibleArray.includes("business")) ||
                                            (this.state.selectedIndex == 1 &&
                                              this.state.inBoundVisibleArray.includes("business"))
                                          ) {
                                            let newClassArray = this.state.classSelected;
                                            newClassArray[2] = !newClassArray[2];
                                            this.setState({
                                              classSelected: newClassArray,
                                            });
                                          }
                                        }
                                      }
                                      else {
                                        this.setState({ showCreateAlertModal: false })
                                        this.showAlert1()
                                      }
                                    }
                                  }}
                                >
                                  <View style={{ alignSelf: "flex-end", justifyContent: "flex-end", marginTop: scale(6), marginStart: scale(80) }}>
                                    {
                                      item.class == "Economy" ?
                                        <MaterialIcon
                                          size={verticalScale(22)}
                                          name={item.isSelected && classSelected[0] ? "checkbox-marked-circle" : "radiobox-blank"}
                                          color={item.isSelected ? "#2044ff" : colours.lightGreyish}
                                        /> : item.class == "Business" ?
                                          <MaterialIcon
                                            size={verticalScale(22)}
                                            name={item.isSelected && classSelected[2] ? "checkbox-marked-circle" : "radiobox-blank"}
                                            color={item.isSelected ? "#af49de" : colours.lightGreyish}
                                          /> : null
                                    }
                                  </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "column", margin: scale(4) }}>
                                  <ImageBackground
                                    source={
                                      item.class == "Economy" ?
                                        IMAGE_CONST.ECONOMYC : item.class == "Premium Economy" ?
                                          IMAGE_CONST.PREMIUMC : item.class == "Business" ?
                                            IMAGE_CONST.BUSINESSC : item.class == "First" ?
                                              IMAGE_CONST.FIRSTC : null
                                    }
                                    resizeMode="contain"
                                    style={{ height: scale(40), width: scale(40), alignSelf: "center", justifyContent: "center", alignItems: "center" }}
                                  >
                                  </ImageBackground>
                                  <Text
                                    style={[styles.membershipSubListTextStyle, { marginLeft: scale(12), marginTop: scale(4), marginBottom: scale(9) }]}
                                  >
                                    {item.class == "First" ? "First Class " : item.class == "Premium Economy" ? "Prem Econ" : item.class}
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
            </View> :
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
              {
                this.state.classTypeArray.map((item, index) => {
                  return (
                    <Fragment>
                      {
                        item.class ?
                          <Fragment>
                            <View>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: item.class == "Economy" ?
                                    "#edf0ff" : item.class == "Premium Economy" ?
                                      "#fef8ed" : item.class == "Business" ?
                                        "#f8ebfe" : item.class == "First" ?
                                          "#fde8f1" : null,
                                  borderRadius: scale(10), borderWidth: 0, marginVertical: verticalScale(7), alignItems: "center", width: scale(153), height: scale(120)
                                }}
                                onPress={() => {
                                  if (item.class == "Economy") {
                                    if (isPremiumSelected || isBusinessSelected || isFirstSelected) {
                                      if (premium || business || first) {
                                        if (
                                          (this.state.selectedIndex == 0 &&
                                            this.state.outBoundVisibleArray.includes("economy")) ||
                                          (this.state.selectedIndex == 1 &&
                                            this.state.inBoundVisibleArray.includes("economy"))
                                        ) {
                                          let newClassArray = this.state.classSelected;
                                          newClassArray[0] = !newClassArray[0];
                                          this.setState({
                                            classSelected: newClassArray
                                          });
                                        }
                                      }
                                    }
                                  }
                                  else if (item.class == "Premium Economy") {
                                    if (!bronzeMember) {
                                      if (isEconomySelected || isBusinessSelected || isFirstSelected) {
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
                                          }
                                        }
                                      }
                                    }
                                    else {
                                      this.setState({ showCreateAlertModal: false })
                                      this.showAlert1()
                                    }
                                  }
                                  else if (item.class == "Business") {
                                    if (!bronzeMember) {
                                      if (isEconomySelected || isPremiumSelected || isFirstSelected) {
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
                                              classSelected: newClassArray,
                                            });
                                          }
                                        }
                                      }
                                    }
                                    else {
                                      this.setState({ showCreateAlertModal: false })
                                      this.showAlert1()
                                    }
                                  }
                                  else if (item.class == "First") {
                                    if (!bronzeMember) {
                                      if (isEconomySelected || isPremiumSelected || isBusinessSelected) {
                                        if (economy || premium || business) {
                                          if (
                                            (this.state.selectedIndex == 0 &&
                                              this.state.outBoundVisibleArray.includes("first")) ||
                                            (this.state.selectedIndex == 1 &&
                                              this.state.inBoundVisibleArray.includes("first"))
                                          ) {
                                            let newClassArray = this.state.classSelected;
                                            newClassArray[3] = !newClassArray[3];
                                            this.setState({
                                              classSelected: newClassArray,
                                            });
                                          }
                                        }
                                      }
                                    } else {
                                      this.setState({ showCreateAlertModal: false })
                                      this.showAlert1()
                                    }
                                  }
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    if (item.class == "Economy") {
                                      if (isPremiumSelected || isBusinessSelected || isFirstSelected) {
                                        if (premium || business || first) {
                                          if (
                                            (this.state.selectedIndex == 0 &&
                                              this.state.outBoundVisibleArray.includes("economy")) ||
                                            (this.state.selectedIndex == 1 &&
                                              this.state.inBoundVisibleArray.includes("economy"))
                                          ) {
                                            let newClassArray = this.state.classSelected;
                                            newClassArray[0] = !newClassArray[0];
                                            this.setState({
                                              classSelected: newClassArray
                                            });
                                          }
                                        }
                                      }
                                    }
                                    else if (item.class == "Premium Economy") {
                                      if (!bronzeMember) {
                                        if (isEconomySelected || isBusinessSelected || isFirstSelected) {
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
                                            }
                                          }
                                        }
                                      } else {
                                        this.setState({ showCreateAlertModal: false })
                                        this.showAlert1()
                                      }
                                    }
                                    else if (item.class == "Business") {
                                      if (!bronzeMember) {
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
                                              classSelected: newClassArray,
                                            });
                                          }
                                        }
                                      }
                                      else {
                                        this.setState({ showCreateAlertModal: false })
                                        this.showAlert1()
                                      }
                                    }
                                    else if (item.class == "First") {
                                      if (!bronzeMember) {
                                        if (economy || premium || business) {
                                          if (isEconomySelected || isPremiumSelected || isBusinessSelected) {
                                            if (
                                              (this.state.selectedIndex == 0 &&
                                                this.state.outBoundVisibleArray.includes("first")) ||
                                              (this.state.selectedIndex == 1 &&
                                                this.state.inBoundVisibleArray.includes("first"))
                                            ) {
                                              let newClassArray = this.state.classSelected;
                                              newClassArray[3] = !newClassArray[3];
                                              this.setState({
                                                classSelected: newClassArray,
                                              });
                                            }
                                          }
                                        }
                                      } else {
                                        this.showAlert1()
                                      }
                                    }
                                  }}
                                >
                                  <View style={{ alignSelf: "flex-end", justifyContent: "flex-end", marginTop: scale(6), marginStart: scale(80) }}>
                                    {
                                      item.class == "Economy" ?
                                        <MaterialIcon
                                          size={verticalScale(22)}
                                          name={item.isSelected && classSelected[0] ? "checkbox-marked-circle" : "radiobox-blank"}
                                          color={item.isSelected ? "#2044ff" : colours.lightGreyish}
                                        /> : item.class == "Premium Economy" ?
                                          <MaterialIcon
                                            size={verticalScale(22)}
                                            name={item.isSelected && classSelected[1] ? "checkbox-marked-circle" : "radiobox-blank"}
                                            color={item.isSelected ? "#f8a41e" : colours.lightGreyish}
                                          /> : item.class == "Business" ?
                                            <MaterialIcon
                                              size={verticalScale(22)}
                                              name={item.isSelected && classSelected[2] ? "checkbox-marked-circle" : "radiobox-blank"}
                                              color={item.isSelected ? "#af49de" : colours.lightGreyish}
                                            /> : item.class == "First" ?
                                              <MaterialIcon
                                                size={verticalScale(22)}
                                                name={item.isSelected && classSelected[3] ? "checkbox-marked-circle" : "radiobox-blank"}
                                                color={item.isSelected ? "#eb186f" : colours.lightGreyish}
                                              /> : null
                                    }
                                  </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "column", margin: scale(4) }}>
                                  <ImageBackground
                                    source={
                                      item.class == "Economy" ?
                                        IMAGE_CONST.ECONOMYC : item.class == "Premium Economy" ?
                                          IMAGE_CONST.PREMIUMC : item.class == "Business" ?
                                            IMAGE_CONST.BUSINESSC : item.class == "First" ?
                                              IMAGE_CONST.FIRSTC : null
                                    }
                                    resizeMode="contain"
                                    style={{ height: scale(40), width: scale(40), alignSelf: "center", justifyContent: "center", alignItems: "center" }}
                                  >
                                  </ImageBackground>
                                  <Text
                                    style={[styles.membershipSubListTextStyle, { marginLeft: scale(12), marginTop: scale(4), marginBottom: scale(9) }]}
                                  >
                                    {item.class == "First" ? "First Class " : item.class == "Premium Economy" ? "Prem Econ" : item.class}
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
      </Fragment>
    );
  }

  renderBottomButton(buttonText, onButtonPress) {
    return (
      <TouchableOpacity
        style={[
          styles.submitAlertView,
          {
            position: "absolute", bottom: scale(20),
            backgroundColor: "#132C52", width: scale(180)
          },
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
      <View
        style={
          styles.headerContainer
        }
      >
        <TouchableOpacity
          onPress={() => {
            setTimeout(() => {
              this.props.navigation.goBack()
            }, 700);
          }}
        >
          {IMAGE_CONST.IOS_BACK_ARROW}
        </TouchableOpacity>
        <View style={{}}>
          <View style={styles.locationView}>
            {
              this.state.searchData ?
                <View style={{ margin: scale(10) }}>
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
      </View>
    );
  }

  ticketDetailView() {
    let airline_code = getAirlinesCode(this.state.searchData.airline)
    let count = this.state.searchData.passengerCount
    return (
      <View style={styles.ticketDetailView}>
        <Text style={styles.ticketDetailText}>
          {airline_code} |{" "}
          {/* {membership.charAt(0).toUpperCase() + membership.slice(1)} ·{" "} */}
          {this.state.searchData.isReturn
            ? STRING_CONST.RETURN
            : STRING_CONST.ONE_WAY}{" "}
          · {count > 1 ? STRING_CONST.PASSENGERS : STRING_CONST.PASSENGER}
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
        { text: 'Upgrade', onPress: () => RootNavigation.navigationRef.navigate("MembershipContainerScreen") },
      ]
    );
  }

  ticketClass = () => {

    const { airLinesDetailsObject } = this.state
    let classSelected = this.state.classSelected
    let availability = airLinesDetailsObject.availability;

    let economy = classSelected[0]
    let premium = classSelected[1]
    let business = classSelected[2]
    let first = classSelected[3]

    let isEconomyAvailable = availability.economy ? true : ""
    let isPremiumAvailable = availability.premium ? true : ""
    let isBusinessAvailble = availability.business ? true : ""
    let isFirstAvailable = availability.first ? true : ""

    let classAvialability = [isEconomyAvailable, isPremiumAvailable, isBusinessAvailble, isFirstAvailable]

    const emptyCount = classAvialability.filter(a => a.length === 0).length;

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
    if (userData && userData !== undefined && userData !== null) {
      bronzeMember = userData.bronze_member
    }

    return (
      <Fragment>
        {
          emptyCount == 2 ?
            <View style={[styles.ticketClassView, {
              justifyContent: classSelected.length > 2 ? "center" : "center",
            }]}>
              {availability.economy && (
                <TouchableOpacity
                  style={[
                    styles.classButton]}
                  onPress={() => {
                    if (!bronzeMember) {
                      if (business) {
                        if (
                          (this.state.selectedIndex == 0 &&
                            this.state.outBoundVisibleArray.includes("economy")) ||
                          (this.state.selectedIndex == 1 &&
                            this.state.inBoundVisibleArray.includes("economy"))
                        ) {
                          let newClassArray = this.state.classSelected;
                          newClassArray[0] = !newClassArray[0];
                          this.setState({
                            classSelected: newClassArray
                          });
                        } else {
                          Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                        }
                      }
                    }
                    else {
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
                          : "#EFEFEF"
                        : this.state.inBoundVisibleArray.includes("economy")
                          ? colours.blue
                          : "#EFEFEF"
                    )}
                  {/* <Text style={styles.classTextStyle}>{STRING_CONST.ECONOMY}</Text> */}
                  {
                    this.state.selectedIndex == 0 ?
                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.outBoundVisibleArray.includes("economy") ? 1 : 0.3
                      }]}>{STRING_CONST.ECONOMY}</Text>
                      :
                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.inBoundVisibleArray.includes("economy") ? 1 : 0.3
                      }]}>{STRING_CONST.ECONOMY}</Text>
                  }
                </TouchableOpacity>
              )}

              {availability.business && (
                <TouchableOpacity
                  style={[styles.classButton]}
                  onPress={() => {
                    if (!bronzeMember) {
                      if (economy) {
                        if (
                          (this.state.selectedIndex == 0 &&
                            this.state.outBoundVisibleArray.includes("business")) ||
                          (this.state.selectedIndex == 1 &&
                            this.state.inBoundVisibleArray.includes("business"))
                        ) {
                          let newClassArray = this.state.classSelected;
                          newClassArray[2] = !newClassArray[2];
                          this.setState({
                            classSelected: newClassArray,
                          });
                        } else {
                          Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                        }
                      }
                    }
                    else {
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
                          : "#EFEFEF"
                        : this.state.inBoundVisibleArray.includes("business")
                          ? colours.purple
                          : "#EFEFEF"
                    )}
                  {/* <Text style={styles.classTextStyle}>{STRING_CONST.BUSINESS}</Text> */}
                  {
                    this.state.selectedIndex == 0 ?
                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.outBoundVisibleArray.includes("business") ? 1 : 0.3
                      }]}>{STRING_CONST.BUSINESS}</Text>
                      :
                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.inBoundVisibleArray.includes("business") ? 1 : 0.3
                      }]}>{STRING_CONST.BUSINESS}</Text>
                  }
                </TouchableOpacity>
              )}

            </View>

            :

            <View style={[styles.ticketClassView, {
              justifyContent: classSelected.length > 2 ? "center" : "center",
            }]}>
              {availability.economy && (
                <TouchableOpacity
                  style={[
                    styles.classButton]}
                  onPress={() => {
                    if (!bronzeMember) {
                      if (premium || business || first) {
                        if (
                          (this.state.selectedIndex == 0 &&
                            this.state.outBoundVisibleArray.includes("economy")) ||
                          (this.state.selectedIndex == 1 &&
                            this.state.inBoundVisibleArray.includes("economy"))
                        ) {
                          let newClassArray = this.state.classSelected;
                          newClassArray[0] = !newClassArray[0];
                          this.setState({
                            classSelected: newClassArray
                          });
                        } else {
                          Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                        }
                      }
                    }
                    else {
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
                          : "#EFEFEF"
                        : this.state.inBoundVisibleArray.includes("economy")
                          ? colours.blue
                          : "#EFEFEF"
                    )}
                  {/* <Text style={styles.classTextStyle}>{STRING_CONST.ECONOMY}</Text> */}
                  {
                    this.state.selectedIndex == 0 ?
                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.outBoundVisibleArray.includes("economy") ? 1 : 0.3
                      }]}>{STRING_CONST.ECONOMY}</Text>
                      :
                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.inBoundVisibleArray.includes("economy") ? 1 : 0.3
                      }]}>{STRING_CONST.ECONOMY}</Text>
                  }
                </TouchableOpacity>
              )}
              {availability.premium && (
                <TouchableOpacity
                  style={[styles.classButton]}
                  onPress={() => {
                    if (!bronzeMember) {
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
                    else {
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
                          : "#EFEFEF"
                        : this.state.inBoundVisibleArray.includes("premium")
                          ? colours.yellow
                          : "#EFEFEF"
                    )}
                  {
                    this.state.selectedIndex == 0 ?

                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.outBoundVisibleArray.includes("premium") ? 1 : 0.3
                      }]}>  {"Prem Econ"}</Text>
                      :

                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.inBoundVisibleArray.includes("premium") ? 1 : 0.3

                      }]}>  {"Prem Econ"}</Text>
                  }
                </TouchableOpacity>
              )}
              {availability.business && (
                <TouchableOpacity
                  style={[styles.classButton]}
                  onPress={() => {
                    if (!bronzeMember) {
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
                            classSelected: newClassArray,
                          });
                        } else {
                          Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                        }
                      }
                    }
                    else {
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
                          : "#EFEFEF"
                        : this.state.inBoundVisibleArray.includes("business")
                          ? colours.purple
                          : "#EFEFEF"
                    )}
                  {/* <Text style={styles.classTextStyle}>{STRING_CONST.BUSINESS}</Text> */}
                  {
                    this.state.selectedIndex == 0 ?
                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.outBoundVisibleArray.includes("business") ? 1 : 0.3
                      }]}>{STRING_CONST.BUSINESS}</Text>
                      :
                      <Text style={[styles.classTextStyle, {
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
                    if (!bronzeMember) {
                      if (economy || premium || business) {
                        if (
                          (this.state.selectedIndex == 0 &&
                            this.state.outBoundVisibleArray.includes("first")) ||
                          (this.state.selectedIndex == 1 &&
                            this.state.inBoundVisibleArray.includes("first"))
                        ) {
                          let newClassArray = this.state.classSelected;
                          newClassArray[3] = !newClassArray[3];
                          this.setState({
                            classSelected: newClassArray,
                          });
                        } else {
                          Alert.alert(`${this.state.searchData.passengerCount > 1 ? `Seats aren't available currently` : 'Seat isn’t available currently'}`);
                        }
                      }
                    }
                    else {
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
                          : "#EFEFEF"
                        : this.state.inBoundVisibleArray.includes("first")
                          ? colours.pink
                          : "#EFEFEF"
                    )}
                  {
                    this.state.selectedIndex == 0 ?

                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.outBoundVisibleArray.includes("first") ? 1 : 0.3
                      }]}>{STRING_CONST.FIRST}</Text>
                      :

                      <Text style={[styles.classTextStyle, {
                        opacity: this.state.inBoundVisibleArray.includes("first") ? 1 : 0.3

                      }]}>{STRING_CONST.FIRST}</Text>
                  }

                </TouchableOpacity>
              )}
            </View>
        }

      </Fragment>
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
      <View style={{ flexDirection: "row", backgroundColor: "#FFF", paddingHorizontal: scale(30) }}>
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
          <Text style={{ color: this.state.selectedIndex == 1  ? colours.lightBlueTheme : colours.lightGreyish, fontSize: scale(14),  }} >
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
            style={[styles.fareViewButton, {
                backgroundColor: isOffPeakValue ? colours.dimSkyBlueColor : colours.white, borderColor: colours.highlightBorderColor, },
            ]}
            onPress={() => {
              this.setState({
                isOffPeakValue: !this.state.isOffPeakValue,
              });
            }}
          >
            <MaterialIcon  name={"check-circle"} size={scale(16)} color={colours.darkBlueTheme} style={{ marginRight: scale(3) }}/>
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
            <Ionicons name="ios-radio-button-off" size={scale(16)} color={colours.greyHighlightColor}  style={styles.peakImageStyle}  />
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
    let txt = STRING_CONST.NO_FLIGHT_SCHEDULE
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

        if ((!scheduleDateKey) && (!availableDateKey)) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay, clickDate: actualDay, showTicketDetailModal: false, })
          availableDateKey ? this.setState({
            offPeakKey: availableDateKey.peak
          }) : this.setState({ offPeakKey: true })
          this.setState({ noFlightScheduleAlertTxt: STRING_CONST.NO_FLIGHT_AVAILABLE })
        }
        else if ((!scheduleDateKey) && availableDateKey) {
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
        else if ((!availableDateKey) && (scheduleDateKey)) {
          this.Show_Custom_Alert2()
          data = this.state.airLinesDetailsObject.outbound_availability;
          let seatsAvailabilityData = data[day.dateString]
          let noflightschedule = true
          let showTicketDetailModal = true
          availableDateKey ? this.setState({
            offPeakKey: availableDateKey.peak
          }) : this.setState({ offPeakKey: true })
          let selectedDate = day
          let flightDate = day.dateString
          this.setState({ isNoflightScheudlePopup: true })
          this.renderNoFlight(data, seatsAvailabilityData, noflightschedule, showTicketDetailModal, selectedDate, flightDate, isOffPeakValue1, day)
          this.setState({
            noFlightScheduleDate: actualDay, selectedDate: selectedDate, showTicketDetailModal: false,
            clickDate: actualDay
          })
          this.setState({ noFlightScheduleAlertTxt: STRING_CONST.NO_SEAT_AVAILABLE_IN_CLASS })
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
          this.setState({ noFlightScheduleDate: actualDay, clickDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: STRING_CONST.NO_FLIGHT_AVAILABLE, showTicketDetailModal: false, })

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
          this.setState({ noFlightScheduleDate: actualDay, clickDate: actualDay })
          availableDateKey ? this.setState({
            offPeakKey: availableDateKey.peak
          }) : this.setState({ offPeakKey: true })
          this.setState({ noFlightScheduleAlertTxt: STRING_CONST.NO_FLIGHT_SCHEDULE, showTicketDetailModal: false, })
        }
        else if (!availableDateKey && scheduleDateKey) {
          this.Show_Custom_Alert2()
          // Alert.alert("Alert", "No Seats Available!")
          data = this.state.airLinesDetailsObject.outbound_availability;
          let seatsAvailabilityData = data[day.dateString]
          let noflightschedule = true
          let showTicketDetailModal = true
          let selectedDate = day
          let flightDate = day.dateString
          this.setState({ isNoflightScheudlePopup: true })
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
          this.setState({ noFlightScheduleDate: actualDay, clickDate: actualDay, selectedDate: selectedDate, showTicketDetailModal: false, })
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
    let date = moment(day.dateString).format("DD-MM-YYYY")
    let airline = searchData.airline
    let destination = searchData.destinationCode
    let sourceCode = searchData.sourceCode
    let flightScheduleData = { "airline": `${airline}`, "destination": `${destination}`, "source": `${sourceCode}`, "date": `${date}` }
    this.props.getMultipleScheduleData(flightScheduleData)
  }
  getLocations = () => {
    const { airLinesDetailsObject, peakOffpeakData, searchData, staticDateArray } = this.state;
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
    if (availability && Object.keys(availability).length !== 0) {
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
        <View style={styles.modelViewStyle}>
          <View style={styles.modelSubView}>
            <View style={styles.modelStyleSubView}>
              <Image source={IMG_CONST.LOADER} style={{ height: verticalScale(200), width: verticalScale(200) }} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  Show_Custom_Alert2(visible) {
    this.setState({ Alert_Visibility2: visible });
  }
  Hide_Custom_Alert2() {
    this.setState({ Alert_Visibility2: false });
  }


  renderLoginPopup = () => {
    const { showLoginCnfmPopup } = this.state;
    return (
      <Modal
        transparent={true}
        visible={showLoginCnfmPopup}
        animationType={"none"}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View style={styles.mainView}>
          <View style={styles.innerView}>
            <View style={[ styles.titleView, {  justifyContent: 'space-between' }, ]}>
              <Text style={styles.titleTextStyle}>{"       "}</Text>
              <Text style={[styles.titleTextStyle, { textAlign: 'center' }]}>{"Sign In / Sign Up"}</Text>
              <TouchableOpacity  onPress={() => { this.setState({ showLoginCnfmPopup: false, haveCrossIcon: false });}}>
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
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: scale(320) }}>
              <TouchableOpacity
                style={styles.singleButtonStyle}
                onPress={() => {
                  this.setState({ showLoginCnfmPopup: false, })
                  this.props.navigation.navigate("SignIn")
                }}
              >
                <Text style={styles.rightButtonTextStyle}>
                  {STRING_CONST.SIGN_IN}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.singleButtonStyle}
                onPress={() => {
                  this.setState({ showLoginCnfmPopup: false, })
                  this.props.navigation.navigate("SignUp")
                }}
              >
                <Text style={styles.rightButtonTextStyle}>
                  {STRING_CONST.SIGN_UP}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderNoFlight(data, seatsAvailabilityData, noflightschedule, showTicketDetailModal, selectedDate, flightDate, isOffPeakValue1, day) {
    let noFlightScheduleDate = moment(this.state.noFlightScheduleDate).format("DD MMM YYYY");
    const { onDayPressedDate, scheuldeDateKey, onPressDate } = this.state;
    let scheduleData = {}
    if (this.state.selectedIndex == 0) {
      scheduleData = this.props.flightSchedule.outbound_availability
    }
    else {
      scheduleData = this.props.flightSchedule.inbound_availability
    }
    let checkFlightCount = 0
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
    if (data && data[onDayPressedDate]) {
      peakTxt = data[onDayPressedDate].peak
    }
    return (
      <Modal
        visible={this.state.Alert_Visibility2}
        animationType={"none"}
        transparent={true}
        onRequestClose={() => {
          this.Show_Custom_Alert2(!this.state.Alert_Visibility2);
        }}>
        <View style={[styles.animatedView2]}>
          <View style={{ justifyContent: "center", alignItems: "center", height: scale(260), width: width * 0.9, borderTopLeftRadius: scale(20), borderTopRightRadius: scale(20), marginStart: scale(15) }}>
            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: scale(10) }}
              onPress={() => {
                this.setState({ bounceValue: new Animated.Value(250),isHidden: true, selectedDate: {},}); this._toggleSubview(); this.Hide_Custom_Alert2()
              }}
            >
              <Entypo name="cross" size={scale(27)} color="#97adb6" />
            </TouchableOpacity>
            <Text style={styles.titleText}>{`${STRING_CONST.SEAT_AVAILABILITY
              } (${!peakTxt
                ? STRING_CONST.OFF_PEAK_FARE
                : STRING_CONST.PEAK_FARE
              })`}</Text>
            <Text style={{ fontSize: scale(14), color: "#41454b", padding: scale(7), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD, }}>{noFlightScheduleDate}</Text>
            <Image source={require('../../assets/calendar/sad.png')} style={{ height: scale(75), width: scale(75), margin: scale(6) }} resizeMode="contain" />
            <Text style={{ fontSize: scale(14), fontWeight: "600", color: "#132C52", padding: scale(6), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD }}>{this.state.noFlightScheduleAlertTxt}</Text>
            {
              checkFlightCount ?
                <Fragment>
                  {
                    checkFlightCount > 1 ?
                      <TouchableOpacity
                        onPress={() => {
                          economySeats = 0
                          premiumSeats = 0
                          businessSeats = 0
                          firstSeats = 0
                          if (this.state.selectedIndex == 0) {
                            data = this.state.airLinesDetailsObject.outbound_availability;
                            let onDayPressedDate = onPressDate.dateString
                            let dateString = getformattedDate(onDayPressedDate);
                            this.setState({
                              showTicketDetailModal: true,
                              noflightschedule: true,
                              dateString: dateString,
                              selectedDate: onPressDate,
                              flightDate: onDayPressedDate,
                            });
                            this.Hide_Custom_Alert2()
                            this.seatAvailabilityModal(day, isOffPeakValue1)
                          }
                          else {
                            data = this.state.airLinesDetailsObject.inbound_availability;
                            let dateString = getformattedDate(onDayPressedDate);
                            this.setState({
                              noflightschedule: true,
                              showTicketDetailModal: true,
                              showTicketDetailModal: true,
                              dateString: dateString,
                              flightDate: onDayPressedDate,
                            });
                            this.Hide_Custom_Alert2()
                            this.seatAvailabilityModal(day, isOffPeakValue1)
                          }
                        }}
                      >
                        <View style={{ marginTop: scale(5), marginBottom: scale(25) }}>
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
                        onPress={() => {
                          this.Hide_Custom_Alert2()
                        }}
                      >
                        <Text style={[styles.seatNumberText3, { marginTop: scale(2),marginBottom: scale(2), alignSelf: 'center' }]}>
                          {STRING_CONST.ONLY_ONE_FLIGHT_SCHEDULE}
                        </Text>
                        <View style={{ height: scale(70) }}>
                          {this._renderFlightList()}
                        </View>
                      </TouchableOpacity>
                  }
                </Fragment>
                :
                <Text style={{ fontSize: scale(14), color: colours.gray, padding: scale(6), fontFamily: STRING_CONST.appFonts.INTER_SEMI_BOLD, marginBottom: scale(20) }}>{"There is no available flight for this date."}</Text>
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
      startDate,
      isRenderAll
    } = this.state;
    const today = moment().format("YYYY-MM-DD");
    let isLoggedIn = this.props.isLoggedIn
    setTimeout(() => {
      if (startDate && this.scrollView && isRenderAll && this._refCalendarList) {
        let scrollY = 0
        scrollY = this._refCalendarList.current.getMonthScrollOffset(startDate)
        if (scrollY !== 0) {
          this.scrollView.current.scrollTo({ y: scrollY, animated: true });
        }
      }
    }, 700);
    return (
      <SafeAreaView style={styles.container}>
        <MyStatusBar />
        {this.renderHeader()}
        <View style={styles.subContainer}>
          {this.renderLoader()}
          {this.renderLoginPopup()}
          <View>
            {this.state.airLinesDetailsObject ? this.ticketClass() : null}
            {this.fareView()}
            {this.state.searchData.isReturn
              ? this.tabView()
              : this.singleTabView()}
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}
            onMomentumScrollEnd={() => {
              if (!isLoggedIn) {
                this.setState({ showLoginCnfmPopup: true }, () => {
                  this.renderLoginPopup()
                })
              }
            }}
            ref={this.scrollView}
          >
            <View style={[styles.calendarContainer, { backgroundColor: "#E4E4E4" }]} onStartShouldSetResponder={() => true}>
              <CalendarList
                ref={this._refCalendarList}
                calendarStyle={styles.calendarStyle}
                style={styles.calendarList}
                showScrollIndicator={false}
                onDayPress={(day) => {
                  let onPressDate = day
                  let scheuldeDateKey = day
                  let clickDate = day.dateString
                  let isOffPeakValue1 = this.state.isOffPeakValue
                  this.onDayPressed(day, isOffPeakValue1);
                  this.setState({ onDayPressedDate: day.dateString, clickDate: clickDate, scheuldeDateKey: scheuldeDateKey, onPressDate: onPressDate })
                  this._toggleSubview();
                  this.seatAvailabilityModal(day, isOffPeakValue1)
                }}
                current={today}
                pastScrollRange={0}
                minDate={today}
                futureScrollRange={isLoggedIn ? 12 : 3}
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
                  availabilityData: this.getLocations(),
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
                    margin: scale(10), borderColor: "red", borderWidth: 1
                  },
                }}
                listFooterComponent={() => {
                  return <View style={
                    styles.listFooter
                  } />;
                }}
              />
            </View>
          </ScrollView>
          {showTicketDetailModal && this.seatAvailabilityModal()}
          {showCreateAlertModal || showTicketDetailModal
            ? null
            : !this.state.showDetailsModal && this.renderBottomButton(STRING_CONST.CREATE_ALERT, () => {
              if (this.props.isLoggedIn) {
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
        {this.state.isNoflightScheudlePopup && this.renderNoFlight()}
        {this.state.showDetailsModal && this.flightDetailsModal()}
      </SafeAreaView>
    );
  }
}