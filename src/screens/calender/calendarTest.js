import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Linking,
  Alert
} from "react-native";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
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
  getClassesDisplayName,
  getAirlineClasses,
} from "../../utils/commonMethods";
import PopUpComponent from "../../shared/popUpComponent";
import * as Config from "../../helpers/config";

export default class CalenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      classSelected: this.props.searchData.classSelected, //Bool[Economy, Premium Economy, Business, First ]
      showCreateAlertModal: false,
      airLinesDetailsObject: this.props.airLinesDetailsObject,
      showTicketDetailModal: false,
      bounceValue: new Animated.Value(250), //This is the initial position of the subview
      seatsAvailabilityData: {},
      isHidden: true,
      dateString: "",
      departStartDate: "",
      departEndDate: "",
      returnStartDate: "",
      returnEndDate: "",
      searchData: this.props.searchData,
      createAlertPressed: false,
      selectedDate: {},
      showUpgradePopUp: false,
      showLoginPopup: false,
      isPeakValue: true,
      isOffPeakValue: false,
    };
    getCalendarLocals();
    LocaleConfig.defaultLocale = "us";
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
        if (
          this.props.airLinesDetailsObject &&
          prevProps.airLinesDetailsObject
        ) {
        }
        this.setState({
          airLinesDetailsObject: this.props.airLinesDetailsObject,
        });
      }
    }
  }

  componentDidMount() {
    let data = this.state.airLinesDetailsObject.availability;
    keys = Object.keys(data);
    let classData = [];
    keys.map((item, index) => {
      classData.push(this.state.classSelected[index] && data[item]);
    });
    // for (const item in data) {
    //   if (item == "economy") {
    //     classData.push(this.state.classSelected[0] && data[item]);
    //   }
    //   if (item == "premium") {
    //     classData.push(this.state.classSelected[1] && data[item]);
    //   }
    //   if (item == "business") {
    //     classData.push(this.state.classSelected[2] && data[item]);
    //   }
    //   if (item == "first") {
    //     classData.push(this.state.classSelected[3] && data[item]);
    //   }
    // }
    this.setState({
      classSelected: classData,
    });
    // if (this.props.navigation.state.params.focusedDate) {
    //   setTimeout(() => {
    //     this._refCalendarList.scrollToDay(
    //       this.props.navigation.state.params.focusedDate
    //     );
    //   });
    // }
  }
  seatAvailabilityModal() {
    let data = this.state.seatsAvailabilityData;
    let airlineClasses = getAirlineClasses(searchData.airline);

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
              <TouchableOpacity onPress={() => {}}>
                {IMAGE_CONST.DARK_CROSS}
              </TouchableOpacity>
              <Text style={styles.titleText}>{`${
                STRING_CONST.SEAT_AVAILABILITY
              } (${
                !data.peak ? STRING_CONST.OFF_PEAK_FARE : STRING_CONST.PEAK_FARE
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
              </View>
              {airlineClasses.map((item, index) => {
                 return <View>
                 <View
                   style={{ alignItems: "center", marginTop: verticalScale(20) }}
                 >
                   <View style={{ alignItems: "center" }}>
                     <Ionicons
                       name="ios-radio-button-on"
                       size={scale(8)}
                      //  color={STRING_CONST.classToColor[item]}
                     />
                     <Text
                       style={[
                         styles.classText,
                        //  { color: STRING_CONST.classToColor[item]},
                       ]}
                     >
                       {item == 'premium_economy' ? 'Premium' : getClassesDisplayName(item)}
                     </Text>
                   </View>
                   <Text style={styles.seatNumberText}>
                     {data[item] ? data[item]['seats'] : "-"}
                   </Text>
                   <Text style={styles.seatNumberText}>
                     { data[item]
                       ? this.getPointsText(data[item]['points'])
                       : "-"}
                   </Text>
                 </View>
               </View>
                
              })}
              {/* <View>
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
                    {data.economy ? data.economy.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {data.economy
                      ? this.getPointsText(data.economy.points)
                      : "-"}
                  </Text>
                </View>
              </View>
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
                    {data.premium ? data.premium.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {data.premium
                      ? this.getPointsText(data.premium.points)
                      : "-"}
                  </Text>
                </View>
              </View>
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
                    {data.business ? data.business.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {data.business
                      ? this.getPointsText(data.business.points)
                      : "-"}
                  </Text>
                </View>
              </View>
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
                    {data.first ? data.first.seats : "-"}
                  </Text>
                  <Text style={styles.seatNumberText}>
                    {data.first ? this.getPointsText(data.first.points) : "-"}
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
  jsonToQueryString = (json) =>
    "?" +
    Object.keys(json)
      .map(function(key) {
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
      let travel_classes = getBAClassesString(classSelected, searchData.airline);
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

      let airline = searchData.airline.replace("-", "_").toLowerCase();
      const url = {
        airlineSelected: `${searchData.airways.value}_${searchData.tier.value}`,
        airlineMembership: searchData.tier.value,
        aCode: searchData.airways.value,
        numberOfPassengers: searchData.passengerCount,
        tclass: "Economy",
        tValue: "economy",
        membership: searchData.tier.value,
        jType: this.state.searchData.isReturn ? "return" : "one-way",
        dPlace: getLocationNameWithCode(searchData.selectedSource),
        dId: searchData.sourceCode,
        aPlace: getLocationNameWithCode(searchData.selectedDestination),
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
          airline_name: airline,
          number_of_passengers: searchData.passengerCount,
          travel_classes: travel_classes,
          available_travel_classes: availableClassString,
          trip_type: this.state.searchData.isReturn ? "return" : "one_way",
          membership_type: searchData.tier.value,
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
                Alert.alert(STRING_CONST.CREATE_ALERT_LIMIT_GOLD);
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
            Alert.alert(STRING_CONST.VERIFY_EMAIL);
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
                      {`${
                        departStartDate
                          ? `${getformattedDate(departStartDate)}`
                          : STRING_CONST.START_DATE
                      } - ${
                        departEndDate
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
                        {`${
                          returnStartDate
                            ? `${getformattedDate(returnStartDate)}`
                            : STRING_CONST.START_DATE
                        } - ${
                          returnEndDate
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
            <View>
              <Text style={styles.locationText}>
                {this.state.searchData.selectedSource.city_name} to{" "}
                {this.state.searchData.selectedDestination.city_name}
              </Text>

              {this.ticketDetailView()}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  ticketDetailView() {
    return (
      <View style={styles.ticketDetailView}>
        <Text style={styles.ticketDetailText}>
          {this.props.searchData.airways.value} |{" "}
          {this.state.searchData.tier.title} ·{" "}
          {/* {this.props.navigation.state.params.searchData.isReturn
            ? STRING_CONST.RETURN
            : STRING_CONST.ONE_WAY}{" "}
          · {this.state.searchData.passengerCount} Passenger{" "} */}
        </Text>
      </View>
    );
  }

  getIcon(icon, color) {
    return <MaterialIcon name={icon} size={scale(14)} color={color} />;
  }

  ticketClass() {
    let classes = this.state.airLinesDetailsObject.availability;
    let classKeys = Object.keys(classes);
    return (
      <View style={styles.ticketClassView}>
        {classKeys.map((item, index) => {
          return (
            classes[item] && (
              <TouchableOpacity
                style={styles.classButton}
                onPress={() => {
                  let newClassArray = this.state.classSelected;
                  newClassArray[index] = !newClassArray[index];
                  this.setState({
                    classSelected: newClassArray,
                  });
                }}
              >
                {!this.state.classSelected[index]
                  ? this.getIcon(
                      STRING_CONST.CHECK_EMPTY_CIRCLE,
                      colours.lightGreyish
                    )
                  : this.getIcon(
                      STRING_CONST.CHECK_CIRCLE,
                      colours.lightGreyish
                    )}
                <Text style={styles.classTextStyle}>
                  {getClassesDisplayName(item)}
                </Text>
              </TouchableOpacity>
            )
          );
        })}
        {/* {classes.economy && (
          <TouchableOpacity
            style={styles.classButton}
            onPress={() => {
              let newClassArray = this.state.classSelected;
              newClassArray[0] = !newClassArray[0];
              this.setState({
                classSelected: newClassArray,
              });
            }}
          >
            {!this.state.classSelected[0]
              ? this.getIcon(
                  STRING_CONST.CHECK_EMPTY_CIRCLE,
                  colours.lightGreyish
                )
              : this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.blue)}
            <Text style={styles.classTextStyle}>{STRING_CONST.ECONOMY}</Text>
          </TouchableOpacity>
        )}
        {classes.premium && (
          <TouchableOpacity
            style={styles.classButton}
            onPress={() => {
              let newClassArray = this.state.classSelected;
              newClassArray[1] = !newClassArray[1];
              this.setState({
                classSelected: newClassArray,
              });
            }}
          >
            {!this.state.classSelected[1]
              ? this.getIcon(
                  STRING_CONST.CHECK_EMPTY_CIRCLE,
                  colours.lightGreyish
                )
              : this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.yellow)}

            <Text style={styles.classTextStyle}>
              {STRING_CONST.PREMIUM_ECONOMY}
            </Text>
          </TouchableOpacity>
        )}
        {classes.business && (
          <TouchableOpacity
            style={styles.classButton}
            onPress={() => {
              let newClassArray = this.state.classSelected;
              newClassArray[2] = !newClassArray[2];
              this.setState({
                classSelected: newClassArray,
              });
            }}
          >
            {!this.state.classSelected[2]
              ? this.getIcon(
                  STRING_CONST.CHECK_EMPTY_CIRCLE,
                  colours.lightGreyish
                )
              : this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.purple)}
            <Text style={styles.classTextStyle}>{STRING_CONST.BUSINESS}</Text>
          </TouchableOpacity>
        )}
        {classes.first && (
          <TouchableOpacity
            style={styles.classButton}
            onPress={() => {
              let newClassArray = this.state.classSelected;
              newClassArray[3] = !newClassArray[3];
              this.setState({
                classSelected: newClassArray,
              });
            }}
          >
            {!this.state.classSelected[3]
              ? this.getIcon(
                  STRING_CONST.CHECK_EMPTY_CIRCLE,
                  colours.lightGreyish
                )
              : this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.pink)}

            <Text style={styles.classTextStyle}>{STRING_CONST.FIRST}</Text>
          </TouchableOpacity>
        )} */}
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

  onDayPressed(day) {
    let data;
    if (this.state.selectedIndex == 0) {
      data = this.state.airLinesDetailsObject.outbound_availability;
    } else {
      data = this.state.airLinesDetailsObject.inbound_availability;
    }
    if (data[day.dateString]) {
      dateString = getformattedDate(day.dateString);
      this.setState({
        seatsAvailabilityData: data[day.dateString],
        showTicketDetailModal: true,
        dateString,
        selectedDate: day,
      });
    }
  }

  getLocations() {
    const { isOffPeakValue, isPeakValue, airLinesDetailsObject } = this.state;
    let outboundData = airLinesDetailsObject.outbound_availability;
    let inboundData = airLinesDetailsObject.inbound_availability;
    let finalData = {};
    finalData = {
      outbound_availability: outboundData,
      inbound_availability: inboundData,
      availability: airLinesDetailsObject.availability,
      source: airLinesDetailsObject.source,
      destination: airLinesDetailsObject.destination,
    };
    return finalData;
  }

  render() {
    const {
      showTicketDetailModal,
      showCreateAlertModal,
      showUpgradePopUp,
      showLoginPopup,
    } = this.state;
    const today = moment().format("YYYY-MM-DD");
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          {this.renderHeader()}
          {this.state.airLinesDetailsObject.availability
            ? this.ticketClass()
            : null}
          <View style={{ marginTop: verticalScale(15), flex: 1 }}>
            {this.fareView()}
            {this.state.searchData.isReturn
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
                onVisibleMonthsChange={(months) => {}}
                onDayPress={(day) => {
                  this.onDayPressed(day);
                  this._toggleSubview();
                }}
                pastScrollRange={0}
                minDate={today}
                calendarHeight={350}
                futureScrollRange={12}
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
                  width: width - 30,
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
                  textDayFontSize: scale(16),
                  textMonthFontSize: scale(16),
                  textDayHeaderFontSize: scale(16),
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
                this.props.navigation.navigate("SignIn");
              }}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}