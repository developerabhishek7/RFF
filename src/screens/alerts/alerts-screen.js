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
import AsyncStorage from '@react-native-async-storage/async-storage'
import FastImage from 'react-native-fast-image'
import MyStatusBar from '../../components/statusbar/index';
import FontAwesome from "react-native-vector-icons/Feather";
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
import CustomButton from "../../components/customComponents/CustomButton";
import { getAirlinesAvailability ,getPointsAvailability } from "../../actions/calendarActions";
import moment from "moment";
import { getStoreData, getUserId } from "../../constants/DataConst";
import * as IMAGE_CONST from "../../constants/ImageConst";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";

// import { sendAuditData } from "../../actions/findFlightActions";
import {
  sendAuditData,
  getFlightSchedule
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
  // return new Date(date).
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
      { alignSelf: "center", flex: 1, justifyContent: "center" },
    ]}
  >
    <TouchableOpacity
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <FastImage
        source={IMG_CONST.NO_ALERTS}
        style={{ height: scale(94), width: scale(106) }}
      />
      <ReactNativeText
        style={[
          sharedStyles.listFooter,
          {
            fontFamily: STR_CONST.appFonts.INTER_REGULAR,
            fontSize: scale(14),
            marginHorizontal: scale(50),
          },
        ]}
      >
        {STR_CONST.CREATE_ALERT_MSG}
      </ReactNativeText>
    </TouchableOpacity>
  </View>
);

