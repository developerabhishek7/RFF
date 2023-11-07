import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text as ReactNativeText,
  ImageBackground,
  SafeAreaView,
  BackHandler,
  Platform
} from "react-native";
import { CommonActions } from '@react-navigation/native';
import * as RootNavigation from '../../router/RouteNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import { Text } from "native-base";
import sharedStyles from "../../shared/styles";
import styles from "./alertComponent_Style";
import * as IMG_CONST from "../../constants/ImageConst";
import * as STR_CONST from "../../constants/StringConst";
import { colours } from "../../constants/ColorConst";
import scale, { verticalScale } from "../../helpers/scale";
import { getAlerts, cancelAlerts } from "../../actions/alertActions";
import { resetSession } from "../../actions/commonActions";
import { getUserInfo } from "../../actions/userActions";
import { sendFCMToken } from "../../actions/notificationActions";
import ScreenHeader from "../../components/header/Header";
import { getAirlinesAvailability ,getPointsAvailability, getSeatsAvailability } from "../../actions/calendarActions";
import moment from "moment";
import { getStoreData, getUserId } from "../../constants/DataConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import MyStatusBar from "../../components/statusbar";

import {
  sendAuditData,
  getFlightSchedule,
  getCabinClass
} from "../../actions/findFlightActions";
var uuid = require("react-native-uuid");
import {
  getBAClassesString,
  isNull,
  getLocationName,
} from "../../utils/commonMethods";

const classToColor = {
  economy: colours.blue,
  premium_economy: colours.yellow,
  business: colours.purple,
  first: colours.pink,
};
const classToBGColor = {
  economy: colours.economyColor,
  premium_economy: colours.preEconomyColor,
  business: colours.businessColor,
  first: colours.firstColor,
};

const classToBGColorForBorder = {
  economy: "#2044FF",
  premium_economy: "#FEA41D",
  business: "#A400F1",
  first: "#F31973",
};

const formatDate = (date) => {
  return moment(date).format("DD.MM.YYYY");
};

const presentAlert = (alert) => ({
  id: alert.id.toString(),
  source: alert.source_code,
  destination: alert.destination_code,
  tripType: alert.trip_type,
  travelClass: alert.travel_classes,
  numberOfPassengers: alert.number_of_passengers,
  lastCheckedAt: alert.last_checked_at,
  url: alert.availability_url,
  startDate: alert.start_date,
  endDate: alert.end_date,
  arrivalStartDate: alert.arrival_start_date,
  arrivalEndDate: alert.arrival_end_date,
  airlineName: alert.airline_name,
  membershipType: alert.membership_type,
  availableClasses: alert.available_travel_classes,
  unreadCount: alert.unread_count,
  alertId: alert.alert_id,
});

const ListFooterWithNoAlerts = () => (
  <View
    style={[
      sharedStyles.card,
      { alignSelf: STR_CONST.CENTER, flex: 1, justifyContent: STR_CONST.CENTER,},
    ]}
  >
    <TouchableOpacity
      style={{ alignItems:  STR_CONST.CENTER, justifyContent:  STR_CONST.CENTER, }}
    >
      <FastImage
        source={IMG_CONST.NO_ALERTS1}
        style={styles.noAlertImage}
        resizeMode="contain"
      />
      <Text style={styles.noAlertTxt}>{STR_CONST.NO_ALERT_YET}</Text>
      <ReactNativeText
        style={[
          sharedStyles.listFooter,
          {
            fontFamily: STR_CONST.appFonts.INTER_REGULAR,
            fontSize: scale(13),marginBottom:scale(10),fontWeight:"500",
            marginHorizontal: scale(50),
            marginTop:scale(-10),
            color:"#49566A"
          },
        ]}
      >
        {STR_CONST.CREATE_ALERT_MSG}
      </ReactNativeText>
      <TouchableOpacity 
        style={styles.createAlertView}
        onPress={()=>{
              RootNavigation.navigationRef.navigate(STR_CONST.FIND_FLIGHT_SCREEN)
        }}
    >
        <Text style={styles.createAlertTxt}>
            {STR_CONST.CREATE_ALERT}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
);

