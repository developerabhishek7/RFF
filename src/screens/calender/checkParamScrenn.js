import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  Animated,
  Linking,
  TextInput,
  BackHandler, Modal, Dimensions, ImageBackground
} from "react-native";
import FastImage from 'react-native-fast-image'

import styles from "./flightDetailsStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONFIG from "../../helpers/config";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
import {
  isPad,
  getformattedDate,
  getTimeFromMins,
} from "../../utils/commonMethods";
import Icon from "react-native-vector-icons/dist/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import Entypo from "react-native-vector-icons/dist/Entypo";
import CalendarDate from "../../components/calendarDate/calendarDateComponent";
import {NavigationAction} from '@react-navigation/native'
const { height, width } = Dimensions.get("window");
import ModalDropdown from "react-native-modal-dropdown";

// import FindFlightComponent from "../findFlights/findFlightComponent";
class FlightDetailsCompoent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(250),
      isHidden: true,
      showDetailsModal: false,
      flightData: [],
      showBorder: 1,
      selectedFlight: {},
      Alert_Visibility2: false,
      locationsObject: this.props.locationsObject,
      // dateString: this.props.route.params.dateString,
      // date: this.props.route.params.flightDate,
      // seatsAvailabilityData: this.props.route.params.seatsAvailabilityData,
      // isOutBounded: this.props.route.params.isOutBounded,
      // classSelected: this.props.route.params.classSelected,
      // selectedDate: this.props.route.params.selectedDate,
      // passengerCount: this.props.route.params.passengerCount,
      // isOffPeakValue: this.props.route.params.isOffPeakValue,
      // economyPoints: this.props.route.params.economyPoints,
      // premiumPoints: this.props.route.params.premiumPoints,
      // businessPoints: this.props.route.params.businessPoints,
      // firstPoints: this.props.route.params.firstPoints,
      // businessSeats:this.props.route.params.businessSeats,
      // economySeats:this.props.route.params.economySeats,
      // premiumSeats:this.props.route.params.premiumSeats,
      // noflightschedule: this.props.route.params.noflightschedule,
      // searchData: this.props.route.params.searchData,
      // multipleFlightScheduleData: this.props.route.params.multipleFlightScheduleData,
      // selectedIndex: this.props.route.params.selectedIndex,
      // cabinClassData: this.props.route.params.cabinClassData,
      // trip_type: this.props.route.params.trip_type,
      // source: this.props.route.params.source,
      // destination: this.props.route.params.destination,
      // flightCount: this.props.route.params.checkFlightCount,
      cabinCode: "M",
      skyScannerCabinCode: "economy",
      // classDataArray: this.props.route.params.classDataArray,
      classSelectedArray: [true, true, true, true],
      selectedDestination: null,
      selectedSource: null,
      Alert_Visibility3: false,
      locationData: [],
      ageBand: "",
      postCode: "",
      gender: "",
      classTxtCode: "",
      showModelDropdownForBA: false,
      showModelDropdownForSS: false,
      airlinesPossileRoutesList: this.props.airlinesPossileRoutesList,
    };
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

  formatPrice = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  componentDidMount = () => {

 
    console.log("yes check here details  - - - -",this.props.isOutBounded)
    const { flightSchedule, isOutBounded, date, } = this.props;
    
  
    let flightData = [];
    if (isOutBounded) {
      for (const item in flightSchedule.outbound_availability) {
        if (item == date) {
          flightData = flightSchedule.outbound_availability[item].schedules;
        }
        this.setState({
          flightData,
        });
      }
    } else {
      for (const item in flightSchedule.inbound_availability) {
        if (item == date) {
          flightData = flightSchedule.inbound_availability[item].schedules;
        }
        this.setState({
          flightData,
        });
      }
    }
    BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
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
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userData !== prevProps.userData) {
      }
    }
  }

  renderHeader() {
    let data = this.state.searchData


    return (
      <TouchableOpacity style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.dispatch(NavigationActions.back())
          }}
        >
          <Icon name="ios-arrow-back" size={scale(30)} color={colours.black} />
        </TouchableOpacity>
        <View style={styles.locationView}>
          <View>
            <Text style={styles.locationText}>
              {data.selectedSource.city_name} to {data.selectedDestination.city_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  getPointsText(points) {
    if (points % 1000 == 0) {
      return `${points / 1000}k`;
    } else {
      return points;
    }
  }

  flightDetailsModal() {
    let selectedFlight = this.state.selectedFlight;
    let data = this.state.searchData
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
          <View
            style={{
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <View style={[styles.titleView]}>
              <TouchableOpacity onPress={() => { }}>
                <FastImage
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
                <FastImage
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
                <FastImage
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
  }
  getIcon(icon, color) {
    return <MaterialIcon name={icon} size={scale(16)} color={color} />;
  }

  availabilityTable() {
    // let data = this.props.seatsAvailabilityData;

    let economyPoints = this.props.route.params.economyPoints
    let premiumPoints = this.props.route.params.premiumPoints
    let businessPoints = this.props.route.params.businessPoints
    let firstPoints = this.props.route.params.firstPoints

    let economySeats = this.props.route.params.economySeats
    let premiumSeats = this.props.route.params.premiumSeats
    let businessSeats = this.props.route.params.businessSeats
    let firstSeats = this.props.route.params.firstSeats

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

    console.log("yes check here class selected length #######   ", classSelectedArray.length)

    return (
      <View style={styles.availabiltyView}>
        <View style={{ marginLeft: classSelectedArray.length > 2 ? scale(0) : scale(70) }}>
          <View
            style={{
              marginTop: isPad() ? verticalScale(35) : verticalScale(16),
            }}
          >
            <Text style={{ color: colours.lightGreyish }}></Text>
          </View>
          <View style={{ marginTop: verticalScale(35) }}>
            <Text style={styles.pointSeatsText}>{STRING_CONST.SEATS_TEXT}</Text>
          </View>
          <View style={{ marginTop: verticalScale(16) }}>
            <Text style={styles.pointSeatsText1}>
              {STRING_CONST.POINTS_TEXT}
            </Text>
          </View>
          <View style={{ marginTop: verticalScale(16) }}>
            {/* <Text style={styles.pointSeatsText}>
                Taxes
              </Text> */}
          </View>
        </View>
        <View style={{
          borderWidth: 0, borderColor: "green", flexDirection: "row", width: scale(280), justifyContent: "center", alignItems: "center", marginLeft: scale(-60),
        }}>
          {
            economy ?
              <View>
                <View style={{ alignItems: "center", marginTop: verticalScale(20) }}>
                  <View style={{ alignItems: "center" }}>
                    <Ionicons
                      name="ios-radio-button-on"
                      size={scale(8)}
                      color={colours.economySeatColor}
                    />
                    <Text
                      style={[styles.classText, { color: colours.economySeatColor }]}
                    >
                      {STRING_CONST.ECONOMY}
                    </Text>
                  </View>
                  <Text style={styles.seatNumberText}>
                    {economySeats ? economySeats : "0"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {economyPoints ? this.formatPrice(economyPoints) : "-"}
                  </Text>
                  {/* <Text style={styles.seatNumberText}>
                    {economyTax ? economyTax.toLocaleString() : "-"}
                  </Text> */}
                </View>
              </View>
              : null
          }
          {
            premium ?
              <View>
                <View style={{ alignItems: "center", marginTop: verticalScale(20) }}>
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
                    {premiumSeats ? premiumSeats : "0"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {premiumPoints ? this.formatPrice(premiumPoints) : "-"}
                  </Text>
                  {/* <Text style={styles.seatNumberText}>
                    {premiumTax ? premiumTax.toLocaleString() : "-"}
                  </Text> */}
                </View>
              </View>

              : null

          }
          {
            business ?
              <View>
                <View style={{ alignItems: "center", marginTop: verticalScale(20) }}>
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
                    {businessSeats ? businessSeats : "0"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {businessPoints ? this.formatPrice(businessPoints) : "-"}
                  </Text>
                  {/* <Text style={styles.seatNumberText}>
                    {businessTax ? businessTax.toLocaleString() : "-"}
                  </Text> */}
                </View>
              </View>

              : null
          }
          {
            first ?
              <View>
                <View style={{ alignItems: "center", marginTop: verticalScale(20) }}>
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
                    {firstSeats ? firstSeats : "0"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {firstPoints ? this.formatPrice(firstPoints) : "-"}
                  </Text>
                  {/* <Text style={styles.seatNumberText}>
                    {firstTax ? firstTax.toLocaleString() : "-"}
                  </Text> */}
                </View>
              </View>
              : null
          }
        </View>
      </View>
    );
  }

  renderCell({ item, index }) {


    return (
      <TouchableOpacity
        style={[styles.cellContainer]}
        activeOpacity={0.6}
        onPress={() => {
          this.setState({
            showDetailsModal: true,
            selectedFlight: item,
          });
          this._toggleSubview();
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <FastImage
            source={IMAGE_CONST.BIG_TAKE_OFF}
            style={{ marginRight: scale(10) }}
          />
          <Text
            style={styles.flightDetailText}
          >{`${item.departure_time} ${item.source_code}`}</Text>
        </View>
        <Text style={styles.flightDetailText}>{` - `}</Text>
        <View style={{ flexDirection: "row" }}>
          <FastImage
            source={IMAGE_CONST.BIG_LANDING}
            style={{ marginRight: scale(10) }}
          />
          <Text
            style={styles.flightDetailText}
          >{`${item.arrival_time} ${item.destination_code}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  _renderFlightList() {

    const { multipleFlightScheduleData, isOutBounded } = this.state
    let flightData = []
    if (multipleFlightScheduleData) {
      let inbound = multipleFlightScheduleData.inbound_availability
      let outbound = multipleFlightScheduleData.outbound_availability
      if (isOutBounded) {
        let outboundData = Object.entries(outbound)
        outboundData.map((singleData) => {
          flightData = singleData[1].schedules
        })
      }
      else {
        let inboundData = Object.entries(inbound)
        inboundData.map((singleData) => {
          flightData = singleData[1].schedules
        })
      }
    }

    return flightData.length !== 0 ? (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={flightData}
        renderItem={(item) => this.renderCell(item)}
        extraData={this.state}
      />
    ) : (
      <View
        style={{
          height: verticalScale(100),
          backgroundColor: colours.dimLightBlueBackgroundColor,
          justifyContent: "center",
          alignItems: "center",
          marginTop: verticalScale(20),
          borderRadius: scale(10),
        }}
      >
        <Text
          style={[styles.titleText, { marginTop: verticalScale(10) }]}
        >{`No flights Scheduled`}</Text>
      </View>
    );
  }
  addUserGender() {
    const { gender, submitPressed, showBorder } = this.state;
    return (
      <TouchableOpacity style={{ marginTop: verticalScale(32) }}>
        {gender ? (
          <Text style={styles.textInputHeading}>
            {STRING_CONST.GENDER}
          </Text>
        ) : null}
        <ModalDropdown
          onDropdownWillShow={() => {
            this.setState({
              showBorder: 2,
            });
          }}
          onDropdownWillHide={() => {
            this.setState({
              showBorder: 0,
            });
          }}
          options={STR_CONST.genderOptions}
          style={[
            styles.textInputView,
            {
              marginTop: scale(5),
              borderBottomColor: colours.borderBottomLineColor,
            },
          ]}
          dropdownStyle={{
            width: scale(302),
            height: STR_CONST.genderOptions.length * 50,
            borderColor: "gray",
            borderTopWidth: 0.5,
            borderTopColor: showBorder == 2 ? "gray" : "skyblue",
            borderBottomColor: showBorder == 2 ? "gray" : "skyblue",
            borderBottomWidth: 0.5
          }}
          onSelect={(option) => {
            this.setState({
              gender: STR_CONST.genderOptions[option],
            });
          }}
          renderRow={(option, index, isSelected) => {
            return this.renderRow(option);
          }}
        >
          <View
            style={[
              styles.countryView,
              {
                borderColor: showBorder == 2 ? "skyblue" : colours.white,
                borderWidth: showBorder == 2 ? 2 : 0,
              },
            ]}
          >
            {gender ? (
              <Text style={styles.countryDetailText}>{gender.label}</Text>
            ) : (
              <Text style={styles.countryText}>
                {STRING_CONST.GENDER}
              </Text>
            )}

            {IMG_CONST.DARK_SORT_DOWN}
          </View>
        </ModalDropdown>
      </TouchableOpacity>
    );
  }
  renderRow(option) {
    return (
      <View style={{ padding: scale(15) }}>
        <Text style={{ fontSize: scale(14), color: colours.darkBlueTheme }}>
          {option.label}
        </Text>
      </View>
    );
  }



  // https://www.skyscanner.co.in/transport/flights/lon/abz/230325/230329/?adults=1&adultsv2=1&cabinclass=economy&iym=2303&oym=2303&rtn=1&selectediday=29&selectedoday=25
  handleSkyScannerRedirection = () => {
    // const { dId, aId, numberOfPassengers, jType, date, cabinCode, returnDate } = data || {}  

    const { selectedIndex, trip_type, passengerCount, dateString, skyScannerCabinCode, source, destination, selectedDestination, numberOfLines } = this.state;



    let sourceCode = source.code.toLowerCase()
    let destinationCode = destination.code.toLowerCase()

    let numberOfPassengers = passengerCount
    const dDate = moment(dateString).format('DD')
    const dYear = moment(dateString).format('YYMM')
    const aDate = moment().format('DD')
    const aYear = moment().format('YYMM')


    let url = ""
    if (source) {
      if (trip_type == "return") {
        url = `https://www.skyscanner.co.in/transport/flights/${sourceCode}/${destinationCode}/${dYear}${dDate}/${aYear}${aDate}/?adults=${numberOfPassengers}&adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&iym=${aYear}&selectediday=${aDate}&rtn=1`
      }
      if (trip_type == "one_way") {
        url = `https://www.skyscanner.co.in/transport/flights/${sourceCode}/${destinationCode}/${dYear}${dDate}/?adultsv2=${numberOfPassengers}&cabinclass=${skyScannerCabinCode}&oym=${dYear}&selectedoday=${dDate}&rtn=0`
      }

      console.log("yes checking what URL is GETTING ########     ", url)

      Linking.openURL(url, '_blank')
    } else {
      Linking.openURL("https://www.skyscanner.co.in/transport/flights/", "_blank")
    }
  }

  // https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=LON&destinationPoint=ABZ&departInputDate=02/07/2023&returnInputDate=23/03/2023&oneWay=false&RestrictionType=Restricted&NumberOfAdults=1&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=M
  handleBaRedirection = () => {
    // const { dId, aId,  jType, date, returnDate } = data || {}   

    const { selectedIndex, trip_type, passengerCount, dateString, cabinCode, returnStartDate, source, destination } = this.state;

    let sourceCode = source.code.toLowerCase()
    let destinationCode = destination.code.toLowerCase()

    let numberOfPassengers = passengerCount
    let oneWay = selectedIndex == 0 ? true : false
    const departInputDate = moment(dateString).format('DD/MM/YYYY')
    const returnInputDate = moment().format('DD/MM/YYYY')

    if (source) {
      const url = `https://www.britishairways.com/travel/redeem/execclub/_gf/en_gb?eId=100002&pageid=PLANREDEMPTIONJOURNEY&tab_selected=redeem&redemption_type=STD_RED&amex_redemption_type=&upgradeOutbound=true&WebApplicationID=BOD&Output=&hdnAgencyCode=&departurePoint=${sourceCode}&destinationPoint=${destinationCode}&departInputDate=${departInputDate}${oneWay && departInputDate ? `&returnInputDate=${returnInputDate}` : ''}&oneWay=${oneWay}&RestrictionType=Restricted&NumberOfAdults=${numberOfPassengers}&NumberOfYoungAdults=0&NumberOfChildren=0&NumberOfInfants=0&aviosapp=true&CabinCode=${cabinCode}`
      console.log("yes what url is getting on book on BA        - -- - - ", url)

      Linking.openURL(url, '_blank')
    } else {
      Linking.openURL("https://www.britishairways.com/travel/redeem/execclub/", "_blank")
    }
  }

  noflightDataFunction() {
    const { flightCount } = this.state
    return (
      <FastImage
        source={require('../../assets/calendar/flightdetail.png')}
        resizeMode="contain"
        style={{ flex: 1, justifyContent: "center", alignItems: "center", height: scale(200), width: scale(270), alignSelf: 'center' }}
      >
        <FastImage source={IMAGE_CONST.UPGRADE_MEMBERSHIP} style={{ alignSelf: 'center', marginTop: scale(10), marginBottom: scale(30), height: scale(60), width: scale(60) }} />
        <Text style={styles.noflight}>{`There are ${flightCount} flights scheduled on this date`}</Text>
        <Text style={styles.noflight}>{`${"Upgrade to Silver/Gold to see flight details"}`}</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(STR_CONST.MEMBERSHIP_SCREEN);
            // navigation.dispatch(DrawerActions.closeDrawer());
          }}
          style={styles.upgrade}>
          <Text style={styles.bookOnBAText}>{"Upgrade Now"}</Text>
        </TouchableOpacity>
      </FastImage>
    )
  }



  renderLoader () {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.state.isLoader}             
      >
        <View style={{flex:1,justifyContent:'center',  
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        alignItems:'center',
        width:width+36,height:height,
        marginStart:-scale(20),
        marginEnd:-scale(27),
          marginTop:Platform.OS == "ios"?  scale(-20) :scale(-40),
        marginBottom:-scale(20),
        // borderWidth:3,borderColor:"green"
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
            <FastImage source={IMAGE_CONST.LOADER} style={{ height: verticalScale(200), width: verticalScale(200) }} />
          </View>
        </View>
        </View>
      </Modal>
    
    )
  }



  render() {

    // const { cabinClassData, classDataArray, showModelDropdownForBA, showModelDropdownForSS } = this.state

    // let data = Object.entries(cabinClassData)
    // let economy
    // let premium
    // let business
    // let first

    // let travelData = []
    // if (cabinClassData) {
    //   if (cabinClassData.economy) {
    //     economy = cabinClassData.economy ? "Economy" : ""
    //   }

    //   if (cabinClassData.premium_economy) {
    //     premium = cabinClassData.premium_economy ? "Premium" : ""
    //   }

    //   if (cabinClassData.business) {
    //     business = cabinClassData.business ? "Business" : ""
    //   }

    //   if (cabinClassData.first) {
    //     first = cabinClassData.first ? "First" : ""
    //   }
    // }

    // if (economy) {
    //   travelData[0] = economy
    // }
    // if (premium) {
    //   travelData[1] = premium
    // }
    // if (business) {
    //   travelData[2] = business
    // }
    // if (first) {
    //   travelData[3] = first
    // }

    // const userData = this.props.userData
    // let bronzeMember = userData.bronze_member

    return (
      <View>
         <Text>
                    checkParamScrenn
         </Text>
        </View>   
    )
  }
}
export default FlightDetailsCompoent