function getAirways(airlineName) {
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
    <View style={styles.travelClassView}>
      {travelClass.map((cabinClass) => {
        return (
          <View
            style={
              (styles.travelClassInnerView,
              {
                backgroundColor: classToBGColor[cabinClass],
                borderRadius: verticalScale(5),
                borderColor:classToBGColorForBorder[cabinClass],
                borderWidth:0.6,
                marginLeft: scale(5),
                marginTop: verticalScale(3),
                marginBottom:verticalScale(3),
                width:scale(140),
                
                // justifyContent:"center",
                flexDirection:"row",
                justifyContent:"center",
                
               
                // justifyContent:"space-around"
              })
            }
          >
            <Image source={
              cabinClass == "economy" ?
              IMG_CONST.ECONOMYC_SEAT : cabinClass == "premium_economy" ?
              IMG_CONST.PREMIUM_SEAT : cabinClass == "business" ?
              IMG_CONST.BUSINESS_SEAT : cabinClass == "first" ? 
              IMG_CONST.FIRST_SEAT : null
            } 
            resizeMode="contain"
            style={{height:scale(20),width:scale(20),marginTop:scale(6)}}
            />
            <Text
              style={{
                color: classToColor[cabinClass],
                padding: scale(4),
                margin:scale(1),
                textAlign:"center",
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
  classSelected[1] = travelClass.includes("premium_economy");
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
            // paddingTop:travel_classes.length > 3 ? verticalScale(10) : verticalScale(10)
        },
      ]}
    >
      {/* <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: colours.white,
            borderColor: colours.lightBlueTheme,
          },
        ]}
        onPress={() => {
          props.onEditPress(props);
        }}
      >
        <Text
          style={[
            styles.buttonTextStyle,
            {
              color: colours.lightBlueTheme,
            },
          ]}
        >
          {STR_CONST.EDIT_TEXT}
        </Text>
      </TouchableOpacity> */}
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
          View Availability
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
    //   <ImageBackground
    //   resizeMode={"contain"}
    //   style={[
    //     styles.cellContainer,
    //     {
    //       height:
    //         arrivalStartDate && arrivalEndDate
    //           ? width - scale(75)
    //           : width - scale(105),
    //     }
    //   ]}
    //   source={
    //     arrivalStartDate && arrivalEndDate
    //       ? IMG_CONST.RETURN_LARGE
    //       : IMG_CONST.FRAME_ONEWAY_SINGLE
    //   }
    // >    
      <View style={{flex:1,backgroundColor:"#FFF",
        borderWidth:scale(2),borderStyle:"dashed",borderColor: colours.lightBlueTheme,borderRadius:scale(20),
        width:width*0.9,alignSelf:"center",margin:scale(10),alignSelf:"center",
    }}>
        <View style={styles.alertHeaderContainer}>
          <TouchableOpacity style={styles.cellHeader}>
            <Text style={styles.cellHeaderText}>
              {getLocationName(source)}{ ` (${source})`} to {getLocationName(destination)}{ ` (${destination})`} 
            </Text>
          </TouchableOpacity>
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
          
          <View style={{alignSelf:"flex-end",marginRight:scale(10),padding:scale(10),}}> 
              <TouchableOpacity
                  onPress={() => {
                    props.onMenuPress(props);
                  }}
                style={{height:scale(20),width:scale(20),margin:scale(1),marginBottom:scale(10),marginTop:scale(15)}}
              >
              <FontAwesome name="more-vertical" 
                  color={colours.darkBlueTheme}
                  size={scale(22)} />
              </TouchableOpacity>
                {
                  showMenu && AlertId == id ?
                  <Fragment>
                  <View style={{
                    position:"absolute",
                    right:scale(10),
                    top:scale(10),
                    backgroundColor:"#FFF",
                    height:scale(70),
                    width:scale(100),
                    borderWidth:scale(0.6),
                    borderColor:"gray",
                    borderRadius:scale(2),
                    alignSelf:"center",justifyContent:"center"
                  }}>
                      <TouchableOpacity 
                      onPress={() => {
                          props.onEditPress(props);
                      }}
                      >
                      <Text style={{fontSize:scale(14),textAlign:'center',fontWeight:"600",color:"#22395d",}}>Edit Alert</Text>
                      </TouchableOpacity>
                      
                      <View style={{height:scale(0.6),width:scale(100),marginTop:scale(6),backgroundColor:"gray"}}/>
                      <TouchableOpacity 
                      onPress={() => {
                        props.onEditPress(props);
                    }}
                        >
                      <Text style={{fontSize:scale(14),textAlign:'center',fontWeight:"600",color:"#22395d",padding:scale(6)}}>Delete Alert</Text>
                      </TouchableOpacity>
                   </View>
                   </Fragment>
                  : null
                }
              
             
          </View>
        

          {/* <Menu 
            visible={true}
            ref={this.setMenuRef}
            button={
              <TouchableOpacity
                onPress={() => {
                  this.showMenu();
                }}
              >
              <FontAwesome name="more-vertical" 
                  color={colours.darkBlueTheme}
                  size={scale(22)} />
              </TouchableOpacity>
            }
          >
            <MenuItem
              onPress={() => {
                this.hideMenu();
               
              }}
              style={styles.menuStyle}
              textStyle={styles.menuTextStyle}
            >
              

              {"Edit"}
            </MenuItem>

            <MenuItem
              onPress={() => {
                this.hideMenu();
               
              }}
              style={styles.menuStyle}
              textStyle={styles.menuTextStyle}
            >
             
                {"Delete"}

            </MenuItem>

          </Menu> */}


        </View>
  
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <FastImage style={styles.infoIcon} source={IMG_CONST.AIRWAYS_ICON} />
          </View>
          <Text style={styles.rightValueText}>
            {getAirways(airlineName)}
            {/* <Text
              style={{
                fontStyle: "italic",
                fontSize: scale(14),
                color: colours.lightGreyish,
              }}
            >
              {" "}
              {membershipType.charAt(0).toUpperCase() +
                membershipType.slice(1)}{" "}
              {STR_CONST.MEMBER_TEXT}
            </Text> */}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.rowContainer]}>
            <View style={styles.iconContainer}>
              <FastImage source={IMG_CONST.USER_ICON} style={styles.infoIcon} />
            </View>
            <Text style={styles.rightValueText}>
              {numberOfPassengers}{" "}
              {Number(numberOfPassengers) > 1 ? "Passengers" : "Passenger"}
            </Text>
          </View>
          <View
            style={[
              styles.nextRowContainer,
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
            {
              width:scale(320),
            }
          ]}
        >
          {/* <View style={styles.iconContainer}>
            <FastImage style={styles.infoIcon} source={IMG_CONST.ECONOMY_ICON} />
          </View> */}
          {travelClassView(travelClass.split(","))}
        </View>
        {buttonView(props)}
      </View>
     
    // </ImageBackground>
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
  };








  async componentDidMount() {

    this.checkIfPeakOffPeakDataMonth()
    // this.props.getAlertsAction();

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
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "AnonymousStack" })],
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
          monthKey:monthKey
        })
      })
    }
  }



  checkIfPeakOffPeakDataMonth = () => {
    let month =  new Date().getMonth()
    if(month === 0){
      monthKey = 23
    }else if(month === 1){
      monthKey = 22
    } else if(month === 2){
      monthKey = 21
    } else if(month === 3){
      monthKey = 20
    } else if(month === 4){
      monthKey = 19
    } else if(month === 5){
      monthKey = 18
    } else if(month === 6){
      monthKey = 17
    } else if(month === 7){
      monthKey = 16
    } else if(month === 8){
      monthKey = 15
    } else if(month === 9){
      monthKey = 14
    } else if(month === 10){
      monthKey = 13
    } else if(month === 11){
      monthKey = 22
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
    // this.willFocusSubscription.remove();

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

  /**
   * Custom Header for Alert screen
   */

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
// renderHeader(alertLength) {

//     const {alertCount} = this.state;

//     return (
//       <View style={{ paddingHorizontal: scale(16) }}>
//         <ScreenHeader
//           {...this.props}
//           left
//           setting
//           title={`${STR_CONST.ALERT_SCREEN_TITLE} ${ (alertLength)? `(${alertLength})` :""} `}
//           right
//           showSort={alertLength > 1 ? true : false}
//           notifCount={this.props.badgeCount}
//           clickOnRight={() => this.goToNotifications()}
//           clickOnSort={() => {
//             this.setState({
//               showSortModal: true,
//             });
//           }}
//         />
//       </View>
//     );
//   }

  renderHeader(alertLength){
    const {alertCount} = this.state;
    return(
      <View style={{alignItems:"center",backgroundColor:"#03B2D8",height:scale(110),width:"100%",marginTop:
      Platform.OS == "ios"? scale(-50) :
      scale(-20),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30)}}>
        <View style={{marginTop:scale(40)}}>
        <ScreenHeader
          {...this.props}
          left
          setting
          title={`${STR_CONST.ALERT_SCREEN_TITLE} ${ (alertLength)? `(${alertLength})` :""} `}
          right
          showSort={alertLength > 1 ? true : false}
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
      // before 
      // (searchData.airways = airlineObject),
      // (searchData.tier = tier),
      // changed
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
                  style={{
                    fontFamily: STR_CONST.appFonts.INTER_BOLD,
                    fontSize: scale(16),
                    color: colours.darkBlueTheme,
                    fontWeight: "bold",
                  }}
                >
                  {/* {STR_CONST.CREATE_ALERT} */}
                  Sort By
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
                    flexDirection: "row",
                    alignItems: "center",
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
                    flexDirection: "row",
                    alignItems: "center",
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
                          "origin",
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
                    flexDirection: "row",
                    alignItems: "center",
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
                          "destination",
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
        <View style={{flex:1,justifyContent:'center',  
        backgroundColor: 'rgba(52, 52, 52, 0.4)',
        alignItems:'center',
        width:width+36,height:height,
        marginStart:-scale(38),
        marginEnd:-scale(27),
        marginTop:-scale(20),
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

    const { showMenu,alerts,alertLength, errorMessage, refreshing, showSortModal } = this.state; 
    
    return (
      <SafeAreaView style={{ backgroundColor: colours.white, flex: 1,}}>
       <MyStatusBar  />
     
        {this.renderHeader(alertLength)}

        {this.renderLoader()}
        {errorMessage ? (
          <View>
            {errorMessage ? (
              <Text
                style={{
                  color: colours.white,
                  fontSize: 16,
                  backgroundColor: "#ff3860",
                  padding: "5%",
                  margin: "5%",
                }}
              >
                {errorMessage}
              </Text>
            ) : null}
          </View>
        ) : null}
        {alerts && alerts.length !== 0 ? (
          <FlatList
            data={alerts}
            style={{ marginTop: verticalScale(20) }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              // console.log("inside the rende method  - - - - -",item),

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
                  let auditData = await this.getAuditData(searchData);                
                  this.props.getAirlinesAvailabilityAction(searchData);
                  this.props.sendAuditDataAction(auditData);
                  this.props.getPointsAvailabilityAction(searchData)
                  this.props.getFlightScheduleAction(flightScheduleData)
                }}
                showMenu={this.state.showMenu}
                AlertId={this.state.AlertId}
                onEditPress={() => {
                  this.setState({
                    showMenu:false
                  })
                     let data = this.getSearchData(item);
                  this.props.navigation.navigate(STR_CONST.EDIT_ALERT, {
                    alertData: item,
                    props: this.props,
                    data: data,
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
        {this.createAlertButton()}
        {showSortModal && this.sortModal()}
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFCMTokenAction: (fcmToken) => dispatch(sendFCMToken(fcmToken)),
    getAirlinesAvailabilityAction:(searchData)=>dispatch(getAirlinesAvailability(searchData, 'ALERT')),
    getPointsAvailabilityAction:(searchData)=>dispatch(getPointsAvailability(searchData)),
    sendAuditDataAction: (auditData) => dispatch(sendAuditData(auditData)),
    getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
    getAlertsAction: () => dispatch(getAlerts()),
    getUserInfoAction: () => dispatch(getUserInfo()),
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
    screenType: calendar.screenType,
    airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
    locations: findFlight.locations,
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