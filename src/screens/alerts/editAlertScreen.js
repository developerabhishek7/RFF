import React, { Component, Fragment } from "react";
import { View, Text, Image, Alert,BackHandler } from "react-native";
import ScreenHeader from "../../components/header/Header";
import { connect } from "react-redux";
import {SafeAreaView} from 'react-native'
import * as STRING_CONST from "../../constants/StringConst";
import scale, { verticalScale } from "../../helpers/scale";
import { colours } from "../../constants/ColorConst";
import * as IMG_CONST from "../../constants/ImageConst";
import { TouchableOpacity } from "react-native-gesture-handler";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import { getformattedDate, isEmptyString, getLocationNameWithCode } from "../../utils/commonMethods";
import MaterialIcon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import moment from "moment";
import FastImage from 'react-native-fast-image'

import styles from "./editAlertStyle";
import PopUpComponent from "../../shared/popUpComponent";
import {
  cancelAlerts,
  resetCancelAlert,
  editAlert,
  resetAlertUpdate,
  getAlerts
} from "../../actions/alertActions";
import {usePostHog} from 'posthog-react-native';
const classes = ["economy", "premium_economy", "business", "first"];
const classes1 = ["Economy","Premium Economy","Businness", "First"]
class EditAlertComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passengerCount: 1,
      selectedIndex: true,
      departStartDate: "",
      departEndDate: "",
      returnStartDate: "",
      returnEndDate: "",
      classSelectedArray: [true, true, true, true],
      showPopUp: false,
      isSavedPressed: false,
      userInfo: this.props.userInfo,
      id: "",
      airline: "",
      membershipType: "",
      airlineSelected: {},
      tierSelected: {},
      source: "",
      destination: "",
      availabilityUrl: "",
      availableClasses: "",
      screenType:this.props.route.params.screen,
      economy:"",
      premium:"",
      business:"",
      first:"",
      isEconomy:false,
      isPremium:false,
      isBusiness:false,
      isFirst:false,     
    };
  }

  submitData() {}

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (
        this.props.alertCancelSuccess !== prevProps.alertCancelSuccess &&
        this.props.alertCancelSuccess
      ) {
        Alert.alert(
          STRING_CONST.CANCEL_ALERT_SUCCESS_MSG,
          STRING_CONST.CANCEL_ALERT_SUCCESS_SUBTEXT,
          [
            {
              text: STRING_CONST.OK,
              onPress: () => console.log("Ask me later pressed"),
            },
          ]
        );
        this.props.navigation.goBack();
        this.props.resetAlertCancelFlag();
      }
      if (
        this.props.editAlertSuccess !== prevProps.editAlertSuccess &&
        this.props.editAlertSuccess
      ) {
        alert(STRING_CONST.ALERT_UPDATED);
        this.props.resetAlertUpdateAction();
        this.props.navigation.goBack();
      } else if (this.props.editAlertSuccess == false) {
        alert(this.props.editAlertError);
        this.props.resetAlertUpdateAction();
      }
    }
  }

  componentDidMount() {
    data = this.props.route.params.alertData;
    let searchData = this.props.route.params.data;

    this.setState({
      passengerCount: searchData.passengerCount,
      selectedIndex: searchData.isReturn ? 1 : 0,
      departStartDate: moment(searchData.startDate).format("YYYY-MM-DD"),
      departEndDate: moment(searchData.endDate).format("YYYY-MM-DD"),
      returnStartDate: searchData.arrivalStartDate
        ? moment(searchData.arrivalStartDate).format("YYYY-MM-DD")
        : "",
      returnEndDate: searchData.arrivalEndDate
        ? moment(searchData.arrivalEndDate).format("YYYY-MM-DD")
        : "",
      classSelectedArray: searchData.classSelected,
      id: searchData.alertID,
      airline: searchData.airways,
      membershipType: searchData.tier,
      source: searchData.selectedSource,
      destination: searchData.selectedDestination,
      availabilityUrl: searchData.availabilityUrl,
      availableClasses: searchData.availableClasses.split(","),
      isEconomy:searchData.classSelected[0],
      isPremium:searchData.classSelected[1],
      isBusiness:searchData.classSelected[2],
      isFirst:searchData.classSelected[3]
    });
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

  getTravellersCountView() {
    const { passengerCount} = this.state;
    return (
      <View style={styles.travelCountContainer}>
        <TouchableOpacity
          style={[styles.countButtonStyle,{
            backgroundColor:  passengerCount > 1 ? colours.lightBlueTheme : colours.lightGreyish,
          }]}
          onPress={() => {
            if (this.state.passengerCount > 1) {
              this.setState({
                passengerCount: this.state.passengerCount - 1,
              });
            }
          }}
        >
         
            {IMG_CONST.MINUS_ICON}
           
        
        </TouchableOpacity>
        <Text style={[{ marginHorizontal: scale(12), fontSize:scale(14) }]}>
          {this.state.passengerCount}
        </Text>
        <TouchableOpacity
           style={[styles.countButtonStyle,{
            backgroundColor:  passengerCount < 6  ? colours.lightBlueTheme : colours.lightGreyish,
          }]}
          onPress={() => {
            if(this.state.passengerCount < 6){
            this.setState({
              passengerCount: this.state.passengerCount + 1,
            });
          }
          }}
        >
          {IMG_CONST.PLUS_ICON}
        </TouchableOpacity>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={{marginHorizontal:scale(15)}}>
        <ScreenHeader
          {...this.props}
          left
          title={STRING_CONST.EDIT_ALERTS_TITLE}
          notifCount={2}
          clickOnRight={() => this.goToNotifications()}
          clickOnLeft={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }

  departureDateView() {
    const { departStartDate,departEndDate } = this.state
    return (
      <View style={{ marginTop: verticalScale(18) }}>
        <Text
          style={[
            styles.headingTextStyle,
            {
              marginBottom: verticalScale(8),
            },
          ]}
        >
          {STRING_CONST.DEPARTURE_DATE_RANGE}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.CREATE_ALERT_SCREEN, {
              headingText: STRING_CONST.DEPART_TEXT,
              onSelectPress: (startDate, endDate) => {
                this.setState({
                  departStartDate: startDate,
                  departEndDate: endDate,
                });
              },
              minDate : "2023-05-03",
              showDateRange: true,
              selectedStartDate: departStartDate
                            ? departStartDate
                            : null,
              selectedEndDate: departEndDate ? departEndDate : null,
            });
          }}
        >
          <Text style={styles.dateTextStyle}>
            {`${

            !isEmptyString(this.state.departStartDate)
                ? `${getformattedDate(this.state.departStartDate)}`
                : STRING_CONST.START_DATE
            } - ${
              !isEmptyString(this.state.departEndDate)
                ? `${getformattedDate(this.state.departEndDate)}`
                : STRING_CONST.END_DATE
            }`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  returnDateView() {
    const { returnStartDate, returnEndDate } = this.state
    let date = moment().format("YYYY-MM-DD")
    return (
      <View style={{ marginTop: verticalScale(18) }}>
        <Text
          style={[
            styles.headingTextStyle,
            {
              marginBottom: verticalScale(8),
            },
          ]}
        >
          {STRING_CONST.RETURN_DATE_RANGE}
        </Text>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate(STRING_CONST.CREATE_ALERT_SCREEN, {
              headingText: STRING_CONST.RETURN,
              onSelectPress: (startDate, endDate) => {
                this.setState({
                  returnStartDate: startDate,
                  returnEndDate: endDate,
                });
              },
              showDateRange: true,
              minDate: this.state.departStartDate,
              selectedStartDate: returnStartDate
                            ? returnStartDate
                            : null,
              selectedEndDate: returnEndDate ? returnEndDate : null,
            });
          }}
        >
          <Text style={styles.dateTextStyle}>
            {`${
              !isEmptyString(this.state.returnStartDate)
                ? `${getformattedDate(this.state.returnStartDate)}`
                : STRING_CONST.START_DATE
            } - ${
              !isEmptyString(this.state.returnEndDate)
                ? `${getformattedDate(this.state.returnEndDate)}`
                : STRING_CONST.END_DATE
            }`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  getIcon(icon, color){
    return <MaterialIcon
    name={icon}
    size={scale(18)}
    color={color}
  />
  }
  
  renderTravelClass(classType, index) {
    let marginStyle = {};
    const {userInfo} = this.state

    let bronzeMember = userInfo.bronze_member


    let isEconomySelected = this.state.classSelectedArray[0]

    let isPremiumSelected = this.state.classSelectedArray[1]

    let isBusinessSelected = this.state.classSelectedArray[2]

    let isFirstSelected = this.state.classSelectedArray[3]



    if (index % 2 == 0) {
      marginStyle = { marginRight: scale(10) };
    }
    switch (classType) {
      case "economy": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle]}
            onPress={() => {

              if(isPremiumSelected || isBusinessSelected || isFirstSelected) {  

                let newClassArray = this.state.classSelectedArray;
                if(bronzeMember){
                  newClassArray[0] = !newClassArray[0];
                  // this.setState({
                  //   classSelectedArray: newClassArray,
                  // });
              }
              else{
                newClassArray[0] = !newClassArray[0];
                this.setState({
                  classSelectedArray: newClassArray,
                });
              }

              }
            
            }}
          >
            { !this.state.classSelectedArray[0] ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.blue):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.blue)
            }
      <Text style={styles.classTextStyle}>{STRING_CONST.ECONOMY}</Text>
          </TouchableOpacity>
        );
      }
      case "premium" :
      case "premium_economy": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle]}
            
            
            onPress={() => {


              if(isEconomySelected || isBusinessSelected || isFirstSelected) { 
                        
              let newClassArray = this.state.classSelectedArray;
             
              if(!bronzeMember){
                newClassArray[1] = !newClassArray[1];
                this.setState({
                  classSelectedArray: newClassArray,
                });
              }
            }
            }}
          >
            { !this.state.classSelectedArray[1] ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.yellow):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.yellow)
            }
            <Text style={styles.classTextStyle}>{STRING_CONST.PREMIUM_ECONOMY}</Text>
          </TouchableOpacity>
        );
      }
      case "business": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle]}
            onPress={() => {


              if(isEconomySelected || isPremiumSelected || isFirstSelected) { 
                        
              let newClassArray = this.state.classSelectedArray;

              if(!bronzeMember){
                newClassArray[2] = !newClassArray[2];
                this.setState({
                  classSelectedArray: newClassArray,
                });
              }

            }
            }}
          >
            { !this.state.classSelectedArray[2] ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.purple):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.purple)
            }
            <Text style={styles.classTextStyle}>{STRING_CONST.BUSINESS}</Text>
          </TouchableOpacity>
        );
      }
      case "first": {
        return (
          <TouchableOpacity
            style={[styles.classCheckboxContainer, marginStyle]}
            onPress={() => {

              if(isEconomySelected || isPremiumSelected || isBusinessSelected) { 
                         
              let newClassArray = this.state.classSelectedArray;
               if(!bronzeMember){
                newClassArray[3] = !newClassArray[3];
                this.setState({
                  classSelectedArray: newClassArray,
                });
               }
              }
            }}
          >
            
            { !this.state.classSelectedArray[3] ?
              this.getIcon(STRING_CONST.CHECK_EMPTY_CIRCLE, colours.pink):
              this.getIcon(STRING_CONST.CHECK_CIRCLE, colours.pink)
            }
            <Text style={styles.classTextStyle}>{STRING_CONST.FIRST}</Text>
          </TouchableOpacity>
        );
      }
      default: {
        return null;
      }
    }
  }
  travelClassView() {
    const { availableClasses, classSelectedArray, } = this.state;


    const {userInfo} = this.state

    let goldMember = userInfo.gold_member
    let silverMember = userInfo.silver_member
    let bronzeMember = userInfo.bronze_member
 
    let travelData = []
     let economy = availableClasses[0]
        let premium = availableClasses[3]
        let business = availableClasses[1]
        let first  = availableClasses[2]
        // let travelData =  [economy?"economy",premium?"premium",business?"business",first?"first"]
        if(economy){
          economy = "economy"
        }
         else if(premium){
          premium = "premium"
        }    
        else if(business){
          business = "business"
        }             
        else if(first){
          first = "first"
        }
    
        travelData[0] = economy
        travelData[1] = premium
        travelData[2] = business
        travelData[3] = first

    return (
      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={[styles.headingTextStyle]}>{"Cabin Type"}</Text>
       { travelData.length> 0 ? <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop:verticalScale(5) }}>
          {travelData.map((classType, index) => {
            if(travelData.includes(classType))
            return this.renderTravelClass(classType, index);
          })}
        </View> : null}
        {classSelectedArray.every((v) => v === false) ? (
          <Text style={{ color: colours.redColor, marginTop: verticalScale(3) }}>
            {STRING_CONST.SELECT_CABIN}
          </Text>
        ) : null}
      </View>
    );
  }

  renderBody() {
    const { source, destination,passengerCount } = this.state;

    // let PrevSource = JSON.stringify(source)
    // let prevDestination = JSON.stringify(destination)
    return (
      <View style={{ marginHorizontal: scale(20) }}>
        <Text style={styles.locationTextStyle}>
          {source.city_name} to {destination.city_name}
        </Text>
        {/* <View style={{ marginTop: verticalScale(16) }}>
          <Text
            style={[styles.headingTextStyle]}
          >{STRING_CONST.MEMBERSHIP_TIER}</Text>
          <TouchableOpacity
            style={{
              marginTop: verticalScale(10),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => {
              this.props.navigation.navigate(STRING_CONST.AIRLINE_MEMBERSHIP_SCREEN, {
                airLinesMembershipDetailsObject: this.props
                  .airlinesMembershipDetails,
                onMembershipSelected: (airlineSelected, tierSelected) => {
                  this.setState({
                    airlineSelected: airlineSelected,
                    tierSelected: tierSelected,
                    membershipType: tierSelected,
                  });
                },
              });
            }}
          >
            <Text style={[styles.tripTypeTextStyle]}>
              {this.state.membershipType.title}
            </Text>
          </TouchableOpacity>
          <View style={[styles.lineStyle, { marginTop: verticalScale(10) }]} />
        </View> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: verticalScale(20),
          }}
        >
          <View style={styles.headingContainerStyle}>
            <Text
              style={[
                styles.headingTextStyle,
                {
                  marginBottom: verticalScale(8),
                },
              ]}
            >
              {STRING_CONST.FLIGHT_TYPE}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  this.setState({ selectedIndex: 0 });
                }}
              >
                {this.state.selectedIndex == 0 ? (
                  <FastImage source={IMG_CONST.RADIO_BUTTON} 
                  style={styles.radioButton}/>
                ) : (
                  <Ionicons
                    name="ios-radio-button-off"
                    size={verticalScale(20)}
                    color={colours.darkBlueTheme}
                  />
                )}

                <Text style={styles.tripTypeTextStyle}>{STRING_CONST.ONE_WAY}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: scale(20),
                }}
                onPress={() => {
                  this.setState({ selectedIndex: 1 });
                }}
              >
                {this.state.selectedIndex == 1 ? (
                  <FastImage source={IMG_CONST.RADIO_BUTTON} 
                  style={styles.radioButton}/>
                ) : (
                  <Ionicons
                    name="ios-radio-button-off"
                    size={verticalScale(20)}
                    color={colours.darkBlueTheme}
                  />
                )}
                <Text style={styles.tripTypeTextStyle}>{STRING_CONST.RETURN}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.headingContainerStyle,
              { paddingBottom: verticalScale(13) },
            ]}
          >
            <Text
              style={[
                styles.headingTextStyle,
                {
                  marginBottom: verticalScale(8),
                },
              ]}
            >
              {passengerCount > 1 ?   "Passengers"   : "Passenger"}
              {/* {STRING_CONST.PASSENGER_COUNT} */}
         
            </Text>
            {this.getTravellersCountView()}
          </View>
        </View>
        {this.departureDateView()}
        <View style={styles.lineStyle} />
        {this.state.selectedIndex == 1 ? this.returnDateView() : null}
        {this.state.selectedIndex == 1 ? (
          <View style={styles.lineStyle} />
        ) : null}
        {this.state.isSavedPressed &&
        this.state.selectedIndex == 1 &&
        isEmptyString(this.state.returnStartDate) ? (
          <Text style={{ color: colours.redColor, marginTop: verticalScale(3) }}>
            {STRING_CONST.SELECT_RETURN_DATE}
          </Text>
        ) : null}

        {this.travelClassView()}
      </View>
    );
  }
  getTravelClasses() {
    const { classSelectedArray } = this.state;

    console.log("before computation  - - - - - - -",classSelectedArray)
    let classSelected = "";
    for (i = 0; i < classSelectedArray.length; i++) {
      if (classSelectedArray[i]) {
        if (isEmptyString(classSelected)) {
          classSelected = classSelected.concat(`${classes[i]}`);
        } else {
          classSelected = classSelected.concat(`,${classes[i]}`);
        }
      }
    }   
    return classSelected;
  }

  getTravelClassesForTrack(){
    const { classSelectedArray } = this.state;

    let classSelected = "";
    for (i = 0; i < classSelectedArray.length; i++) {
      if (classSelectedArray[i]) {
        if (isEmptyString(classSelected)) {
          classSelected = classSelected.concat(`${classes1[i]}`);
        } else {
          classSelected = classSelected.concat(`,${classes1[i]}`);
        }
      }
    }   
    return classSelected;
  }

  jsonToQueryString = (json) =>
    "?" +
    Object.keys(json)
      .map(function(key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&");

  validateData() {
    const { returnStartDate, classSelectedArray, selectedIndex } = this.state;

    const {userInfo} = this.state



    let goldMember = userInfo.gold_member
    let silverMember = userInfo.silver_member
    let bronzeMember = userInfo.bronze_member


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


    let d1 = moment().format("YYYY-MM-DD")
    let d2 = this.state.departStartDate

    let d3 = this.state.returnStartDate


    let date1 = new Date(d1).getTime()
    let date2 = new Date(d2).getTime()

    let date3 = new Date(d3).getTime()


    if(date1 > date2) {
      Alert.alert("Date should be greater than today!")
      return false
    }

    if(date1 > date3){
      Alert.alert("Date should be greater than today!")
      return false
    }



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
    if (
      (selectedIndex == 1 && isEmptyString(returnStartDate)) ||
      classSelectedArray.every((data) => data == false)
    ) {
    } else {
      let editAlertData = {};
      let searchData = this.props.route.params.data;

      const url = {
        // airlineSelected: `${this.state.airline.value}_${this.state.membershipType.value}`,
        airlineSelected:this.state.airline,
        airlineMembership: this.state.membershipType,
        aCode: this.state.airline,
        numberOfPassengers: this.state.passengerCount,
        tclass: "Economy",
        tValue: "economy",
        membership: this.state.membershipType,
        jType: this.state.selectedIndex == 1 ? "return" : "one-way",
        dPlace:getLocationNameWithCode(searchData.selectedSource),
        dId: searchData.sourceCode,
        aPlace:getLocationNameWithCode(searchData.selectedDestination),
        aId: searchData.destinationCode,
        economy: this.state.classSelectedArray[0],
        premium: this.state.classSelectedArray[1],
        business: this.state.classSelectedArray[2],
        first: this.state.classSelectedArray[3],
        start_date: moment(searchData.startDate).format('YYYY-MM-DD') || null
      };      

      if(this.state.selectedIndex == 0) {
        editAlertData["number_of_passengers"] = this.state.passengerCount;
        editAlertData["travel_classes"] = this.getTravelClasses();
        editAlertData["trip_type"] =
          this.state.selectedIndex == 0 ? "one_way" : "return";
        editAlertData["membership_type"] = this.state.membershipType;
        editAlertData["start_date"] = moment(this.state.departStartDate).format("DD-MM-YYYY") ;
        editAlertData["end_date"] = moment(this.state.departEndDate).format("DD-MM-YYYY") ;
        editAlertData["source_code"] = searchData.sourceCode
        editAlertData["destination_code"] = searchData.destinationCode
        editAlertData["availability_url"] = `/calendar${this.jsonToQueryString(
          url
        )}`; 
      }
      else {
        editAlertData["number_of_passengers"] = this.state.passengerCount;
        editAlertData["travel_classes"] = this.getTravelClasses();
        editAlertData["trip_type"] =
          this.state.selectedIndex == 0 ? "one_way" : "return";
        editAlertData["membership_type"] = this.state.membershipType;
        editAlertData["start_date"] = moment(this.state.departStartDate).format("DD-MM-YYYY") ;
        editAlertData["end_date"] = moment(this.state.departEndDate).format("DD-MM-YYYY") ;
        editAlertData["source_code"] = searchData.sourceCode
        editAlertData["destination_code"] = searchData.destinationCode
        editAlertData["arrival_start_date"] = moment(this.state.returnStartDate).format("DD-MM-YYYY")
        editAlertData["arrival_end_date"] = moment(this.state.returnEndDate).format("DD-MM-YYYY")
        editAlertData["availability_url"] = `/calendar${this.jsonToQueryString(
          url
        )}`; 
      }



      let  classSelected = searchData.classSelected
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
  




      if (this.state.selectedIndex == 1) {
        if (isAlertExpireDays && isAlertExpireDays2) {
          const trackData = {
            "Alert Type": "Edited",
            "Old Alert Parameters": { 
              airline: "British Airways",
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ?searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: searchData.selectedSource.country_name ? searchData.selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: classSelected1 ? classSelected1 : 'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate: moment(searchData.startDate).format("DD-MM-YYYY") ? moment(searchData.departStartDate).format("DD-MM-YYYY") : 'N/A',
              outboundEndDate: moment(searchData.endDate).format("DD-MM-YYYY") ? moment(searchData.departEndDate).format("DD-MM-YYYY") : 'N/A',
              inboundStartDate: 
              searchData.isReturn
                ? moment(searchData.arrivalStartDate).format("DD-MM-YYYY")
                : 'N/A',
              inboundEndDate: searchData.isReturn
              ? moment(searchData.arrivalEndDate).format("DD-MM-YYYY")
              : 'N/A',
            },
            "Alert Parameters": {   
              airline: "British Airways",
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ?searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: searchData.selectedSource.country_name ? searchData.selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:this.state.selectedIndex == 0 ? "one_way" : "return",
              numberOfPassengers: this.state.passengerCount ? this.state.passengerCount : 'N/A',
              cabinClasses: this.getTravelClassesForTrack() ? this.getTravelClassesForTrack() : 'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate: moment(this.state.departStartDate).format("DD-MM-YYYY") ? moment(this.state.departStartDate).format("DD-MM-YYYY") : 'N/A',
              outboundEndDate: moment(this.state.departEndDate).format("DD-MM-YYYY") ? moment(this.state.departEndDate).format("DD-MM-YYYY") : 'N/A',
              inboundStartDate: 
              this.state.returnStartDate
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : 'N/A',
              inboundEndDate: this.state.returnEndDate
              ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
              : 'N/A',
            }
          }
          const posthog = usePostHog()
          posthog.capture('Alert',trackData);
          // PostHog.capture('Alert', trackData1);

          this.props.editAlertAction(editAlertData, this.state.id);
          // this.setState({
          //   departStartDate: "",
          //   departEndDate: "",
          //   returnStartDate: "",
          //   returnEndDate: "",
          //   createAlertPressed: false,
          // });
        }
        else {
          // this.setState({
          //   departStartDate: "",
          //   departEndDate: "",
          //   returnStartDate: "",
          //   returnEndDate: "",
          //   createAlertPressed: false,
          // });
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
            "Alert Type": "Edited",
            "Old Alert Parameters": { 
              airline: "British Airways",
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ?searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: searchData.selectedSource.country_name ? searchData.selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:searchData.isReturn ? "return" : "one_way",
              numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
              cabinClasses: classSelected1 ? classSelected1 : 'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate: moment(searchData.startDate).format("DD-MM-YYYY") ? moment(searchData.departStartDate).format("DD-MM-YYYY") : 'N/A',
              outboundEndDate: moment(searchData.endDate).format("DD-MM-YYYY") ? moment(searchData.departEndDate).format("DD-MM-YYYY") : 'N/A',
              inboundStartDate: 
              searchData.isReturn
                ? moment(searchData.arrivalStartDate).format("DD-MM-YYYY")
                : 'N/A',
              inboundEndDate: searchData.isReturn
              ? moment(searchData.arrivalEndDate).format("DD-MM-YYYY")
              : 'N/A',
            },
            "Alert Parameters": {   
              airline: "British Airways",
              originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
              destinationIATA: searchData.destinationCode ?searchData.destinationCode : 'N/A',
              originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
              destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
              originCountry: searchData.selectedSource.country_name ? searchData.selectedSource.country_name : 'N/A',
              destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
              journeyType:this.state.selectedIndex == 0 ? "one_way" : "return",
              numberOfPassengers: this.state.passengerCount ? this.state.passengerCount : 'N/A',
              cabinClasses: this.getTravelClassesForTrack() ? this.getTravelClassesForTrack() : 'N/A',
              onlyAlertOffPeakAvailable:  'No',
              outboundStartDate: moment(this.state.departStartDate).format("DD-MM-YYYY") ? moment(this.state.departStartDate).format("DD-MM-YYYY") : 'N/A',
              outboundEndDate: moment(this.state.departEndDate).format("DD-MM-YYYY") ? moment(this.state.departEndDate).format("DD-MM-YYYY") : 'N/A',
              inboundStartDate: 
              this.state.returnStartDate
                ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                : 'N/A',
              inboundEndDate: this.state.returnEndDate
              ? moment(this.state.returnEndDate).format("DD-MM-YYYY")
              : 'N/A',
            }
          }

          const posthog = usePostHog()
          posthog.capture('Alert',trackData);
          this.props.editAlertAction(editAlertData, this.state.id);
          // this.setState({
          //   departStartDate: "",
          //   departEndDate: "",
          //   returnStartDate: "",
          //   returnEndDate: "",
          //   createAlertPressed: false,
          // });
        }
        else {
          // this.setState({
          //   departStartDate: "",
          //   departEndDate: "",
          //   returnStartDate: "",
          //   returnEndDate: "",
          //   createAlertPressed: false,
          // });
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

  buttonView() {
    let searchData = this.props.route.params.data;
    const {selectedIndex,departStartDate,departEndDate,returnStartDate,returnEndDate,
      isEconomy,isPremium,isBusiness,isFirst,
      passengerCount
    } = this.state

   let  departStartDate1 = moment(searchData.startDate).format("YYYY-MM-DD")
    let  departEndDate1  = moment(searchData.endDate).format("YYYY-MM-DD")
     let returnStartDate1 = searchData.arrivalStartDate
        ? moment(searchData.arrivalStartDate).format("YYYY-MM-DD")
        : ""
     let returnEndDate1  = searchData.arrivalEndDate
        ? moment(searchData.arrivalEndDate).format("YYYY-MM-DD")
        : ""
    
  
    return (
      <View style={styles.buttonViewContainer}>
        <TouchableOpacity
          style={styles.deleteButtonStyle}
          onPress={() => {
            this.setState({
              showPopUp: true,
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
            {STRING_CONST.DELETE_TEXT}
          </Text>
        </TouchableOpacity>
        {
          searchData.classSelected[0] != isEconomy || searchData.classSelected[1] != isPremium || searchData.classSelected[2] != isBusiness ||
           searchData.classSelected[3] != isFirst || searchData.passengerCount != passengerCount || searchData.isReturn != selectedIndex ||                                                                  
          departStartDate1 != departStartDate || departEndDate1 != departEndDate || returnStartDate1 != returnStartDate || returnEndDate1 != returnEndDate ?        
          <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={() => {
            this.setState({
              isSavedPressed: true,
            });
            this.validateData();
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
            {/* {STRING_CONST.SAVE} */}
            {"Update"}
          </Text>
        </TouchableOpacity>
          :   <TouchableOpacity
          style={styles.saveButtonStyle1}
          // onPress={() => {
          //   this.setState({
          //     isSavedPressed: true,
          //   });
          //   this.validateData();
          // }}
        >
          <Text
            style={[
              styles.buttonTextStyle1,
              {
                color: colours.lightBlueTheme,
              },
            ]}
          >
            {/* {STRING_CONST.SAVE} */}
            {"Update"}
          </Text>
        </TouchableOpacity>
        }
      </View>
    );
  }

  render() {



    let screenType =  this.props.route.params.screen;
    let searchData = this.props.route.params.data;



    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1,  }}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.state.showPopUp && (
            <PopUpComponent
              isSingleButton={false}
              title={STRING_CONST.DELETE_ALERT}
              message={STRING_CONST.CANCEL_ALERT}
              image={IMG_CONST.DELETE_ALERT}
              leftButtonText={STRING_CONST.NO}
              rightButtonText={STRING_CONST.YES}
              onLeftButtonPress={() => {
                this.setState({
                  showPopUp: false,
                });
              }}
              onRightButtonPress={() => {
                this.setState({
                  showPopUp: false,
                });    
                this.props.getAlertsAction();

                const trackData = {
                  "Alert Type": "Deleted",
                  "Alert Parameters": {   
                    airline: "British Airways",
                    originIATA: searchData.sourceCode ? searchData.sourceCode : 'N/A',
                    destinationIATA: searchData.destinationCode ?searchData.destinationCode : 'N/A',
                    originCity: searchData.selectedSource.city_name ? searchData.selectedSource.city_name : 'N/A',
                    destinationCity: searchData.selectedDestination.city_name ? searchData.selectedDestination.city_name : 'N/A',
                    originCountry: searchData.selectedSource.selectedSource ? searchData.selectedSource.selectedSource : 'N/A',
                    destinationCountry: searchData.selectedDestination.country_name ? searchData.selectedDestination.country_name : 'N/A',
                    journeyType:searchData.isReturn ? "return" : "one_way",
                    numberOfPassengers: searchData.passengerCount ? searchData.passengerCount : 'N/A',
                    cabinClasses: searchData.availableClassString ? searchData.availableClassString : 'N/A',
                    onlyAlertOffPeakAvailable:  'No',
                    outboundStartDate: moment(this.state.departStartDate).format("DD-MM-YYYY") ? moment(this.state.departStartDate).format("DD-MM-YYYY") : 'N/A',
                    outboundEndDate: moment(this.state.departEndDate).format("DD-MM-YYYY") ? moment(this.state.departEndDate).format("DD-MM-YYYY") : 'N/A',
                    inboundStartDate: 
                    searchData.isReturn
                      ? moment(this.state.returnStartDate).format("DD-MM-YYYY")
                      : 'N/A',
                    inboundEndDate: searchData.isReturn
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
                 
                
                const posthog = usePostHog()
                posthog.capture('Alert',trackData);



                this.props.cancelAlertAction(this.state.id,screenType)
                // this.props.route.params.props.cancelAlertAction(
                //   this.state.id
                // );
              }}
            />
          )}
        </View>
        {this.buttonView()}
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    cancelAlertAction: (id) => dispatch(cancelAlerts(id)),
    resetAlertCancelFlag: () => dispatch(resetCancelAlert()),
    editAlertAction: (data, id) => dispatch(editAlert(data, id)),
    getAlertsAction: () => dispatch(getAlerts()),
    resetAlertUpdateAction: () => dispatch(resetAlertUpdate()),
  };
};

const mapStateToProps = (state) => {
  const { alerts, findFlight,userInfo } = state;
  return {
    alertCancelSuccess: alerts.alertCancelSuccess,
    userInfo: userInfo.userData,
    alertCancelError: alerts.alertCancelError,
    airlinesMembershipDetails: findFlight.airlinesMembershipDetails,
    editAlertSuccess: alerts.editAlertSuccess,
    editAlertError: alerts.editAlertError
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAlertComponent);
