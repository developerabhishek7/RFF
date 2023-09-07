import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  BackHandler,
  Modal,
  Dimensions,
  Platform
} from "react-native";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./NotificationDetailsStyles";
import ScreenHeader from "../../../components/header/Header";
import * as STRING_CONST from "../../../constants/StringConst";
import * as IMG_CONST from "../../../constants/ImageConst";
import FastImage from 'react-native-fast-image'

import moment from "moment";
import {
  markNotificationAsRead,
  getNotificationDetail,
  resetNotificationDetails,
} from "../../../actions/notificationActions";
import scale, { verticalScale } from "../../../helpers/scale";
import { ScrollView } from "react-native-gesture-handler";
import * as IMAGE_CONST from "../../../constants/ImageConst";
import * as CONFIG from "../../../helpers/config";
import { colours } from "../../../constants/ColorConst";
import Octicons from "react-native-vector-icons/FontAwesome";
import {
  getClassesDisplayName,
  getClassesColor,
  getDateFormate,
  getLocationName,
} from "../../../utils/commonMethods";
import * as STR_CONST from "../../../constants/StringConst";
import { getAirlinesAvailability ,getPointsAvailability } from "../../../actions/calendarActions";
import {
  getAirlinesMembership,
  getPossibleRoutes,
  getLocations,
  getNearestAirport,
  sendAuditData,
  getFlightSchedule,
  getCabinClass
} from "../../../actions/findFlightActions";
import NavigationService from "../../../utils/NavigationService";