function getAirways(airlineName) {
  if(airlineName == "premium_economy"){
    return (
      airlineName.charAt(0).toUpperCase() +
      makeUpperCaseAfterSpace("Prem Econ").slice(1)
    );
  }
  else{
    return (
      airlineName.charAt(0).toUpperCase() +
      makeUpperCaseAfterSpace(airlineName).slice(1)
    );
  }

  airlineName = airlineName.replace(/_/g, " ");
  return (
    airlineName.charAt(0).toUpperCase() +
    makeUpperCaseAfterSpace(airlineName).slice(1)
  );
}
function makeUpperCaseAfterSpace(str) {
  return str.replace(/ \s*([a-z])/g, function(d, e) {
    return " " + e.toUpperCase();
  });
}

function travelClassView(travelClass) {
  return (
    <View style={[styles.travelClassView,
      {
        width:travelClass.length > 1 ? scale(335) : scale(190),
        marginStart:scale(-3)
    }]}>
      {travelClass.map((cabinClass) => {
        return (
          <View
            style={
              (styles.travelClassInnerView,
              {
                backgroundColor: classToBGColor[cabinClass],
                borderRadius: verticalScale(5),
                marginLeft: scale(5),
                marginTop: verticalScale(3),
                marginBottom:verticalScale(3),
                width:scale(140),
                flexDirection:"row",
                justifyContent:"center",
              })
            }
          >
            {
             cabinClass == "economy" ?
              <Image source={IMG_CONST.ECONOMYC_SEAT} 
              resizeMode="contain"
              style={styles.traveClass}
              /> : null
            }
            {
             cabinClass == "premium" || cabinClass == "premium_economy" ?
              <Image source={IMG_CONST.PREMIUM_SEAT} 
              resizeMode="contain"
              style={styles.traveClass}
              /> : null
            }
            {
             cabinClass == "business" ?
              <Image source={IMG_CONST.BUSINESS_SEAT} 
              resizeMode="contain"
              style={styles.traveClass}
              /> : null
            }
             {
             cabinClass == "first" ?
              <Image source={IMG_CONST.FIRST_SEAT} 
              resizeMode="contain"
              style={styles.traveClass}
              /> : null
            }
            <Text
              style={{
                color: classToColor[cabinClass],
                padding: scale(4),
                margin:scale(1),
                textAlign:STR_CONST.CENTER,
                fontSize: scale(12),
              }}
            >
              {getAirways(cabinClass)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

function getclassSelectedArray(travelClassString) {
  let classSelected = [];
  let travelClass = travelClassString.split(",");
  classSelected[0] = travelClass.includes("economy");
  classSelected[1] = travelClass.includes("premium_economy") ;
  classSelected[2] = travelClass.includes("business");
  classSelected[3] = travelClass.includes("first");
  return classSelected;
}
function buttonView(props) {
  let travel_classes = props.travelClass.split(",");
  return (
    <View
      style={[
        styles.buttonViewContainer,
        {
          paddingBottom:
            travel_classes.length > 3 ? verticalScale(10) : verticalScale(10),
           },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: colours.lightBlueTheme,
            borderColor: colours.lightBlueTheme,
          },
        ]}
        onPress={() => {
          props.onGetAvailability();
        }}
      >
        <Text
          style={[
            styles.buttonTextStyle,
            {
              color: colours.white,
            },
          ]}
        >         
         {STR_CONST.VIEW_AVAILABILITY}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


_menu = null;

setMenuRef = (ref) => {
  this._menu = ref;
};

hideMenu = () => {
  this._menu.hide();
};

showMenu = () => {
  this._menu.show();
};

showMenu = false
renderMenu = () => {
  showMenu = true
}



const AlertCard = (props) => {
  const {
    source,
    destination,
    tripType,
    travelClass,
    numberOfPassengers,
    startDate,
    endDate,
    arrivalStartDate,
    arrivalEndDate,
    airlineName,
    membershipType,
    getLocationName,
    unreadCount,
    id,
    showMenu,
    AlertId
  } = props;
  let travel_classes = props.travelClass.split(",");
  return (  
      <View style={styles.alertCardView}>
        <View style={styles.alertHeaderContainer}>
            <Text style={styles.cellHeaderText}>
              {getLocationName(source)}{ ` (${source})`} to {getLocationName(destination)}{ ` (${destination})`} 
            </Text>
          <TouchableOpacity
            style={styles.notificationIconButton}
            onPress={() => {
              props.onNotificationIconPress(id);
            }}
          >
            <FastImage
              source={IMG_CONST.DARK_BELL}
              style={{ marginRight: scale(1) }}
            />
            <View style={styles.unreadCountContainer}>
              {!isNull(unreadCount) && unreadCount !== 0 && (
                <Text style={styles.unreadCountText}>{unreadCount}</Text>
              )}
            </View>
          </TouchableOpacity>
        
          <View style={styles.alertImgView}> 
              <TouchableOpacity
                  onPress={() => {
                    props.onEditPress(props);
                  }}
                style={styles.alertImg}
              >
              <FastImage source={IMAGE_CONST.PENCIL_EDIT_ICON} resizeMode="contain" style={
                styles.editImg
                } />
              </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <FastImage style={styles.infoIcon} source={IMG_CONST.AIRWAYS_ICON} />
          </View>
          <Text style={styles.rightValueText}>
            {STR_CONST.BRITISH_AIRWAYS}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={{ flexDirection: STR_CONST.ROW }}>
          <View style={[styles.rowContainer]}>
            <View style={styles.iconContainer}>
              <FastImage source={IMG_CONST.USER_ICON} style={styles.infoIcon} />
            </View>
            <Text style={styles.rightValueText}>
              {numberOfPassengers}{" "}
              {Number(numberOfPassengers) > 1 ? STR_CONST.PASSENGERS : STR_CONST.PASSENGER }
            </Text>
          </View>
          <View
            style={[
              styles.rowContainer,
              {
                marginLeft: scale(20),
                borderLeftColor: colours.lightGreyish,
                borderLeftWidth: 0.5,
              },
            ]}
          >
            <View style={styles.iconContainer}>
              <FastImage
                style={styles.infoIcon}
                source={IMG_CONST.ON_THE_WAY_ICON}
              />
            </View>
            <Text style={styles.rightValueText}>
              {tripType
                .replace(/_/g, " ")
                .charAt(0)
                .toUpperCase() +
                makeUpperCaseAfterSpace(tripType.replace(/_/g, " ")).slice(1)}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.nextRowContainer}>
          <View style={styles.iconContainer}>
            <FastImage style={styles.infoIcon} source={IMG_CONST.FLIGHT_ICON} />
          </View>
          <Text style={styles.rightValueText}>{`${formatDate(
            startDate
          )} - ${formatDate(endDate)}`}</Text>
        </View>
        <View style={styles.line} />
        {arrivalStartDate && arrivalEndDate ? (
          <View style={styles.nextRowContainer}>
            <View style={styles.iconContainer}>
              <FastImage
                style={styles.infoIcon}
                source={IMG_CONST.LANDING_FLIGHT_ICON}
              />
            </View>
            <Text style={styles.rightValueText}>{`${formatDate(
              arrivalStartDate
            )} - ${formatDate(arrivalEndDate)}`}</Text>
          </View>
        ) : null}
        {arrivalStartDate && arrivalEndDate ? (
          <View style={styles.line} />
        ) : null}
        <View
          style={[
            styles.nextRowContainer,
           
          ]}
        >
               {travelClassView(travelClass.split(","))}
        </View>
        {buttonView(props)}
      </View>
  );
};

AlertCard.propTypes = {
  source: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  tripType: PropTypes.string.isRequired,
  travelClass: PropTypes.string.isRequired,
  numberOfPassengers: PropTypes.number.isRequired,
  lastCheckedAt: PropTypes.string,
  url: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  arrivalStartDate: PropTypes.string.isRequired,
  arrivalEndDate: PropTypes.string.isRequired,
  cancelAlert: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  availableClasses: PropTypes.string.isRequired,
  unreadCount: PropTypes.string.isRequired,
  alertId: PropTypes.string.isRequired,
};

AlertCard.defaultProps = {
  lastCheckedAt: null,
};
let monthKey = ""
class AlertsScreen extends React.Component {
  state = {
    alerts: null,
    sortedlerts: null,
    isLoading: true,
    isEnablingNotifications: false,
    refreshing: false,
    errorMessage: null,
    notiifcationSettingsData: null,
    searchData: {},   
    selectedSortOption: STR_CONST.DEPARTURE_DATE,
    showReverseList: false,
    showSortModal: false,
    alertCount:"",
    alertLength:"",
    isLoader:false,
    showMenu:false,
    AlertId:0,
    staticDateArray:[],
    startDate:''
  };








  async componentDidMount() {
    this.getDates()
    setTimeout(() => {
      this.props.getAlertsAction();
     }, 1000);

    setTimeout(() => {
      this.setState({
        alertLength:this.props.alertsArray ? this.props.alertsArray.length : null,
     })
    }, 2000);
   
    const { navigation } = this.props;
    const Device_Token = await AsyncStorage.getItem("Device_Token");
    this.props.sendFCMTokenAction(Device_Token);
    this.props.getUserInfoAction();
    await this.componentWillFocus();
    this.willFocusSubscription = navigation.addListener(
      "willFocus",
      this.componentWillFocus.bind(this)
    );
    BackHandler.addEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }
  reset() {
    return this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        actions: [CommonActions.navigate({ routeName: "AnonymousStack" })],
      })
    );
  }

  createAlertButton() {
    return (
      <TouchableOpacity
        style={styles.createAlertButton}
        onPress={() => {
          this.props.navigation.navigate(STR_CONST.FIND_FLIGHT_SCREEN);
        }}
      >
        {IMG_CONST.ALERT_PLUS}        
      </TouchableOpacity>
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

  async componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    if (this.props.alertsArray !== nextProps.alertsArray) {
      this.setState({
        isLoading: false,
        refreshing: false,
        alerts:
          nextProps.alertsArray.length !== 0
            ? nextProps.alertsArray.map(presentAlert)
            : [],
      });
    }
    if (this.props.alertsArrayError !== nextProps.alertsArrayError) {
      AsyncStorage.removeItem("authorizationHeader");
      AsyncStorage.removeItem("userId");
      AsyncStorage.removeItem("searchDetails");
      Alert.alert(`${nextProps.alertsArrayError}`);
      navigation.navigate("Anonymous");
    }

    if (this.props.alertCancelError !== nextProps.alertCancelError) {
      Alert.alert(STR_CONST.CANCEL_ALERT_ERROR);
    }
    if (this.props.deviceId !== nextProps.deviceId && nextProps.deviceId) {
      this.setState({
        isEnablingNotifications: false,
      });
    }
    if (
      nextProps.airlinesDetail &&
      this.props.airlinesDetail !== nextProps.airlinesDetail &&
      nextProps.screenType == "ALERT"
    ) {   
      this.setState({isLoader:false} , () =>{
        this.props.navigation.navigate(STR_CONST.CALENDAR_SCREEN, {
          searchData: this.state.searchData,
          focusedDate: this.state.searchData.endDate,
          monthKey:monthKey,
          startDate:this.state.startDate,
          peakOffpeakData: this.props.peakOffpeakData,
          staticDateArray:this.state.staticDateArray
        })
      })
    }
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


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
    this.handleBackButton(this.props.navigation),
  );
  }

  confirmCancelAlert = (alertId) => {
    Alert.alert(
      STR_CONST.CANCEL_ALERT,
      null,
      [
        {
          text: STR_CONST.YES,
          onPress: () => this.props.cancelAlertAction(alertId),
        },
        { text: STR_CONST.NO, style: STR_CONST.CANCEL },
      ],
      { cancelable: false }
    );
  };

  refreshAlerts = () => {
    this.setState({ refreshing: true });
    this.props.getAlertsAction();
  };

  goToNotifications() {
    const { navigation } = this.props;
    navigation.navigate(STR_CONST.NOTIFICATIONS_SCREEN, {
      fromAlertScreen: false,
    });
  }

  async componentWillFocus() {
    this.props.getAlertsAction();
  }



  getSortedByLocation(location, reverse) {
    let sortedArray = [];
    let alertArray = this.state.alerts;
    if (location == "origin") {
      sortedArray = alertArray.sort((a, b) =>
        a.source > b.source ? 1 : b.source > a.source ? -1 : 0
      );
    } else {
      sortedArray = alertArray.sort((a, b) =>
        a.destination > b.destination
          ? 1
          : b.destination > a.destination
          ? -1
          : 0
      );
    }
    this.setState({
      alerts: reverse ? sortedArray.reverse() : sortedArray,
    });
  }
  getSortedByDepartureDate(reverse) {
    let sortedArray = [];
    let alertArray = this.state.alerts;
    sortedArray = alertArray.sort((a, b) =>
        a.start_date > b.start_date
          ? 1
          : b.start_date > a.start_date
          ? -1
          : 0
      );
    this.setState({
      alerts: sortedArray.reverse()
    });
  }
  renderHeader(alertLength){
    const {alerts} = this.state;
    return(
      <View style={[styles.renderHeaderStyles,{
        height:alerts && alerts.length > 0  ? scale(280) : Platform.OS == "android" ? scale(80) : scale(100),
      }]}>
        <View style={{marginTop:Platform.OS == "android" ? scale(16):scale(40),}}>
        <ScreenHeader
          {...this.props}
          left
          setting
          title={`${STR_CONST.ALERT_SCREEN_TITLE} `}
          right
          showSort={true}
          notifCount={this.props.badgeCount}
          clickOnRight={() => this.goToNotifications()}
          clickOnSort={() => {
            this.setState({
              showSortModal: true,
            });
          }}
        />
        </View>
      </View>
    )
  }

  getSearchData(item) {   
    let airlineObject = {};
    let tier = {};
    let sourceLocation = {};
    let destinationLocation = {};
    let airline = item.airlineName.replace("_", "-").toLowerCase();
    let searchData = {
      airline: airline,
      sourceCode: item.source,
      destinationCode: item.destination,
      passengerCount: item.numberOfPassengers,
      isReturn: item.tripType == "return",
      classSelected: getclassSelectedArray(item.travelClass),
      airways: item.airlineName,
      startDate: item.startDate,
      endDate: item.endDate,
      arrivalStartDate: item.arrivalStartDate,
      arrivalEndDate: item.arrivalEndDate,
      alertID: item.id,
      availabilityUrl: item.url,
      availableClasses: item.availableClasses,
    };
    let airlinesMembershipDetails = this.props.airlinesMembershipDetails;
    let locationsArray = this.props.locations;
    airlinesMembershipDetails.map((airline) => {
      let airlineValue = airline.airline.toLowerCase().replace(" ", "_");
      if (airlineValue == item.airlineName) {
        airlineObject = airline;
        airline.memberships.map((membership) => {
          if (item.membershipType == membership.value) {
            tier = membership;
          }
        });
      }
    });
    locationsArray &&
      locationsArray.map((location) => {
        if (location.code == item.source) {
          sourceLocation = location;
        }
        if (location.code == item.destination) {
          destinationLocation = location;
        }
      });                                         
        (searchData.airways = airlineObject.airline.toLowerCase().replace(" ", "_")),
      (searchData.tier = tier.value),
      (searchData.selectedSource = sourceLocation);
       searchData.selectedDestination = destinationLocation;
        this.setState({
          searchData: searchData,
        });
    return searchData;
  }

  async getAuditData(data) {
    const guestId = await getStoreData("guestId");
    const userId = await getUserId("userId");
    let travel_classes = getBAClassesString(data.classSelected);
    user_action_audit = {};
    user_action_audit["user_id"] = userId;
    user_action_audit["guest_id"] = guestId;
    user_action_audit["event_id"] = uuid.v4();
    user_action_audit["source_page"] = "alert";
    user_action_audit["destination_page"] = "calendar";
    user_action_audit["event_type"] = 0;
    user_action_audit["event_time"] = moment().format("YYYY-MM-DD HH:MM");
    user_action_audit["trip_type"] =
      this.state.selectedIndex == 1 ? "return" : "one_way";
    user_action_audit["search_data"] = {
      airline: data.airline,
      source: data.sourceCode,
      destination: data.destinationCode,
      departure_date_from: moment(data.startDate).format("YYYY-MM-DD"),
      departure_date_to: moment(data.endDate).format("YYYY-MM-DD"),
      arrival_date_from:
        data.isReturn && moment(data.arrivalStartDate).format("YYYY-MM-DD"),
      arrival_date_to:
        data.isReturn && moment(data.arrivalEndDate).format("YYYY-MM-DD"),
      passenger_count: data.passengerCount,
      cabin_classes: travel_classes,
    };
    return user_action_audit;
  }

  sortModal() {
    const { selectedSortOption, showReverseList, showSortModal } = this.state;
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
                  style={styles.sortView}
                >
                  {STR_CONST.SORT_BY}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showSortModal: !showSortModal });
                  }}
                >
                  {IMG_CONST.GREY_CROSS}
                </TouchableOpacity>
              </View>
              <View style={{ margin: scale(5) }}>
                <TouchableOpacity
                  style={{
                    flexDirection: STR_CONST.ROW,
                    alignItems: STR_CONST.CENTER,
                    backgroundColor:
                      selectedSortOption == STR_CONST.DEPARTURE_DATE
                        ? colours.dimLightBlueTheme
                        : colours.white,
                    padding: scale(15),
                    borderRadius: scale(5),
                  }}
                  onPress={() => {
                    this.setState(
                      {
                        selectedSortOption: STR_CONST.DEPARTURE_DATE,
                        showReverseList:
                          selectedSortOption == STR_CONST.DEPARTURE_DATE
                            ? !showReverseList
                            : showReverseList,
                      },
                      () => {
                        this.getSortedByDepartureDate(
                          this.state.showReverseList
                        );
                      }
                    );
                  }}
                >
                  <FastImage
                    style={styles.sortIcon}
                    source={
                      showReverseList &&
                      selectedSortOption == STR_CONST.DEPARTURE_DATE
                        ? IMG_CONST.SORTING_DOWN
                        : IMG_CONST.SORTING_UP
                    }
                  />
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: STR_CONST.appFonts.INTER_REGULAR,
                      color: colours.darkBlueTheme,
                    }}
                  >
                    {STR_CONST.DEPARTURE_DATE}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: scale(5) }}>
                <TouchableOpacity
                  style={{
                    flexDirection: STR_CONST.ROW,
                    alignItems: STR_CONST.CENTER,
                    backgroundColor:
                      selectedSortOption == STR_CONST.ORIGIN
                        ? colours.dimLightBlueTheme
                        : colours.white,
                    padding: scale(15),
                    borderRadius: scale(5),
                  }}
                  onPress={() => {
                    this.setState(
                      {
                        selectedSortOption: STR_CONST.ORIGIN,
                        showReverseList:
                          selectedSortOption == STR_CONST.ORIGIN
                            ? !showReverseList
                            : showReverseList,
                      },
                      () => {
                        this.getSortedByLocation(
                          STR_CONST.ORIGIN,
                          this.state.showReverseList
                        );
                      }
                    );
                  }}
                >
                  <FastImage
                    style={styles.sortIcon}
                    source={
                      showReverseList && selectedSortOption == STR_CONST.ORIGIN
                        ? IMG_CONST.SORTING_DOWN
                        : IMG_CONST.SORTING_UP
                    }
                  />
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: STR_CONST.appFonts.INTER_REGULAR,
                      color: colours.darkBlueTheme,
                    }}
                  >
                    {STR_CONST.ORIGIN}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ margin: scale(5) }}>
                <TouchableOpacity
                  style={{
                    flexDirection: STR_CONST.ROW,
                    alignItems: STR_CONST.CENTER,
                    backgroundColor:
                      selectedSortOption == STR_CONST.DESTINATION
                        ? colours.dimLightBlueTheme
                        : colours.white,
                    padding: scale(15),
                    borderRadius: scale(5),
                  }}
                  onPress={() => {
                    this.setState(
                      {
                        selectedSortOption: STR_CONST.DESTINATION,
                        showReverseList:
                          selectedSortOption == STR_CONST.DESTINATION
                            ? !showReverseList
                            : showReverseList,
                      },
                      () => {
                        this.getSortedByLocation(
                         STR_CONST.DESTINATION,
                          this.state.showReverseList
                        );
                      }
                    );
                  }}
                >
                  <FastImage
                    style={styles.sortIcon}
                    source={
                      showReverseList &&
                      selectedSortOption == STR_CONST.DESTINATION
                        ? IMG_CONST.SORTING_DOWN
                        : IMG_CONST.SORTING_UP
                    }
                  />
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: STR_CONST.appFonts.INTER_REGULAR,
                      color: colours.darkBlueTheme,
                    }}
                  >
                    {STR_CONST.DESTINATION}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  renderLoader () {
    return (
      <Modal
        transparent={true}        
        animationType={'none'}     
        visible={this.state.isLoader}                
      >
        <View style={styles.loaderStyle}>
        <View style={styles.loaderSubStyle}>
          <View style={styles.loaderImg}>
            <FastImage source={IMAGE_CONST.LOADER} style={styles.loaderIMG1} />
          </View>
        </View>
        </View>
      </Modal>
    
    )
  }
  alertCountFunc(){
    const {alerts} = this.state
    let alertCountValue  = alerts.length
    return(
      <View style={styles.alertCountView}>
        <Text style={styles.alertCountTxt}> {alertCountValue} {STR_CONST.ALERT}</Text>
      </View>
    )
  }

  render() {
    const {alerts,alertLength, errorMessage, refreshing, showSortModal } = this.state; 
    return (
      <SafeAreaView style={{ backgroundColor: colours.white, flex: 1,}}>
        <MyStatusBar />
        {this.renderHeader(alertLength)}
        {this.renderLoader()}
        {alerts && alerts.length > 1 && this.alertCountFunc()}
        {errorMessage ? (
          <View>
            {errorMessage ? (
              <Text
                style={styles.errortxt}
              >
                {errorMessage}
              </Text>
            ) : null}
          </View>
        ) : null}
        {alerts && alerts.length !== 0 ? (
          <FlatList
            data={alerts}
            style={{ marginTop:alerts.length == 1 ? scale(-160):scale(20),borderWidth:0 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
               <AlertCard
                cancelAlert={this.confirmCancelAlert}
                {...item}
                onGetAvailability={async () => {
                  this.setState({isLoader:true})
                  let searchData = this.getSearchData(item);                  
                  let flightScheduleData = {
                    airline: searchData.airline,
                    source: searchData.sourceCode,
                    destination: searchData.destinationCode,
                  }                  
                  this.setState({
                    startDate: item.startDate
                  })
                  let auditData = await this.getAuditData(searchData);
                  this.props.getSeatsAvailabilityAction(searchData);
                  this.props.getAirlinesAvailabilityAction(searchData);
                  this.props.sendAuditDataAction(auditData);
                  this.props.getPointsAvailabilityAction(searchData)
                  this.props.getFlightScheduleAction(flightScheduleData)
                }}
                showMenu={this.state.showMenu}
                AlertId={this.state.AlertId}
                onEditPress={() => {
                  let searchData = this.getSearchData(item);                  
                  let data1 = {
                    source: searchData.sourceCode,
                    destination: searchData.destinationCode
                  }
                  this.props.getCabinClassAction(data1)
                  this.setState({
                    showMenu:false
                  })
                  let data = this.getSearchData(item);
                    this.props.navigation.navigate(STR_CONST.EDIT_ALERT, {
                      alertData: item,
                      props: this.props,
                      data: data,
                      cabinClassData:this.props.cabinClassData,
                      travelClass:item.travelClass
                    });
                }}
                onMenuPress={()=>{
                    this.setState({
                      showMenu:true,
                      AlertId:item.id
                    })
                }}
                getLocationName={(source) => {
                  let locationsArray = this.props.locations;
                  return getLocationName(source, locationsArray).city_name;
                }}
                onNotificationIconPress={(alertId) => {
                  this.props.navigation.navigate(
                    STR_CONST.NOTIFICATIONS_SCREEN,
                    { alertId: alertId, fromAlertScreen: true }
                  );
                }}
              />
            )}
            refreshing={refreshing}
            onRefresh={this.refreshAlerts}
          />
        ) : (
          <ListFooterWithNoAlerts />
        )}
          {alerts && alerts.length > 0
            ?
            <Fragment>
            {this.createAlertButton()}
            </Fragment>
            : null
          }
        {showSortModal && this.sortModal()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFCMTokenAction: (fcmToken) => dispatch(sendFCMToken(fcmToken)),
    getAirlinesAvailabilityAction:(searchData)=>dispatch(getAirlinesAvailability(searchData, 'ALERT')),
    getSeatsAvailabilityAction:(searchData)=>dispatch(getSeatsAvailability(searchData, 'ALERT')),
    getPointsAvailabilityAction:(searchData)=>dispatch(getPointsAvailability(searchData)),
    sendAuditDataAction: (auditData) => dispatch(sendAuditData(auditData)),
    getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
    getAlertsAction: () => dispatch(getAlerts()),
    getUserInfoAction: () => dispatch(getUserInfo()),
    getCabinClassAction:(data)=> dispatch(getCabinClass(data)),
    cancelAlertAction: (id) => {
      dispatch(cancelAlerts(id));
    },
    resetSessionAction: () => {
      dispatch(resetSession());
    },   
  };
};

const mapStateToProps = (state) => {
  const { alerts, common, notification, calendar, findFlight } = state;
   return {
    alertsArray: alerts.alertsArray,
    alertsArrayError: alerts.getAlertError,
    alertCancelSuccess: alerts.alertCancelSuccess,
    alertCancelError: alerts.alertCancelError,
    deviceId: alerts.deviceId,
    sessionExpired: common.sessionExpired,
    notiifcationSettingsData: notification.notiifcationSettingsData,
    badgeCount: notification.badgeCount,
    airlinesDetail: calendar.airlinesDetail,
    calendarSeats:calendar.calendarSeats,
    screenType: calendar.screenType,
    airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
    locations: findFlight.locations,
    cabinClassData:findFlight.cabinClassData,
    peakOffpeakData: calendar.peakOffpeakData,

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AlertsScreen);

AlertsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};