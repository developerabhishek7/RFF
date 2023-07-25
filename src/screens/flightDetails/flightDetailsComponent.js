import React, { Component } from "react";
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
} from "react-native";
import styles from "./flightDetailsStyles";
import * as STRING_CONST from "../../constants/StringConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as CONFIG from "../../helpers/config";
import {
  isPad,
  getformattedDate,
  getTimeFromMins,
} from "../../utils/commonMethods";
import Icon from "react-native-vector-icons/dist/Ionicons";
import  Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import Entypo from "react-native-vector-icons/dist/Entypo";
import CalendarDate from "../../components/calendarDate/calendarDateComponent";
import {NavigationAction} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

export default class FlightDetailsCompoent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(250),
      isHidden: true,
      showDetailsModal: false,
      flightData: [],
      selectedFlight: {},
      dateString: this.props.route.params.dateString,
      date: this.props.route.params.flightDate,
      seatsAvailabilityData: this.props.route.params
        .seatsAvailabilityData,
      isOutBounded: this.props.route.params.isOutBounded,
      classSelected: this.props.route.params.classSelected,
      selectedDate: this.props.route.params.selectedDate,
      passengerCount: this.props.route.params.passengerCount,
      isOffPeakValue: this.props.route.params.isOffPeakValue,
      economyPoints:this.props.route.params.economyPoints,
      premiumPoints:this.props.route.params.premiumPoints,
      businessPoints:this.props.route.params.businessPoints,
      firstPoints:this.props.route.params.firstPoints,
      businessTax:this.props.route.params.businessTax,
      economyTax:this.props.route.params.economyTax,
      premiumTax:this.props.route.params.premiumTax,
      firstTax:this.props.route.params.firstTax,
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
  componentDidMount() {
    const { flightSchedule, isOutBounded, date } = this.props;
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
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.userData !== prevProps.userData) {
      }
    }
  }

  renderHeader() {
    let data = this.props.flightSchedule;
    return (
      <TouchableOpacity style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {    
            this.props.navigation.back()             
          }}
        >
          <Icon name="ios-arrow-back" size={scale(30)} color={colours.black} />
        </TouchableOpacity>

        <View style={{}}>
          <View style={styles.locationView}>
            <View>
              <Text style={styles.locationText}>
              {data.source.name} to {data.destination.name}
              </Text>
            </View>
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
            <Text style={styles.detailLocationText}>
              {selectedFlight.source.substring(
                0,
                selectedFlight.source.indexOf("(")
              )}{" "}
              to{" "}
              {selectedFlight.destination.substring(
                0,
                selectedFlight.destination.indexOf("(")
              )}
            </Text>
            <View
              style={[styles.timingContainer]}
              activeOpacity={0.6}
              onPress={() => {}}
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
              <View
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
              </View>
              <View
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
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  alignItems: "center",
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
                >{`${`Depart ${selectedFlight.source.substring(
                  0,
                  selectedFlight.source.indexOf("(")
                )}:`}`}</Text>
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
                >{`${moment(selectedFlight.departure_date).format(
                  "ddd, DD MMM YYYY, "
                )}${selectedFlight.departure_time}`}</Text>
              </View>
              <View
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
                >{`${`Arrive ${selectedFlight.destination.substring(
                  0,
                  selectedFlight.destination.indexOf("(")
                )}:`}`}</Text>
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
              </View>
              <View
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

  availabilityTable() {
    let data = this.props.seatsAvailabilityData;
    let economyPoints = this.props.route.params.economyPoints
    let premiumPoints = this.props.route.params.premiumPoints
    let businessPoints = this.props.route.params.businessPoints
    let firstPoints = this.props.route.params.firstPoints

    let economyTax = this.props.route.params.economyTax
    let premiumTax = this.props.route.params.premiumTax
    let businessTax = this.props.route.params.businessTax
    let firstTax = this.props.route.params.firstTax
    return (
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
              <Text style={styles.pointSeatsText}>{STRING_CONST.SEATS_TEXT}</Text>
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
           economyPoints ? */}
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
                    {data.economy ? data.economy.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {economyPoints ? economyPoints.toLocaleString() : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {economyTax ? economyTax.toLocaleString() : "-"}
                  </Text>
                </View>
              </View>
              {/* : null
          } */}
          {/* {
            premiumPoints ? */}
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
                    {data.premium ? data.premium.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {premiumPoints ? premiumPoints.toLocaleString() : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {premiumTax ? premiumTax.toLocaleString() : "-"}
                  </Text>
                </View>
              </View>

              {/* : null

          } */}
          {/* {
            businessPoints ? */}
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
                    {data.business ? data.business.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {businessPoints ? businessPoints.toLocaleString() : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {businessTax ? businessTax.toLocaleString() : "-"}
                  </Text>
                </View>
              </View>

              {/* : null
          } */}
          {/* {
            firstPoints ? */}
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
                    {data.first ? data.first.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {firstPoints ? firstPoints.toLocaleString() : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {firstTax ? firstTax.toLocaleString() : "-"}
                  </Text>
                </View>
              </View>
              {/* : null
          } */}
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
    return this.state.flightData.length !== 0 ? (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={this.state.flightData}
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

  render() {
    return (     
      <SafeAreaView style={styles.container}>
        <View style={styles.outerViewStyle}>
          {this.renderHeader()}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <View style={{ marginVertical: verticalScale(15) }}>
                <CalendarDate
                  selectedDate={this.state.dateString}
                  classSelected={this.state.classSelected}
                  day={this.state.selectedDate.day}
                  passengerCount={this.state.passengerCount}
                  availabilityData={this.state.seatsAvailabilityData}
                  isOffPeakValue={this.state.isOffPeakValue}
                />
              </View>
              <View style={styles.innerContainer}>
                <Text style={styles.titleText}>{`${STRING_CONST.SEAT_AVAILABILITY
                  } (${this.state.isOffPeakValue
                    ? STRING_CONST.OFF_PEAK_FARE
                    : STRING_CONST.PEAK_FARE
                  })`}</Text>
                <Text style={styles.dateText}>
                  {getformattedDate(this.props.date)}
                </Text>
              </View>
              {this.availabilityTable()}
              <View style={styles.bookOnBAButton}>
                <FastImage source={IMAGE_CONST.BA_BIG_LOGO} />
                <Text
                  style={[styles.titleText, { marginTop: verticalScale(10) }]}
                >{`${STRING_CONST.BA_SCHEDULED_FLIGHTS}`}</Text>
                <Text
                  style={[
                    styles.subTitleText,
                    { marginTop: verticalScale(10) },
                  ]}
                >{`${STRING_CONST.CLICK_TO_SEE_FLIGHT_DETAILS}`}</Text>
                {this._renderFlightList()}
                <TouchableOpacity
                  style={styles.checkOnAirlineButton}
                  onPress={() => {
                    Linking.openURL(CONFIG.BA_URL);
                  }}
                >
                  <FastImage source={IMAGE_CONST.BRITISH_AIRWAYS_TRANPARENT_LOGO} />
                  <Text style={styles.bookOnBAText}>
                    {STRING_CONST.BOOK_ON_BA}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>
          {this.state.showDetailsModal && this.flightDetailsModal()}
        </View>
      </SafeAreaView>
    );
  }
}