let monthKey = 12
class NotificationDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classArray: [],
      notificationDetails: this.props.notificationDetails,
      inBoundDateArray: [],
      outBoundDateArray: [],
      availableClassArray: [],
      staticDateArray:[],
      isLoader: false,
    };
    this.circleRadius = scale(1.6);
  }

  componentDidMount() {
    this.checkIfPeakOffPeakDataMonth()
    this.getDates()
    let id = this.props.route.params.notification_id;     
    this.props.getNotificationDetailAction(id);
    id = this.props.route.params.notification_id;
    if (id !== 0) {
      this.props.markNotificationAsRead(id);
    }
    let data = {}

    setTimeout(() => {
      const {notificationDetails} = this.state;
      data = {
        "source":notificationDetails.alert.source_code,
       "destination": notificationDetails.alert.destination_code
      }
    }, 1000);

    setTimeout(() => {
      this.props.getCabinClassAction(data)
    }, 2000);



    BackHandler.addEventListener('hardwareBackPress', () =>
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


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.handleBackButton(this.props.navigation),
    );
  }

  setData(notificationDetails) {
    let inBoundDateArray = [];
    let outBoundDateArray = [];
    let availableClassArray = [];
    let inbound_availability =
      notificationDetails.availability.inbound_availability;
    let outbound_availability =
      notificationDetails.availability.outbound_availability;
    for (const property in inbound_availability) {
      inBoundDateArray.push(property);
      availableClassArray.push(inbound_availability[property]);
    }
    for (const property in outbound_availability) {
      outBoundDateArray.push(property);
      availableClassArray.push(outbound_availability[property]);
    }
    availableClassArray = [
      ...new Set([].concat.apply([], availableClassArray)),
    ].toString();
    this.setState({
      notificationDetails: notificationDetails,
      inBoundDateArray,
      outBoundDateArray,
      availableClassArray,
    });
  }



  checkIfPeakOffPeakDataMonth = () => {
    let month =  new Date().getMonth()
    console.log("yes check month key ====== month     ",typeof month)
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.notificationDetails &&
        this.props.notificationDetails !== prevProps.notificationDetails
      ) {
        this.setData(this.props.notificationDetails);
      } else if (this.props.notificationDetailsError !== "") {
        alert(notificationDetailsError);
      }
      this.props.resetNotificationDetailsAction();
      if (
        this.props.airlinesDetail &&
        this.props.airlinesDetail !== prevProps.airlinesDetail &&
        this.props.screenType == STRING_CONST.NOTIFICATION
      ) {    
        this.state.searchData &&
        this.setState({ isLoader: false }, () => {
          this.props.navigation.navigate(STRING_CONST.CALENDAR_SCREEN, {
            searchData:this.state.searchData,
            focusedDate: this.state.outBoundDateArray[0],
            monthKey:monthKey,
            peakOffpeakData: this.props.peakOffpeakData,
            staticDateArray:this.state.staticDateArray
          })
        })
      }
    }
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
          backgroundColor: 'rgba(52, 52, 52, 0.4)',
          alignItems: 'center',
          width: width + 36, height: height,
          marginStart: -scale(20),
          marginEnd: -scale(27),
          marginTop:Platform.OS == "ios"?  scale(-20) :scale(-40),
          marginBottom: -scale(20),
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
  
  formatDate(date) {
    return moment(date).format("DD MMM YYYY");
  }

  getclassSelectedArray(travelClassString) {
    let classSelected = [];
    let travelClass = travelClassString.split(",");
    classSelected[0] = travelClass.includes("economy");
    classSelected[1] = travelClass.includes("premium_economy");
    classSelected[2] = travelClass.includes("business");
    classSelected[3] = travelClass.includes("first");
    return classSelected;
  }

  getSearchData(item) {

    let airlineObject = {};
    let tier = {};
    let sourceLocation = {};
    let destinationLocation = {};
    let airline = item.airline_name.replace("_", "-").toLowerCase();
    let searchData = {
      airline: airline,
      sourceCode: item.source_code,
      destinationCode: item.destination_code,
      passengerCount: item.number_of_passengers,
      isReturn: item.trip_type == "return",
      classSelected: this.getclassSelectedArray(item.travel_classes),
      airways: item.airline_name,
      startDate: item.start_date,
      endDate: item.end_date,
      arrivalStartDate: item.arrival_start_date,
      arrivalEndDate: item.arrival_end_date,
      alertID: item.id,
      availabilityUrl: item.availability_url,
      availableClasses: item.available_travel_classes,
    };
    let airlinesMembershipDetails = this.props.airlinesMembershipDetails;
    let locationsArray = this.props.locations;
    airlinesMembershipDetails.map((airline) => {
      let airlineValue = airline.airline.toLowerCase().replace(" ", "_");
      if (airlineValue == item.airline_name) {
        airlineObject = airline;
        airline.memberships.map((membership) => {
          if (item.membership_type == membership.value) {
            tier = membership;
          }
        });
      }
    });
    locationsArray &&
      locationsArray.map((location) => {
        if (location.code == item.source_code) {
          sourceLocation = location;
        }
        if (location.code == item.destination_code) {
          destinationLocation = location;
        }
      });

    (searchData.airways = airlineObject),
      (searchData.tier = tier.value),
      (searchData.selectedSource = sourceLocation);
    searchData.selectedDestination = destinationLocation;      
    let flightScheduleData = {"airline": airline, "destination": item.destination_code, "source": item.source_code,}
    this.props.getFlightScheduleAction(flightScheduleData)
    this.setState({
      searchData: searchData,
      isLoader:true
    });
    return searchData;
  }

  dateView(date) {
    return (
      <View style={styles.textView}>
        <Text style={styles.dateText}>{date[0]}</Text>
        <Text style={styles.monthText}>{date[1]}</Text>
      </View>
    );
  }

  fullCircle(item, details) {
    return (
      <View style={styles.availableDatesViewSpace}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.fullCircleUpperView}>
            <View
              style={[
                styles.fullCircleView,
                { borderColor: getClassesColor(details[0]) },
              ]}
            />
          </View>
        </View>
        {this.dateView(
          moment(item)
            .format("DD MMM")
            .split(" ")
        )}
      </View>
    );
  }

  halfCirclesView(item, details) {
    return (
      <View style={styles.availableDatesViewSpace}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.halfCircleUpperView}>
            <View
              style={[
                styles.halfCircleView,
                {
                  left: 0,
                  borderColor: getClassesColor(details[0]),
                },
              ]}
            />
          </View>
          <View style={styles.halfCircleUpperView}>
            <View
              style={[
                styles.halfCircleView,
                {
                  right: 0,
                  borderColor: getClassesColor(details[1]),
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.quadrantVerticalSpaceView} />
        {this.dateView(
          moment(item)
            .format("DD MMM")
            .split(" ")
        )}
      </View>
    );
  }

  threePartCirclesView(item, details) {

    return (
      <View style={styles.availableDatesViewSpace}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.threePartCircleContainer}>
            <View
              style={[
                styles.threePartTopCircleContainer,
                {
                  left: 0,
                  borderColor: getClassesColor(details[0]),
                },
              ]}
            />
          </View>
          <View style={styles.threePartCircleContainer}>
            <View
              style={[
                styles.threePartTopCircleContainer,
                {
                  right: 0,
                  borderColor: getClassesColor(details[1]),
                },
              ]}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.threePartBottomCircleContainer}>
            <View
              style={[
                styles.threePartBottomCircleView,
                { borderColor: getClassesColor(details[2]) },
              ]}
            />
          </View>
        </View>
        <View style={styles.threePartWhiteSpaceContainer} />
        <View style={styles.topWhiteSpaceView} />
        <View style={styles.rightWhiteSpaceView} />
        {this.dateView(
          moment(item)
            .format("DD MMM")
            .split(" ")
        )}
      </View>
    );
  }

  quarterCirclesView(item, details) {
    return (
      <View style={styles.availableDatesViewSpace}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.quadrantUpperView}>
            <View
              style={[
                styles.quadrantView,
                {
                  borderColor: getClassesColor(details[0]),
                  top: 0,
                  left: 0,
                },
              ]}
            />
          </View>
          <View style={styles.quadrantUpperView}>
            <View
              style={[
                styles.quadrantView,
                {
                  borderColor: getClassesColor(details[1]),
                  top: 0,
                  right: 0,
                },
              ]}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.quadrantUpperView}>
            <View
              style={[
                styles.quadrantView,
                {
                  borderColor: getClassesColor(details[2]),
                  bottom: 0,
                  left: 0,
                },
              ]}
            />
          </View>
          <View style={styles.quadrantUpperView}>
            <View
              style={[
                styles.quadrantView,
                {
                  borderColor: getClassesColor(details[3]),
                  bottom: 0,
                  right: 0,
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.quadrantVerticalSpaceView} />
        <View style={styles.quadrantHorizontalSpaceView} />
        {this.dateView(
          moment(item)
            .format("DD MMM")
            .split(" ")
        )}
      </View>
    );
  }

   classView(travelClasses) {
    const classArray = travelClasses.split(",");
    let PremClass = "Prem Econ"
    return ( 
      <View style={styles.classView}>
        {classArray.map((cabinClass) => {
          console.log("yes check here cabin class -=  - - - - -",cabinClass)
          return (
            <View style={styles.travelClassInnerView}>
              <Octicons
                name="circle"
                size={13}
                color={getClassesColor(cabinClass)}
                style={{ marginRight: scale(5),margin:scale(6) }}
              />
              <Text style={styles.cabinClasstext}>
                {cabinClass == "premium_economy" ?
                 PremClass
                : getClassesDisplayName(cabinClass) 
              }
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  alertView(alert) {
    const { availableClassArray } = this.state;
    let sourceCode = alert.source_code
    let destinationCode = alert.destination_code
    return (
      <View
        style={[
          styles.alertDetailsView,
          { marginBottom: availableClassArray !== "" ? verticalScale(30) : 0 },
        ]}
      >
        <View style={styles.alertHeadingView}>
          <View style={{flexDirection:"row",justifyContent:"center",alignItems:'center'}}>
          <View style={styles.iconContainer}>
            <FastImage style={styles.infoIcon} source={IMG_CONST.AIRWAYS_ICON} />
          </View>
          <Text style={styles.alertHeadingText1}>
            {` ${
              getLocationName(alert.source_code, this.props.locations).city_name
            } to ${
              getLocationName(alert.destination_code, this.props.locations)
                .city_name
            }`}
              {/* {getLocationName(sourceCode)}{`(${sourceCode})`} {"to"} {getLocationName(destinationCode)}{ ` (${destinationCode})`}  */}
          </Text>
          </View>
  
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={IMAGE_CONST.WHITE_USER}
              style={{ marginRight: scale(6) }}
            />
            <Text style={styles.alertHeadingText}>{`${
              alert.number_of_passengers
            } `}
            
            </Text>
          </View>
        </View>
        <View style={styles.travelDateView}>
          <Text style={styles.dateRangeText}>
            {STRING_CONST.DEPARTURE_DATE_RANGE}
          </Text>
          <View style={{ flexDirection: "row", marginTop: verticalScale(11) }}>
            <FastImage
              source={IMAGE_CONST.SOLID_TAKE_OFF}
              style={{
                marginRight: scale(8),
                height: scale(12),
                width: scale(12),
              }}
            />
            <Text style={styles.dateRangeValue}>{`${this.formatDate(
              alert.start_date
            )} - ${this.formatDate(alert.end_date)}`}</Text>
          </View>
          {alert.arrival_start_date && (
            <Text
              style={[styles.dateRangeText, { marginTop: verticalScale(25) }]}
            >
              {STRING_CONST.RETURN_DATE_RANGE}
            </Text>
          )}
          {alert.arrival_start_date && (
            <View
              style={{ flexDirection: "row", marginTop: verticalScale(11) }}
            >
              <FastImage
                source={IMAGE_CONST.SOLID_LANDING}
                style={{
                  marginRight: scale(8),
                  height: scale(12),
                  width: scale(12),
                }}
              />
              <Text style={styles.dateRangeValue}>{`${this.formatDate(
                alert.arrival_start_date
              )} - ${this.formatDate(alert.arrival_end_date)}`}</Text>
            </View>
          )}
        </View>
        {this.classView(alert.travel_classes)}
      </View>
    );
  }

  buttonView(alert) {
    return (
      <View style={styles.buttonViewContainer}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: colours.lightBlueTheme,
              borderColor: colours.lightBlueTheme,
              // width: scale(190),
            },
          ]}
          onPress={() => {
            let data = this.getSearchData(alert);
            this.props.getAirlinesAvailabilityAction(data);
            this.props.getPointsAvailabilityAction(data)
            
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
            {STRING_CONST.VIEW_CALENDAR_PAGE}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: colours.white,
              borderColor: colours.lightBlueTheme,
              width: scale(120),
            },
          ]}
          onPress={() => {
            let data = this.getSearchData(alert);
            this.props.navigation.navigate(STR_CONST.EDIT_ALERT, {
              alertData: alert,
              props: this.props,
              data: data,
              screen:"Notification"
            });
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
            {STRING_CONST.EDIT_ALERT_TEXT}
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  availabilityNoticeView() {
    return (
      <View style={styles.availabilityNoticeView}>
        <Text style={styles.availabilityNoticeHeading}>
          {STRING_CONST.AVAILABILITY_CHANGES}
        </Text>
        <Text style={styles.delayAlertText}>{STRING_CONST.DELAY_ALERT}</Text>
      </View>
    );
  }
  infoText(text, iconSize) {
    return (
      <View style={styles.infoTextView}>
        <Octicons
          name="caret-right"
          size={scale(iconSize)}
          color={colours.lightBlueTheme}
          style={{ marginRight: scale(9) }}
        />
        <Text style={styles.infoTextStyle}>{text}</Text>
      </View>
    );
  }
  stepsToBook(alert) {
    return (
      <View
        style={{ marginTop: verticalScale(31), marginHorizontal: scale(20) }}
      >
        <Text style={styles.stepsTobook}>{STRING_CONST.STEPS_TO_BOOK}</Text>
        {this.infoText(STRING_CONST.CHECK_AVAILABILITY, 20)}
        <TouchableOpacity
          style={styles.viewCalendarButton}
          onPress={() => {
            let data = this.getSearchData(alert);
            this.props.getAirlinesAvailabilityAction(data);
            this.props.getPointsAvailabilityAction(data)
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
            {STRING_CONST.VIEW_CALENDAR_PAGE}
          </Text>
        </TouchableOpacity>
        {this.infoText(STRING_CONST.CHECK_AVAILABILITY_ON_BA, 20)}
        <TouchableOpacity
          style={styles.viewCalendarButton}
          onPress={() => {
            Linking.openURL(CONFIG.BA_URL);
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
            {STRING_CONST.CHECK_ON_BA}
          </Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: scale(15) }}>
          {this.infoText(STRING_CONST.BOOK_IMMEDIATLY, 15)}
          {this.infoText(STRING_CONST.MISSING_AVAILABILITY, 15)}
        </View>
      </View>
    );
  }
  getCircleView(item, isInbound) {
    let availability = this.state.notificationDetails.availability;
    let dataObject = {};
    if (isInbound) {
      dataObject = availability.inbound_availability;
    } else {
      dataObject = availability.outbound_availability;
    }
    let classArray = dataObject[item];

    return (
      <View style={{ flexDirection: "row",}}>
        {classArray.length == 1
          ? this.fullCircle(item, classArray)
          : classArray.length == 2
          ? this.halfCirclesView(item, classArray)
          : classArray.length == 3
          ? this.threePartCirclesView(item, classArray)
          : this.quarterCirclesView(item, classArray)}
      </View>
    );
  }

  datesView(datesArray, isInbound) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" ,borderWidth:0}}>
        <FlatList
          data={datesArray}
          horizontal
          style={{ marginTop: verticalScale(15) }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => this.getCircleView(item, isInbound)}
          maxToRenderPerBatch={3}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>
    );
  }

  renderDetails() {
    const {
      notificationDetails,
      inBoundDateArray,
      outBoundDateArray,
      availableClassArray,
    } = this.state;
    let firstFourInboundDates = [...inBoundDateArray];
    let firstFourOutboundDates = [...outBoundDateArray];

    let date = notificationDetails.notification_created_at
    let actualDate =  moment(date).format("DD-MM-YYYY : HH:mm")

    return (
      <View style={styles.cellContainer} activeOpacity={0.6} onPress={() => {}}>
        <View style={{ marginHorizontal: scale(20),}}>
          <Text style={styles.notifTitle}>{notificationDetails.title}</Text>
          <Text style={styles.notifDate}>
            {/* {getDateFormate(notificationDetails.notification_created_at)} */}
          {actualDate}
          </Text>
          {this.alertView(notificationDetails.alert)}
          {availableClassArray !== "" && (
            <View>
              <Text style={styles.notifTitle}>
                {STRING_CONST.DATES_AVAILABLE}
              </Text>
            </View>
          )}
          {outBoundDateArray && outBoundDateArray.length > 0 && (
            <View>
              <Text
                style={[styles.notifTitel, { marginTop: verticalScale(15) }]}
              >
                {/* {STRING_CONST.OUTBOUND} */}
                {"Outbound Dates"}
              </Text>
              {this.datesView(
                firstFourOutboundDates.length > STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT
                  ? firstFourOutboundDates.splice(0, STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT)
                  : outBoundDateArray,
                false
              )}
              {outBoundDateArray.length > STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT && (
                <Text
                  style={[
                    styles.notifTitle,
                    { alignSelf: "flex-end", marginTop: verticalScale(10) },
                  ]}
                >{`+ ${outBoundDateArray.length - STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT} dates`}</Text>
              )}
            </View>
          )}
          {inBoundDateArray && inBoundDateArray.length > 0 && (
            <View>
              <Text style={styles.notifTitel}>{"Inbound Dates"}</Text>
              {this.datesView(
                firstFourInboundDates.length > STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT
                  ? firstFourInboundDates.splice(0, STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT)
                  : inBoundDateArray,
                true
              )}
              {inBoundDateArray.length > STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT && (
                <Text
                  style={[
                    styles.notifTitle,
                    { alignSelf: "flex-end", marginTop: verticalScale(10) },
                  ]}
                >{`+ ${inBoundDateArray.length - STRING_CONST.MINIMUM_DATE_AVAILABILTY_COUNT} dates`}</Text>
              )}
            </View>
          )}
          {this.buttonView(notificationDetails.alert)}
        </View>
        {this.availabilityNoticeView()}
        {this.stepsToBook(notificationDetails.alert)}
      </View>
    );
  }

  // renderHeader() {
  //   return (
  //     <View style={{ marginHorizontal: scale(15) }}>
  //       <ScreenHeader
  //         {...this.props}
  //         left
  //         title={STRING_CONST.NOTIFICATONS_SCREEN_TITLE}
  //         clickOnLeft={() => {
  //           // NavigationService.navigate("NotificationsScreen")
  //           this.props.navigation.goBack();
  //         }}
  //       />
  //     </View>
  //   );

  // }

  

  renderHeader(){
    return(
      <View style={{alignItems:"center",backgroundColor:"#03B2D8",height:scale(110),width:"100%",marginTop:Platform.OS =="android" ? scale(-20):scale(-60),borderBottomLeftRadius:scale(30),borderBottomRightRadius:scale(30),marginBottom:scale(20)}}>
        <View style={{marginTop:scale(40)}}>
        <ScreenHeader
          {...this.props}
          left
          title={STRING_CONST.NOTIFICATONS_SCREEN_TITLE}
          clickOnLeft={() => {
            // NavigationService.navigate("NotificationsScreen")
            this.props.navigation.goBack();
          }}
        />
        </View>
      </View>
    )
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
    return (     
      <SafeAreaView style={styles.container}>
         {this.renderHeader()}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {this.renderLoader()}
          {this.state.notificationDetails && this.renderDetails()}
        </ScrollView>
      </SafeAreaView>      
    );
  }
}
const mapStateToProps = (state) => {
  const { notification, findFlight, calendar } = state;
  return {
    notificationData: notification.notificationData,
    getNotifError: notification.getNotifError,
    totalPages: notification.totalPages,
    notificationDetails: notification.notificationDetails,
    notificationDetailsError: notification.notificationDetailsError,
    airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
    locations: findFlight.locations,
    airlinesDetail: calendar.airlinesDetail,
    screenType: calendar.screenType,
    peakOffpeakData: calendar.peakOffpeakData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  markNotificationAsRead: (notifID) =>
  dispatch(markNotificationAsRead(notifID)),
  getNotificationDetailAction: (alertId) =>
  dispatch(getNotificationDetail(alertId)),
  getCabinClassAction:(data)=> dispatch(getCabinClass(data)),
  resetNotificationDetailsAction: () => dispatch(resetNotificationDetails()),
  getAirlinesAvailabilityAction: (searchData) =>
  dispatch(getAirlinesAvailability(searchData, STRING_CONST.NOTIFICATION)),
  getPointsAvailabilityAction:(searchData)=>dispatch(getPointsAvailability(searchData)),
  getFlightScheduleAction: (flightScheduleData) => dispatch(getFlightSchedule(flightScheduleData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDetailComponent);

NotificationDetailComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};