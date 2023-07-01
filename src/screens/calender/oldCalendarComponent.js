import React, { Component, Fragment } from "react";
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
  BackHandler
} from "react-native";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import styles from "./calenderStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import * as CONFIG from "../../helpers/config";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/dist/Ionicons";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import * as IMG_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import Modal from "react-native-modal";
import { colours } from "../../constants/ColorConst";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { getAccessToken } from "../../constants/DataConst";
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
} from "../../utils/commonMethods";
import PopUpComponent from "../../shared/popUpComponent";
import * as Config from "../../helpers/config";
// let data1 = {"airline":"british-airways","sourceCode":"LON","destinationCode":"ABV","selectedDestination":{"city_name":"Abuja","code":"ABV","country_name":"Nigeria","latitude":9.006792,"longitude":7.263172,"name":"Nnamdi Azikiwe Intl","miles_required":5000,"distance_in_miles":2966,"available_classes":{"business":true,"economy":true,"premium":true,"first":false},"availability":{"outboundLeftCounter":0,"outbound":{"2022-03-25":{"peak":false,"business":{"seats":3,"points":31250},"economy":{"seats":6,"points":5000},"premium":{"seats":6,"points":20000}},"2022-03-27":{"peak":true,"economy":{"seats":2,"points":12500}}}}},"selectedSource":{"name":"London","code":"LON","type":"city","country_name":"United Kingdom","city_name":"London","airports":[{"name":"Gatwick","code":"LGW"},{"name":"Heathrow","code":"LHR"},{"name":"City","code":"LCY"},{"name":"Luton","code":"LTN"},{"name":"Southend","code":"SEN"},{"name":"Stansted","code":"STN"}],"latitude":51.148056,"longitude":-0.190278},"tier":"blue","passengerCount":1,"isReturn":false,"classSelected":[true,true,true,true],"airways":"british_airways","selectedStartDate":"2022-03-25"},
// let value1 = [Economy, Premium Economy, Business, First ]
let monthKey = 0
export default class CalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      classSelected:this.props.searchData.classSelected, 
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
      departStartDate: "",
      departEndDate: "",
      returnStartDate: "",
      returnEndDate: "",
      searchData: this.props.searchData,
      // searchData:{"airline":"british-airways","sourceCode":"LON","destinationCode":"ABV","selectedDestination":{"city_name":"Abuja","code":"ABV","country_name":"Nigeria","latitude":9.006792,"longitude":7.263172,"name":"Nnamdi Azikiwe Intl","miles_required":5000,"distance_in_miles":2966,"available_classes":{"business":true,"economy":true,"premium":true,"first":false},"availability":{"outboundLeftCounter":0,"outbound":{"2022-03-25":{"peak":false,"business":{"seats":3,"points":31250},"economy":{"seats":6,"points":5000},"premium":{"seats":6,"points":20000}},"2022-03-27":{"peak":true,"economy":{"seats":2,"points":12500}}}}},"selectedSource":{"name":"London","code":"LON","type":"city","country_name":"United Kingdom","city_name":"London","airports":[{"name":"Gatwick","code":"LGW"},{"name":"Heathrow","code":"LHR"},{"name":"City","code":"LCY"},{"name":"Luton","code":"LTN"},{"name":"Southend","code":"SEN"},{"name":"Stansted","code":"STN"}],"latitude":51.148056,"longitude":-0.190278},"tier":"blue","passengerCount":1,"isReturn":false,"classSelected":[true,true,true,true],"airways":"british_airways","selectedStartDate":"2022-03-25"},
      createAlertPressed: false,
      selectedDate: {},
      showUpgradePopUp: false,
      showLoginPopup: false,
      isPeakValue: true,
      isOffPeakValue: false,
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
      peakOffpeakData:this.props.peakOffpeakData.peakOffpeakData,
      PeakOffPeakMonth:"",
      offPeakKey: '',
      lastRefresh: Date(Date.now()).toString(),
      staticDateArray:[],

      monthNumber:this.props.route.params.selectedDate,

      economyPoints: "",
      premiumPoints: "",
      businessPoints: "",
      firstPoints: "",

      business: "",
      economy: "",
      premium: "",
      first: ""
    };
    getCalendarLocals();
    LocaleConfig.defaultLocale = "us";
    this.refreshScreen = this.refreshScreen.bind(this)
  }

  refreshScreen = () => {        
      for(let i =0; i<3; i++){
        this.setState({ lastRefresh: Date(Date.now()).toString() })
        console.log("LAST REFRESHING  ",this.state.lastRefresh)
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
    const {searchData} = this.state
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

  componentDidMount = () => {
    // console.log("check inside did mount all the selected classes #######    ", this.props.searchData.classSelected)
    this.getDates()
  
    const today = moment();
    let currentDate =  moment("2023-01-17T18:12:17.211Z", "DD-MM-YYYY").fromNow(today)


    
    let data = this.state.airLinesDetailsObject.availability;
    let outBound = this.state.airLinesDetailsObject.outbound_availability;
    let inBound = this.state.airLinesDetailsObject.inbound_availability;
    let outBoundVisibleArray = this.getVisibilityArray(outBound)
    let inBoundVisibleArray = this.getVisibilityArray(inBound)
    this.setState({
      outBoundVisibleArray,
      inBoundVisibleArray,
    });
    let classData = [];
    for (const item in data) {
      if (item == "economy") {
        if (this.state.classSelected[0] && data[item]) {
          classData.push(true);
        } else {
          classData.push(false);
        }
      }
      if (item == "premium") {
        if (this.state.classSelected[1] && data[item]) {
          classData.push(true);
        } else {
          classData.push(false);
        }
      }
      if (item == "business") {
        if (this.state.classSelected[2] && data[item]) {
          classData.push(true);
        } else {
          classData.push(false);
        }
      }
      if (item == "first") {
        if (this.state.classSelected[3] && data[item]) {
          classData.push(true);
        } else {
          classData.push(false);
        }
      }
    }
    this.setState({
      classSelected: classData,
    });
    if (this.props.route.params.focusedDate) {
      setTimeout(() => {
        this._refCalendarList.scrollToDay(
          this.props.route.params.focusedDate
        );
      });
    }
    //
    

   

    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  
  }
  seatAvailabilityModal() {
    let data = this.state.seatsAvailabilityData;
    let business = this.state.seatsAvailabilityData.business
    let economy = this.state.seatsAvailabilityData.economy
    let premium = this.state.seatsAvailabilityData.premium
    let first = this.state.seatsAvailabilityData.first

    let businessTax;
    let economyTax;
    let premiumTax;
    let firstTax;
    let economyPoints;
    let premiumPoints;
    let businessPoints;
    let firstPoints;

    // defind variable for inbound
    let returnBusinessTax;
    let returnEconomyTax;
    let returnPremiumTax;
    let returnFirstTax;
    let returnEconomyPoints;
    let returnPremiumPoints;
    let returnBusinessPoints;
    let returnFirstPoints;



    let points = this.props.airlinesDetailPoints.airlinesDetailPoints.points;
   
    let isReturn = this.state.searchData.isReturn
    let oneWay = []
    let returnWay = []

    if (points) {
      // returnWay = points.return
      // oneWay = points.one_way;
    
      // if (this.state.selectedIndex == 0) {
        // if (oneWay) {
          points.map((singleOneWay) => {

            if (singleOneWay.peak_type == "offpeak" && this.state.offPeakKey == false) {

              economyTax = singleOneWay.economy_tax;
              premiumTax = singleOneWay.premium_tax;
              businessTax = singleOneWay.business_tax;
              firstTax = singleOneWay.first_tax

              businessPoints = singleOneWay.business_avios
              economyPoints = singleOneWay.economy_avios
              premiumPoints = singleOneWay.premium_avios
              firstPoints = singleOneWay.first_avios;

            }
            else if (singleOneWay.peak_type == "peak" && this.state.offPeakKey == true) {
              economyTax = singleOneWay.economy_tax;
              premiumTax = singleOneWay.premium_tax;
              businessTax = singleOneWay.business_tax;
              firstTax = singleOneWay.first_tax

              businessPoints = singleOneWay.business_avios
              economyPoints = singleOneWay.economy_avios
              premiumPoints = singleOneWay.premium_avios
              firstPoints = singleOneWay.first_avios;
            }
          })
        // }
      // }
      // else {
      //   if (returnWay) {
      //     returnWay.map((singlereturnWay) => {
      //       console.log(" ######## on return ", singlereturnWay)
      //       console.log("is Selected index 1", this.state.selectedIndex)
      //       if (singlereturnWay.peak_type == "offpeak" && this.state.offPeakKey == false) {
      //         returnEconomyTax = singlereturnWay.economy_tax;
      //         returnPremiumTax = singlereturnWay.premium_tax;
      //         returnBusinessTax = singlereturnWay.business_tax;
      //         returnFirstTax = singlereturnWay.first_tax

      //         returnBusinessPoints = singlereturnWay.business_avios
      //         returnEconomyPoints = singlereturnWay.economy_avios
      //         returnPremiumPoints = singlereturnWay.premium_avios
      //         returnFirstPoints = singlereturnWay.first_avios;

      //       }
      //       else if (singlereturnWay.peak_type == "peak" && this.state.offPeakKey == true) {
      //         returnEconomyTax = singlereturnWay.economy_tax;
      //         returnPremiumTax = singlereturnWay.premium_tax;
      //         returnBusinessTax = singlereturnWay.business_tax;
      //         returnFirstTax = singlereturnWay.first_tax

      //         returnBusinessPoints = singlereturnWay.business_avios
      //         returnEconomyPoints = singlereturnWay.economy_avios
      //         returnPremiumPoints = singlereturnWay.premium_avios
      //         returnFirstPoints = singlereturnWay.first_avios;

      //       }
      //     })
      //   }
      // }

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
          <View style={{ alignItems: "center", alignSelf: "stretch" }}>
            <View style={[styles.titleView]}>
              <TouchableOpacity onPress={() => { }}>
                {IMAGE_CONST.DARK_CROSS}
              </TouchableOpacity>
              <Text style={styles.titleText}>{`${STRING_CONST.SEAT_AVAILABILITY
                } (${!data.peak ? STRING_CONST.OFF_PEAK_FARE : STRING_CONST.PEAK_FARE
                })`}</Text>
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

            <View style={styles.availabiltyView}>
              <View>
                <View
                  style={{
                    marginTop: isPad() ? verticalScale(35) : verticalScale(16),
                  }}
                >
                  <Text style={{ color: colours.lightGreyish }}></Text>
                </View>
                <View style={{ marginTop: verticalScale(35) }}>
                  <Text style={styles.pointSeatsText}>
                    {STRING_CONST.SEATS_TEXT}
                  </Text>
                </View>
                <View style={{ marginTop: verticalScale(16) }}>
                  <Text style={styles.pointSeatsText}>
                    {STRING_CONST.POINTS_TEXT}
                  </Text>
                </View>
                <View style={{ marginTop: verticalScale(16) }}>
                  <Text style={styles.pointSeatsText}>
                    Taxes
                  </Text>
                </View>
              </View>

              {/* {
                economy != undefined ? */}
                  <View>
                    <View
                      style={{ alignItems: "center", marginTop: verticalScale(20) }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(8)}
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
                        {data.economy ? data.economy.seats : "0"}
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          // this.state.selectedIndex == 0 ?
                            <Fragment>
                              {economyPoints
                                ? economyPoints.toLocaleString()
                                : "-"}
                            </Fragment>
                            // :
                            // <Fragment>
                            //   {returnEconomyPoints
                            //     ? this.getPointsText(returnEconomyPoints)
                            //     : "-"}
                            // </Fragment>
                        }
                        {/* {economy
                          ? this.getPointsText(economy)
                          : "-"} */}
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          // this.state.selectedIndex == 0 ?
                            <Fragment>   
                                                       
                              { economyTax ? economyTax.toLocaleString() : "-"}
                            </Fragment>
                            // :
                            // <Fragment>
                            //   {returnEconomyTax}
                            // </Fragment>
                        }
                      </Text>
                    </View>
                  </View>

              {/* //     : null
              // } */}

              {/* {
                premium != undefined ? */}

                  <View>
                    <View
                      style={{ alignItems: "center", marginTop: verticalScale(20) }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(8)}
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
                        {data.premium ? data.premium.seats : "0"}
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          // this.state.selectedIndex == 0 ?
                            <Fragment>
                              {premiumPoints
                                ? premiumPoints.toLocaleString()
                                : "-"}
                            </Fragment>

                            // :
                            // <Fragment>
                            //   {returnPremiumPoints
                            //     ? this.getPointsText(returnPremiumPoints)
                            //     : "-"}
                            // </Fragment>
                        }

                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          // this.state.selectedIndex == 0 ?
                            <Fragment>
                              {
                                premiumTax ? premiumTax.toLocaleString() : "-"
                              }
                            </Fragment>

                            // :
                            // <Fragment>
                            //   {returnPremiumTax}                         
                            // </Fragment>
                        }
                      </Text>
                    </View>
                  </View>

              {/* //     : null
              // } */}

              {/* {
                business != undefined ? */}

                  <View>
                    <View
                      style={{ alignItems: "center", marginTop: verticalScale(20) }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(8)}
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
                        {data.business ? data.business.seats : "0"}
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                        // this.state.selectedIndex == 0 ?
                          <Fragment>
                            {businessPoints
                              ? businessPoints.toLocaleString()
                              : "-"}
                          </Fragment>

                          // :
                          // <Fragment>
                          //   {returnBusinessPoints
                          //     ? this.getPointsText(returnBusinessPoints)
                          //     : "-"}
                          // </Fragment>

                        }

                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                        
                        // this.state.selectedIndex == 0 ?
                          <Fragment>
                            { businessTax ? businessTax.toLocaleString() : "-"}
                          </Fragment>
                          // :
                          // <Fragment>
                          //   {returnBusinessTax}
                          // </Fragment>

                        }
                      </Text>
                    </View>
                 
                  </View>

              {/* //     : null
              // } */}

              {/* {
                first != undefined ? */}

                  <View>
                    <View
                      style={{ alignItems: "center", marginTop: verticalScale(20) }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <Ionicons
                          name="ios-radio-button-on"
                          size={scale(8)}
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
                        {data.first ? data.first.seats : "0"}
                      </Text>
                      <Text style={styles.seatNumberText}>                        
                        {
                          // this.state.selectedIndex == 0 ?
                            <Fragment>
                              {firstPoints ? firstPoints.toLocaleString() : "-"}
                            </Fragment>
                            // :
                            // <Fragment>
                            //   {returnFirstPoints ? this.getPointsText(returnFirstPoints) : "-"}
                            // </Fragment>
                        }
                      </Text>
                      <Text style={styles.seatNumberText}>
                        {
                          // this.state.selectedIndex == 0 ?
                            <Fragment>
                              {firstTax ? firstTax.toLocaleString() : "-"}
                            </Fragment>
                            // :
                            // <Fragment>
                            //   {/* {returnFirstTax} */}
                            //   {firstTax}
                            // </Fragment>
                        }
                      </Text>
                    </View>
                  </View>

                  {/* : null
              } */}
            </View>
            <View style={styles.checkOnAirlineView}>
              <TouchableOpacity
                style={styles.checkOnAirlineButton}
                onPress={() => {
                  Linking.openURL(CONFIG.BA_URL);
                }}
              >
                <Image source={IMG_CONST.BRITISH_AIRWAYS_TRANPARENT_LOGO} />
                <Text
                  style={{ color: colours.white, marginLeft: scale(10), fontSize: scale(13) }}
                >
                  {STRING_CONST.BOOK_ON_BA}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginBottom:scale(12)}}
                onPress={() => {
                  // console.log("#######  calendar popup  ",this.state.isOffPeakValue)
                  this.setState({
                    showTicketDetailModal: false
                  })
                  // this.props.navigation.navigate("test1")
                  this.props.navigation.navigate(
                    'finfFlightDetails1', {
                    date: this.state.flightDate,
                    dateString: this.state.dateString,
                    seatsAvailabilityData: this.state.seatsAvailabilityData,
                    isOutBounded: this.state.selectedIndex == 0,
                    classSelected: this.state.classSelected,
                    selectedDate: this.state.selectedDate,
                    passengerCount: this.state.searchData.passengerCount,
                    isOffPeakValue: this.state.isOffPeakValue,
                    economyPoints: this.state.selectedIndex == 0 ? economyPoints : returnEconomyPoints,
                    premiumPoints: this.state.selectedIndex == 0 ? premiumPoints : returnPremiumPoints,
                    businessPoints: this.state.selectedIndex == 0 ? businessPoints : returnBusinessPoints,
                    firstPoints: this.state.selectedIndex == 0 ? firstPoints : returnFirstPoints,
                    businessTax: this.state.selectedIndex == 0 ? businessTax : returnBusinessTax,
                    economyTax: this.state.selectedIndex == 0 ? economyTax : returnEconomyPoints,
                    premiumTax: this.state.selectedIndex == 0 ? premiumTax : returnPremiumTax,
                    firstTax: this.state.selectedIndex == 0 ? firstTax : returnFirstTax,
                  }
                  );
                }}

              >
                <Text style={styles.aviosText} >
                  {STRING_CONST.CLICK_HERE_FOR_INFO}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
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
        airlineSelected: `${airline}_${membership}`,
        airlineMembership: membership,
        aCode: searchData.airways.value,
        numberOfPassengers: searchData.passengerCount,
        tclass: "Economy",
        tValue: "economy",
        membership: membership,
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
          membership_type: membership,
          start_date: this.state.departStartDate,
          end_date: this.state.departEndDate,
          arrival_start_date: this.state.searchData.isReturn
            ? this.state.returnStartDate
            : "",
          arrival_end_date: this.state.returnEndDate
            ? this.state.returnEndDate
            : "",
          availability_url: `/calendar${this.jsonToQueryString(url)}`,
        },
      };
      // console.log("PRINT BODY BEFORE SEND #######",JSON.stringify(body))
      this.props.onSubmitAlertPress(body);
      this.setState({
        departStartDate: "",
        departEndDate: "",
        returnStartDate: "",
        returnEndDate: "",
        createAlertPressed: false,
      });
    }
  }

  verifyCreateAlert() {
    let userInfo = this.props.userInfo;
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
          this.setState(
            {
              showCreateAlertModal: false,
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
    } = this.state;
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
              {this.renderSubmitAlertButton(STRING_CONST.SUBMIT_ALERT, () => {
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

    // console.log("CHECK SEARCH DATA #######   ",this.state.searchData)
    return (
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
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
    return (
      <View style={styles.ticketDetailView}>
        <Text style={styles.ticketDetailText}>
          {airline_code} |{" "}
          {membership.charAt(0).toUpperCase() + membership.slice(1)} ·{" "}
          {this.props.route.params.searchData.isReturn
            ? STRING_CONST.RETURN
            : STRING_CONST.ONE_WAY}{" "}
          · {this.state.searchData.passengerCount} Passenger{" "}
        </Text>
      </View>
    );
  }

  getIcon(icon, color) {
    return <MaterialIcon name={icon} size={scale(14)} color={color} />;
  }

  ticketClass() {
    let classes = this.state.airLinesDetailsObject.availability;

    


    let economy = this.state.classSelected[0]
    let premium = this.state.classSelected[1]
    let business = this.state.classSelected[2]
    let first = this.state.classSelected[3]

    console.log("state classes here    ", this.state.classSelected)

    console.log("check classes here ¢¢¢¢¢¢¢    ",classes)
  
    // economy: searchData.classSelected[0],
    // premium: searchData.classSelected[1],
    // first: searchData.classSelected[2],
    // business: searchData.classSelected[3],

    console.log("economy #######    ",economy)
    console.log("premium #######    ",premium)
    console.log("business #######    ",business)
    console.log("first #######    ",first)
  
    return (
      <View style={styles.ticketClassView}>
        {classes.economy && (
          <TouchableOpacity
            style={[styles.classButton]}
            onPress={() => {
              if(premium || business || first) {
                if (
                  (this.state.selectedIndex == 0 &&
                    this.state.outBoundVisibleArray.includes("economy")) ||
                  (this.state.selectedIndex == 1 &&
                    this.state.inBoundVisibleArray.includes("economy"))
                ) {
                  let newClassArray = this.state.classSelected;
                  newClassArray[0] = !newClassArray[0];
  
                  console.log("#######    newClassArray",newClassArray)
                  this.setState({
                    classSelected: newClassArray,
                  });
                } else {
                  alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);
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
              if(economy || business || first) {
                if (
                  (this.state.selectedIndex == 0 &&
                    this.state.outBoundVisibleArray.includes("premium")) ||
                  (this.state.selectedIndex == 1 &&
                    this.state.inBoundVisibleArray.includes("premium"))
                ) {
                  let newClassArray = this.state.classSelected;
                  newClassArray[1] = !newClassArray[1];
                  this.setState({
                    classSelected: newClassArray,
                  });
                } else {
                  alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);
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
              if(economy || premium || first) { 
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
                  alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);

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
              if(economy || premium ||  business) { 
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
                  alert(`${this.state.searchData.passengerCount} ${this.state.searchData.passengerCount > 1 ? `seats aren't available currently` : 'seat isn’t available currently'}`);  
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
    // console.log("YES HERE ‹‹‹‹‹‹‹‹‹")
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
              style={{ marginRight: scale(5) }}
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
                marginLeft: scale(5),
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
              size={scale(20)}
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
    const { isOffPeakValue, isPeakValue, airLinesDetailsObject, } = this.state;
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
        if (scheduleDateKey && !availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Seats Available" })
        }
        else if (!scheduleDateKey && availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Scheduled" })
        }
        else if (!scheduleDateKey && !availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Available" })
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
        if (scheduleDateKey && !availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Seats Available" })
          // Alert.alert("Alert", "No Seats Available!")
        }
        else if (!scheduleDateKey && availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Schedule" })
          // Alert.alert("Alert", "No Flight Schedule!")
        }
        else if (!scheduleDateKey && !availableDateKey) {
          this.Show_Custom_Alert2()
          this.setState({ noFlightScheduleDate: actualDay })
          this.setState({ noFlightScheduleAlertTxt: "No Flight Available" })
          // Alert.alert("Alert", "No Flight Available!")
        }
        else if (scheduleDateKey && availableDateKey) {
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
  }



 getDates = () =>{
    var dateArray = [];
    let today  = new Date()
    let endDay = new Date("2024-01-01")
    var currentDate = moment(today);
    var stopDate = moment(endDay);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    // console.log("check dateArray value #######    ",dateArray)
    this.setState({
      staticDateArray:dateArray
    })
    return dateArray;


}



  getLocations = () => {
    const { isOffPeakValue, isPeakValue, airLinesDetailsObject, staticDateArray,peakOffpeakData} = this.state;

    // console.log("static Date Array #######        ",staticDateArray)

    let flightSchedule = this.props.flightSchedule;
    let outboundData = {};
    let inboundData = {};
    let scheduleOutBoundDate = {}
    let availableOutBoundDate = {}
    let scheduleInboundData = {}
    let availableInBoundDate = {}

    if (flightSchedule) {
      // console.log("YES CHECK FLIGHT SCHEDULE ###    ",flightSchedule)
      scheduleOutBoundDate = flightSchedule.outbound_availability
      availableOutBoundDate = airLinesDetailsObject.outbound_availability;
      scheduleInboundData = flightSchedule.inbound_availability
      availableInBoundDate = airLinesDetailsObject.inbound_availability;
      // for outbound check
      if(scheduleOutBoundDate && availableOutBoundDate) {
        for (let i of Object.keys(scheduleOutBoundDate)) {
          if (availableOutBoundDate[i]) {
            outboundData[i] = availableOutBoundDate[i];
          }
        }
      }
     
      if(scheduleInboundData && availableInBoundDate) {        
        for (let i of Object.keys(scheduleInboundData)) {
          if (availableInBoundDate[i]) {
            inboundData[i] = availableInBoundDate[i];
          }
        }
      }     
    }
   let dateArray = this.state.staticDateArray.filter(val => !peakOffpeakData.includes(val));
    let Obj = {}
    for (let data of dateArray) {
        Obj[data] = {"peak":false}
    } 
    let originalOutBoundObj = {    
      ...Obj,
      ...outboundData
    }
    let orignalInboundObj = {
      ...Obj,
      ...inboundData
    }
    
    finalData = {
      outbound_availability: peakOffpeakData ? originalOutBoundObj : outboundData,
      inbound_availability: peakOffpeakData ? orignalInboundObj : inboundData,
      availability: airLinesDetailsObject.availability,
      source: airLinesDetailsObject.source,
      destination: airLinesDetailsObject.destination,
    };
    return finalData;
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

  render() {
    const {
      showTicketDetailModal,
      showCreateAlertModal,
      showUpgradePopUp,
      showLoginPopup,
      peakOffpeakData,
      PeakOffPeakMonth
    } = this.state;
    const today = moment().format("YYYY-MM-DD");
    let noFlightScheduleDate = moment(this.state.noFlightScheduleDate).format("DD MMM YYYY");
    // const today = moment().add(1,"day").format("YYYY-MM-DD")     
    console.log("check month value inside render   #######     ",monthKey)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {this.renderHeader()}        
          {this.state.airLinesDetailsObject.availability
            ? this.ticketClass()
            : null}
          <View style={{ marginTop: verticalScale(15), flex: 1 }}>
            {this.fareView()}
            {this.props.route.params.searchData.isReturn
              ? this.tabView()
              : this.singleTabView()}
            <View style={styles.calendarContainer}>
              <CalendarList
                ref={(ref) => {
                  this._refCalendarList = ref;
                }}
                  calendarStyle={styles.calendarStyle}
                style={{
                  backgroundColor: colours.offWhite,
                }}
                firstDay={1}
                showScrollIndicator={false}
                onVisibleMonthsChange={(months) => { }}
                onDayPress={(day) => {
                  let isOffPeakValue1 = this.state.isOffPeakValue
                  this.onDayPressed(day, isOffPeakValue1);
                  this._toggleSubview();
                }}
                pastScrollRange={0}
                minDate={today}              
                calendarHeight={350}
                futureScrollRange={peakOffpeakData ? 18 :  12}
                scrollEnabled={true}
                calendarWidth={scale(343)}
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
                  width: scale(20) ,                                    
                  selectedDayBackgroundColor:"gray",
                  calendarBackground: colours.white,
                  textSectionTitleColor: colours.lightGreyish,
                  selectedDayTextColor: colours.white,
                  todayTextColor: colours.lightBlueTheme,
                  textDisabledColor: colours.lightGreyish,
                  selectedDotColor: colours.white,
                  monthTextColor: colours.lightBlueTheme,
                  textDayFontWeight: "300",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  textDayFontSize: scale(12),
                  textMonthFontSize: scale(12),
                  textDayHeaderFontSize: scale(12),
                  "stylesheet.calendar.header": {
                    header: styles.header,
                    monthText: styles.monthText,
                  },
                }}
                listFooterComponent={() => {
                  return <View style={{ height: verticalScale(70) }} />;
                }}
              />
            </View>
          </View>
          {showTicketDetailModal && this.seatAvailabilityModal()}
          {showCreateAlertModal || showTicketDetailModal
            ? null
            : this.renderBottomButton(STRING_CONST.CREATE_ALERT, () => {
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
              }}
              onRightButtonPress={() => {
                this.setState({
                  showUpgradePopUp: false,
                });
                if (isAndroid()) {
                  Linking.canOpenURL(Config.UPGRADE_MEMBERSHIP_URL).then(
                    (supported) => {
                      if (supported) {
                        Linking.openURL(Config.UPGRADE_MEMBERSHIP_URL);
                      } else {
                        console.log(
                          "Can not open URI: " + Config.UPGRADE_MEMBERSHIP_URL
                        );
                      }
                    }
                  );
                } else {
                  this.setState(
                    {
                      showUpgradePopUp: false,
                    },
                    () => {
                      this.props.navigation.navigate(
                        STRING_CONST.PRICING_SCREEN
                      );
                    }
                  );
                }
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
                // this.props.navigation.navigate("Anonymous");
                // ------->
                this.props.navigation.navigate("login");
        
                
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

        <Modal
          visible={this.state.Alert_Visibility2}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => {
            this.Show_Custom_Alert2(!this.state.Alert_Visibility2);
          }}>
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFFF", height: height / 3.6, width: width * 0.84, borderWidth: 1, borderRadius: 12,borderColor:"gray" }}>
              <Image source={require('../../assets/sad_imogi.png')} style={{ height: 90, width: 90, margin: scale(10) }} resizeMode="contain" />
              <Text style={{ fontSize: scale(14), color: colours.gray, padding: 4,fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD, }}>{noFlightScheduleDate}</Text>
              <Text style={{ fontSize: scale(14), color: colours.gray, padding: 4,fontFamily:STRING_CONST.appFonts.INTER_SEMI_BOLD }}>{this.state.noFlightScheduleAlertTxt}</Text>
              <TouchableOpacity onPress={() => { this.Hide_Custom_Alert2() }}
                style={{ backgroundColor: colours.lightBlueTheme, borderRadius: 9, margin: 7,marginTop:10, }}
              >
                <Text style={{ marginStart: 30, marginEnd: 30, margin: 9, color: "#FFF" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
